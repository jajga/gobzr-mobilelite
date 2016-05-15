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
  .config(function ($routeProvider ,$urlRouterProvider,$stateProvider) {
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
            creteSession:function(user){
              return user.getSessionId();
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
        });
  });
