'use strict';

/**
 * @ngdoc service
 * @name gobzrliteApp.liveCategory
 * @description
 * # liveCategory
 * Service in the gobzrliteApp.
 */
angular.module('gobzrliteApp')
  .service('liveCategory', function (global,$http,$cookies,$q) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var API_BUSS=global.API_BUSS;
 	this.getLiveCategory=function(){
 		
 		var promise = $http.get(global.API_BUSS+'category/getLiveCategory');
 		return promise;
 	};
  });
