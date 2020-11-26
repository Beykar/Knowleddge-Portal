/* Home Controller
====================================================================================================
==================================================================================================*/ 

eyMercuryKnowledgeApp.controller('homeCtrl', function(communityUserData, elsTilesData, sharedParameters, $scope, $stateParams, $rootScope, $http, $sce, $window, $filter, $location) {

	'use strict';
	window.scrollTo(0,0);
    $scope.$sce = $sce;


 $scope.init = function(){

    //get user data from factory and store it in sharedParameters factory
    communityUserData.getCommunityUserData().then(function(data){

     
        //console.log(' $rootScope.currentUser ',  $rootScope.currentUser);
        $scope.currentUser.First_Name = $rootScope.currentUser.fullname;
        
        // setTimeout(function(){

        //     if ($rootScope.currentUser.businessUnit !== undefined && $rootScope.currentUser.serviceLine !== undefined) {

        //         console.log('data in home ctrl : ', $rootScope.currentUser);
        //         sharedParameters.setUserData($rootScope.currentUser);
                
        //         //console.log('$rootScope.currentUser.businessUnit ', $rootScope.currentUser.businessUnit);
        //         if($rootScope.currentUser.businessUnit !== undefined){           
        //             sharedParameters.setBusUnit($rootScope.currentUser.businessUnit);
        //         } 
        //         //console.log('$rootScope.currentUser.serviceLine ', $rootScope.currentUser.serviceLine);
        //         if($rootScope.currentUser.ServiceLine !== undefined){            
        //             sharedParameters.setServLine($rootScope.currentUser.serviceLine);
        //         }
        //         if($rootScope.currentUser.Title !== undefined){
        //             sharedParameters.setTitle($rootScope.currentUser.Last_Name);
        //         }
        //         $scope.dataObj = sharedParameters.getDataObj();
        //         //console.log('$scope.dataObj 55555: ', $scope.dataObj.userData);
        
        
        //     } else if ($scope.dataObj !== undefined){

        //         if ($scope.dataObj.userData.businessUnit !== undefined){
        //             sharedParameters.setBusUnit($scope.dataObj.userData.businessUnit);
        //             $rootScope.currentUser.businessUnit = $scope.dataObj.userData.businessUnit;
        //         } else {
        //             $scope.businessUnit = 'All';
        //             sharedParameters.setBusUnit($scope.businessUnit);
        //             $rootScope.currentUser.businessUnit = 'All';
        //         }
        
        //         if ($scope.dataObj.userData.serviceLine !== undefined){
        //             sharedParameters.setServLine($scope.serviceLine);
        //             $rootScope.currentUser.serviceLine = $scope.dataObj.userData.serviceLine;
        //         } else {
        //             $scope.serviceLine = 'All';
        //             sharedParameters.setServLine($scope.serviceLine);
        //             $rootScope.currentUser.serviceLine = 'All';
        //         }
        
        //         // $rootScope.currentUser.businessUnit = 'All';
        //         // $rootScope.currentUser.serviceLine = 'All';
        
        //         sharedParameters.setTitle($rootScope.currentUser.Last_Name);
        
        //         $scope.dataObj = sharedParameters.getDataObj();
        //         //console.log('$scope.dataObj  else 34: ', $scope.dataObj);
        
        //     }  else {

        //         $scope.currentUser.First_Name = $rootScope.currentUser.fullname;
        //     } 
        // }, 3000);


    });

    
 }   

  
});  