'use strict';

/**
 * @ngdoc function
 * @name gobzrliteApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the gobzrliteApp
 */
angular.module('gobzrliteApp')
  .controller('RegisterCtrl', function (registerService,$scope,$rootScope,$cookies,$location,md5) {

  $scope.register=function(){
    if($('#t_and_c').is(":checked")==false){   
      $('#termErr').css('display','block');
     }else{
      var formData;
        formData={
          emailId: $scope.registerEmail,
          gender:  ($scope.registerGender=='')?'':$scope.registerGender,
          loginSource:
          {
             "loginType": "gobazaar"
         },
         password:md5.createHash($scope.registerPassword),
         mobileNumber:$scope.registerMobile,
         firstName:$scope.firstname,
         lastName:$scope.lastname,
         registrationEmailSend:"No"
        };

      console.log(JSON.stringify(formData));
      $('#rLoading').css('display','block');
      registerService.registerCustomer(formData).success(function (results) {
      if(results.responseCode=="SUCCESS") 
      {   
        $scope.saveDetails();
        if(results.message == "Customer registered successfully")
          {    
             window.location.href="/verify";
             $('#rLoading').css('display','none'); 
          }

          else if(results.message ==  "Customer already registered with the given Email-Id")  
          {
            $scope.invalidRegisterMsg1=true;
            $scope.msgTxt4="Customer already registered with the given Email-Id.";
            $('#rLoading').css('display','none');
            $('#termErr').hide();
            $scope.registrationform.$setPristine();
                        
          }
          else if(results.errorMessage ==  "duplicate mobile number")  
          {
            $scope.invalidRegisterMsg1=true;
            $scope.msgTxt4="Customer already registered with this mobile number";
            $('#rLoading').css('display','none');
            $('#termErr').hide();
            $scope.registrationform.$setPristine();
          }

          else
          {
            $scope.invalidRegisterMsg2=true;
            $scope.msgTxt5="Customer Cannot be register With same mobile no or email.";
            $('#invalidRegisterMsg1').hide();
            $('#termErr').hide();
            $scope.registrationform.$setPristine();
          } 
      }
      else
      {
        $scope.invalidRegisterMsg2=true;
        $scope.msgTxt5="Customer Cannot be register.";
        $('#invalidRegisterMsg1').hide();
        $('#rLoading').css('display','none');
        $('#termErr').hide();
        $scope.registrationform.$setPristine();
       }

      }).error(function (e){
         $scope.serverError=true;
         $scope.internalServerError=errorMessage.internalServerError;
         console.log('Service Failure');
      });
     }
  };

  $scope.saveDetails=function(){
    var obj = {
        UserDetails: {
          email: $scope.registerEmail,
          password:md5.createHash($scope.registerPassword),
          mobile: $scope.registerMobile,
          firstname:$scope.firstname,
          lastname:$scope.lastname,
          gender:$scope.registerGender
        }
      };
     var userObj = JSON.stringify(obj)
     $cookies.put('UserRegisterDetails', userObj);
     console.log($cookies.get('UserRegisterDetails'));
  };

  $scope.showRegisterErr= function(){
    $('.validation').show();
     $('#genderSelect').show();
      $('#passErr').show();
     if($('#t_and_c').is(":checked")==false){
    $('#termErr').show();
    }
  };

  $scope.returnFromTermsAndCondition=function(request){
   console.log(request);
    if(request==1)
    {
        $('#t_and_c').prop('checked', true);
        var obj2 = $cookies.get('UserRegisterDetails');
        var test = JSON.parse(obj2);
        test.UserDetails.acceptTerms = true;
        $cookies.put('UserRegisterDetails', JSON.stringify(test));
        console.log($cookies.getObject('UserRegisterDetails'));
        console.log('type of '+typeof($cookies.get('UserRegisterDetails')));
        window.location.href="/signUp";

    }
    if(request==2)
    {
        $('#t_and_c').prop('checked', false);
        var obj2 = $cookies.get('UserRegisterDetails');
        var test = JSON.parse(obj2);
        test.UserDetails.acceptTerms = false;
        $cookies.put('UserRegisterDetails', JSON.stringify(test));
        window.location.href="/signUp";
    }   
  };

  if($location.path()=='/signUp'){
    console.log($cookies.get('UserRegisterDetails'));
   if($cookies.get('UserRegisterDetails') =='undefined' || $cookies.get('UserRegisterDetails') =='' || $cookies.get('UserRegisterDetails')== null || $cookies.get('UserRegisterDetails') ==undefined){
   }
   else{
         var detail = JSON.parse($cookies.get('UserRegisterDetails'));
         console.log(detail.UserDetails);
         $scope.registerEmail=detail.UserDetails.email;
         $scope.registerMobile=detail.UserDetails.mobile;
         $scope.firstname=detail.UserDetails.firstname;
         $scope.lastname=detail.UserDetails.lastname;
         $scope.registerGender=detail.UserDetails.gender;
         
         if(detail.UserDetails.acceptTerms == true){
          $('#t_and_c').prop('checked', true);
         }else{
          $('#t_and_c').prop('checked', false);
         }
         //console.log('email : '+$scope.registerEmail);
       }
  };

  $scope.checkBox=function(param){
      if(param == 3){
        $('#termErr').hide();
      }
    };


  //Method used for resending of user verification code.
  $scope.resendVerifyCode=function(){
    registerService.userResendVerifyCode($('#emailverification').val()).success(function (results) {    
      if(results.responseCode=="SUCCESS"){ 
        $('#resendVerifyCodeSuccessMsg').show();
        $('#resendVerifyCodeSuccessMsg1').hide();
        $('#resendVerifyCodeFailMsg').hide();
      }else{
        $scope.resendVerifyCodeMsgFail=results.message;
        $('#resendVerifyCodeFailMsg').show();
        $('#resendVerifyCodeSuccessMsg').hide();
        $('#resendVerifyCodeSuccessMsg1').hide();
        
      }
    });
  };


    if($location.path()=='/verify'){
      if($cookies.get('UserRegisterDetails') =='undefined' || $cookies.get('UserRegisterDetails') =='' || $cookies.get('UserRegisterDetails')== null || $cookies.get('UserRegisterDetails') ==undefined){
       }
      else{
      var details1= JSON.parse($cookies.get('UserRegisterDetails'));
      console.log(details1.UserDetails.email);
      $scope.email=details1.UserDetails.email;
      $('#emailverification').val(details1.UserDetails.email);
      //$('#getpwd').val(details1.UserDetails.password);
      }
    };

    $scope.verifyCustomer=function(){
    $('#waitVerify').show();
    var custId;   
    if(typeof($cookies.get('customerId'))=='undefined'){
      custId=null;
    }else{
      custId=$cookies.get('customerId');
    }
    
    var formData={
      customerId: custId,
      emailId: $('#emailverification').val(), //$scope.email
      verificationCode:$scope.verifycustomer
    };
    registerService.verifyCustomer(formData).success(function (results) {
              
      if(results.responseCode=="SUCCESS" && results.entitiesResponse!=null)
      {
        $('#otpValid').text('');
        $('#waitVerify').hide();

        /*Set Cookie on Register Login*/
         $cookies.put('useData',JSON.stringify(results.entitiesResponse['0']['baseDTO']));
         console.log($cookies.get('useData'));
         $cookies.put('customerId',results.entitiesResponse['0']['baseDTO'].customerId.toString(), {'expires': $rootScope.expireDate},{domain: $rootScope.mydomain});
         $cookies.put('emailId',results.entitiesResponse['0']['baseDTO'].emailId.toString(), {'expires': $rootScope.expireDate},{domain: $rootScope.mydomain});
        
       window.location.href='/';
   }
   else if(results.responseCode=="SUCCESS" && results.entitiesResponse==null){
    $('#waitVerify').hide();
    $scope.verifyform.$setPristine();
    $('#otpValid').text('Invalid verification code');
    $('#otpValid').css('display','block');
    
   }
   else{
    $('#waitVerify').hide();
   }

});
};



});
