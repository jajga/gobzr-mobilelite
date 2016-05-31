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
     var API_BUSS = "http://172.16.0.39:8080/Business-Web/services/";
     var API_DOMAIN = "http://172.16.0.39:8080/Gobazaar_Webshop/services/";
     var imageProductListUrl="https:" == document.location.protocol ? "https://" + "static.gobazaar.com/dynamic/products/" : "http://" + "static.gobazaar.com/dynamic/products/"
    // Public API here
    return {
      API_BUSS:API_BUSS,
      API_DOMAIN:API_DOMAIN,
      imageProductListUrl:imageProductListUrl
     
    };
  });
