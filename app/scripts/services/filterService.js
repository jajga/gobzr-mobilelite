'use strict';

/**
 * @ngdoc service
 * @name gobzrliteApp.user
 * @description
 * # user
 * Service in the gobzrliteApp.
 */
angular.module('gobzrliteApp')
 .service('filterService', function (global,$http,$cookies,$q) {
 	var API_BUSS=global.API_BUSS;
 	this.getProductByFilter=function(request,pageNo,sortType){
 		
 		var promise = $http.post(global.API_BUSS+'product/getProductByFilterApplied?exposureType=null&pageNo='+pageNo+'&noOfProductPerPage=18&sortType='+sortType,request);
 		return promise;
 	};

   
  });
