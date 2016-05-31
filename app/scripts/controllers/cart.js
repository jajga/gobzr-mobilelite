'use strict';

/**
 * @ngdoc function
 * @name gobzrliteApp.controller:CartCtrl
 * @description
 * # CartCtrl
 * Controller of the gobzrliteApp
 */
angular.module('gobzrliteApp')
  .controller('CartCtrl', function (cartService,orderService,$cookies,$scope,$stateParams,$rootScope,getCartProducts) {
  	
  	  var results=getCartProducts['data'];
  	  $scope.cartLength=0;
      if(results.responseCode=="SUCCESS"  && results.entitiesResponse!=null){ 
      	$rootScope.cartItemSummary= results.entitiesResponse['0']['baseDTO']['cartproductidList']
        $scope.cartId= results.entitiesResponse['0']['baseDTO'].cartId
        $rootScope.totalCartValue= results.entitiesResponse['0']['baseDTO'].totalCartValue
        $scope.cartLength= results.entitiesResponse['0']['baseDTO']['cartproductidList'].length;
        $rootScope.cartLength1=results.entitiesResponse['0']['baseDTO']['cartproductidList'].length;
        $scope.cartItemQuantity= results.entitiesResponse['0']['baseDTO']['totalQuantity'];

         

      }else{
      	console.log('Service Failure');
      }

      /*CART Create Order*/
var finalorderId=parseInt($cookies.get('orderId'));
  $scope.createOrder=function(ItemPrice,totalOrderedItems,totalShippingCharge,orderId)  {

  if($rootScope.cartLength1>5){
     //alert(ItemPrice+"---------------"+totalOrderedItems+"---------------"+totalShippingCharge)
      $('#proUnavail').modal("show");
            $('#textInPopUp').text('You can create order only with 5 product. Please add other product to wislist.');
            $('#textInPopUp').css('color',"#ec2227");
             window.setTimeout(function(){
               $('#proUnavail').modal('hide');
            }, 3000);


    
  }
  else
  {  
    if($cookies.get('orderId')!=null && $cookies.get('orderId')!="null" && $cookies.get('orderId')!=undefined) {
      
       finalorderId=parseInt($cookies.get('orderId'));

    }
    else
    {
        
       finalorderId=null

    }

    var formData= {
    "customerId": parseInt(/*$crypto.decrypt(*/$cookies.get('customerId')/*)*/),
    "sessionId": $cookies.get('sessionId').toString(),
    "orderId":finalorderId
    }
    $('#imgLoaderCart').show(); 
    orderService.createOrderData(formData).success(function (results) {
     
     if(results.responseCode=="SUCCESS" && results.entitiesResponse != null) 
     {
    //  $log.info(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,API.BusinessUrl+API.createOrderUrl+contentSearchGenericUrl,results,formData));
         $('#imgLoaderCart').hide();
         $cookies.put('orderIdTemp',results.entitiesResponse['0']['baseDTO'].orderId , {'expires': $rootScope.expireDate},{domain: $rootScope.mydomain});
         $cookies.put('orderId',results.entitiesResponse['0']['baseDTO'].orderId , {'expires': $rootScope.expireDate},{domain: $rootScope.mydomain});
         $cookies.put('orderAmount',results.entitiesResponse['0']['baseDTO'].netPayableAmount , {'expires': $rootScope.expireDate},{domain: $rootScope.mydomain});
         //$location.path('/payment');
         //window.location.href="payment";
         if($('#testingenv').attr('data-value') == 'prodenv'){
            window.location.href="https://"+window.location.hostname+"/payment";
           }
          else if($('#testingenv').attr('data-value') == 'testenv'){
            window.location.href="/payment";
          }

     }else{
      if(results.message=='lock inventory failed'){
        $('#proUnavail').modal("show");
            $('#textInPopUp').text('One or more products in your cart are out of stock');
            $('#textInPopUp').css('color',"#ec2227");
             window.setTimeout(function(){
               $('#proUnavail').modal('hide');
            }, 3000);
      }
  //    $log.error(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,API.BusinessUrl+API.createOrderUrl+contentSearchGenericUrl,results,formData));
      $('#imgLoaderCart').hide();
     }
  }).
  error(function (data,status,header,config)
  {
     //console.log("data "+data+" status "+status+" header "+header+" config "+JSON.stringify(config));
//     $log.error(makeUiLog($cookies.get('sessionID'),$location.path(),status,API.BusinessUrl+API.createOrderUrl+contentSearchGenericUrl,data,formData));
  });

}

}




  });
