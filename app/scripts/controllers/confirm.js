'use strict';

/**
 * @ngdoc function
 * @name gobzrliteApp.controller:ConfirmCtrl
 * @description
 * # ConfirmCtrl
 * Controller of the gobzrliteApp
 */
angular.module('gobzrliteApp')
  .controller('ConfirmCtrl', function ($cookies,orderService,$scope,$rootScope) {
    /*CONFIRMATION*/
var confirmOrderId=$cookies.get('orderIdTemp')
console.log(confirmOrderId);
orderService.orderconfirmation(confirmOrderId).success(function (results) {                   
        if(results.responseCode == "SUCCESS" && results.responseCode=="order loaded successfully"){ 
         //$log.info(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,API.BusinessUrl+API.orderConfirmationUrl+confirmOrderId+contentSearchGenericUrl.replace('?','&'),results,""));
          $('#faliurePage').css('display','none');
          $("#imgLoader1").fadeOut();
          $("#myContent1").fadeOut("slow");
          $scope.orderConfirmationData =  results.entitiesResponse['0']['baseDTO'];
          $('#confirmOrderDiscount').html('(-)'+$rootScope.unitPrice+' 0');

          // window.dataLayer = window.dataLayer || [];
          var productsArry=[];

          for(var i=0;i<results.entitiesResponse['0']['baseDTO'].orderLine.length;i++){
            var  productObj ={
              'name': results.entitiesResponse['0']['baseDTO'].orderLine[i].title.toString(),     
              'id': results.entitiesResponse['0']['baseDTO'].orderLine[i].gbuCode.toString(),
              'price': results.entitiesResponse['0']['baseDTO'].orderLine[i].orderLineValue.toString(),
              'brand': '',
              'category': results.entitiesResponse['0']['baseDTO'].orderLine[i].categoryId.toString(),
              'variant':  results.entitiesResponse['0']['baseDTO'].orderLine[i].subTitle.toString(),
              'quantity': results.entitiesResponse['0']['baseDTO'].orderLine[i].quantity.toString(),
               'coupon': '' 
            };      
            productsArry.push(productObj) ;                        
          }

          

          
          orderService.customerdata($rootScope.customerId).success(function (results) {
            if(results.responseCode == "SUCCESS"){
              //$log.info(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,customerinfoUrl,results,""));
              $('#customerOrderName').html(results.entitiesResponse['0']['baseDTO']['firstName']+" "+results.entitiesResponse['0']['baseDTO']['lastName']);
              $('#customerOrderEmail').html(results.entitiesResponse['0']['baseDTO']['emailId']);
              $('#customerOrderPhone').html(results.entitiesResponse['0']['baseDTO']['mobileNumber']); 
              $("#imgLoader1").fadeOut();
              $("#myContent1").fadeOut("slow");
            }
          });
        }else{
        	$('#faliurePage').css('display','block');
          //$log.error("FAILURE: "+$location.path()+" URL: "+API.URL1+API.orderConfirmationUrl+confirmOrderId+" RESPONSE: "+JSON.stringify(results)+'---- PageName ----'+'{'+$location.path()+'}'+'---- SessionID ----'+$cookies.get('sessionID'));
          //$log.error(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,API.BusinessUrl+API.orderConfirmationUrl+confirmOrderId+contentSearchGenericUrl.replace('?','&'),results,""));
        }
      });

  });
