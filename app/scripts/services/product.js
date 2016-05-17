'use strict';

/**
 * @ngdoc service
 * @name gobzrliteApp.product
 * @description
 * # product
 * Service in the gobzrliteApp.
 */
angular.module('gobzrliteApp')
  .service('productService', function (global,$http,$cookies) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    this.getproductbyname=function(formData){
 		
 		var promise = $http.post(global.API_BUSS+'product/getproductbyproductnamev1',formData);
 		return promise;
 	};

 	this.getproductbynameByVendor=function(gbuCode){
 		
 		var promise = $http.get(global.API_BUSS+'product/getvendorproductbygbucode?gbuCode='+gbuCode);
 		return promise;
 	};

 	this.addToCartFromPdp=function(gbucode,priceperunit,productid,productstatus,salepriceperunit,shippingcost,vendorId,subtitle,thumbnailurl,productname,vendorSku,brandname,modelname,categoryname,categoryId,title,fromwhere,lockedInventory)
	{ 
	  lockedInventory=0;
	  var finalShippingCost=shippingcost; 
	  var subTotal=parseFloat(salepriceperunit*1)+parseFloat(finalShippingCost);
   	  var discountApplied=priceperunit-salepriceperunit;
   	  var tax1= (salepriceperunit*14)/100
      var overAllTax=Math.ceil(tax1 * 100)/100

	  var request={
      "cartproductidList": [
                              {

                                  "categoryid":categoryId,
                                  "discountApplied": discountApplied, 
                                  "subTotal":subTotal,
                                  "gbuCode": gbucode,
                                  "mrp": priceperunit,
                                  "productId": productid,
                                  "title": title,
                                  "productStatus": productstatus,
                                  "quantity": 1,
                                  "salePrice": salepriceperunit,
                                  "shippingCharge": finalShippingCost,
                                  "vendorId": vendorId,
                                  "subtitle":subtitle,
                                  "thumbnailurl":thumbnailurl,
                                  "productname":productname,
                                  "skuId":vendorSku,
                                  "vat":0,
                                  "tax":overAllTax,
                                  "brandname": brandname,
                                  "categoryname": categoryname,
                                  "modelname": modelname,
                                  "lockedInventory":lockedInventory
                              }
                           ],
                            "sessionId": $cookies.get('sessionId')

                };
		var promise = $http.post(global.API_BUSS+'cart/addproducttocart',request);
 		return promise;
 	};
  });
