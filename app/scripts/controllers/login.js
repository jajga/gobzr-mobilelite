'use strict';

/**
 * @ngdoc function
 * @name gobzrliteApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the gobzrliteApp
 */
angular.module('gobzrliteApp')
  .controller('LoginCtrl', function ($scope,$rootScope,$cookies,loginService,md5,$location) {
    
  	$scope.userLogin=function(loginEmailForCustVrification) {
    $('#waitLogin').show();  
    console.log($cookies.get('sessionId'));
    var loginData={
      "emailId":$scope.loginEmail,
      "password":md5.createHash($scope.loginPassword),
      "sourceType":"gobazaar",
      "sessionId":$cookies.get('sessionId')
    };
            
    $('#loadingLogin').css("display", "block");
    $('#btn-login').prop('disabled', true);
    loginService.login(loginData).success(function (results){
      if(results.responseCode=='SUCCESS' && results.entitiesResponse!=null) {
        $('#btn-login').prop('disabled', false);
        
        $('#waitLogin').hide();
        $('#loadingLogin').css("display", "none");
        $('#imgLoader').css("display", "none");
        $scope.invalideUser=false;
        var flag=results.entitiesResponse['0']['baseDTO'].flag;
        if(flag && results.entitiesResponse['0']['baseDTO'].status=='ACTIVE') {
         $('#loadingLogin').css("display", "none");
         $cookies.put('useData',JSON.stringify(results.entitiesResponse['0']['baseDTO']));
         $cookies.put('customerId',results.entitiesResponse['0']['baseDTO'].customerId.toString());
         
        /***********************************/

        $('body').removeClass('modal-open');
        $('#login').removeClass('in');
        $('#login').attr("aria-hidden", true);

        $rootScope.loginStatus=true;
        $('.giftTopConIcon').css("display", "block");
        if(results.entitiesResponse['0']['baseDTO'].firstName=='' || results.entitiesResponse['0']['baseDTO'].firstName==null || results.entitiesResponse['0']['baseDTO'].firstName=='undefined' || results.entitiesResponse['0']['baseDTO'].firstName==undefined){
          $("#welcome").html('Hi '+$rootScope.customerEmail);
        }else{
          $("#welcome").html('Hi '+$rootScope.customerName);
        }
        $('#login').removeClass('in');
        $('.modal-backdrop').removeClass('in');
        $('#login').css("display", "none");
        $('.modal-backdrop').css("display", "none");
        $('#loginForm').attr('style','display:none;');
        if($rootScope.redirectActualPath=='buyNow'){
          $scope.addToCart($rootScope.productVariables.gbucode,$rootScope.productVariables.priceperunit,$rootScope.productVariables.productid,$rootScope.productVariables.productstatus,$rootScope.productVariables.salepriceperunit,
            $rootScope.productVariables.shippingcost,
            $rootScope.productVariables.vendorId,
            $rootScope.productVariables.subtitle,
            $rootScope.productVariables.thumbnailurl,
            $rootScope.productVariables.productname,
            $rootScope.productVariables.vendorSku,
            $rootScope.productVariables.brandname,
            $rootScope.productVariables.modelname,
            $rootScope.productVariables.categoryname,
            $rootScope.productVariables.categoryId,
            $rootScope.productVariables.title,
            $rootScope.productVariables.fromwhere,
            $rootScope.productVariables.lockedInventory);
            
            return ;
        }
        window.location.href=$rootScope.redirectActualPath;

       }
      
    


   }
   else if(results.responseCode=='SUCCESS' && results.message=="unverified customer")
       {  
           
        //$log.info(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,API.BusinessUrl+API.loginUrl+contentSearchGenericUrl,results,loginData));
           $('#emailverification').val(loginEmailForCustVrification);
           $('#passwordVerify').val($scope.password);
           $('#login').modal('hide');
           $('#emailVerify').prop('disabled', true); 
           $('#verfyPassword').prop('disabled', true); 
           $('#change').prop('disabled', true);
           $('#varifyWindow').modal('show');
           $('#waitLogin').hide();
           $('#btn-login').prop('disabled', false);
           //$('emailverification').val();

       }
       else if(results.responseCode=='SUCCESS' && results.message=="Customer does not exist")
       {    
       // $log.info(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,API.BusinessUrl+API.loginUrl+contentSearchGenericUrl,results,""));
            $scope.loginform.$setPristine();
            $scope.invalideUser=true;
            $scope.msgTxt="Invalid credentials entered";
            //$('#loginLoading').css("display", "none");
            $('#loadingLogin').css("display", "none");
            $('button').prop('disabled', false);
            $('#invalidCustomerText').css("display", "block");
            $('#waitLogin').hide();
            $('#btn-login').prop('disabled', false);

       }
       else {
        $('#btn-login').prop('disabled', false);
        $('#waitLogin').hide();
        $('#loadingLogin').css("display", "none");
        //$log.error(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,API.BusinessUrl+API.loginUrl+contentSearchGenericUrl,results,""));

       }   

      }).error(function (data,status,header,config) {
         $('#btn-login').prop('disabled', false);
         $('#waitLogin').hide();
         $('#loadingLogin').css("display", "none");
//       $log.error(makeUiLog($cookies.get('sessionID'),$location.path(),status,API.BusinessUrl+API.loginUrl+contentSearchGenericUrl,data,loginData));     
      });

    

      };


      //Method used for Forgot password purpose.
    $scope.forgotpassword=function()
    {   
      $('#confMsg').hide();
      $('#failMsg').hide();
      $('#forgotLoading').show();
        var formData=
        { 
            "emailId": $scope.forgotloginEmail /*$scope.loginEmail*/
        };
        //$('#btn-forgotPassword').prop('disabled', true);
        $('#forgotLoading').css("display", "block");
        loginService.userForgotPassword(formData).success(function (results) 
        {
          
           if(results.responseCode=="SUCCESS" && results.entitiesResponse!=null) 
           {
           $log.info(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,API.BusinessUrl+API.forgotPwdUrl+contentSearchGenericUrl,results,formData));
               $scope.succesMsg=results.message;
               $('#confMsg').show();
               $('#forgotAlert').hide();
               $('#forgotLoading').css("display", "none");
               $scope.forgotPasswordForm.$setPristine();
           }

           else if(results.responseCode=="SUCCESS" && results.entitiesResponse==null) 
           {
           $log.error(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,API.BusinessUrl+API.forgotPwdUrl+contentSearchGenericUrl,results,formData));
               $scope.failureMsg=results.message;
               $('#failMsg').show();
               $('#forgotAlert').hide();
               $('#forgotLoading').css("display", "none");
               $scope.forgotPasswordForm.$setPristine();
           }

           else
           {
            $log.error(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,API.BusinessUrl+API.forgotPwdUrl+contentSearchGenericUrl,results,formData));
            $scope.invalideUser1=true;
            $('#forgotAlert').show();
            $('#forgotImgLoading').hide();
            $scope.msgTxt1="Invalid Customer email.";
           // $('button').prop('disabled', false); 
            $('#forgotLoading').css("display", "none");
            $scope.forgotPasswordForm.$setPristine();
            $('#confMsg').hide();
            $('#failMsg').hide();

        }  

    }).error(function (data,status,header,config)
    {
      $log.error(makeUiLog($cookies.get('sessionID'),$location.path(),status,API.BusinessUrl+API.forgotPwdUrl+contentSearchGenericUrl,data,formData));
  })
  };


  /*Logout*/
  $scope.logout=function(){
    //$localStorage.loginStatus=false
    
    
    var cookies = $cookies.getAll();
      angular.forEach(cookies, function (v, k) {
          $cookies.remove(k);
    });
    
    window.location.href=$location.path();
};


  });
