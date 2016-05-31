'use strict';

/**
 * @ngdoc directive
 * @name gobzrliteApp.directive:passwordMatch
 * @description
 * # passwordMatch
 */
angular.module('gobzrliteApp')
  .directive('passwordMatch', function () {
    return {
        restrict: 'A',
        scope:true,
        require: 'ngModel',
        link: function (scope, elem , attrs,control) {
            var checker = function () {
 
                //get the value of the first password
                var e1 = scope.$eval(attrs.ngModel); 
                //get the value of the other password  
                var e2 = scope.$eval(attrs.passwordMatch);
                return e1 == e2;
            };
            scope.$watch(checker, function (n) {
 
                //set the form control to valid if both 
                //passwords are the same, else invalid
                //console.log(n)
                if(n) {
                  attrs.ngModel.$valid
                }
                if(n) {
                  attrs.ngModel.$invalid
                }
                 //check validity
                control.$setValidity("unique", n);
                
            });
        }
    };
  });
