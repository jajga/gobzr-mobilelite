'use strict';

/**
 * @ngdoc function
 * @name gobzrliteApp.controller:FilterCtrl
 * @description
 * # FilterCtrl
 * Controller of the gobzrliteApp
 */
angular.module('gobzrliteApp')
  .controller('FilterCtrl', function ($rootScope,filterService,$scope,$cookies,$stateParams,getProducts) {
    //var apiUrl=API.BusinessUrl+API.getProductByFilterAppliedUrl+eventName+'&pageNo='+0+'&noOfProductPerPage=18&sortType=price';

         // getProducts.success(function (results) {
         if(typeof($stateParams.filterUrl)=='undefined' || $stateParams.filterUrl==''){
         if(getProducts['data'].responseCode=="SUCCESS" && getProducts['data'].entitiesResponse!=null) 
                       {
                          //$log.info(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,apiUrl+contentSearchGenericUrl.replace('?','&'),results,formData));
                          $scope.productOnTheBasisOfCategory=getProducts['data'].entitiesResponse['0']['baseDTO']['productWrapperObj']
                       }
              // });
          }

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


        /*+++++++++++++++++++++++++*/
        if(typeof($stateParams.filterUrl)!='undefined' && $stateParams.filterUrl!='')
      { 
        
        var finalserachCriteriaObj={}
        var finalserachCriteria=new Array()
        $scope.directUrlBreadCrumbForm=new Array();
        //BREADCRUMBS and filter Service calling..
        var forBreadCrumbArray=new Array();
        var forAttributeName=new Array();
        $rootScope.multipleProductArray=new Array();
        //FOR BREADCRUMBS..
       
        console.log($stateParams.filterUrl);
        var arr=$stateParams.filterUrl.split('--');

        for (var i = 0; i < arr.length; i++) {
          if(arr[i]!=''){
          if(arr[i].indexOf('=')> -1){
          var filterNames=arr[i].split('=');
          //joined: variable for joining filters that are from same FILTER by ';;'
          if(filterNames[0].indexOf('slider')>-1){
            var joined=filterNames[1];
          }
          else{
            if(filterNames[1].charAt(filterNames[1].length-1)=='^'){
              var joined=filterNames[1].split('^+').join(';;');
              
            }
            else{
              var joined=filterNames[1].split('-').join(';;');
            }
          }
            
           forBreadCrumbArray.push(joined);
           //MAKE an array for attr name: $rootScope.multipleProductArray
           forAttributeName.push(filterNames[0]);
           
           if(filterNames[0].indexOf('slider')>-1){
           $rootScope.multipleProductArray.push({
                                "filterName":filterNames[0].substring(filterNames[0].indexOf('slider')+6),
                                "filterValue":joined,
                                "filterType":"range-slider",
                                "filterDataType":"float"
                                });

                var removesemicolon=joined.substring(0,joined.length-1)
                var searchCriteria22=removesemicolon.replace(';;',',')
  
                var temp11= String(filterNames[0].substring(filterNames[0].indexOf('slider')+6));
                var temp22= String(searchCriteria22);

                finalserachCriteriaObj[temp11]=temp22

                finalserachCriteria.push(finalserachCriteriaObj)

              }
              else{
                if(joined.lastIndexOf('^')>-1){
                  if(joined.indexOf('& Above')){
                    joined=joined.replace(' & Above','');
                  }
                  $rootScope.multipleProductArray.push({
                                "filterName":filterNames[0],
                                "filterValue":joined.substring(0,joined.length-1),
                                "filterType":'range',
                                "filterDataType":'float'
                                });

                    var removesemicolon=joined.substring(0,joined.length-1)
                     var searchCriteria22=removesemicolon.replace(';;',',')
  
                     var temp11= String(filterNames[0]);
                     var temp22= String(searchCriteria22);

                     finalserachCriteriaObj[temp11]=temp22

                      finalserachCriteria.push(finalserachCriteriaObj)



                }
                else{
                $rootScope.multipleProductArray.push({
                                "filterName":filterNames[0],
                                "filterValue":joined,
                                "filterType":'discrete',
                                "filterDataType":'string'
                                });
                    

                     
                     var searchCriteria2=String(joined).split(';;').join(',')
                     var temp1= String(filterNames[0]);
                     var temp2= String(searchCriteria2);
                     finalserachCriteriaObj[temp1]=temp2
                      finalserachCriteria.push(finalserachCriteriaObj)
                    }



              }

            }
            var timesSameFilter=joined.split(';;')
            for (var p = 0; p < timesSameFilter.length; p++) {
              if(timesSameFilter[p]==''){

              }
              else
              $scope.directUrlBreadCrumbForm.push(filterNames[0]);
            };
          }
        };

        $rootScope.pageNo=0;
        var sortType='price';
        var formData1={
                          "categoryId":$cookies.get('categoryId'),
                          "productFilters":$rootScope.multipleProductArray
                     }
        
                   filterService.getProductByFilter(formData1,$rootScope.pageNo,sortType).success(function (results) {
         if(results.responseCode=="SUCCESS" && results.entitiesResponse!=null) 
         {
            //$log.info(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,apiUrl+contentSearchGenericUrl.replace('?','&'),results,formData));
            $scope.productOnTheBasisOfCategory=results.entitiesResponse['0']['baseDTO']['productWrapperObj']
           
         }
     });     


  }      /**************************/

  });
