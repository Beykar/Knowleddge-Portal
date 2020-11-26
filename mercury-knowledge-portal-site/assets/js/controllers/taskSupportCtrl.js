/* Task Support Controller
====================================================================================================
==================================================================================================*/
eyMercuryKnowledgeApp.controller('taskSupportCtrl', function (communityUserData, elsTilesData, sharedParameters, $scope, $stateParams, $rootScope, $http, $sce, $window, $filter, $location) {
  'use strict';

  window.scrollTo(0, 0);
  $scope.$sce = $sce;
  $rootScope.currentUser = {};
  $scope.loggedIn = true; 

   // trim then remove duplicates from results array of objects
   $scope.removeDuplicates = function(myArray){ 
		var newArray = [];
		for(var i=0; i< myArray.length; i++){
			myArray[i] = myArray[i].trim();
			if(newArray.indexOf(myArray[i]) == -1){
				newArray.push(myArray[i])
			}
		}
		return newArray;
  }
  $scope.businessUnitArr = ['UK', 'ROI', 'FSO UK', 'FSO ROI', 'FSO Channel Islands', 'All'];
  $scope.serviceLineArr = ['Advisory', 'Assurance', 'TAS', 'Tax', 'PAS', 'All'];

  //$('#processing').show(); 

  // Get User Community data
  communityUserData.getCommunityUserData().then(function (data) {
   


   
    setTimeout(function(){

    // $('#processing1').css('display', 'block');

    $scope.userData = $rootScope.currentUser;
    sharedParameters.setUserData($scope.userData); 
    //console.log('new user data 1: ', $scope.userData);
   
  

    $scope.dataObj = sharedParameters.getDataObj(); 
    //console.log(' $scope.dataObj in task support',  $scope.dataObj);
   
      if ($scope.userData.businessUnit === undefined && $scope.userData.serviceLine === undefined) {
        $scope.loggedIn = false;
        console.log('$scope.userData logged out:: ', $scope.userData); 
        // var first_Name = $scope.userData.fullname.split(' ')[0];

        // $scope.currentUser = {};
        // $scope.currentUser.First_Name = first_Name;
   
       //console.log(' $scope.currentUser.First_Name',  $scope.currentUser.First_Name);

        //console.log('working');
        $scope.selectedBusinessUnit = $scope.businessUnitArr[5];
        $scope.selectedServiceLine = $scope.serviceLineArr[5];
        $scope.userData.businessUnit = $scope.businessUnitArr[5];
        $scope.userData.serviceLine = $scope.serviceLineArr[5];
       
        sharedParameters.setBusUnit($scope.businessUnitArr[5]);
        sharedParameters.setServLine($scope.serviceLineArr[5]);
      
        $scope.dataObj.busUn = $scope.businessUnitArr[5];
        $scope.dataObj.servLine = $scope.serviceLineArr[5];
      
      
        if ($scope.dataObj.busUn === undefined || $scope.dataObj.servLine === undefined) {
          $scope.selectedBusinessUnit = $scope.businessUnitArr[6];
          $scope.selectedServiceLine = $scope.serviceLineArr[5];
          sharedParameters.setBusUnit($scope.selectedBusinessUnit);
          sharedParameters.setServLine($scope.selectedServiceLine);
          $scope.updatedbusUn = $scope.selectedBusinessUnit;
          $scope.updatedServLn = $scope.selectedServiceLine;
        } else {
          $scope.selectedBusinessUnit = $scope.dataObj.busUn;
          $scope.selectedServiceLine = $scope.dataObj.servLine;
          sharedParameters.setBusUnit($scope.selectedBusinessUnit);
          sharedParameters.setServLine($scope.selectedServiceLine);
          $scope.updatedbusUn = $scope.selectedBusinessUnit;
          $scope.updatedServLn = $scope.selectedServiceLine;
        } // $scope.getSelectedValues($scope.selectedBusinessUnit, $scope.selectedServiceLine);

      } else {
        console.log('$scope.userData logged in:: ', $scope.userData); 
        $scope.loggedIn = true;
      

        if ($scope.dataObj.busUn === undefined && $scope.dataObj.servLine === undefined) {
          $scope.currentUser.businessUnit =  $scope.dataObj.userData.businessUnit;
          $scope.currentUser.serviceLine =  $scope.dataObj.userData.serviceLine;
          $scope.currentUser.First_Name =  $scope.dataObj.userData.First_Name; 
          //console.log('$scope.currentUser final:: ', $scope.currentUser);

          $scope.selectedBusinessUnit = $scope.currentUser.businessUnit;
          $scope.selectedServiceLine = $scope.currentUser.serviceLine;
          $scope.updatedbusUn = $scope.currentUser.businessUnit;
          //console.log('$scope.updatedbusUn ', $scope.currentUser.businessUnit);
          $scope.updatedServLn = $scope.currentUser.serviceLine;
         // console.log('$scope.updatedServLn ',$scope.currentUser.serviceLine);
          sharedParameters.setBusUnit($scope.selectedBusinessUnit);
          sharedParameters.setServLine($scope.selectedServiceLine);
          $scope.getSelectedValues($scope.selectedBusinessUnit, $scope.selectedServiceLine); //console.log('sharedparams obj logged in ', sharedParameters.getDataObj());
        } else {
          $scope.selectedBusinessUnit = $scope.dataObj.busUn;
          $scope.selectedServiceLine = $scope.dataObj.servLine;
          $scope.currentUser.First_Name = $scope.userData.First_Name;
          sharedParameters.setBusUnit($scope.selectedBusinessUnit);
          sharedParameters.setServLine($scope.selectedServiceLine);
          $scope.updatedbusUn = $scope.selectedBusinessUnit;
          $scope.updatedServLn = $scope.selectedServiceLine;
        }

      }
    //  $('#processing1').delay(4000).css('display', 'none');  
    },4000);
 
 
  }); //Create and output values for Business Unit & Service Line Select menus


  
  


  $scope.businessUnitArr = ['UK', 'ROI', 'FSO UK', 'FSO ROI', 'FSO Channel Islands', 'All'];
  $scope.serviceLineArr = ['Advisory', 'Assurance', 'TAS', 'Tax', 'PAS', 'All'];


  // communityUserData.getBusinessUnitData().then(
  //   function(data){
  //       $scope.busUnData = data.d.results;
  //       $scope.busUnSet = [];
  //       $scope.businessUnitArr = [];
  //       angular.forEach($scope.busUnData, function(value,key){
  //           $scope.busUnSet.push(value.FSOUKIEYG);
  //       });
  //       $scope.businessUnitArr = $scope.removeDuplicates($scope.busUnSet);
  //       $scope.businessUnitArr.push('All');
  //       console.log('$scope.busUnSetArr', $scope.businessUnitArr);
  //   }
  //   );
  //   communityUserData.getServiceLineData().then(
  //     function(data){
  //         $scope.servLineData = data.d.results;
  //         $scope.servLineSet = [];
  //         $scope.serviceLineArr = [];
  //         angular.forEach($scope.servLineData, function(value,key){
  //             $scope.servLineSet.push(value.Service_Line);
  //         });
  //         $scope.serviceLineArr = $scope.removeDuplicates($scope.servLineSet);
  //         $scope.serviceLineArr.push('All');
  //         console.log('$scope.servLineArr', $scope.serviceLineArr);
  //     }
  //   );


  $scope.getSelectedValues = function (selectedBusinessUnit, selectedServiceLine) {
    sharedParameters.setBusUnit(selectedBusinessUnit);
    sharedParameters.setServLine(selectedServiceLine);
    sharedParameters.getDataObj(); //console.log('sharedParameters.getDataObj():: ',sharedParameters.getDataObj());
  }; // get home page Tile Section Content


  elsTilesData.getELSTilesData().then(function (data) {
    $scope.homeTilesData = data.d.results; //console.log('home tiles data:: ', data.d.results);

    $scope.Tiles = [];
    angular.forEach($scope.homeTilesData, function (value, key) {
      var tileObj = {
        Title: value.Title,
        ImageURL: value.ImageUrl,
        Description: value.Description,
        FullDescription: value.FullDescription,
        Colour: '#' + value.Colour
      };
      $scope.Tiles.push(tileObj);
    });
    //console.log('$scope.Tiles:: ', $scope.Tiles);
  });

  $scope.getParams = function (tileTitle) {
    sharedParameters.setELS(tileTitle);
    //console.log('tileTitle :', tileTitle);
    //console.log("tile clicked:: ", $rootScope.currentUser.serviceLine);

    if($scope.updatedbusUn === undefined && $scope.updatedServLn === undefined){

      var nextURL = "urlSite/SitePages/index.aspx/engagement-lifecycle/" + tileTitle + "/" + $rootScope.currentUser.businessUnit + "/" + $rootScope.currentUser.serviceLine;
    } else {
      var nextURL = "urlSite/SitePages/index.aspx/engagement-lifecycle/" + tileTitle + "/" + $scope.updatedbusUn + "/" + $scope.updatedServLn;
    }

    $window.open(nextURL, "_self"); //console.log(' els in getParams: ', tileTitle);
  };

  $scope.updateSelection = function ($event, busUn, servLine) {
    $event.preventDefault();
    //console.log('inside home', busUn, '  ', servLine);
    sharedParameters.setBusUnit(busUn);
    sharedParameters.setServLine(servLine);
    $scope.updatedbusUn = busUn;
    $scope.updatedServLn = servLine;
  };
});