'use strict';

/**
 * @ngdoc function
 * @name gobzrliteApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the gobzrliteApp
 */
angular.module('gobzrliteApp')
  .controller('RegisterCtrl', function (registerService,$scope,$rootScope,$cookies,$location) {

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
         password:$scope.registerPassword,
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
          password:$scope.registerPassword,
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
      custId=$rootScope.customerId;
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

         $cookies.put('_GBUI',JSON.stringify(results.entitiesResponse['0']['baseDTO']))
         /*var encryptedcustomerId = $crypto.encrypt(results.entitiesResponse['0']['baseDTO'].customerId.toString());
         var encryptedcustomerEmailId = $crypto.encrypt(results.entitiesResponse['0']['baseDTO'].emailId.toString());
         var encryptedcustomerloginSource = $crypto.encrypt(JSON.stringify(results.entitiesResponse['0']['baseDTO'].loginSource));*/
         $cookies.put('customerId',results.entitiesResponse['0']['baseDTO'].customerId.toString(), {'expires': $rootScope.expireDate},{domain: $rootScope.mydomain});
         $cookies.put('emailId',results.entitiesResponse['0']['baseDTO'].emailId.toString(), {'expires': $rootScope.expireDate},{domain: $rootScope.mydomain});
         //$cookies.put('mobileNumber',encryptedcustomerMobileNumber, {'expires': $rootScope.expireDate},{domain: $rootScope.mydomain});
         $cookies.put('loginSource',JSON.stringify(results.entitiesResponse['0']['baseDTO'].loginSource), {'expires': $rootScope.expireDate},{domain: $rootScope.mydomain});
         

         if(typeof(results.entitiesResponse['0']['baseDTO'].mobileNumber)!='undefined'){
             //var encryptedcustomerMobileNumber = $crypto.encrypt(results.entitiesResponse['0']['baseDTO'].mobileNumber.toString());
             $cookies.put('mobileNumber',results.entitiesResponse['0']['baseDTO'].mobileNumber.toString(), {'expires': $rootScope.expireDate},{domain: $rootScope.mydomain});
         }
         if(typeof(results.entitiesResponse['0']['baseDTO'].alternateMobileNumber)!='undefined'){
             //var encryptedcustomeralternateMobileNumber = $crypto.encrypt(results.entitiesResponse['0']['baseDTO'].alternateMobileNumber.toString());
             $cookies.put('alternateMobileNumber',results.entitiesResponse['0']['baseDTO'].alternateMobileNumber.toString(), {'expires': $rootScope.expireDate},{domain: $rootScope.mydomain});
         }
        
         if(results.entitiesResponse['0']['baseDTO'].imageName=='' || results.entitiesResponse['0']['baseDTO'].imageName==null ||  results.entitiesResponse['0']['baseDTO'].imageName==undefined)
         { 
          $cookies.put('imageName','', {'expires': $rootScope.expireDate});
         }
         else
         { 
          //var encryptedcustomerImageName = $crypto.encrypt(results.entitiesResponse['0']['baseDTO'].imageName.toString());
          $cookies.put('imageName',results.entitiesResponse['0']['baseDTO'].imageName.toString(), {'expires': $rootScope.expireDate},{domain: $rootScope.mydomain})
         }
         if(results.entitiesResponse['0']['baseDTO'].firstName=='' || results.entitiesResponse['0']['baseDTO'].firstName==null || results.entitiesResponse['0']['baseDTO'].firstName==undefined)
         {    
             $cookies.put('firstName','', {'expires': $rootScope.expireDate});
         }
         else
         { 
            //var encryptedcustomerfirstName = $crypto.encrypt(results.entitiesResponse['0']['baseDTO'].firstName.toString());
            $cookies.put('firstName',results.entitiesResponse['0']['baseDTO'].firstName.toString(), {'expires': $rootScope.expireDate},{domain: $rootScope.mydomain});
         }

        if(results.entitiesResponse['0']['baseDTO'].lastName=='' || results.entitiesResponse['0']['baseDTO'].lastName==null || results.entitiesResponse['0']['baseDTO'].lastName==undefined)
        {    
            $cookies.put('lastName','', {'expires': $rootScope.expireDate});
        }
        else
        {  
            //var encryptedcustomerlastName = $crypto.encrypt(results.entitiesResponse['0']['baseDTO'].lastName.toString());
            $cookies.put('lastName',results.entitiesResponse['0']['baseDTO'].lastName.toString(), {'expires': $rootScope.expireDate},{domain: $rootScope.mydomain});
        }
        
        if(typeof(results.entitiesResponse['0']['baseDTO'].dateOfBirth)!='undefined'){
          //var encryptedDateOfBirth = $crypto.encrypt(results.entitiesResponse['0']['baseDTO'].dateOfBirth.toString());
          //var encryptedStrDateOfBirth = $crypto.encrypt(results.entitiesResponse['0']['baseDTO'].dateOfBirth.toString());
          $cookies.put('dateOfBirth',results.entitiesResponse['0']['baseDTO'].dateOfBirth.toString(), {'expires': $rootScope.expireDate},{domain: $rootScope.mydomain});
          $cookies.put('strDateOfBirth',results.entitiesResponse['0']['baseDTO'].dateOfBirth.toString(), {'expires': $rootScope.expireDate});
        }
        if(typeof(results.entitiesResponse['0']['baseDTO'].anniverseryDate)!='undefined'){
            //var encryptedAnniverseryDate = $crypto.encrypt(results.entitiesResponse['0']['baseDTO'].anniverseryDate.toString());
            //var encryptedStrAnniverseryDate = $crypto.encrypt(results.entitiesResponse['0']['baseDTO'].anniverseryDate.toString());
            $cookies.put('anniverseryDate',results.entitiesResponse['0']['baseDTO'].anniverseryDate.toString(), {'expires': $rootScope.expireDate},{domain: $rootScope.mydomain});
            $cookies.put('strAnniverseryDate',results.entitiesResponse['0']['baseDTO'].anniverseryDate.toString(), {'expires': $rootScope.expireDate});
        }
        if(typeof(results.entitiesResponse['0']['baseDTO'].maritalStatus)!='undefined'){
            //var encryptedMaritalStatus = $crypto.encrypt(results.entitiesResponse['0']['baseDTO'].maritalStatus.toString());
            $cookies.put('maritalStatus',results.entitiesResponse['0']['baseDTO'].maritalStatus.toString(), {'expires': $rootScope.expireDate},{domain: $rootScope.mydomain}); 
        }
        
        if(typeof(results.entitiesResponse['0']['baseDTO'].gender)!='undefined'){
             //var encryptedGender = $crypto.encrypt(results.entitiesResponse['0']['baseDTO'].gender.toString());
             $cookies.put('gender',results.entitiesResponse['0']['baseDTO'].gender.toString(), {'expires': $rootScope.expireDate},{domain: $rootScope.mydomain});
        }
        
        if(typeof(results.entitiesResponse['0']['baseDTO'].flag)!='undefined'){

            // var encryptedFlag = $crypto.encrypt(results.entitiesResponse['0']['baseDTO'].flag.toString());
             $cookies.put('flag',results.entitiesResponse['0']['baseDTO'].flag.toString(), {'expires': $rootScope.expireDate},{domain: $rootScope.mydomain});
        
        }  
     /***************/

          $('#varifyWindow').css("display", "none");
          $('#logoutchangePassword').css("display", "block");
          $('.giftTopConIcon').css("display", "block");

          //$localStorage.loginStatus=true;

          //$rootScope.loginStatus=true;


          if(results.entitiesResponse['0']['baseDTO'].firstName=='undefined' || results.entitiesResponse['0']['baseDTO'].firstName==null ){

              $("#welcome").html('Hi '+$rootScope.customerEmail);
          }
          else{

           $("#welcome").html('Hi '+$rootScope.customerFirstName);
       }
       /*$('.modal-backdrop').removeClass('in');
       $("#loginRegister").css("display", "none");
       $('.modal-backdrop').css("display", "none");*/
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
