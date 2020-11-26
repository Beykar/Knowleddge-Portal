/* Home Controller
====================================================================================================
==================================================================================================*/ 

eyMercuryKnowledgeApp.controller('homeCtrl', function(communityUserData, elsTilesData, sharedParameters, $scope, $stateParams, $rootScope, $http, $sce, $window, $filter, $location) {

	'use strict';
	window.scrollTo(0,0);
    $scope.$sce = $sce;

    $rootScope.currentUser = {};


    $scope.loggedIn = true;
    // Get User Community data
    communityUserData.getCommunityUserData().then(
        function(data){
            $scope.userData = data;
            sharedParameters.setUserData($scope.userData);
		    //console.log('new user data: ', data);
            $scope.dataObj = sharedParameters.getDataObj();
            //console.log(' $scope.dataObj in homectrl',  $scope.dataObj);

			if(typeof $scope.userData === 'undefined'){
                $scope.loggedIn = false;
                if($scope.dataObj.busUn === undefined && $scope.dataObj.servLine === undefined){
                    $scope.selectedBusinessUnit =  $scope.businessUnitArr[5];
                    $scope.selectedServiceLine =   $scope.serviceLineArr[5];
                    
                    sharedParameters.setBusUnit($scope.selectedBusinessUnit);
                    sharedParameters.setServLine($scope.selectedServiceLine);
                    $scope.updatedbusUn = $scope.selectedBusinessUnit;
                    $scope.updatedServLn = $scope.selectedServiceLine;
                } else {
                    $scope.selectedBusinessUnit =  $scope.dataObj.busUn;
                    $scope.selectedServiceLine =  $scope.dataObj.servLine;
                    
                    sharedParameters.setBusUnit($scope.selectedBusinessUnit);
                    sharedParameters.setServLine($scope.selectedServiceLine);
                    $scope.updatedbusUn = $scope.selectedBusinessUnit;
                    $scope.updatedServLn = $scope.selectedServiceLine;
                }
				
					// $scope.getSelectedValues($scope.selectedBusinessUnit, $scope.selectedServiceLine);
			} else {
				//console.log('$scope.userData:: ', $scope.userData);				
				$scope.currentUser.businessUnit =   $scope.userData.FSOUKIEYG;
				$scope.currentUser.serviceLine 	=   $scope.userData.Service_Line;
				$scope.currentUser.First_Name 	= 	$scope.userData.First_Name;
			    //console.log('$scope.currentUser final:: ', $scope.currentUser);
				$scope.selectedBusinessUnit = $scope.currentUser.businessUnit;
                $scope.selectedServiceLine = $scope.currentUser.serviceLine;
                sharedParameters.setBusUnit($scope.selectedBusinessUnit);
                sharedParameters.setServLine($scope.selectedServiceLine);
                $scope.getSelectedValues($scope.selectedBusinessUnit, $scope.selectedServiceLine);
                //console.log('sharedparams obj logged in ', sharedParameters.getDataObj());
			}			
        }
	 )
	  
	 //Create and output values for Business Unit & Service Line Select menus
	 $scope.businessUnitArr = ['UK', 'ROI', 'FSO UK', 'FSO ROI','FSO Channel Islands', 'All'];
	 $scope.serviceLineArr = ['Advisory', 'Assurance', 'TAS','Tax', 'PAS', 'All'];


	 $scope.getSelectedValues = function(selectedBusinessUnit, selectedServiceLine){
		sharedParameters.setBusUnit(selectedBusinessUnit);
		sharedParameters.setServLine(selectedServiceLine);
		sharedParameters.getDataObj();
		//console.log('sharedParameters.getDataObj():: ',sharedParameters.getDataObj());
	 }
	


    // get home page Tile Section Content
	elsTilesData.getELSTilesData().then(
        function(data){
            $scope.homeTilesData = data.d.results;
            //console.log('home tiles data:: ', data.d.results);

            $scope.Tiles = [];
            angular.forEach($scope.homeTilesData, function(value, key){
                var tileObj ={
                    Title       : value.Title,
                    ImageURL    : value.ImageUrl,
                    Description : value.Description,
                    FullDescription : value.FullDescription,
                    Colour      : '#' + value.Colour 
                }
                $scope.Tiles.push(tileObj);
            })
            //console.log('$scope.Tiles:: ', $scope.Tiles);
        }
    )

    $scope.getParams = function (tileTitle){
        sharedParameters.setELS(tileTitle);
        //console.log(' els in getParams: ', tileTitle);
    }

    
    $scope.updateSelection = function(busUn, servLine){

        console.log('inside home', busUn, '  ',  servLine);
 
         sharedParameters.setBusUnit(busUn);
         sharedParameters.setServLine(servLine);
         $scope.updatedbusUn = busUn;
         $scope.updatedServLn = servLine;
     }
 

  
});  