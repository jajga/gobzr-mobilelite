'use strict';

/**
 * @ngdoc service
 * @name gobzrliteApp.address
 * @description
 * # address
 * Service in the gobzrliteApp.
 */
angular.module('gobzrliteApp')
  .service('addressService', function (global,$http,$cookies) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.getAddress=function(){
    	var promise = $http.get(global.API_BUSS+'customer/getCustomerAddress?customerId='+$cookies.get('customerId'));
    return promise;
    }

    this.CartVerifyPinCode=function(formdata){
    	var promise=$http.post(global.API_BUSS+'customer/getPincodeData',formdata);
    	return promise;
    }


    this.addDeliveryAddress=function(formdata){
    	var promise=$http.post(global.API_BUSS+'customer/getPincodeData',formdata);
    	return promise;
    
	}
	this.userVerifyPinCode=function(formdata){
		var promise=$http.post(global.API_BUSS+'customer/getPincodeData',formdata);
    	return promise;
	}
	

  });
