'use strict';

/**
 * @ngdoc service
 * @name gobzrliteApp.user
 * @description
 * # user
 * Service in the gobzrliteApp.
 */
angular.module('gobzrliteApp')
 .service('user', function (global,$http,$cookies,$q) {
 	var API_BUSS=global.API_BUSS;
 	this.getCart=function(sessId){
 		if($cookies.get('customerId')!=null)
		 { 
		    var request={
		       "customerId":$cookies.get('customerId'),
		       "sessionId":sessId
		    } 

		} 
		else {
	 		var request={
	 			"sessionId":sessId,
	 		};
 		}
 		var promise = $http.post(global.API_BUSS+'/cart/getcart?orderId=0',request);
 		return promise;
 	};

 	this.getSessionId=function(){
 		var request ={ipAddress: "2406:5600:26:7615:1def:b3c7:23d4:6650", pageUrl: "/", source: "web"}
 		var deferred = $q.defer();
 				var promise = $http.post(global.API_DOMAIN+'createSession/',request).success(function(data){
 					var dt=new Date();
 					dt.setDate(dt.getDate() + 30);
 					var option={
 						path:"/",
 						expires:dt
 					};
 					$cookies.put("sessionId",data.entitiesResponse[0].baseDTO.sessionId,option);
 					deferred.resolve(data.entitiesResponse[0].baseDTO.sessionId);
 				}).error(function(){
 					deferred.resolve(null);
 				});
 				return deferred.promise;
 		
 	};
   
  });
