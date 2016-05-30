'use strict';

/**
 * @ngdoc service
 * @name gobzrliteApp.login
 * @description
 * # login
 * Service in the gobzrliteApp.
 */
angular.module('gobzrliteApp')
  .service('loginService', function (global,$http,$cookies,$q) {
 	var API_BUSS=global.API_BUSS;
 	this.login=function(request){
 		
 		var promise = $http.post(global.API_BUSS+'customer/login',request);
 		return promise;
 	};


 	this.userForgotPassword=function(request){
 		var promise = $http.post(global.API_BUSS+'customer/forgotPassword',request);
 		return promise;
 		
 	};
   
  });
