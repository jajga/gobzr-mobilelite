'use strict';

/**
 * @ngdoc function
 * @name gobzrliteApp.controller:PaymentCtrl
 * @description
 * # PaymentCtrl
 * Controller of the gobzrliteApp
 */
angular.module('gobzrliteApp')
  .controller('PaymentCtrl', function ($scope,$cookies,$localStorage,$rootScope,paymentService,orderService) {
   
    //SendOTP
$scope.sendOtpCOD=function(){
   /*dataLayer.push({
      'event': 'checkout',
      'ecommerce': {
        'checkout': {
              'actionField': {'step': 1, 'option': 'COD'},
              'products': $rootScope.gtmCheckoutProductArry
       }
      },
      'eventCallback': function() {
        //document.location = 'checkout.html';
      }
   });*/
  $('#imgLoaderOTP').show();
  $('#resendOtpSuccessMsg').hide();
  $('#resendOtpSuccessMsg1').hide();
  $('#resendOtpFailMsg').hide();
  $('#resendOtpFailMsg1').hide();
  $scope.flagOtpInvalid=false;
  $cookies.put('pgGatewayType', 'cod');
  //$localStorage.setItem('pgGatewayType', 'cod');
  $('#imgLoaderMP').css('display','block');
  //$localStorage.pgGatewayType='cod'
//alert($('#voucherCode').val())

if($cookies.get('mobileNumber')==undefined){
    var customerMobibleNumber=$localStorage.mobileNumberDelivery
} else {

   var customerMobibleNumber=$rootScope.customerMobileNumber
}
  var formData={
    "customerId":parseInt($cookies.get('customerId')),
    "mobileNo":9871744225,
    "verificationId":$cookies.get('orderId'),
    "otpType":"order"
    }

 
          paymentService.postSendOtpPayment(formData).success(function (results) {
           //$log.info("SUCCESS ---- "+sendOtpUrl+" ---- response ---- "+JSON.stringify(results)+'---- PageName ----'+'{'+$location.path()+'}'+'---- SessionID ----'+$cookies.get('sessionID'));
           if(results.responseCode=="SUCCESS" && results.message=="OTP sent successfully"){
            //  $log.info(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,sendOtpUrl,results,formData)); 
              $('#imgLoaderMP').css('display','none');
              $('#sendOtp').hide()  
              $('#makePaymentConfirm').show();
              $('.payment-cod-gateway').show()
              $('.pay_using_cash').hide();
              $('#codOtp').css('display','block');
              $('#imgLoaderOTP').hide();
              $('#resendOtpSuccessMsg').show();
              $('#resendOtpSuccessMsg1').show();
           }
           else{
           // $log.error(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,sendOtpUrl,results,formData)); 
            $('#imgLoaderOTP').hide();
            $('#resendOtpSuccessMsg').hide();
            $('#resendOtpSuccessMsg1').hide();
            $('#resendOtpFailMsg').show();
            $('#resendOtpFailMsg1').show();
           }
         }).error(function (data,status,header,config)
                {
                 // $log.error(makeUiLog($cookies.get('sessionID'),$location.path(),status,sendOtpUrl,data,formData)); 
                });
}

  $scope.enableConfirm=function(){
  if($('#validateInputID').val()=='' || $('#validateInputID').val()==undefined || $('#validateInputID').val()=='undefined' || $('#validateInputID').val() ==null){
    $('#confirmPayment').prop('disabled', true);
  }else{
    $('#confirmPayment').prop('disabled', false);
  }
  };




/*VALIDATE OTP AND UPDATE ORDER*/
$scope.confirmPaymentByCOD= function(otpEntered){
  $('#imgLoaderOTP').show();
  $('#resendOtpSuccessMsg').hide();
  $('#resendOtpSuccessMsg1').hide();
  $('#resendOtpFailMsg').hide();
  $('#resendOtpFailMsg1').hide();

//ValidateOTP
  var formData={
    "customerId":$rootScope.customerId,
    "mobileNo":/*$localStorage.mobileNumberDelivery*/9871744225, //sessionService.get('mobileNumberDelivery'),
    "otp":otpEntered,
    "verificationId":$cookies.get('orderId'),
    "otpType":"order"
    }  


if($cookies.get('voucherCode')=="null" || $cookies.get('voucherCode')==undefined || $cookies.get('voucherCode')==null){
  var voucherCode = null;
}
else{
  var voucherCode = $cookies.get('voucherCode');
}

if($cookies.get('mobileNumber')==undefined){
    var customerMobibleNumber=$localStorage.mobileNumberBilling
} else {

   var customerMobibleNumber=$rootScope.customerMobileNumber
}

var makePayment={
    "customerId":parseInt($rootScope.customerId),
    "orderId": parseInt($cookies.get('orderId')),
    "sessionId": $cookies.get('sessionID'),
    "mobileNumber": customerMobibleNumber,
    "orderAddressId": {
        "addressId":parseInt($localStorage.billingAddressId) //parseInt(sessionService.get('billingAddress'))
    },
    "storedCreditUsed": null,  
    "voucherCode": voucherCode,
    "paymentGateway": {
        "gatewayId": 7
    },
    "shippingAddressId": {
        "addressId": parseInt($localStorage.deliveryAddressId) //parseInt(sessionService.get('deliveryAddressId'))
    },
    "paymentDetail":{
    "transactionRef":'COD',
    "transactionStatus":"SUCCESS"
    },
    "pinCode":$localStorage.shippingPincode //sessionService.get('shippingPincode')
}

   



          paymentService.postValidateOtpPayment(formData).success(function (results) {
            //$log.info("SUCCESS ---- "+validateOtpUrl+" ---- response ---- "+JSON.stringify(results)+'---- PageName ----'+'{'+$location.path()+'}'+'---- SessionID ----'+$cookies.get('sessionID'));
           if(results.responseCode=="SUCCESS"){
              //$log.info(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,validateOtpUrl,results,formData)); 
              if(results.message=="OTP verified successfully"){
                //$('#imgLoaderOTP').css('display','none');
                $scope.flagOtpInvalid=false;
                //var updateOrderStatusUrl=API.BusinessUrl+'order/'+API.updateOrderStatusUrl 
                orderService.updateOrderStatus(makePayment).success(function (results) {
                
                 if(results.responseCode=="SUCCESS" && results.entitiesResponse['0']['baseDTO'].estimatedDeliveryTime!=0){ 
                    //$log.info(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,updateOrderStatusUrl+contentSearchGenericUrl,results,makePayment));
                        $cookies.put('orderId',null, {'expires': $rootScope.expireDate},{domain: $rootScope.mydomain});
                        $cookies.put('orderAmount',null, {'expires': $rootScope.expireDate},{domain: $rootScope.mydomain});
                        $cookies.put('voucherCode',null);
                        $cookies.put('paymentFlag',"true");
                        //$log.info("SUCCESS ---- "+updateOrderStatusUrl+" ---- response ---- "+JSON.stringify(results)+'---- PageName ----'+'{'+$location.path()+'}'+'---- SessionID ----'+$cookies.get('sessionID'));
                        /*var url=API.BusinessUrl+API.deletecart+$cookies.get('cartId')
                         homeService.deleteCart(url).success(function (results) {
                          //console.log(results)
                          //$log.info("SUCCESS ---- "+url+" ---- response ---- "+JSON.stringify(results)+'---- PageName ----'+'{'+$location.path()+'}'+'---- SessionID ----'+$cookies.get('sessionID'));
                           $log.info(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,url,results,""));
                         });*/
                           $('#proUnavail').modal("show");
                              $('#textInPopUp').text('Payment successfully done. Thank You!');
                              $('#textInPopUp').css('color',"green");
                               window.setTimeout(function(){
                                 $('#proUnavail').modal('hide');
                              }, 3000);
                          $('#imgLoaderOTP').css('display','none');
                          window.location.href="/Confirmation"
                          //window.location.href="/product-by-category/1/comingsoon"

                          
                 }else{
                 
                    window.location.href="/transation-faliure"
                    $log.error(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,updateOrderStatusUrl+contentSearchGenericUrl,results,makePayment));
                 } 

                 })
                .error(function (data,status,header,config)
                {
                 // $log.error(makeUiLog($cookies.get('sessionID'),$location.path(),status,updateOrderStatusUrl+contentSearchGenericUrl,data,makePayment));
                  //$log.error(" status "+status+" header "+header+" config "+JSON.stringify(config));
                });

  
              }
              else{
                $scope.flagOtpInvalid=true;
                $('#imgLoaderOTP').css('display','none');
               // window.location = "/gobazaar/#/thankyoupage";
              }
           }else{
            $log.error(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,validateOtpUrl,results,formData)); 
           }
         }).error(function (data,status,header,config)
                {
                  $log.error(makeUiLog($cookies.get('sessionID'),$location.path(),status,validateOtpUrl,data,formData)); 
                });

}




  
  });
