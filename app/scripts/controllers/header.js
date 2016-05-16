'use strict';

/**
 * @ngdoc function
 * @name gobzrliteApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the gobzrliteApp
 */
angular.module('gobzrliteApp')
  .controller('HeaderCtrl', function (user,$cookies,$scope) {

  	var sessionID = $cookies.get('sessionId');

	$scope.refreshCart=function(sessionID){

		user.getCart(sessionID).success(function(results){
			if(results.responseCode === "FAILURE"){
				//$scope.cart={"noOfProducts":[]};
				$scope.cartLength=false;
				$scope.hoverOnCart();	

			}
			if(results.responseCode === "SUCCESS" && results.entitiesResponse != null){
				$scope.cart={"noOfProducts":results.entitiesResponse['0']['baseDTO']['cartproductidList'].length};
				$scope.cartLength=true;
				$scope.cartItemSummary= results.entitiesResponse['0']['baseDTO']['cartproductidList']

				$scope.hoverOnCart();	
			}
			else if(results.responseCode === "SUCCESS" && results.entitiesResponse == null){
				$scope.cart={"noOfProducts":0};
			}
			
		}).error(function(){
			$scope.cart={"test":"jjjjj"};
		});

 	}

 	$scope.refreshCart(sessionID);
  

  });
