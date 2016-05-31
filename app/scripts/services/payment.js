'use strict';

/**
 * @ngdoc service
 * @name gobzrliteApp.payment
 * @description
 * # payment
 * Service in the gobzrliteApp.
 */
angular.module('gobzrliteApp')
  .service('paymentService', function ($http,global) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    
    this.postSendOtpPayment=function(formdata){
		var promise=$http.post(global.API_BUSS+'communication/sendOTP',formdata);
    	return promise;
	}

	this.postValidateOtpPayment=function(formdata){
		var promise=$http.post(global.API_BUSS+'communication/validateOTP',formdata);
    	return promise;
	}
  });
