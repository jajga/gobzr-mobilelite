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
        });
  }).run(function($rootScope){
    $rootScope.imageProductListUrl="https:" == document.location.protocol ? "https://" + "static.gobazaar.com/dynamic/products/" : "http://" + "static.gobazaar.com/dynamic/products/"
  });
