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
          url: '/mobile-listing',
          views: {
            '@':{
              templateUrl: 'views/pages/home.html',
              controller: 'HomeCtrl'
            }
          },
          resolve:{
            
          }
        });
  });
