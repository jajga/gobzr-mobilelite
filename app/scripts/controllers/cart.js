'use strict';

/**
 * @ngdoc function
 * @name gobzrliteApp.controller:CartCtrl
 * @description
 * # CartCtrl
 * Controller of the gobzrliteApp
 */
angular.module('gobzrliteApp')
  .controller('CartCtrl', function (cartService,$cookies,$scope,$stateParams,$rootScope,getCartProducts) {
  	
  	  var results=getCartProducts['data'];
  	  $scope.cartLength=0;
      if(results.responseCode=="SUCCESS"  && results.entitiesResponse!=null){ 
      	$rootScope.cartItemSummary= results.entitiesResponse['0']['baseDTO']['cartproductidList']
        $scope.cartId= results.entitiesResponse['0']['baseDTO'].cartId
        $rootScope.totalCartValue= results.entitiesResponse['0']['baseDTO'].totalCartValue
        $scope.cartLength= results.entitiesResponse['0']['baseDTO']['cartproductidList'].length;
        $rootScope.cartLength1=results.entitiesResponse['0']['baseDTO']['cartproductidList'].length;
        $scope.cartItemQuantity= results.entitiesResponse['0']['baseDTO']['totalQuantity'];

         

      }else{
      	console.log('Service Failure');
      }

  });
