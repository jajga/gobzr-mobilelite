'use strict';

/**
 * @ngdoc service
 * @name gobzrliteApp.myOrder
 * @description
 * # myOrder
 * Service in the gobzrliteApp.
 */
angular.module('gobzrliteApp')
  .service('myOrderService', function (global,$http,$cookies){

  	this.postMyOrder=function(formData){
  
    var promise = $http.post(global.API_BUSS+'customer/orderList',formData);
    return promise;
  };
    
  });
