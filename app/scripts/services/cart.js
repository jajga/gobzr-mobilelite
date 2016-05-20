'use strict';

/**
 * @ngdoc service
 * @name gobzrliteApp.cart
 * @description
 * # cart
 * Service in the gobzrliteApp.
 */
angular.module('gobzrliteApp')
  .service('cartService', function (global,$http,$cookies) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.getCart=function(formData){
    //var finalorderId= 0 ;
    var promise = $http.post(global.API_BUSS+'cart/getcart?orderId=0',formData);
    return promise;
  };
  });
