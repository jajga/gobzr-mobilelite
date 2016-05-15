'use strict';

/**
 * @ngdoc function
 * @name gobzrliteApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the gobzrliteApp
 */
angular.module('gobzrliteApp')
  .controller('HomeCtrl', function () {
    
  	function toggleChevron(e) {
	    $(e.target)
	        .prev('.panel-heading')
	        .find("i.indicator")
	        .toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
	}
	$('#accordion').on('hidden.bs.collapse', toggleChevron);
	$('#accordion').on('shown.bs.collapse', toggleChevron);
    
  });
