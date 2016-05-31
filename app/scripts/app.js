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
    'ui.router',
    'angular-md5',
    'ngStorage'
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
          resolve:{}
        }).state('gobazarlite.login', {
          url: '/login',
          views: {
            '@':{
              templateUrl: 'views/pages/login.html',
              controller: 'LoginCtrl'
            }
          },
          resolve:{
            creteSession:function(user,$cookies){
              if(!$cookies.get('sessionId')){
                return user.getSessionId();
              }  
            }
            ,
            "check":function($location,loginService,$cookies){ 
               
                //alert($cookies.get('customerId'))
                if($cookies.get('customerId'))
                {
                    
                    $location.path('/');
                }
                else
                {
                 
                    $location.path('/login');    
                }
          }
        }
        }).state('gobazarlite.forgot', {
          url: '/forgotPwd',
          views: {
            '@':{
              templateUrl: 'views/pages/forgotPwd.html',
              controller: 'LoginCtrl'
            }
          },
          resolve:{
            creteSession:function(user,$cookies){
              if(!$cookies.get('sessionId')){
                return user.getSessionId();
              }  
            }
            ,
            "check":function($location,loginService,$cookies){ 
               
                //alert($cookies.get('customerId'))
                if($cookies.get('customerId'))
                {
                    
                    $location.path('/');
                }
                else
                {
                 
                    $location.path('/forgotPwd');    
                }
          }
        }
        })
        .state('gobazarlite.listing', {
          url: '/:categoryName-listing/lst',
          views: {
            '@':{
              templateUrl: 'views/pages/listing.html',
              controller: 'FilterCtrl'
            }
          },
          resolve:{
            getProducts:function($location,$rootScope,filterService,$cookies,$stateParams){ 
                      if($stateParams.categoryName!=undefined || $stateParams.categoryName!='undefined'){
                        var jsonVar=["Electronics:1","Mobiles:166","Tablets:167","Mobile & Tablet Accessories:168","Computers:169","Computer Accessories:170","Feature Phones:173","Smart Phones:174","Without Calling:175","With Calling:176","Printers & Scanners:190","Monitor:191","Storage Device:192","Mouse:193","Keyboards:194","Speakers:195","Single Function:216","Multifunction:217","Wearable Devices:545","Smart Watches:549","Fitness Band:551","Fashion:554","Women:555","Women_Innerwear:556","Women_Outerwear:557","Women_Outerwear_Casual Wear:563","Women_Outerwear_Formal Wear:564","Women_Outerwear_Ethnic Wear:565","Women_Outerwear_Sportswear:566","Women_Outerwear_Occasion Wear:567","Women_Outerwear_Western Wear:568","Women_Outerwear_Fusion Wear:569","Women_Outerwear_Night Suits:570","Women_Outerwear_Casual Wear_Tops:574","Women_Outerwear_Casual Wear_Bottoms:575","Women_Outerwear_Casual Wear_Drape Wear:577","Women_Outerwear_Formal Wear_Tops:578","Women_Outerwear_Formal Wear_Bottoms:579","Women_Outerwear_Formal Wear_Suits:580","Women_Outerwear_Ethnic Wear_Tops:582","Women_Outerwear_Ethnic Wear_Bottoms:583","Women_Outerwear_Ethnic Wear_Drape Wear:584","Women_Outerwear_Ethnic Wear_Suits:585","Women_Outerwear_Sportswear_Tops:587","Women_Outerwear_Sportswear_Bottoms:588","Women_Outerwear_Sportswear_Sets:589","Women_Outerwear_Occasion Wear_Tops:590","Women_Outerwear_Occasion Wear_Bottoms:591","Women_Outerwear_Occasion Wear_Drape Wear:592","Women_Outerwear_Occasion Wear_Suits:593","Women_Outerwear_Western Wear_Tops:595","Women_Outerwear_Western Wear_Bottoms:596","Women_Outerwear_Western Wear_Drape Wear:597","Women_Outerwear_Western Wear_Suits:598","Women_Outerwear_Fusion Wear_Tops:600","Women_Outerwear_Fusion Wear_Bottoms:601","Women_Outerwear_Fusion Wear_Drape Wear:602","Women_Outerwear_Fusion Wear_Suits:603","Cases & Covers:177","Power Banks:178","Micro SD Cards:179","Adapter & Cables:180","Batteries:181","Chargers:182","Screen Protectors:183","Bluetooth Handsets:184","Ear Phones:185","Speakers:186","Mobile & Tablet Keyboards:187","ACTIVE:188","Laptop:189","Basic Phone:204","IOS:205","Android:206","Windows:207","Tizen OS:208","Blackberry OS:209","2G:210","3G:211","4G:212","2G:213","3G:214","4G:215","LCD:218","LED:219","TFT:220","Pen Drive:221","External H. D:222","Internal H D:223","SSD:224","RAM:225","Wired:226","Wireless:227","Wired:228","Wireless:229","Wired:230","Wireless:231","Ink Jet:235","Laser:236","Ink Jet:237","Laser:238","Android:546","IOS\r\n:547","Windows:548","Compatible with OS\r\n:552","Non compatible with OS\r\n:553","Women_Innerwear_Top Wear:559","Women_Innerwear_Bottom Wear:560","Women_Innerwear_Complete set:561","Women_Innerwear_Two Pc:562","Women_Outerwear_Casual Wear_Dresses:576","Women_Outerwear_Formal Wear_Dresses:581","Women_Outerwear_Ethnic Wear_Dresses:586","Women_Outerwear_Occasion Wear_Dresses:594","Women_Outerwear_Western Wear_Dresses:599","Women_Outerwear_Fusion Wear_Dresses:604","Women_Outerwear_Night Suits_Complete Set:605","Women_Outerwear_Casual Wear_Tops_Shirts:637","Women_Outerwear_Casual Wear_Tops_Tank tops and Sphagetti:638","Women_Outerwear_Casual Wear_Tops_T Shirts:639","Women_Outerwear_Casual Wear_Tops_Sweatshirts:640","Women_Outerwear_Casual Wear_Tops_Shrugs:641","Women_Outerwear_Casual Wear_Tops_Jackets:642","Women_Outerwear_Casual Wear_Tops_Sweater:643","Women_Outerwear_Casual Wear_Tops_Waistcoat:644","Women_Outerwear_Casual Wear_Tops_Kurta and Kurti:645","Women_Outerwear_Casual Wear_Bottoms_Denim:646","Women_Outerwear_Casual Wear_Bottoms_Trousers:647","Women_Outerwear_Casual Wear_Bottoms_Bermuda:648","Women_Outerwear_Casual Wear_Bottoms_Shorts:649","Women_Outerwear_Casual Wear_Bottoms_Skirts:650","Women_Outerwear_Casual Wear_Bottoms_Leggings:651","Women_Outerwear_Casual Wear_Bottoms_Plazzo:652","Women_Outerwear_Casual Wear_Bottoms_Jumpsuits:653","Women_Outerwear_Casual Wear_Bottoms_Capri:654","Women_Outerwear_Casual Wear_Bottoms_Wrap Around Skirts:655","Women_Outerwear_Casual Wear_Bottoms_Patiala:656","Women_Outerwear_Casual Wear_Drape Wear_Dupatta:657","Women_Outerwear_Formal Wear_Tops_Shirts:658","Women_Outerwear_Formal Wear_Tops_Blouses:659","Women_Outerwear_Formal Wear_Tops_Blazers:660","Women_Outerwear_Formal Wear_Bottoms_Skirts:661","Women_Outerwear_Formal Wear_Bottoms_Trousers:662","Women_Outerwear_Formal Wear_Suits_2 Pc:663","Women_Outerwear_Ethnic Wear_Tops_Long Kurtis:664","Women_Outerwear_Ethnic Wear_Tops_Blouses:665","Women_Outerwear_Ethnic Wear_Tops_Kurta:666","Women_Outerwear_Ethnic Wear_Bottoms_Churidar:667","Women_Outerwear_Ethnic Wear_Bottoms_Pyjama Pant and Plazzo:668","Women_Outerwear_Ethnic Wear_Bottoms_Leggings:669","Women_Outerwear_Ethnic Wear_Bottoms_Lehenga:670","Women_Outerwear_Ethnic Wear_Bottoms_Patiala Salwars:671","Women_Outerwear_Ethnic Wear_Bottoms_Skirts:672","Women_Outerwear_Ethnic Wear_Drape Wear_Saree:673","Women_Outerwear_Ethnic Wear_Drape Wear_Scarves:674","Women_Outerwear_Ethnic Wear_Drape Wear_Stole:675","Women_Outerwear_Ethnic Wear_Drape Wear_Shawls:676","Women_Outerwear_Ethnic Wear_Drape Wear_Dupatta:677","Women_Outerwear_Ethnic Wear_Suits_Salwar Suit Set:678","Women_Outerwear_Ethnic Wear_Suits_Lehenga Suit Set:679","Women_Outerwear_Ethnic Wear_Suits_Plazzo Suit Set:680","Women_Outerwear_Ethnic Wear_Suits_Churidar Suit Set:681","Women_Outerwear_Sportswear_Tops_T Shirts:682","Women_Outerwear_Sportswear_Tops_Jacket:683","Women_Outerwear_Sportswear_Tops_Tank Top:684","Women_Outerwear_Sportswear_Bottoms_Track Pant:685","Women_Outerwear_Sportswear_Bottoms_Skorts:686","Women_Outerwear_Sportswear_Bottoms_Shorts:687","Women_Outerwear_Sportswear_Sets_2 Pc Track Set:688","Women_Outerwear_Occasion Wear_Tops_Kurta and Kurti:689","Women_Outerwear_Occasion Wear_Tops_Blouses:690","Women_Outerwear_Occasion Wear_Tops_Dresses:691","Women_Outerwear_Occasion Wear_Bottoms_Churidar:692","Women_Outerwear_Occasion Wear_Bottoms_Pyjama Pant and Plazzo:693","Women_Outerwear_Occasion Wear_Bottoms_Legging:694","Women_Outerwear_Occasion Wear_Bottoms_Lehenga:695","Women_Outerwear_Occasion Wear_Bottoms_Patiala Salwars:696","Women_Outerwear_Occasion Wear_Bottoms_Skirts:697","Women_Outerwear_Occasion Wear_Drape Wear_Saree:698","Women_Outerwear_Occasion Wear_Drape Wear_Scarves:699","Women_Outerwear_Occasion Wear_Drape Wear_Stole:700","Women_Outerwear_Occasion Wear_Drape Wear_Shawls:701","Women_Outerwear_Occasion Wear_Drape Wear_Dupatta:702","Women_Outerwear_Occasion Wear_Suits_Salwar Suit Set:703","Women_Outerwear_Occasion Wear_Suits_Lehenga Suit Set:704","Women_Outerwear_Occasion Wear_Suits_Plazzo Suit Set:705","Women_Outerwear_Occasion Wear_Suits_Churidar Suit Set:706","Women_Outerwear_Western Wear_Tops_Long Kurtis:707","Women_Outerwear_Western Wear_Tops_Blouses:708","Women_Outerwear_Western Wear_Tops_Shirts:709","Women_Outerwear_Western Wear_Tops_Tunics:710","Women_Outerwear_Western Wear_Tops_Shrugs:711","Women_Outerwear_Western Wear_Bottoms_Churidar:712","Women_Outerwear_Western Wear_Bottoms_Pyjama Pant and Plazzo:713","Women_Outerwear_Western Wear_Bottoms_Legging:714","Women_Outerwear_Western Wear_Bottoms_Lehenga:715","Women_Outerwear_Western Wear_Bottoms_Patiala Salwars:716","Women_Outerwear_Western Wear_Bottoms_Skirts:717","Women_Outerwear_Western Wear_Bottoms_Jumpsuits:718","Women_Outerwear_Western Wear_Drape Wear_Saree:719","Women_Outerwear_Western Wear_Drape Wear_Scarves:720","Women_Outerwear_Western Wear_Drape Wear_Stole:721","Women_Outerwear_Western Wear_Drape Wear_Shawls:722","Women_Outerwear_Western Wear_Drape Wear_Dupatta:723","Women_Outerwear_Western Wear_Suits_Salwar Suit Set:724","Women_Outerwear_Western Wear_Suits_Lehenga Suit Set:725","Women_Outerwear_Western Wear_Suits_Plazzo Suit Set:726","Women_Outerwear_Western Wear_Suits_Churidar Suit Set:727","Women_Outerwear_Fusion Wear_Tops_Long Kurtis:728","Women_Outerwear_Fusion Wear_Tops_Blouses:729","Women_Outerwear_Fusion Wear_Bottoms_Churidar:730","Women_Outerwear_Fusion Wear_Bottoms_Pyjama Pant and Plazzo:731","Women_Outerwear_Fusion Wear_Bottoms_Legging:732","Women_Outerwear_Fusion Wear_Bottoms_Lehenga:733","Women_Outerwear_Fusion Wear_Bottoms_Patiala Salwars:734","Women_Outerwear_Fusion Wear_Bottoms_Skirts:735","Women_Outerwear_Fusion Wear_Drape Wear_Saree:736","Women_Outerwear_Fusion Wear_Drape Wear_Scarves:737","Women_Outerwear_Fusion Wear_Drape Wear_Stole:738","Women_Outerwear_Fusion Wear_Drape Wear_Shawls:739","Women_Outerwear_Fusion Wear_Drape Wear_Dupatta:740","Women_Outerwear_Fusion Wear_Suits_Salwar Suit Set:741","Women_Outerwear_Fusion Wear_Suits_Lehenga Suit Set:742","Women_Outerwear_Fusion Wear_Suits_Plazzo Suit Set:743","Women_Outerwear_Fusion Wear_Suits_Churidar Suit Set:744","Men:746","Men_Innerwear:747","Men_Outerwear:748","Men_Outerwear_Shirts:752","Men_Outerwear_Trousers:753","Men_Outerwear_Denim:754","Men_Outerwear_Suits:755","Men_Outerwear_Ethnic Wear:756","Men_Outerwear_Accessories:757","Men_Outerwear_T Shirts:758","Men_Outerwear_Shorts:759","Men_Outerwear_Bermuda:760","Men_Outerwear_Sportswear:761","Men_Outerwear_Jackets:762","Men_Outerwear_Jackets_Winter Jackets:803","Men_Innerwear_Top Wear:750","Men_Innerwear_Bottom Wear:751","Men_Outerwear_Shirts_Formal Wear:765","Men_Outerwear_Shirts_Smart Casual:766","Men_Outerwear_Shirts_Party Wear:767","Men_Outerwear_Shirts_Designer Wear:768","Men_Outerwear_Trousers_Formal Wear:769","Men_Outerwear_Trousers_Smart Casual:770","Men_Outerwear_Trousers_Party Wear:771","Men_Outerwear_Trousers_Designer Wear:772","Men_Outerwear_Denim_Regular Wear:773","Men_Outerwear_Denim_Luxury:774","Men_Outerwear_Suits_Formal Wear:775","Men_Outerwear_Suits_Designer:776","Men_Outerwear_Suits_Luxury:777","Men_Outerwear_Ethnic Wear_Sherwani:778","Men_Outerwear_Ethnic Wear_Churidar:779","Men_Outerwear_Ethnic Wear_Kurtas:780","Men_Outerwear_Ethnic Wear_Jackets:781","Men_Outerwear_Ethnic Wear_Dhoti:782","Men_Outerwear_Accessories_Ties:783","Men_Outerwear_Accessories_Hankerchiefs:784","Men_Outerwear_Accessories_Cuff Links:785","Men_Outerwear_Accessories_Belts:786","Men_Outerwear_T Shirts_Polo Neck:787","Men_Outerwear_T Shirts_Crew Neck:788","Men_Outerwear_T Shirts_V Neck:789","Men_Outerwear_T Shirts_Turtle Neck:790","Men_Outerwear_T Shirts_Round Neck:791","Men_Outerwear_T Shirts_Stand Collar:792","Men_Outerwear_Shorts_Smart Casual:793","Men_Outerwear_Shorts_Beachwear:794","Men_Outerwear_Bermuda_Smart Casual:795","Men_Outerwear_Bermuda_Beachwear:796","Men_Outerwear_Sportswear_Track Pants:797","Men_Outerwear_Sportswear_Track Suits:798","Men_Outerwear_Jackets_Cardigans:799","Men_Outerwear_Jackets_Long Coats:800","Men_Outerwear_Jackets_Sweat Shirts and Hoodies:801","Men_Outerwear_Jackets_Wind Sheeter:802","Men_Outerwear_Jackets_Waist coat:804","Men_Outerwear_Jackets_Blazer:805","Men_Outerwear_Jackets_Winter Jackets_Wollen Jackets:828","Men_Outerwear_Jackets_Winter Jackets_Polyfil Jackets:829","Men_Outerwear_Jackets_Winter Jackets_Fur Jackets:830","Men_Outerwear_Jackets_Winter Jackets_Denim Jackets:831","Kids:836","Kids_Boy:837","Kids_Girl:838","Kids_Boy_Bermudas:840","Kids_Boy_Denims:841","Kids_Boy_Dungaree:842","Kids_Boy_Ethnic:843","Kids_Boy_Outerwear:844","Kids_Boy_Shirts:845","Kids_Boy_Shorts:846","Kids_Boy_Sports Wear:847","Kids_Boy_Tees:848","Kids_Boy_Trousers:849","Kids_Girl_Accessories:850","Kids_Girl_Blouses:851","Kids_Girl_Capris:852","Kids_Girl_Denims:853","Kids_Girl_Dresses:854","Kids_Girl_Ethnic:855","Kids_Girl_Jumpers:856","Kids_Girl_Outer Wear:857","Kids_Girl_Skirts:858","Kids_Girl_Sports:859","Kids_Girl_Tees:860","Kids_Girl_Trousers:861","Kids_Boy_Bermudas_Premium:871","Kids_Boy_Bermudas_Regular:872","Kids_Boy_Denims_Premium:873","Kids_Boy_Denims_Regular:874","Kids_Boy_Dungaree_Premium:875","Kids_Boy_Dungaree_Regular:876","Kids_Boy_Ethnic_Chudidar:877","Kids_Boy_Ethnic_Dhoti:878","Kids_Boy_Ethnic_Indian Jackets:879","Kids_Boy_Ethnic_Kurtas:880","Kids_Boy_Ethnic_Sherwani:881","Kids_Boy_Outerwear_Blazzers:882","Kids_Boy_Outerwear_Denim Jackets:883","Kids_Boy_Outerwear_Hoodies and Sweat Shirts:884","Kids_Boy_Outerwear_Leather Jackets:885","Kids_Boy_Outerwear_Sweaters:886","Kids_Boy_Outerwear_Wind Sheeter:887","Kids_Boy_Outerwear_Winterwear Jackets:888","Kids_Boy_Shirts_Premium:889","Kids_Boy_Shirts_Regular:890","Kids_Boy_Shorts_Premium:891","Kids_Boy_Shorts_Regular:892","Kids_Boy_Sports Wear_Shorts:893","Kids_Boy_Sports Wear_Sports Tees:894","Kids_Boy_Sports Wear_Track Pants:895","Kids_Boy_Sports Wear_Track Suits:896","Kids_Boy_Tees_Premium:897","Kids_Boy_Tees_Regular:898","Kids_Boy_Trousers_Premium:899","Kids_Boy_Trousers_Regular:900","Kids_Girl_Accessories_Fashion Accessories:901","Kids_Girl_Accessories_Gift Sets New Born:902","Kids_Girl_Accessories_Gloves:903","Kids_Girl_Accessories_Hats:904","Kids_Girl_Accessories_Mufflers:905","Kids_Girl_Blouses_Premium:906","Kids_Girl_Blouses_Regular:907","Kids_Girl_Capris_Regular:908","Kids_Girl_Denims_Premium:909","Kids_Girl_Denims_Regular:910","Kids_Girl_Dresses_Designer wear:911","Kids_Girl_Dresses_Occasion:912","Kids_Girl_Dresses_Regular:913","Kids_Girl_Ethnic_Chudidars:914","Kids_Girl_Ethnic_Drape Wear:915","Kids_Girl_Ethnic_Kurtis:916","Kids_Girl_Ethnic_Lehngas:917","Kids_Girl_Ethnic_Salwar Kameez:918","Kids_Girl_Jumpers_Regular:919","Kids_Girl_Outer Wear_Blazers:920","Kids_Girl_Outer Wear_Denim Jackets:921","Kids_Girl_Outer Wear_Hoodies and Sweat Shirts:922","Kids_Girl_Outer Wear_Leather Jackets:923","Kids_Girl_Outer Wear_Shrugs:924","Kids_Girl_Outer Wear_Sweaters:925","Kids_Girl_Outer Wear_Wind Sheeters:926","Kids_Girl_Outer Wear_Winter Jackets:927","Kids_Girl_Skirts_Designer wear:928","Kids_Girl_Skirts_Occasion:929","Kids_Girl_Skirts_Regular:930","Kids_Girl_Sports_Scots:931","Kids_Girl_Sports_Sports Tees:932","Kids_Girl_Sports_Track Pants:933","Kids_Girl_Sports_Track Suits:934","Kids_Girl_Tees_Premium:935","Kids_Girl_Tees_Regular:936","Kids_Girl_Trousers_Regular:937","Selfie Stick:1000","Cables:1011","Suits:1007","Salwar Suit Set:1008","AUX:1012","Salwar, Suit & Dupatta Material:1018","Salwar, Suit & Dupatta Material:1022","Home & Furniture:1051","Decor:1065","Accent Decor:1035","Clocks:1036","Garden & Outdoor:1032","Lamps & Lights:1033","Wall Decor:1039","Utility Decor:1040","Religion & Spirituality:1038","Artificial Flowers:1063","Candle & Fragrances:1064","Flower Vases:1066","Handicrafts:1059","Lanterns:1060","Vintage:1061","Wall Sconce:1062","Wind Chimes:1058","Table Clocks:1049","Wall Clocks:1050","Garden Decor:1037","Garden Tools:1044","Pots & Planters:1043","Watering Canes:1041","Chandeliers:1025","Ceiling Lamps:1024","Floor Lamps:1027","Lamp Shade And Lamp Base:1026","LED Bulbs & CFLs:1029","Outdoor Lamps:1028","Table Lamps:1031","Wall Lamps:1030","Mirrors:1069","Paintings:1068","Photo Frames:1067","Posters:1074","Wall Arts:1073","Wall Hangings:1072","Wall Stickers:1071","Wall Shelves:1070","Decorative Boxes:1053","Gift Box:1052","Hookah:1055","Knobs:1054","Table Top:1057","Wooden Games:1056","Diyas:1042","Fengshui:1047","God Idols:1048","Incense Sticks & Dhoop:1045","Mandir:1046","Pooja Accessories:1034","With SIM:1023","L Shaped Sofas:1075","Water Bottles:1076","Recliners:1077","Sofas:1078","Sofa Cum Beds:1079","Inflatable Sofas:1080","Living Room Sets:1081","Chaise Lounges & Settees:1082","Futons:1083","Casseroles:1084","Chillers & Coolers:1085","Ice Trays:1086","Lunch Boxes:1087","Flasks & Thermos:1088","Containers:1089","Spares & Accessories:1090","Plastic Chairs:1091","Rocking Chairs:1092","Tandoor:1093","Barbeque:1094","Coffee & Center Tables:1095","Bed Side & End Tables:1096","Laptop Tables:1097","Office Desks:1098","Dressing Tables:1099","Nesting Tables:1100","Computer & Study Tables:1101","Audio and Video:1102","Landline Phones:1103","Camera Accessories:1104","Camera:1105","Microwave Cooking:1106","Tawa & Kadhai:1107","Plates:1108","Dinner Sets:1109","Bowls:1110","Outer Lid:1111","Inner Lid:1112","Collapsible Wardrobes:1113","Chest Of Drawers:1114","Sliding Door Wardrobes:1115","3 Doors:1116","4 & More Doors:1117","Single Door:1119","Coffee Mugs & Makers:1118","Tea Sets & Kettles:1120","2 Doors:1121","Bar & Glassware:1122","Serveware:1123","Table Accessories:1124","Cutlery:1125","Dinnerware:1126","Home Furnishing:1127","Kitchenware:1128","Furniture:1129","Queen Size Beds:1130","King Size Beds:1131","Bed & Wardrobe Sets:1132","Bunk & Loft Beds:1133","Bakeware:1134","Barbeques & Tandoor:1135","Single Beds:1136","Cookware Sets:1137","Pots & Pans:1138","Pressure Cookers:1139","Steamers & Idli Makers:1140","Pathri Tawa:1141","Dosa & Flat Tawa:1142","Concave Tawa:1143","Lounge & Reception Chairs:1144","Student Chairs:1145","Folding Chairs:1146","Accent Chairs:1147","Cafeteria Chairs:1148","Office Chairs:1149","Binoculars:1150","Camera Battery Chargers:1151","Bean Bag Refills:1152","Bean Bags with beans:1153","Bean Bag Covers:1154","Processors:1155","Network Devices:1156","Web Cam:1157","HDMI:1158","HDF Moulded Doors:1159","Teak Veneer Doors:1160","Double Leaf Doors:1161","Wooden Doors:1162","Routers:1163","Data Cards:1164","Speakers:1165","Cordless Phones:1166","USB:1167","Network:1168","Coax Audio:1169","Corded Phones:1170","Bedding Sets:1171","Duvet Covers:1172","Bedsheets:1173","Blankets, Quilts & Dohars:1174","Display Units & Bookshelves:1175","Cabinets:1176","Shoe Storage:1177","TV Units & Media Chests:1178","Mobile and Tablet:1179","Home Audio:1180","Laptop and Desktop:1181","Bed & Living:1182","Curtains & Accessories:1183","Cushions, Pillows and Bolster:1184","Pillows fillers with covers:1185","Bolster fillers with covers:1186","Cushions Covers:1187","Pillow Covers:1188","Bar Tables:1189","Bar Cabinets:1190","Dining Sets:1191","Cushions fillers with covers:1192","Dining Tables:1193","Wine Racks:1194","Serving Carts:1195","Bar Stools:1196","Dining Chairs:1197","Sofa Covers:1198","Cushion Covers:1199","Quilt Battings:1200","Sofa Fabric:1201","Diwan Sets:1202","Bed Skirts:1203","Bed Covers:1204","Mattress Protectors:1205","Mosquito Nets:1206","Curtains:1207","Stoppers & Pourers:1208","Outdoor Dining & Side Tables:1209","Curtain Accessories:1210","Stirrers & Straws:1211","Loungers:1212","Whiskey Glasses:1213","Outdoor Sofas:1214","Water & Juice Glasses:1215","Outdoor Benches:1216","Wine Glasses:1217","Wine Coolers:1218","Curtain Fabric:1219","Outdoor Chairs & Stools:1220","WineHolders, Racks & Boxes:1221","Outdoor Sets:1222","IceBuckets & Tongs:1223","Hip Flasks:1224","Jugs:1225","Jug & GlassSets:1226","Measurers:1227","Umbrellas:1228","Martini Glasses:1229","Hammock Stands & Accessories:1230","Shot Glasses:1231","Openers:1232","Swings & Hammocks:1233","Ash Trays:1234","Bar Sets:1235","Cookware:1236","Bar Trays:1237","Bakeware Moulds & Tins:1238","Beer Glasses:1239","Champagne Glasses:1240","Cigarette & CigarHolder:1241","Decanters, Shakers & Muddlers:1242","Drinking Games:1243","Bolster fillers:1244","Pillows fillers:1245","Cushions fillers:1246","Bolster Covers:1247","Kitchen Tools:1248","Bakeware Sets:1249","Combo fillers with Covers:1250","Baking Dishes & Casseroles:1251","Dining & Serving:1252","Combo Covers:1253","Baking Tools & Accessories:1254","Combo fillers:1255","Storage & Thermoware:1256","Chair & Table Sets:1257","Storage & Display:1258","Tables & Desks:1259","Chairs & Stools:1260","Kids Beds:1261","Doors:1262","Kids Room Sets:1263","Chairs:1264","Bean Bags:1265","Outdoor & Garden:1266","Kids Room:1267","Storage & Displays:1268","Dining Sets & Bar Units:1269","Wardrobes:1270","Beds:1271","Sofas & Seatings:1272","Tables & Desks:1273","Footwear_Men_Sports Shoes:1274","Footwear_Women_Casual:1275","Footwear_Men_Formal:1276","Footwear:1277","Footwear_Men:1278","Footwear_Kids:1279","Footwear_Women:1280","Footwear_Men_Casual:1281","Women_Outerwear_Casual Wear_Tops_Blouses:1284","Kids_Girl_Tops:1285","Kids_Girl_Tops_Sweatshirt:1286","Kids_Girl_Tops_Tunic with Legging:1287","Kids_Girl_Tops_Tunic:1288","Tadka Pan:1289","Kadhai & Wok:1290","Deep Fry Pan:1291","Fry Pan:1292","Handi:1293","Saucepan:1294","Kurtas:1295","Kurta and Kurti:1297","Casual Wear:1298","Jackets:1296","Scarves:1299","Kaftan:1300","Women_Outerwear_Casual Wear_Bottoms_Jeggings:1302","Women_Outerwear_Casual Wear_Bottoms_Wrap AND Sarong Skirts:1301"];
                 
                        var customeProductHomeId=getCategoryId($stateParams.categoryName,JSON.stringify(jsonVar));                              
                         $cookies.put('categoryId',customeProductHomeId);
                       }             
                       $rootScope.pageNo=0;
                       $rootScope.sortType='price'
                       var formData={
                        'categoryId': $cookies.get('categoryId')
                       }
                      return filterService.getProductByFilter(formData,$rootScope.pageNo,$rootScope.sortType);
                        
                      
          }
        }
        }).state('gobazarlite.filterlisting', {
          url: '/:categoryName-listing/:eventName/:filterUrl/lst',
          views: {
            '@':{
              templateUrl: 'views/pages/listing.html',
              controller: 'FilterCtrl'
            }
          },
          resolve:{
            getProducts:function($location,$rootScope,filterService,$cookies,$stateParams){ 
                      if($stateParams.categoryName!=undefined || $stateParams.categoryName!='undefined'){
                        var jsonVar=["Electronics:1","Mobiles:166","Tablets:167","Mobile & Tablet Accessories:168","Computers:169","Computer Accessories:170","Feature Phones:173","Smart Phones:174","Without Calling:175","With Calling:176","Printers & Scanners:190","Monitor:191","Storage Device:192","Mouse:193","Keyboards:194","Speakers:195","Single Function:216","Multifunction:217","Wearable Devices:545","Smart Watches:549","Fitness Band:551","Fashion:554","Women:555","Women_Innerwear:556","Women_Outerwear:557","Women_Outerwear_Casual Wear:563","Women_Outerwear_Formal Wear:564","Women_Outerwear_Ethnic Wear:565","Women_Outerwear_Sportswear:566","Women_Outerwear_Occasion Wear:567","Women_Outerwear_Western Wear:568","Women_Outerwear_Fusion Wear:569","Women_Outerwear_Night Suits:570","Women_Outerwear_Casual Wear_Tops:574","Women_Outerwear_Casual Wear_Bottoms:575","Women_Outerwear_Casual Wear_Drape Wear:577","Women_Outerwear_Formal Wear_Tops:578","Women_Outerwear_Formal Wear_Bottoms:579","Women_Outerwear_Formal Wear_Suits:580","Women_Outerwear_Ethnic Wear_Tops:582","Women_Outerwear_Ethnic Wear_Bottoms:583","Women_Outerwear_Ethnic Wear_Drape Wear:584","Women_Outerwear_Ethnic Wear_Suits:585","Women_Outerwear_Sportswear_Tops:587","Women_Outerwear_Sportswear_Bottoms:588","Women_Outerwear_Sportswear_Sets:589","Women_Outerwear_Occasion Wear_Tops:590","Women_Outerwear_Occasion Wear_Bottoms:591","Women_Outerwear_Occasion Wear_Drape Wear:592","Women_Outerwear_Occasion Wear_Suits:593","Women_Outerwear_Western Wear_Tops:595","Women_Outerwear_Western Wear_Bottoms:596","Women_Outerwear_Western Wear_Drape Wear:597","Women_Outerwear_Western Wear_Suits:598","Women_Outerwear_Fusion Wear_Tops:600","Women_Outerwear_Fusion Wear_Bottoms:601","Women_Outerwear_Fusion Wear_Drape Wear:602","Women_Outerwear_Fusion Wear_Suits:603","Cases & Covers:177","Power Banks:178","Micro SD Cards:179","Adapter & Cables:180","Batteries:181","Chargers:182","Screen Protectors:183","Bluetooth Handsets:184","Ear Phones:185","Speakers:186","Mobile & Tablet Keyboards:187","ACTIVE:188","Laptop:189","Basic Phone:204","IOS:205","Android:206","Windows:207","Tizen OS:208","Blackberry OS:209","2G:210","3G:211","4G:212","2G:213","3G:214","4G:215","LCD:218","LED:219","TFT:220","Pen Drive:221","External H. D:222","Internal H D:223","SSD:224","RAM:225","Wired:226","Wireless:227","Wired:228","Wireless:229","Wired:230","Wireless:231","Ink Jet:235","Laser:236","Ink Jet:237","Laser:238","Android:546","IOS\r\n:547","Windows:548","Compatible with OS\r\n:552","Non compatible with OS\r\n:553","Women_Innerwear_Top Wear:559","Women_Innerwear_Bottom Wear:560","Women_Innerwear_Complete set:561","Women_Innerwear_Two Pc:562","Women_Outerwear_Casual Wear_Dresses:576","Women_Outerwear_Formal Wear_Dresses:581","Women_Outerwear_Ethnic Wear_Dresses:586","Women_Outerwear_Occasion Wear_Dresses:594","Women_Outerwear_Western Wear_Dresses:599","Women_Outerwear_Fusion Wear_Dresses:604","Women_Outerwear_Night Suits_Complete Set:605","Women_Outerwear_Casual Wear_Tops_Shirts:637","Women_Outerwear_Casual Wear_Tops_Tank tops and Sphagetti:638","Women_Outerwear_Casual Wear_Tops_T Shirts:639","Women_Outerwear_Casual Wear_Tops_Sweatshirts:640","Women_Outerwear_Casual Wear_Tops_Shrugs:641","Women_Outerwear_Casual Wear_Tops_Jackets:642","Women_Outerwear_Casual Wear_Tops_Sweater:643","Women_Outerwear_Casual Wear_Tops_Waistcoat:644","Women_Outerwear_Casual Wear_Tops_Kurta and Kurti:645","Women_Outerwear_Casual Wear_Bottoms_Denim:646","Women_Outerwear_Casual Wear_Bottoms_Trousers:647","Women_Outerwear_Casual Wear_Bottoms_Bermuda:648","Women_Outerwear_Casual Wear_Bottoms_Shorts:649","Women_Outerwear_Casual Wear_Bottoms_Skirts:650","Women_Outerwear_Casual Wear_Bottoms_Leggings:651","Women_Outerwear_Casual Wear_Bottoms_Plazzo:652","Women_Outerwear_Casual Wear_Bottoms_Jumpsuits:653","Women_Outerwear_Casual Wear_Bottoms_Capri:654","Women_Outerwear_Casual Wear_Bottoms_Wrap Around Skirts:655","Women_Outerwear_Casual Wear_Bottoms_Patiala:656","Women_Outerwear_Casual Wear_Drape Wear_Dupatta:657","Women_Outerwear_Formal Wear_Tops_Shirts:658","Women_Outerwear_Formal Wear_Tops_Blouses:659","Women_Outerwear_Formal Wear_Tops_Blazers:660","Women_Outerwear_Formal Wear_Bottoms_Skirts:661","Women_Outerwear_Formal Wear_Bottoms_Trousers:662","Women_Outerwear_Formal Wear_Suits_2 Pc:663","Women_Outerwear_Ethnic Wear_Tops_Long Kurtis:664","Women_Outerwear_Ethnic Wear_Tops_Blouses:665","Women_Outerwear_Ethnic Wear_Tops_Kurta:666","Women_Outerwear_Ethnic Wear_Bottoms_Churidar:667","Women_Outerwear_Ethnic Wear_Bottoms_Pyjama Pant and Plazzo:668","Women_Outerwear_Ethnic Wear_Bottoms_Leggings:669","Women_Outerwear_Ethnic Wear_Bottoms_Lehenga:670","Women_Outerwear_Ethnic Wear_Bottoms_Patiala Salwars:671","Women_Outerwear_Ethnic Wear_Bottoms_Skirts:672","Women_Outerwear_Ethnic Wear_Drape Wear_Saree:673","Women_Outerwear_Ethnic Wear_Drape Wear_Scarves:674","Women_Outerwear_Ethnic Wear_Drape Wear_Stole:675","Women_Outerwear_Ethnic Wear_Drape Wear_Shawls:676","Women_Outerwear_Ethnic Wear_Drape Wear_Dupatta:677","Women_Outerwear_Ethnic Wear_Suits_Salwar Suit Set:678","Women_Outerwear_Ethnic Wear_Suits_Lehenga Suit Set:679","Women_Outerwear_Ethnic Wear_Suits_Plazzo Suit Set:680","Women_Outerwear_Ethnic Wear_Suits_Churidar Suit Set:681","Women_Outerwear_Sportswear_Tops_T Shirts:682","Women_Outerwear_Sportswear_Tops_Jacket:683","Women_Outerwear_Sportswear_Tops_Tank Top:684","Women_Outerwear_Sportswear_Bottoms_Track Pant:685","Women_Outerwear_Sportswear_Bottoms_Skorts:686","Women_Outerwear_Sportswear_Bottoms_Shorts:687","Women_Outerwear_Sportswear_Sets_2 Pc Track Set:688","Women_Outerwear_Occasion Wear_Tops_Kurta and Kurti:689","Women_Outerwear_Occasion Wear_Tops_Blouses:690","Women_Outerwear_Occasion Wear_Tops_Dresses:691","Women_Outerwear_Occasion Wear_Bottoms_Churidar:692","Women_Outerwear_Occasion Wear_Bottoms_Pyjama Pant and Plazzo:693","Women_Outerwear_Occasion Wear_Bottoms_Legging:694","Women_Outerwear_Occasion Wear_Bottoms_Lehenga:695","Women_Outerwear_Occasion Wear_Bottoms_Patiala Salwars:696","Women_Outerwear_Occasion Wear_Bottoms_Skirts:697","Women_Outerwear_Occasion Wear_Drape Wear_Saree:698","Women_Outerwear_Occasion Wear_Drape Wear_Scarves:699","Women_Outerwear_Occasion Wear_Drape Wear_Stole:700","Women_Outerwear_Occasion Wear_Drape Wear_Shawls:701","Women_Outerwear_Occasion Wear_Drape Wear_Dupatta:702","Women_Outerwear_Occasion Wear_Suits_Salwar Suit Set:703","Women_Outerwear_Occasion Wear_Suits_Lehenga Suit Set:704","Women_Outerwear_Occasion Wear_Suits_Plazzo Suit Set:705","Women_Outerwear_Occasion Wear_Suits_Churidar Suit Set:706","Women_Outerwear_Western Wear_Tops_Long Kurtis:707","Women_Outerwear_Western Wear_Tops_Blouses:708","Women_Outerwear_Western Wear_Tops_Shirts:709","Women_Outerwear_Western Wear_Tops_Tunics:710","Women_Outerwear_Western Wear_Tops_Shrugs:711","Women_Outerwear_Western Wear_Bottoms_Churidar:712","Women_Outerwear_Western Wear_Bottoms_Pyjama Pant and Plazzo:713","Women_Outerwear_Western Wear_Bottoms_Legging:714","Women_Outerwear_Western Wear_Bottoms_Lehenga:715","Women_Outerwear_Western Wear_Bottoms_Patiala Salwars:716","Women_Outerwear_Western Wear_Bottoms_Skirts:717","Women_Outerwear_Western Wear_Bottoms_Jumpsuits:718","Women_Outerwear_Western Wear_Drape Wear_Saree:719","Women_Outerwear_Western Wear_Drape Wear_Scarves:720","Women_Outerwear_Western Wear_Drape Wear_Stole:721","Women_Outerwear_Western Wear_Drape Wear_Shawls:722","Women_Outerwear_Western Wear_Drape Wear_Dupatta:723","Women_Outerwear_Western Wear_Suits_Salwar Suit Set:724","Women_Outerwear_Western Wear_Suits_Lehenga Suit Set:725","Women_Outerwear_Western Wear_Suits_Plazzo Suit Set:726","Women_Outerwear_Western Wear_Suits_Churidar Suit Set:727","Women_Outerwear_Fusion Wear_Tops_Long Kurtis:728","Women_Outerwear_Fusion Wear_Tops_Blouses:729","Women_Outerwear_Fusion Wear_Bottoms_Churidar:730","Women_Outerwear_Fusion Wear_Bottoms_Pyjama Pant and Plazzo:731","Women_Outerwear_Fusion Wear_Bottoms_Legging:732","Women_Outerwear_Fusion Wear_Bottoms_Lehenga:733","Women_Outerwear_Fusion Wear_Bottoms_Patiala Salwars:734","Women_Outerwear_Fusion Wear_Bottoms_Skirts:735","Women_Outerwear_Fusion Wear_Drape Wear_Saree:736","Women_Outerwear_Fusion Wear_Drape Wear_Scarves:737","Women_Outerwear_Fusion Wear_Drape Wear_Stole:738","Women_Outerwear_Fusion Wear_Drape Wear_Shawls:739","Women_Outerwear_Fusion Wear_Drape Wear_Dupatta:740","Women_Outerwear_Fusion Wear_Suits_Salwar Suit Set:741","Women_Outerwear_Fusion Wear_Suits_Lehenga Suit Set:742","Women_Outerwear_Fusion Wear_Suits_Plazzo Suit Set:743","Women_Outerwear_Fusion Wear_Suits_Churidar Suit Set:744","Men:746","Men_Innerwear:747","Men_Outerwear:748","Men_Outerwear_Shirts:752","Men_Outerwear_Trousers:753","Men_Outerwear_Denim:754","Men_Outerwear_Suits:755","Men_Outerwear_Ethnic Wear:756","Men_Outerwear_Accessories:757","Men_Outerwear_T Shirts:758","Men_Outerwear_Shorts:759","Men_Outerwear_Bermuda:760","Men_Outerwear_Sportswear:761","Men_Outerwear_Jackets:762","Men_Outerwear_Jackets_Winter Jackets:803","Men_Innerwear_Top Wear:750","Men_Innerwear_Bottom Wear:751","Men_Outerwear_Shirts_Formal Wear:765","Men_Outerwear_Shirts_Smart Casual:766","Men_Outerwear_Shirts_Party Wear:767","Men_Outerwear_Shirts_Designer Wear:768","Men_Outerwear_Trousers_Formal Wear:769","Men_Outerwear_Trousers_Smart Casual:770","Men_Outerwear_Trousers_Party Wear:771","Men_Outerwear_Trousers_Designer Wear:772","Men_Outerwear_Denim_Regular Wear:773","Men_Outerwear_Denim_Luxury:774","Men_Outerwear_Suits_Formal Wear:775","Men_Outerwear_Suits_Designer:776","Men_Outerwear_Suits_Luxury:777","Men_Outerwear_Ethnic Wear_Sherwani:778","Men_Outerwear_Ethnic Wear_Churidar:779","Men_Outerwear_Ethnic Wear_Kurtas:780","Men_Outerwear_Ethnic Wear_Jackets:781","Men_Outerwear_Ethnic Wear_Dhoti:782","Men_Outerwear_Accessories_Ties:783","Men_Outerwear_Accessories_Hankerchiefs:784","Men_Outerwear_Accessories_Cuff Links:785","Men_Outerwear_Accessories_Belts:786","Men_Outerwear_T Shirts_Polo Neck:787","Men_Outerwear_T Shirts_Crew Neck:788","Men_Outerwear_T Shirts_V Neck:789","Men_Outerwear_T Shirts_Turtle Neck:790","Men_Outerwear_T Shirts_Round Neck:791","Men_Outerwear_T Shirts_Stand Collar:792","Men_Outerwear_Shorts_Smart Casual:793","Men_Outerwear_Shorts_Beachwear:794","Men_Outerwear_Bermuda_Smart Casual:795","Men_Outerwear_Bermuda_Beachwear:796","Men_Outerwear_Sportswear_Track Pants:797","Men_Outerwear_Sportswear_Track Suits:798","Men_Outerwear_Jackets_Cardigans:799","Men_Outerwear_Jackets_Long Coats:800","Men_Outerwear_Jackets_Sweat Shirts and Hoodies:801","Men_Outerwear_Jackets_Wind Sheeter:802","Men_Outerwear_Jackets_Waist coat:804","Men_Outerwear_Jackets_Blazer:805","Men_Outerwear_Jackets_Winter Jackets_Wollen Jackets:828","Men_Outerwear_Jackets_Winter Jackets_Polyfil Jackets:829","Men_Outerwear_Jackets_Winter Jackets_Fur Jackets:830","Men_Outerwear_Jackets_Winter Jackets_Denim Jackets:831","Kids:836","Kids_Boy:837","Kids_Girl:838","Kids_Boy_Bermudas:840","Kids_Boy_Denims:841","Kids_Boy_Dungaree:842","Kids_Boy_Ethnic:843","Kids_Boy_Outerwear:844","Kids_Boy_Shirts:845","Kids_Boy_Shorts:846","Kids_Boy_Sports Wear:847","Kids_Boy_Tees:848","Kids_Boy_Trousers:849","Kids_Girl_Accessories:850","Kids_Girl_Blouses:851","Kids_Girl_Capris:852","Kids_Girl_Denims:853","Kids_Girl_Dresses:854","Kids_Girl_Ethnic:855","Kids_Girl_Jumpers:856","Kids_Girl_Outer Wear:857","Kids_Girl_Skirts:858","Kids_Girl_Sports:859","Kids_Girl_Tees:860","Kids_Girl_Trousers:861","Kids_Boy_Bermudas_Premium:871","Kids_Boy_Bermudas_Regular:872","Kids_Boy_Denims_Premium:873","Kids_Boy_Denims_Regular:874","Kids_Boy_Dungaree_Premium:875","Kids_Boy_Dungaree_Regular:876","Kids_Boy_Ethnic_Chudidar:877","Kids_Boy_Ethnic_Dhoti:878","Kids_Boy_Ethnic_Indian Jackets:879","Kids_Boy_Ethnic_Kurtas:880","Kids_Boy_Ethnic_Sherwani:881","Kids_Boy_Outerwear_Blazzers:882","Kids_Boy_Outerwear_Denim Jackets:883","Kids_Boy_Outerwear_Hoodies and Sweat Shirts:884","Kids_Boy_Outerwear_Leather Jackets:885","Kids_Boy_Outerwear_Sweaters:886","Kids_Boy_Outerwear_Wind Sheeter:887","Kids_Boy_Outerwear_Winterwear Jackets:888","Kids_Boy_Shirts_Premium:889","Kids_Boy_Shirts_Regular:890","Kids_Boy_Shorts_Premium:891","Kids_Boy_Shorts_Regular:892","Kids_Boy_Sports Wear_Shorts:893","Kids_Boy_Sports Wear_Sports Tees:894","Kids_Boy_Sports Wear_Track Pants:895","Kids_Boy_Sports Wear_Track Suits:896","Kids_Boy_Tees_Premium:897","Kids_Boy_Tees_Regular:898","Kids_Boy_Trousers_Premium:899","Kids_Boy_Trousers_Regular:900","Kids_Girl_Accessories_Fashion Accessories:901","Kids_Girl_Accessories_Gift Sets New Born:902","Kids_Girl_Accessories_Gloves:903","Kids_Girl_Accessories_Hats:904","Kids_Girl_Accessories_Mufflers:905","Kids_Girl_Blouses_Premium:906","Kids_Girl_Blouses_Regular:907","Kids_Girl_Capris_Regular:908","Kids_Girl_Denims_Premium:909","Kids_Girl_Denims_Regular:910","Kids_Girl_Dresses_Designer wear:911","Kids_Girl_Dresses_Occasion:912","Kids_Girl_Dresses_Regular:913","Kids_Girl_Ethnic_Chudidars:914","Kids_Girl_Ethnic_Drape Wear:915","Kids_Girl_Ethnic_Kurtis:916","Kids_Girl_Ethnic_Lehngas:917","Kids_Girl_Ethnic_Salwar Kameez:918","Kids_Girl_Jumpers_Regular:919","Kids_Girl_Outer Wear_Blazers:920","Kids_Girl_Outer Wear_Denim Jackets:921","Kids_Girl_Outer Wear_Hoodies and Sweat Shirts:922","Kids_Girl_Outer Wear_Leather Jackets:923","Kids_Girl_Outer Wear_Shrugs:924","Kids_Girl_Outer Wear_Sweaters:925","Kids_Girl_Outer Wear_Wind Sheeters:926","Kids_Girl_Outer Wear_Winter Jackets:927","Kids_Girl_Skirts_Designer wear:928","Kids_Girl_Skirts_Occasion:929","Kids_Girl_Skirts_Regular:930","Kids_Girl_Sports_Scots:931","Kids_Girl_Sports_Sports Tees:932","Kids_Girl_Sports_Track Pants:933","Kids_Girl_Sports_Track Suits:934","Kids_Girl_Tees_Premium:935","Kids_Girl_Tees_Regular:936","Kids_Girl_Trousers_Regular:937","Selfie Stick:1000","Cables:1011","Suits:1007","Salwar Suit Set:1008","AUX:1012","Salwar, Suit & Dupatta Material:1018","Salwar, Suit & Dupatta Material:1022","Home & Furniture:1051","Decor:1065","Accent Decor:1035","Clocks:1036","Garden & Outdoor:1032","Lamps & Lights:1033","Wall Decor:1039","Utility Decor:1040","Religion & Spirituality:1038","Artificial Flowers:1063","Candle & Fragrances:1064","Flower Vases:1066","Handicrafts:1059","Lanterns:1060","Vintage:1061","Wall Sconce:1062","Wind Chimes:1058","Table Clocks:1049","Wall Clocks:1050","Garden Decor:1037","Garden Tools:1044","Pots & Planters:1043","Watering Canes:1041","Chandeliers:1025","Ceiling Lamps:1024","Floor Lamps:1027","Lamp Shade And Lamp Base:1026","LED Bulbs & CFLs:1029","Outdoor Lamps:1028","Table Lamps:1031","Wall Lamps:1030","Mirrors:1069","Paintings:1068","Photo Frames:1067","Posters:1074","Wall Arts:1073","Wall Hangings:1072","Wall Stickers:1071","Wall Shelves:1070","Decorative Boxes:1053","Gift Box:1052","Hookah:1055","Knobs:1054","Table Top:1057","Wooden Games:1056","Diyas:1042","Fengshui:1047","God Idols:1048","Incense Sticks & Dhoop:1045","Mandir:1046","Pooja Accessories:1034","With SIM:1023","L Shaped Sofas:1075","Water Bottles:1076","Recliners:1077","Sofas:1078","Sofa Cum Beds:1079","Inflatable Sofas:1080","Living Room Sets:1081","Chaise Lounges & Settees:1082","Futons:1083","Casseroles:1084","Chillers & Coolers:1085","Ice Trays:1086","Lunch Boxes:1087","Flasks & Thermos:1088","Containers:1089","Spares & Accessories:1090","Plastic Chairs:1091","Rocking Chairs:1092","Tandoor:1093","Barbeque:1094","Coffee & Center Tables:1095","Bed Side & End Tables:1096","Laptop Tables:1097","Office Desks:1098","Dressing Tables:1099","Nesting Tables:1100","Computer & Study Tables:1101","Audio and Video:1102","Landline Phones:1103","Camera Accessories:1104","Camera:1105","Microwave Cooking:1106","Tawa & Kadhai:1107","Plates:1108","Dinner Sets:1109","Bowls:1110","Outer Lid:1111","Inner Lid:1112","Collapsible Wardrobes:1113","Chest Of Drawers:1114","Sliding Door Wardrobes:1115","3 Doors:1116","4 & More Doors:1117","Single Door:1119","Coffee Mugs & Makers:1118","Tea Sets & Kettles:1120","2 Doors:1121","Bar & Glassware:1122","Serveware:1123","Table Accessories:1124","Cutlery:1125","Dinnerware:1126","Home Furnishing:1127","Kitchenware:1128","Furniture:1129","Queen Size Beds:1130","King Size Beds:1131","Bed & Wardrobe Sets:1132","Bunk & Loft Beds:1133","Bakeware:1134","Barbeques & Tandoor:1135","Single Beds:1136","Cookware Sets:1137","Pots & Pans:1138","Pressure Cookers:1139","Steamers & Idli Makers:1140","Pathri Tawa:1141","Dosa & Flat Tawa:1142","Concave Tawa:1143","Lounge & Reception Chairs:1144","Student Chairs:1145","Folding Chairs:1146","Accent Chairs:1147","Cafeteria Chairs:1148","Office Chairs:1149","Binoculars:1150","Camera Battery Chargers:1151","Bean Bag Refills:1152","Bean Bags with beans:1153","Bean Bag Covers:1154","Processors:1155","Network Devices:1156","Web Cam:1157","HDMI:1158","HDF Moulded Doors:1159","Teak Veneer Doors:1160","Double Leaf Doors:1161","Wooden Doors:1162","Routers:1163","Data Cards:1164","Speakers:1165","Cordless Phones:1166","USB:1167","Network:1168","Coax Audio:1169","Corded Phones:1170","Bedding Sets:1171","Duvet Covers:1172","Bedsheets:1173","Blankets, Quilts & Dohars:1174","Display Units & Bookshelves:1175","Cabinets:1176","Shoe Storage:1177","TV Units & Media Chests:1178","Mobile and Tablet:1179","Home Audio:1180","Laptop and Desktop:1181","Bed & Living:1182","Curtains & Accessories:1183","Cushions, Pillows and Bolster:1184","Pillows fillers with covers:1185","Bolster fillers with covers:1186","Cushions Covers:1187","Pillow Covers:1188","Bar Tables:1189","Bar Cabinets:1190","Dining Sets:1191","Cushions fillers with covers:1192","Dining Tables:1193","Wine Racks:1194","Serving Carts:1195","Bar Stools:1196","Dining Chairs:1197","Sofa Covers:1198","Cushion Covers:1199","Quilt Battings:1200","Sofa Fabric:1201","Diwan Sets:1202","Bed Skirts:1203","Bed Covers:1204","Mattress Protectors:1205","Mosquito Nets:1206","Curtains:1207","Stoppers & Pourers:1208","Outdoor Dining & Side Tables:1209","Curtain Accessories:1210","Stirrers & Straws:1211","Loungers:1212","Whiskey Glasses:1213","Outdoor Sofas:1214","Water & Juice Glasses:1215","Outdoor Benches:1216","Wine Glasses:1217","Wine Coolers:1218","Curtain Fabric:1219","Outdoor Chairs & Stools:1220","WineHolders, Racks & Boxes:1221","Outdoor Sets:1222","IceBuckets & Tongs:1223","Hip Flasks:1224","Jugs:1225","Jug & GlassSets:1226","Measurers:1227","Umbrellas:1228","Martini Glasses:1229","Hammock Stands & Accessories:1230","Shot Glasses:1231","Openers:1232","Swings & Hammocks:1233","Ash Trays:1234","Bar Sets:1235","Cookware:1236","Bar Trays:1237","Bakeware Moulds & Tins:1238","Beer Glasses:1239","Champagne Glasses:1240","Cigarette & CigarHolder:1241","Decanters, Shakers & Muddlers:1242","Drinking Games:1243","Bolster fillers:1244","Pillows fillers:1245","Cushions fillers:1246","Bolster Covers:1247","Kitchen Tools:1248","Bakeware Sets:1249","Combo fillers with Covers:1250","Baking Dishes & Casseroles:1251","Dining & Serving:1252","Combo Covers:1253","Baking Tools & Accessories:1254","Combo fillers:1255","Storage & Thermoware:1256","Chair & Table Sets:1257","Storage & Display:1258","Tables & Desks:1259","Chairs & Stools:1260","Kids Beds:1261","Doors:1262","Kids Room Sets:1263","Chairs:1264","Bean Bags:1265","Outdoor & Garden:1266","Kids Room:1267","Storage & Displays:1268","Dining Sets & Bar Units:1269","Wardrobes:1270","Beds:1271","Sofas & Seatings:1272","Tables & Desks:1273","Footwear_Men_Sports Shoes:1274","Footwear_Women_Casual:1275","Footwear_Men_Formal:1276","Footwear:1277","Footwear_Men:1278","Footwear_Kids:1279","Footwear_Women:1280","Footwear_Men_Casual:1281","Women_Outerwear_Casual Wear_Tops_Blouses:1284","Kids_Girl_Tops:1285","Kids_Girl_Tops_Sweatshirt:1286","Kids_Girl_Tops_Tunic with Legging:1287","Kids_Girl_Tops_Tunic:1288","Tadka Pan:1289","Kadhai & Wok:1290","Deep Fry Pan:1291","Fry Pan:1292","Handi:1293","Saucepan:1294","Kurtas:1295","Kurta and Kurti:1297","Casual Wear:1298","Jackets:1296","Scarves:1299","Kaftan:1300","Women_Outerwear_Casual Wear_Bottoms_Jeggings:1302","Women_Outerwear_Casual Wear_Bottoms_Wrap AND Sarong Skirts:1301"];
                 
                        var customeProductHomeId=getCategoryId($stateParams.categoryName,JSON.stringify(jsonVar));                              
                         $cookies.put('categoryId',customeProductHomeId);
                       }             
                       $rootScope.pageNo=0;
                       $rootScope.sortType='price'
                       var formData={
                        'categoryId': $cookies.get('categoryId')
                       }
                      //return filterService.getProductByFilter(formData,$rootScope.pageNo,$rootScope.sortType);
                        
                      
          }



        }
        })
        .state('gobazarlite.product', {
          url: '/product-description/:GbuCode/:productName/pdp',
          views: {
            '@':{
              templateUrl: 'views/pages/productdesc.html',
              controller: 'ProductCtrl'
            }
          },
          resolve:{
            productByProductName: function(productService,$stateParams){
             if(typeof($stateParams.GbuCode)!='undefined' && $stateParams.GbuCode!='' && typeof($stateParams.productName)!='undefined' && $stateParams.productName!='')
            {
              var GbuCode = $stateParams.GbuCode;
              var productName = $stateParams.productName;   
              var formData={
                 "productname": productName,
                 "gbucode":GbuCode
                };
              console.log('gbu '+GbuCode+' pName '+productName+' formData ' +JSON.stringify(formData));
              
              return productService.getproductbyname(formData);

            };

            }
          }
        }).state('gobazarlite.cart', {
          url: '/mycart',
          views: {
            '@':{
              templateUrl: 'views/pages/cart.html',
              controller: 'CartCtrl'
            }
          },
          resolve:{
            /*"check":function($location,$cookies,$state,$timeout){ 
                if($cookies.get('customerId'))
                {
                    //$state.go('gobazarlite.cart'); 
                    
                }
                else
                {
               
                    $timeout(function(){
                      $state.go('gobazarlite.home');
                    },1000);
                    
                }
             },*/
            getCartProducts: function(cartService,$cookies){
             console.log($cookies.get('customerId'));
             if($cookies.get('customerId'))
                {
                    var formData={
                     "customerId":$cookies.get('customerId'),
                     "sessionId":$cookies.get('sessionId').toString()
                   }; 
                }
                else
                {
                    var formData={
                    "sessionId":$cookies.get('sessionId').toString()
                   };      
                }
              
              return cartService.getCart(formData);
            }
          }
        })
        .state('gobazarlite.register', {
          url: '/signUp',
          views: {
            '@':{
              templateUrl: 'views/common/register.html',
              controller: 'RegisterCtrl'
            }
          },
          resolve:{
            
          }
        })
        .state('gobazarlite.termsCondition', {
          url: '/terms',
          views: {
            '@':{
              templateUrl: 'views/common/terms.html',
              controller: 'RegisterCtrl'
            }
          },
          resolve:{
            
          }
        })
        .state('gobazarlite.verifyCustomer', {
          url: '/verify',
          views: {
            '@':{
              templateUrl: 'views/common/verifyCustomer.html',
              controller: 'RegisterCtrl'
            }
          },
          resolve:{

          } 
        }).state('gobazarlite.address', {
          url: '/address',
          views: {
            '@':{
              templateUrl: 'views/pages/address.html',
              controller: 'AddressCtrl'
            }
          },
          resolve:{
            getAddress: function(addressService,$cookies){
              
              return addressService.getAddress();
              }
          }
        });
  }).run(function($rootScope,global,liveCategory,$stateParams,$cookies,errorMessage,webSite){
    $rootScope.imageProductListUrl="https:" == document.location.protocol ? "https://" + "static.gobazaar.com/dynamic/products/" : "http://" + "static.gobazaar.com/dynamic/products/";
    $rootScope.hrefPdpUrl='product-description/';
    $rootScope.unitPrice='₹';
    $rootScope.myCartImages="https:" == document.location.protocol ? "https://" + "static.gobazaar.com/dynamic/products/" : "http://" + "static.gobazaar.com/dynamic/products/";
    $rootScope.imageUrl="https:" == document.location.protocol ? "https://" + "static.gobazaar.com/img/" : "http://" + "static.gobazaar.com/img/";
    //window.categoryStates={};
    liveCategory.getLiveCategory().success(function (results) {
      //window.categoryStates=results;

      //var results=JSON.parse(window.categoryStates);
          
          //$log.info("SUCCESS_"+$cookies.get('sessionID')+'_'+$location.path()+'_'+catUrl+" ---- response ---- "+JSON.stringify(results));  
          //$log.info("SUCCESS ---- "+catUrl+" ---- response ---- "+JSON.stringify(results));
            if(results.responseCode=="SUCCESS") 
            {       //$log.info(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,catUrl,results,""));
                              var cName=new Array();
                              var cName1='';
                //              console.log(results.entitiesResponse['0']['baseDTO']['categoryHierarchyWrapperDTOObj'])
                              
                              var dataCategory=results.entitiesResponse['0']['baseDTO']['categoryHierarchyWrapperDTOObj'];
                              for (var i = 0; i < dataCategory.length; i++) {
                                cName[i]=dataCategory[i].categoryName+':'+dataCategory[i].categoryId;
                                cName1=cName1+dataCategory[i].categoryName+',';
                              };
                              // $cookies.put('categoryIdList',JSON.stringify(cName));
                              $rootScope.categoryIdList=JSON.stringify(cName);
                              
                              $rootScope.categoryIdListName=cName1;
                              
              }                 
          })
   $rootScope.requiredEmail=errorMessage.requiredEmail;
   $rootScope.invalidEmail=errorMessage.invalidEmail;
   $rootScope.requiredPassword=errorMessage.requiredPassword;
   $rootScope.validPasswordCharacter=errorMessage.validPasswordCharacter;
   $rootScope.passwordMinMax=errorMessage.passwordMinMax;
   $rootScope.matchConfirmPassword=errorMessage.matchConfirmPassword;
   $rootScope.requiredFirstName=errorMessage.requiredFirstName;
   $rootScope.validFirstName=errorMessage.validFirstName;
   $rootScope.requiredLastName=errorMessage.requiredLastName;
   $rootScope.validLastName=errorMessage.validLastName;
   $rootScope.requiredMobile=errorMessage.requiredMobile;
   $rootScope.mobileDigits=errorMessage.mobileDigits;
   $rootScope.validMobile=errorMessage.validMobile;
   $rootScope.requiredGender=errorMessage.requiredGender;
   $rootScope.acceptTerms=errorMessage.acceptTerms;
   $rootScope.internalServerError=errorMessage.internalServerError;
   $rootScope.mydomain=webSite.mydomain;
   $rootScope.resendVerifyCodeMsg=errorMessage.resendVerifyCodeMsg;
   $rootScope.resendVerifyCodeMsg1=errorMessage.resendVerifyCodeMsg1;
   $rootScope.resendVerifyCodeMsgFail=errorMessage.resendVerifyCodeMsgFail;

   if($cookies.get('customerId')!=undefined)
      {  
       if($cookies.get('firstName')!=undefined && $cookies.get('lastName')!=undefined) {
         $rootScope.customerName=$cookies.get('firstName')+" "+$cookies.get('lastName'); 
         $rootScope.customerFirstName=$cookies.get('firstName');
         $rootScope.customerLastName=$cookies.get('lastName');
       }

       if($cookies.get('alternateMobileNumber')!=undefined) {
        $rootScope.customerAlternateMobileNumber=$cookies.get('alternateMobileNumber');
       } else {
        $rootScope.customerAlternateMobileNumber=null
       }


       if($cookies.get('dateOfBirth')!=undefined) {
        $rootScope.customerDob=$cookies.get('dateOfBirth');
       } else {
        $rootScope.customerDob=null
       }


       if($cookies.get('anniverseryDate')!=undefined) {
        $rootScope.customerAnniverseryDate=$cookies.get('anniverseryDate');
       } else {
        $rootScope.customerAnniverseryDate=null
       }


       if($cookies.get('strDateOfBirth')!=undefined) {
        $rootScope.customerStrDateOfBirth=$cookies.get('strDateOfBirth');
       } else {
        $rootScope.customerStrDateOfBirth=null
       }

       if($cookies.get('strAnniverseryDate')!=undefined) {
        $rootScope.customerStrAnniverseryDate=$cookies.get('strAnniverseryDate');
       } else {
        $rootScope.customerStrAnniverseryDate=null
       }

       if($cookies.get('maritalStatus')!=undefined) {
        $rootScope.customerMaritalStatus=$cookies.get('maritalStatus');
       } else {
        $rootScope.customerMaritalStatus=null
       }

       if($cookies.get('imageName')!=undefined) {
        $rootScope.customerImageName=$cookies.get('imageName');
       } else {
        $rootScope.customerImageName=null
       }

       if($cookies.get('flag')!=undefined) {
        $rootScope.customerFlag=$cookies.get('flag');
       } else {
        $rootScope.customerFlag=null
       }
       
       $rootScope.customerEmail=$cookies.get('emailId');
       $rootScope.customerId=$cookies.get('customerId');
       if($cookies.get('mobileNumber')!=undefined) {
          $rootScope.customerMobileNumber=$cookies.get('mobileNumber');
       }
       if($cookies.get('gender')!=undefined) {
          $rootScope.customerGender=$cookies.get('gender');
       }
       
       
      } else {
       
        $rootScope.customerId=null
        $rootScope.customerEmail=null
        $rootScope.customerFirstName=null
        $rootScope.customerLastName=null
        $rootScope.customerMobileNumber=null

      }
    $rootScope.custId=$cookies.get('customerId');
    if($cookies.get('useData')!=undefined && $cookies.get('useData')!='undefined'){
      var userData=JSON.parse($cookies.get('useData'));
      $rootScope.nameHeader='';
      if(userData.firstName!='' && userData.firstName!=undefined && userData.firstName!='undefined'){
        $rootScope.nameHeader=userData.firstName;
      }
      else{
        $rootScope.nameHeader=userData.emailId;
      }
    }

  }).
  constant('errorMessage', {
    requiredEmail:' Please enter your email address.',
    invalidEmail:' Invalid email address.',
    requiredPassword:'Please enter password.',
    validPasswordCharacter:'Please enter valid password.',
    passwordMinMax:'Password must have a minimum of 8 characters.',
    matchConfirmPassword:"Confirm password does not match with new password.",
    requiredFirstName:'Please enter valid first name with min 3 characters.',
    validFirstName:'Only characters allowed in first name.',
    requiredLastName:'Please enter valid Last name with min 3 characters.',
    validLastName:'Only characters allowed in last name.',
    requiredMobile:'Please enter mobile number.',
    mobileDigits:'Mobile number should be 10 digits.',
    validMobile:'Enter a valid mobile No.',
    requiredGender:'Please select Gender.',
    acceptTerms:'Please accept terms and conditions.',
    internalServerError:'Data is not submitted due to some internal server error. Please contact admistrator.',
    resendVerifyCodeMsg1:"Verification code resend successfully",
    resendVerifyCodeMsg:"A verification code has been sent to your mobile, please check.",
    resendVerifyCodeMsgFail:'Failure, Please try after sometime.'          
  }).
  constant( 'webSite', {
    mydomain:'/'
  });
function getCategoryId(categoryName,cookieData)
                 {
                  var cList=[];
                  var categoryListNew=JSON.parse(cookieData);
                  //console.log(categoryListNew);
                  for(var i=0;i<categoryListNew.length;i++){
                    cList=categoryListNew[i].split(':');
                      if(cList[0].toUpperCase()==categoryName.toUpperCase()){
                        return cList[1];
                        break;
                      }
                    }
                 };
