'use strict';

/**
 * @ngdoc service
 * @name gobzrliteApp.global
 * @description
 * # global
 * Factory in the gobzrliteApp.
 */
angular.module('gobzrliteApp')
  .factory('global', function () {
    // Service logic
     var API_BUSS = "http://business.api.gobazaar.com/Business-Web/services/";
     var API_DOMAIN = "http://domain.api.gobazaar.com/Gobazaar_Webshop/services/";
    // Public API here
    return {
      API_BUSS:API_BUSS,
      API_DOMAIN:API_DOMAIN
     
    };
  });
