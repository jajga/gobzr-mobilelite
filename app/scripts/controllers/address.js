'use strict';

/**
 * @ngdoc function
 * @name gobzrliteApp.controller:AddressCtrl
 * @description
 * # AddressCtrl
 * Controller of the gobzrliteApp
 */
angular.module('gobzrliteApp')
  .controller('AddressCtrl', function (getAddress,$localStorage,$cookies,$scope,$rootScope,addressService) {
    console.log(getAddress);
    var results=getAddress['data'];
  	if(getAddress['data'].responseCode=='SUCCESS' && getAddress['data'].entitiesResponse!=null){
           		
               $scope.addressDetail=results.entitiesResponse['0']['baseDTO']['customerAddressWrapperDTOObj'];
               //$('#deliverAddressOptions'+sessionService.get('deliveryAddressId')).css('display','none');
               for (var i = 0; i < $scope.addressDetail.length; i++) {
                 if($scope.addressDetail[i].addressId==$localStorage.deliveryAddressId){
                  $scope.deliverHereAddress=$scope.addressDetail[i];
                  $localStorage.shippingPincode=$scope.addressDetail[i].pinCodeObj.pincodeNumber;
                  $localStorage.mobileNumberDelivery=$scope.addressDetail[i].mobileNo;
                  $cookies.put('delivarPaymentAddress',JSON.stringify($scope.addressDetail[i]));
                 }
                 if($scope.addressDetail[i].addressId==$localStorage.billingAddressId){
                  $scope.savingBillingAddress=$scope.addressDetail[i];
                  $cookies.put('billingPaymentAddress',JSON.stringify($scope.addressDetail[i]));
                 }
                  
                };


               $scope.removeDiv=$localStorage.deliveryAddressId //sessionService.get('deliveryAddressId')
               $scope.removeDivBilling=$localStorage.billingAddressId //sessionService.get('billingAddress')
               $('#imgLoaderDeliveryAddress').remove();
                //$('#deliveryAddressBlock').show();
               
              
              

               //flagDelivery=true;
          }
          else if(results.entitiesResponse==null){
            $scope.addressDetail="";
            $('#imgLoaderDeliveryAddress').remove();
            
          }
          
$scope.addNewBillingAddressReset=function(){
 // document.getElementById('addAddressBillingform').reset();
  $scope.billingFirstname="";
  $scope.billingLastname="";
  $scope.biilingAddress="";
  $scope.billingPincode="";
  $scope.landMark="";
  $scope.cityBillingName="";
  $scope.stateBillingName="";
  $scope.countryBillingName="";
  $scope.mobileBilling="";
//$scope.addAddressBillingform.$setPristine();

$('#add-new-billing-address').css('display','block');
$('#verifyPincodeBilling').hide();
$('#verifyPincodeDeliveryNotBillingA').hide();

}
$scope.addNewDeliveryAddressReset=function(){
  //document.getElementById('addAddressform').reset();
  $scope.firstname="";
  $scope.lastname="";
  $scope.addressAdding="";
  $scope.pincodeAdding="";
  $scope.addlandMark="";
  $scope.city="";
  $scope.state="";
  $scope.country="";
  $scope.mobile="";
$('#add-new-payment-address').css('display','block');
$('#verifyPincode').hide();
$('#verifyPincodeDeliveryNotDeliveryA').hide(); 
}

//Deliver Here
var deliveryAddress;
var flagDelivery;
$scope.deliverHere=function(addressData,counting){
  
  
     
     var formData=
      {
         "pincodeNumber":addressData.pinCodeObj.pincodeNumber
      };  
        
      addressService.CartVerifyPinCode(formData).success(function (results) 
      { 
         //$log.info("SUCCESS ---- "+API.URL1+API.verifyPinCodeUrl+" ---- response ---- "+JSON.stringify(results)+'---- PageName ----'+'{'+$location.path()+'}'+'---- SessionID ----'+$cookies.get('sessionID'));
        if(results.responseCode=="SUCCESS" && results.entitiesResponse!=null) 
        {
         // $log.info(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,API.BusinessUrl+API.verifyPinCodeUrl+contentSearchGenericUrl,results,formData));
          if(results.entitiesResponse['0']['baseDTO']['deliveryAvailable']==true)
          {
                $('#gobazaardeliveryaddress').attr('checked', false); // Unchecks it
                $('#billAddress').css('display','block');
                $localStorage.deliveryAddressId=addressData.addressId;
                $localStorage.shippingPincode=addressData.pinCodeObj.pincodeNumber;
                $localStorage.mobileNumberDelivery=addressData.mobileNo;
                $cookies.put('delivarPaymentAddress',JSON.stringify(addressData));
                deliveryAddress=addressData;
                $scope.deliverHereAddress=addressData;
                
                flagDelivery=false;
                

                $scope.CodOptionFlag=true;
                $scope.paymentOptionFlag=true;
                

                if(results.entitiesResponse['0']['baseDTO']['serviceability']==0){
                 $scope.paymentOptionFlag=false;
                  
                  //$('#gobazaarpaymentonline').prop('checked',false);

                  
                 }

                else if(results.entitiesResponse['0']['baseDTO']['serviceability']==1){
                  $scope.CodOptionFlag=false;

                }

                
          } 
          else
          {   
              //$scope.CodOptionFlag=false;
              //$scope.paymentOptionFlag=false;
              if($scope.CodOptionFlag==false && $scope.paymentOptionFlag==false){
                $('#dMessage').html('');
              }
              $log.error(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,API.BusinessUrl+API.verifyPinCodeUrl+contentSearchGenericUrl,results,""));
              $('#deliveryMessage'+counting).html('Delivery not available at this pincode');
              $('#deliveryMessage'+counting).show();

          }

        }else{
          //$log.error(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,API.BusinessUrl+API.verifyPinCodeUrl+contentSearchGenericUrl,results,formData));
        }
       
      }).
      error(function (data,status,header,config)
      {
       // $log.error(makeUiLog($cookies.get('sessionID'),$location.path(),status,API.BusinessUrl+API.verifyPinCodeUrl+contentSearchGenericUrl,data,formData));
      })

   

}
    
    $scope.saveBillingAddress=function(addressData,addressId){
// $cookies.put('deliveryAddress',addressData);
  //deliveryAddress=addressData;
  //console.log('addId: '+addressData.addressId);
  

  $scope.savingBillingAddress=addressData;

  //sessionService.set('billingAddress',addressData.addressId);
  $cookies.put('billingPaymentAddress',JSON.stringify(addressData));

  //console.log($scope.savingBillingAddress.firstName);
  //$('#billingAddressOptions').css('display','none');

  $localStorage.billingAddressId=$scope.savingBillingAddress.addressId;
  
  $scope.fetchDeliveryAddress();
  


}

$scope.flagSameAsDelivery=false;
$scope.sameAsDeliveryAddress=function(){
  $scope.flagSameAsDelivery=true;
  $scope.deliveryAddress=deliveryAddress;
  //sessionService.set('billingAddress',$scope.deliveryAddress.addressId);
  $localStorage.billingAddressId=$scope.deliveryAddress.addressId


  //sessionService.set('billingAddress',$scope.deliveryAddress.addressId);


  if($('input[name="gobazaardeliveryaddress"]').is(":checked")) {
     $scope.flagSameAsDelivery=true;
     $('#openOrderSummery').css('display','block');
     $('#orderSummaryDisabled').css('display','none');
     $('#addNewBillingAddress').css('display','none');
     //$('#billingNewAddress').removeClass('payment-before-icon').addClass('payment-confirm-icon');

  } 
  else 
  {
     $scope.flagSameAsDelivery=false;
    // $('#billingAddressOptions'+$scope.deliveryAddress.addressId).css('display','none');
     $('#billingAddress').css('display','block');
      $('#openOrderSummery').css('display','none');
     $('#orderSummaryDisabled').css('display','none');
     $('#addNewBillingAddress').css('display','block');
     //$('#billingNewAddress').removeClass('payment-confirm-icon').addClass('payment-before-icon');
  }
  
}


$scope.addAddressAtPayment=function(firstname,lastname,address,pincode,landMark,cityName,stateName,countryName,mobile,addressType){

if(typeof(addressType)=='undefined') 
{
   actualAddressType='permanent'
} 
if(addressType=='shipping') {
   actualAddressType='shipping'
}
if(addressType=='billing') {
   actualAddressType='billing'
}

//ADDRESS ADDED
         var formData=[
                {
                   
                    "customerId": $rootScope.customerId,
                    "addressType": actualAddressType,
                    "mobileNo": mobile,
                    "landmark": landMark,
                    "title": "Mr",
                    "firstName": firstname,
                    "lastName": lastname,
                    "address": address,
                    "status": "ACTIVE",
                    "pinCodeObj": {
                    "pincodeNumber": pincode
                    }
                }
              ]
        

//ADDRESS ADDED

        
          addressService.addDeliveryAddress(formData).success(function (results) {
            $('#addAddressButton').prop('disabled',true);
           //$log.info("SUCCESS ---- "+addressUrl+" ---- response ---- "+JSON.stringify(results)+'---- PageName ----'+'{'+$location.path()+'}'+'---- SessionID ----'+$cookies.get('sessionID'));
           if(results.responseCode=="SUCCESS"){
              //$log.info(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,addressUrl,results,formData));
                if(actualAddressType=='permanent')
                {
                //alert("Address Added");
                 $('#add-new-address').prop('disabled', false);
                /* $('body').removeClass('modal-open');
                   $('#login').removeClass('in');*/
                 $('#add-new-address').attr("aria-hidden", true);

               //  $('#downloadApp').removeClass('in');
               //  $('.modal-backdrop').removeClass('in');
                 $('#add-new-address').css("display", "none");
                 $('.modal-backdrop').css("display", "none");
                  $('body').removeClass('modal-open');
                  $('body').css("padding-right","");
                }

                if(actualAddressType=='shipping')
                {
                //alert("Address Added");
                 $('#add-new-payment-address').prop('disabled', false);
                /* $('body').removeClass('modal-open');
                   $('#login').removeClass('in');*/
                 $('#add-new-payment-address').attr("aria-hidden", true);

               //  $('#downloadApp').removeClass('in');
               //  $('.modal-backdrop').removeClass('in');
                 $('#add-new-payment-address').css("display", "none");
                 $('.modal-backdrop').css("display", "none");
                  $('body').removeClass('modal-open');
                  $('body').css("padding-right","");

                  $("#addAddressform").trigger('reset');
                }


                if(actualAddressType=='billing')
                {
                //alert("Address Added");
                 $('#add-new-billing-address').prop('disabled', false);
                /* $('body').removeClass('modal-open');
                   $('#login').removeClass('in');*/
                 $('#add-new-billing-address').attr("aria-hidden", true);

               //  $('#downloadApp').removeClass('in');
               //  $('.modal-backdrop').removeClass('in');
                 $('#add-new-billing-address').css("display", "none");
                 $('.modal-backdrop').css("display", "none");
                  $('body').removeClass('modal-open');
                  $('body').css("padding-right","");
                }  

                $("#addAddressBillingform").trigger('reset'); //jquery
                 
                  flagDelivery=false;
                  $scope.fetchDeliveryAddress();
                  //window.location.href=$location.path()
                  /*$('#deliverAddressOptions').css('display','none');
                  $('#deliverAddressOptions').css('display','block');*/
                $('#addAddressButton').prop('disabled',false);
           }else{
                $('#addAddressButton').prop('disabled',false);
                $log.error(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,addressUrl,results,formData));
           }
         }).error(function (data,status,header,config)
                {
                // $log.error(makeUiLog($cookies.get('sessionID'),$location.path(),status,addressUrl,data,""));
                 $('#addAddressButton').prop('disabled',false);
                });

}


	//pincode verification
$scope.verifyPinCodeAtCheckout=function(pincode,mode)
{  
        
       var formData=
       {
        pincodeNumber:pincode
    };
    
    //$scope.addressform.$invalid=false;

    addressService.userVerifyPinCode(formData).success(function (results) 
    {
      //$log.info("SUCCESS ---- "+API.URL1+API.verifyPinCodeUrl+" ---- response ---- "+JSON.stringify(results)+'---- PageName ----'+'{'+$location.path()+'}'+'---- SessionID ----'+$cookies.get('sessionID'));
       if(results.responseCode=="SUCCESS" &&  results.entitiesResponse!=null && results.entitiesResponse['0']['baseDTO']['deliveryAvailable']==true) 
       { 
        //$log.info(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,API.BusinessUrl+API.verifyPinCodeUrl+contentSearchGenericUrl,results,formData));
         $('#verifyPincode').hide();
         $('#verifyPincode1').hide();
         $('#verifyPincodeBilling').hide();
         $('#verifyPincode2').hide();
         $('#verifyPincodeBilling').hide();
         $('#verifyPincodeDeliveryNotBillingE').hide(); 
         $('#verifyPincodeDeliveryNotDeliveryE').hide(); 
         $('#verifyPincodeDeliveryNotBillingA').hide();
         $('#verifyPincodeDeliveryNotDeliveryA').hide(); 
        /*$('#verifyPincode').hide();
          $('#verifyPincodeBilling').hide(); 
          $('#pincodeStatus').text($rootScope.validPincode);
          $('#pincodeEditStatus4').text($rootScope.validPincode);
          $('#pincodeStatus2').text($rootScope.validPincode);
          $('#pincodeEditStatus3').text('');
          $('#pincodeEditStatus').text($rootScope.validPincode);*/
          
          $scope.pincodeDetails=results.entitiesResponse['0']['baseDTO'];

          $scope.pincodeData=$scope.pincodeDetails.pinCodeId
          $scope.editAddressCity=$scope.pincodeDetails.city.cityName
          $scope.editAddressState=$scope.pincodeDetails.state.stateName
          $scope.editAddressCountry=$scope.pincodeDetails.country.countryname
         
          /*$('#cityName').val($scope.pincodeDetails.city.cityName);
          $('#stateName').val($scope.pincodeDetails.state.stateName);
          $('#countryName').val($scope.pincodeDetails.country.countryname);*/
          $scope.city=$scope.pincodeDetails.city.cityName
          $scope.state=$scope.pincodeDetails.state.stateName
          $scope.country=$scope.pincodeDetails.country.countryname
          $scope.validPinShip=pincode


          //$('#pincodeBillingData').val($scope.pincodeDetails.pinCodeId)
         /* $('#cityBillingName').val($scope.pincodeDetails.city.cityName);
          $('#stateBillingName').val($scope.pincodeDetails.state.stateName);
          $('#countryBillingName').val($scope.pincodeDetails.country.countryname);*/
          $scope.cityBillingName=$scope.pincodeDetails.city.cityName
          $scope.stateBillingName=$scope.pincodeDetails.state.stateName
          $scope.countryBillingName=$scope.pincodeDetails.country.countryname
          $scope.validPinBill=pincode

          $scope.pincodeBillingData=$scope.pincodeDetails.pinCodeId;
          $scope.editBillingAddressCity=$scope.pincodeDetails.city.cityName
          $scope.editBillingAddressState=$scope.pincodeDetails.state.stateName
          $scope.editBillingAddressCountry=$scope.pincodeDetails.country.countryname

         /* $('#editBillingAddressCity').val($scope.pincodeDetails.city.cityName);
          $('#editBillingAddressState').val($scope.pincodeDetails.state.stateName);
          $('#editBillingAddressCountry').val($scope.pincodeDetails.country.countryname);
*/


      }
      else if(results.entitiesResponse!=null && results.entitiesResponse['0']['baseDTO']['deliveryAvailable']==false){

         if(mode=='edit')
          {
               //$('#pincodeEditStatus').text($rootScope.invalidPincode);
              //$('#verifyPincode').show(); 
              
              $('#verifyPincodeDeliveryNotBillingE').show(); 
              $('#verifyPincodeDeliveryNotDeliveryE').show();
              $('#verifyPincode1').hide(); 
              $('#verifyPincode2').hide();
              //$('#verifyPincodeBilling').show();

              
              
               $scope.pincodeData="";
               $scope.editAddressCity="";
               $scope.editAddressState="";
               $scope.editAddressCountry="";

               $scope.pincodeBillingData="";
               $scope.editBillingAddressCity="";
               $scope.editBillingAddressState="";
               $scope.editBillingAddressCountry="";

               
          }
          else if(mode=='add')
          {
              //$('#pincodeStatus').text($rootScope.invalidPincode);
             $('#verifyPincode').hide();
             $('#verifyPincodeBilling').hide();
             $('#verifyPincodeDeliveryNotBillingA').show();
             $('#verifyPincodeDeliveryNotDeliveryA').show(); 
              $scope.validPinShip="";
                $scope.city="";
                $scope.state="";
                $scope.country="";


             
           $scope.cityBillingName="";
          $scope.stateBillingName="";
          $scope.countryBillingName="";
          $scope.validPinBill="";
          }  
         /* $('#verifyPincode').show();
          $('#pincode').val('');
          $('#verifyPincode1').show(); 
          $('#verifyPincodeBilling').show(); 
          $('#pincodeStatus2').hide();
          $('#billingPincode').val('');  
*/        window.setTimeout(function(){
            $('body').addClass('modal-open');
          },500);
         
      }
      else
      {
          
          if(mode=='edit')
          {
               //$('#pincodeEditStatus').text($rootScope.invalidPincode);
              //$('#verifyPincode').show(); 
              $('#verifyPincode1').show(); 
              $('#verifyPincode2').show();
              $('#verifyPincodeDeliveryNotBillingE').hide(); 
              $('#verifyPincodeDeliveryNotDeliveryE').hide(); 
              //$('#verifyPincodeBilling').show();

              
              
               $scope.pincodeData="";
               $scope.editAddressCity="";
               $scope.editAddressState="";
               $scope.editAddressCountry="";

               $scope.pincodeBillingData="";
               $scope.editBillingAddressCity="";
               $scope.editBillingAddressState="";
               $scope.editBillingAddressCountry="";

               
          }
          else if(mode=='add')
          {
              //$('#pincodeStatus').text($rootScope.invalidPincode);
              $('#verifyPincode').show();
              $scope.validPinShip="";
                $scope.city="";
                $scope.state="";
                $scope.country="";


             $('#verifyPincodeBilling').show();
             $('#verifyPincodeDeliveryNotBillingA').hide();
             $('#verifyPincodeDeliveryNotDeliveryA').hide(); 
           $scope.cityBillingName="";
          $scope.stateBillingName="";
          $scope.countryBillingName="";
          $scope.validPinBill="";
          }  
         /* $('#verifyPincode').show();
          $('#pincode').val('');
          $('#verifyPincode1').show(); 
          $('#verifyPincodeBilling').show(); 
          $('#pincodeStatus2').hide();
          $('#billingPincode').val('');  
*/        window.setTimeout(function(){
            $('body').addClass('modal-open');
          },500);
          
          
      }
		
	  window.setTimeout(function(){
            $('body').addClass('modal-open');
          },500);
  }).
    error(function (data,status,header,config)
    {
      //$log.error(makeUiLog($cookies.get('sessionID'),$location.path(),status,API.BusinessUrl+API.verifyPinCodeUrl+contentSearchGenericUrl,data,formData));
    })

};

  });
