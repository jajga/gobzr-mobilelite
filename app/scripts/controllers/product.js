'use strict';

/**
 * @ngdoc function
 * @name gobzrliteApp.controller:ProductCtrl
 * @description
 * # ProductCtrl
 * Controller of the gobzrliteApp
 */
angular.module('gobzrliteApp')
  .controller('ProductCtrl', function (productService,$scope,$stateParams,$rootScope,$cookies,productByProductName) {
    
      var results=productByProductName['data'];
      if(results.responseCode=="SUCCESS"  && results.entitiesResponse!=null){  
          $scope.productDescriptionAttribute=results.entitiesResponse['0']['baseDTO']['attributes'];
          $scope.productDescription=results.entitiesResponse['0']['baseDTO']['attributes']['miscellaneous'];
          $scope.productDescriptionGenFeature=results.entitiesResponse['0']['baseDTO']['attributes']['General Features'];
          $scope.bigImage=results.entitiesResponse['0']['baseDTO']['attributes']['miscellaneous'].largeimage.split(',');
          $scope.thumbImage=results.entitiesResponse['0']['baseDTO']['attributes']['miscellaneous'].thumbnailurl.split(',');
          $scope.inStock=results.entitiesResponse['0']['baseDTO']['attributes']['InStock'];

          if(results.entitiesResponse['0']['baseDTO']['availableVarientsDTO']!=undefined){
          $scope.availVariants=results.entitiesResponse['0']['baseDTO']['availableVarientsDTO'].gbuCodeVarientMapping;
          $rootScope.sizeAttr=results.entitiesResponse['0']['baseDTO']['availableVarientsDTO'].colorImageVarientMapping;
           }
           $scope.subTitle=$scope.productDescription.productname+'_'+$scope.productDescription.productname+'_'+$scope.productDescription.modelname;
           $scope.productDescriptionColor=results.entitiesResponse['0']['baseDTO']['attributes']['colorDetails'];   
           $scope.productDescriptionCartImage=$scope.productDescription.displayimage;
           $scope.imagesThumbnail=$scope.productDescription.largeimage.split(',');
           $scope.imagesDisplay=$scope.productDescription.displayimage.split(',');
           $scope.keyfeatures=$scope.productDescription.keyfeatures.split('||'); 
           $scope.quantityValue=$scope.inStock.amount;
           $scope.finalVal=$scope.inStock.amount;

           $scope.instock1=[];
           $scope.instock2=[];

           productService.getproductbynameByVendor($scope.productDescription.gbucode).success(function (results){
           if(results.responseCode=="SUCCESS" && results.entitiesResponse!=null) 
            {    
              $scope.vendorCodeData=results.entitiesResponse['0']['baseDTO']['vendorProductWrapper'];
              
              $scope.vendorCount=results.entitiesResponse['0']['baseDTO']['vendorProductWrapper'].length;

              for (var i = 0; i < $scope.vendorCount; i++) 
              {
                $scope.instock1.push($scope.vendorCodeData[i].availableProduct-($scope.vendorCodeData[i].accomodatedProduct+$scope.vendorCodeData[i].consumedProduct));     
                $scope.vendorId=results.entitiesResponse['0']['baseDTO']['vendorProductWrapper'][i].vendorId;
                $scope.vendorPricePerUnit=results.entitiesResponse['0']['baseDTO']['vendorProductWrapper'][i].pricePerUnit;
                $scope.vendorSalePricePerUnit=results.entitiesResponse['0']['baseDTO']['vendorProductWrapper'][i].salePricePerUnit;
                console.log($scope.vendorSalePricePerUnit);
                $scope.warranty = results.entitiesResponse['0']['baseDTO']['vendorProductWrapper'][i].warranty;
                $scope.vendorId=results.entitiesResponse['0']['baseDTO']['vendorProductWrapper'][i].vendorId;
                $scope.vendorSkuId=results.entitiesResponse['0']['baseDTO']['vendorProductWrapper'][i].vendorSku;
                $rootScope.vendorSkuId=results.entitiesResponse['0']['baseDTO']['vendorProductWrapper'][i].vendorSku;
                $scope.upVendor=$scope.vendorCodeData[i];
                 break;
              }

              for (var j = 0; j < $scope.vendorCount; j++) 
              {
                if(j!=0)
                {
                  $scope.instock2.push($scope.vendorCodeData[j].availableProduct-($scope.vendorCodeData[j].accomodatedProduct+$scope.vendorCodeData[j].consumedProduct));
                  $scope.downVendor.push($scope.vendorCodeData[j]);
                }
              }
            }
            else{
          console.log('Service Failure');
          }   
           }).error(function (e){
        console.log(e)
        });

      }else{
        console.log('Service Failure');
      }
    
$scope.addToCartFromPdp = function(gbucode,priceperunit,productid,productstatus,salepriceperunit,shippingcost,vendorId,subtitle,thumbnailurl,productname,vendorSku,brandname,modelname,categoryname,categoryId,title,fromwhere,lockedInventory)
{

    lockedInventory=0;
    var finalShippingCost=shippingcost; 
    var subTotal=parseFloat(salepriceperunit*1)+parseFloat(finalShippingCost);
      var discountApplied=priceperunit-salepriceperunit;
      var tax1= (salepriceperunit*14)/100;
      var overAllTax=Math.ceil(tax1 * 100)/100;

  var formData={
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
  productService.addToCartFromPdp(formData).success(function (results){
    if(results.responseCode=="SUCCESS" && results.entitiesResponse!=null){
      $scope.addCartItem= results.entitiesResponse['0']['baseDTO']['cartproductidList'];
      window.location.href="/mycart";
      
    }
    else{
      console.log('Service Failure');
    }
  

  }).error(function (e){
     console.log(e)
    });
}
  });