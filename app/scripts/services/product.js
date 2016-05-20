'use strict';

/**
 * @ngdoc service
 * @name gobzrliteApp.product
 * @description
 * # product
 * Service in the gobzrliteApp.
 */
angular.module('gobzrliteApp')
  .service('productService', function (global,$http,$cookies) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    this.getproductbyname=function(formData){
    
    var promise = $http.post(global.API_BUSS+'product/getproductbyproductnamev1',formData);
    return promise;
  };

  this.getproductbynameByVendor=function(gbuCode){
    
    var promise = $http.get(global.API_BUSS+'product/getvendorproductbygbucode?gbuCode='+gbuCode);
    return promise;
  };

  this.addToCartFromPdp=function(formData)
  { 
    var promise = $http.post(global.API_BUSS+'cart/addproducttocart',formData);
    return promise;
  };
  });
'use strict';

/**
 * @ngdoc service
 * @name gobzrliteApp.product
 * @description
 * # product
 * Service in the gobzrliteApp.
 */
angular.module('gobzrliteApp')
  .service('productService', function (global,$http,$cookies) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    this.getproductbyname=function(formData){
    
    var promise = $http.post(global.API_BUSS+'product/getproductbyproductnamev1',formData);
    return promise;
  };

  this.getproductbynameByVendor=function(gbuCode){
    
    var promise = $http.get(global.API_BUSS+'product/getvendorproductbygbucode?gbuCode='+gbuCode);
    return promise;
  };

  this.addToCartFromPdp=function(formData)
  { 
    var promise = $http.post(global.API_BUSS+'cart/addproducttocart',formData);
    return promise;
  };
  });
