'use strict';

/**
 * @ngdoc service
 * @name gobzrliteApp.register
 * @description
 * # register
 * Service in the gobzrliteApp.
 */
angular.module('gobzrliteApp')
  .service('registerService', function (global,$http,$cookies) {

    this.registerCustomer=function(formData){
    
    var promise = $http.post(global.API_BUSS+'customer/register',formData);
    return promise;
  };

  this.userResendVerifyCode=function(email){
    
    var promise = $http.get(global.API_BUSS+'customer/resendVerificationCode/?emailId='+email);
    return promise;
  };

  this.verifyCustomer=function(formData){
  	var promise = $http.post(global.API_BUSS+'customer/verifyNewCustomer',formData);
  	return promise;
  }

  });
