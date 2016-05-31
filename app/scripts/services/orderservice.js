'use strict';

/**
 * @ngdoc service
 * @name gobzrliteApp.orderService
 * @description
 * # orderService
 * Service in the gobzrliteApp.
 */
angular.module('gobzrliteApp')
  .service('orderService', function (global,$http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.createOrderData=function(formdata){
		var promise=$http.post(global.API_BUSS+'order/createOrderNew?customerid=105&ipaddress=172.16.0.76&logtype=gobazaar&mid=&newsession=92508970340713869dff8b5f-ab3b-4d21-a6cc-2fc26021bbc9&orderamount=&orderid=&previousurl=/&searchtext=&sessionid=9dff8b5f-ab3b-4d21-a6cc-2fc26021bbc9&source=desktop&uid=Chrome439dff8b5f-ab3b-4d21-a6cc-2fc26021bbc9&url=http://172.16.0.76/mycart&useragent=Mozilla/5.0%20(Windows%20NT%2010.0;%20WOW64)%20AppleWebKit/537.36%20(KHTML,%20like%20Gecko)%20Chrome/43.0.2357.65%20Safari/537.36&utmsocial=&utmsource=',formdata);
    	return promise;
	}
	this.updateOrderStatus=function(formdata){
		var promise=$http.post(global.API_BUSS+'order/updateOrderNew',formdata);
    	return promise;
	}
	this.orderconfirmation=function(orderId){
		var promise=$http.get(global.API_BUSS+'customer/getOrder?orderId='+orderId);
    	return promise;
	}
	this.customerdata=function(customerId){
		var promise=$http.get(global.API_BUSS+'customer/getCustomer?customerId='+customerId);
    	return promise;
	}
  });
