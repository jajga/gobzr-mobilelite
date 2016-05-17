'use strict';

/**
 * @ngdoc overview
 * @name gobzrliteApp
 * @description
 * # gobzrliteApp
 *
 * Main module of the application.
 */
angular
  .module('gobzrliteApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router'
  ])
  .config(function ($routeProvider ,$urlRouterProvider,$stateProvider,$locationProvider) {
    $locationProvider.html5Mode({
     enabled: true
     }).hashPrefix('!');
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        .state('gobazarlite', {
          abstract: true,
          views: {
            'header': {
              templateUrl: 'views/common/header.html',
              controller: 'HeaderCtrl'

            }
          },
          resolve:{
            creteSession:function(user,$cookies){
              if(!$cookies.get('sessionId')){
                return user.getSessionId();
              }  
            }
          }

        })
        .state('gobazarlite.home', {
          url: '/',
          views: {
            '@':{
              templateUrl: 'views/pages/home.html',
              controller: 'HomeCtrl'
            }
          },
          resolve:{
            
          }
        })
        .state('gobazarlite.listing', {
          url: '/listing?categoryName',
          views: {
            '@':{
              templateUrl: 'views/pages/listing.html',
              controller: 'FilterCtrl'
            }
          },
          resolve:{
            
          }
        })
        .state('gobazarlite.product', {
          url: '/product-description/:GbuCode/:productName/pdp',
          views: {
            '@':{
              templateUrl: 'views/pages/productdesc.html',
              controller: 'ProductCtrl'
            }
          },
          resolve:{
            
          }
        });
  }).run(function($rootScope,global,liveCategory,$stateParams,$cookies){
    $rootScope.imageProductListUrl="https:" == document.location.protocol ? "https://" + "static.gobazaar.com/dynamic/products/" : "http://" + "static.gobazaar.com/dynamic/products/"
    $rootScope.hrefPdpUrl='product-description/'
    //window.categoryStates={};
    liveCategory.getLiveCategory().success(function (results) {
      //window.categoryStates=results;

      //var results=JSON.parse(window.categoryStates);
          
          //$log.info("SUCCESS_"+$cookies.get('sessionID')+'_'+$location.path()+'_'+catUrl+" ---- response ---- "+JSON.stringify(results));  
          //$log.info("SUCCESS ---- "+catUrl+" ---- response ---- "+JSON.stringify(results));
            if(results.responseCode=="SUCCESS") 
            {       //$log.info(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,catUrl,results,""));
                              var cName=new Array();
                              var cName1='';
                //              console.log(results.entitiesResponse['0']['baseDTO']['categoryHierarchyWrapperDTOObj'])
                              
                              var dataCategory=results.entitiesResponse['0']['baseDTO']['categoryHierarchyWrapperDTOObj'];
                              for (var i = 0; i < dataCategory.length; i++) {
                                cName[i]=dataCategory[i].categoryName+':'+dataCategory[i].categoryId;
                                cName1=cName1+dataCategory[i].categoryName+',';
                              };
                              // $cookies.put('categoryIdList',JSON.stringify(cName));
                              $rootScope.categoryIdList=JSON.stringify(cName);
                              $rootScope.categoryIdListName=cName1;
                              console.log($stateParams.categoryName);
                              var customeProductHomeId=getCategoryId($stateParams.categoryName,$rootScope.categoryIdList) 
                              console.log(customeProductHomeId);
                              $cookies.put('categoryId',customeProductHomeId);
                  }


                 
    })

  });
function getCategoryId(categoryName,cookieData)
                 {
                  var cList=[];
                  var categoryListNew=JSON.parse(cookieData);
                  //console.log(categoryListNew);
                  for(var i=0;i<categoryListNew.length;i++){
                    cList=categoryListNew[i].split(':');
                      if(cList[0].toUpperCase()==categoryName.toUpperCase()){
                        return cList[1];
                        break;
                      }
                    }
                 };
