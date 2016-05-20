'use strict';

/**
 * @ngdoc function
 * @name gobzrliteApp.controller:FilterCtrl
 * @description
 * # FilterCtrl
 * Controller of the gobzrliteApp
 */
angular.module('gobzrliteApp')
  .controller('FilterCtrl', function ($rootScope,filterService,$scope,$cookies,getProducts) {
    //var apiUrl=API.BusinessUrl+API.getProductByFilterAppliedUrl+eventName+'&pageNo='+0+'&noOfProductPerPage=18&sortType=price';

         // getProducts.success(function (results) {
         if(getProducts['data'].responseCode=="SUCCESS" && getProducts['data'].entitiesResponse!=null) 
                       {
                          //$log.info(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,apiUrl+contentSearchGenericUrl.replace('?','&'),results,formData));
                          $scope.productOnTheBasisOfCategory=getProducts['data'].entitiesResponse['0']['baseDTO']['productWrapperObj']
                       }
              // });

        $scope.moreProducts=function(pageNo,sortType){
            var formData={
            'categoryId': $cookies.get('categoryId')
            }
            $rootScope.pageNo=pageNo+1
            filterService.getProductByFilter(formData,$rootScope.pageNo,sortType).success(function (results) {
         if(results.responseCode=="SUCCESS" && results.entitiesResponse!=null) 
         {
            //$log.info(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,apiUrl+contentSearchGenericUrl.replace('?','&'),results,formData));
            var productOnTheBasisOfCategory1=results.entitiesResponse['0']['baseDTO']['productWrapperObj']
            for (var i = 0; i < productOnTheBasisOfCategory1.length; i++) {
                $scope.productOnTheBasisOfCategory.push(productOnTheBasisOfCategory1[i]);
            };
         }
     });
        }

  });
