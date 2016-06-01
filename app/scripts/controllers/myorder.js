'use strict';

/**
 * @ngdoc function
 * @name gobzrliteApp.controller:MyorderCtrl
 * @description
 * # MyorderCtrl
 * Controller of the gobzrliteApp
 */
angular.module('gobzrliteApp')
  .controller('MyorderCtrl', function (myOrderService,$scope,$rootScope,$cookies,$location) {
  	console.log('cookie id '+$cookies.get('customerId')+' root id '+$rootScope.customerId)
    if($location.path()=='/myOrder')
    {
     $('#waitOrderList').show();
     var formData=
      {
        "customerId":  $rootScope.customerId
      };
     myOrderService.postMyOrder(formData).success(function (results){
       if(results.responseCode == "SUCCESS"){
       	  $('#waitOrderList').hide();
        if(results.entitiesResponse!=null){
          $scope.myOrdersData =  results.entitiesResponse['0']['baseDTO'];
          $('#waitOrderList').hide();
          $scope.noMyOrder1=false;
          $('#noMyOrder').hide();
          $('#ordersList').show();
          $scope.serviceFailFlag=false;
         }else{
          $scope.noMyOrder1=true;
          $('#noMyOrder').show();
          $('#ordersList').hide();
          $scope.serviceFailFlag=false;
          } 
        }
        else{
      	  $scope.noMyOrder1=false;
      	  $scope.serviceFailFlag=true;
      	  $('#serviceFail').show();
          $('#waitOrderList').hide();
          $('#noMyOrder').hide();
          $('#ordersList').hide();
         }
        }).error(function (e)
          {console.log(e);});
   	};
 });
