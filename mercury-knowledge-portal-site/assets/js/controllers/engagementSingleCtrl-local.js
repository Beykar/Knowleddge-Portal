/* Engagement Lifecycle Single Controller
====================================================================================================
==================================================================================================*/ 

eyMercuryKnowledgeApp.controller('engagementSingleCtrl', function(elsTilesData, howToData, sharedParameters, policyData, guidanceData, resourceData, $scope, $state, $stateParams, $sce, $filter, $window) {

	'use strict';
	window.scrollTo(0,0);
    $scope.$sce = $sce;

    // initiate an array to hold all active tabs
    $scope.activeTabs = [];

    // check if the tab is active
    $scope.isOpenTab = function (tab, accordionHeader) {
        // check if this tab is already in the activeTabs array
        if ($scope.activeTabs.indexOf(tab) > -1) {
            // if so, return true
            //$scope.getHowToDocs(accordionHeader);
            return true;
        
        } else {
            // if not, return false           
            return false;
        }
    }

    // function to 'open' a tab
    $scope.openTab = function (tab, accordionHeader) {
        // check if tab is already open
        if ($scope.isOpenTab(tab)) {
            //if it is, remove it from the activeTabs array
            $scope.activeTabs.splice($scope.activeTabs.indexOf(tab), 1);
        } else {
            // if it's not, add it!
            $scope.activeTabs = [];
            $scope.activeTabs.push(tab);
            $scope.getHowToDocs(accordionHeader);
        }
    }

    $scope.openAll = function (){
        angular.forEach($scope.levelTwoChapteringArr, function(value, key){
            $scope.openTab(key, value);
        });
    }


    // //Get business unit & service line data
    // communityUserData.getBusinessUnitData().then(
    //     function(data){
    //         $scope.busUnData = data.d.results;
    //         $scope.busUnSet = new Set();
    //         $scope.busUnSetArr = [];
    //         angular.forEach($scope.busUnData, function(value,key){
    //             $scope.busUnSet.add(value.FSOUKIEYG);
    //         });
    //         $scope.busUnSetArr = Array.from($scope.busUnSet);
    //         $scope.busUnSetArr.push('All');
    //         //console.log('$scope.busUnSetArr', $scope.busUnSetArr);
    //     }
    // );
    // communityUserData.getServiceLineData().then(
    //     function(data){
    //         $scope.servLineData = data.d.results;
    //         $scope.servLineSet = new Set();
    //         $scope.servLineArr = [];
    //         angular.forEach($scope.servLineData, function(value,key){
    //             $scope.servLineSet.add(value.Service_Line);
    //         });
    //         $scope.servLineArr = Array.from($scope.servLineSet);
    //         $scope.servLineArr.push('All');
    //         //console.log('$scope.servLineArr', $scope.servLineArr);
    //     }
    // )

 //Create and output values for Business Unit & Service Line Select menus
 $scope.businessUnitArr = ['UK', 'ROI', 'FSO UK', 'FSO ROI','FSO Channel Islands', 'All'];
 $scope.serviceLineArr = ['Advisory', 'Assurance', 'TAS','Tax', 'PAS', 'All'];

 setTimeout(function(){
    
    sharedParameters.setELS($stateParams.tileTitle);
    sharedParameters.setBusUnit($stateParams.businessUnit);
    sharedParameters.setServLine($stateParams.serviceLine);
    //console.log('els in object at start: ', sharedParameters.getDataObj());
    $scope.objData = sharedParameters.getDataObj();

    $scope.tileTitle = $scope.objData.els;
    $scope.selectedBusinessUnit = $scope.objData.busUn;
    $scope.selectedServiceLine = $scope.objData.servLine;

    $scope.getData($scope.selectedBusinessUnit, $scope.selectedServiceLine);

}, 100);     


  
        //console.log('els in object inside getData: ', sharedParameters.getDataObj());
        $scope.objData = sharedParameters.getDataObj();
        $scope.tileTitle = $stateParams.tileTitle;
       
          //get home page Tile Section Content
          elsTilesData.getELSTilesData().then(
              function(data){
                  $scope.homeTilesData = data.d.results;
                  //console.log('home tiles :: ', $scope.homeTilesData);

                  //Filter according to tile name and bring the corresponding image URL
                  $scope.tileImage = $filter('filter')($scope.homeTilesData, {Title:  $scope.objData.els})[0]['ImageUrl'];
                  $scope.tileFullDescription = $filter('filter')($scope.homeTilesData, {Title:  $scope.objData.els})[0]['FullDescription'];
                  //console.log('$scope.tileFullDescription:: ', $scope.tileFullDescription);
  
                  //Get data factory name associated with ELS tile
                  $scope.dataFactoryName = $filter('filter')($scope.homeTilesData, {Title:  $scope.objData.els})[0]['ELSFactoryName'];
                  //console.log('$scope.dataFactoryName:: ', $scope.dataFactoryName);
  
                  //Get data from factory using $scope.dataFactoryName
                  howToData.getELSData($scope.dataFactoryName).then(
                      function(data){
                          $scope.elsFactoryData = data.d.results;
                          //console.log('$scope.elsFactoryData:: ', $scope.elsFactoryData);
  
                        //   //Filter factory according to Business Unit & Service Line
                        //   $scope.busUnServLnFilter = $filter('filter')($scope.elsFactoryData, {BusinessUnit: busUnit, ServiceLine: servLine});
                        //   console.log(' $scope.busUnServLnFilter:: ',  $scope.busUnServLnFilter);
  
                          //Put all level 2 chaptering values into an array
                          $scope.levelTwoChapteringArr = [];
                          $scope.levelTwoChapteringSet = new Set();
  
                          angular.forEach($scope.elsFactoryData, function(value, key){
                              //Put values into a set to remove duplicates from onset 
                              $scope.levelTwoChapteringSet.add(value.LevelTwoChaptering);
                          });
  
                          // Convert set into array
                          $scope.levelTwoChapteringArr = Array.from($scope.levelTwoChapteringSet);
                          //console.log('$scope.levelTwoChapteringArr:: ', $scope.levelTwoChapteringArr); 
                      
                          //function to retrieve data according to clicked levelTwoChapter accordion heading
                          $scope.getHowToDocs = function(accordionHeading){
                              $scope.howToDocsArr = $filter('filter')($scope.elsFactoryData,{LevelTwoChaptering:accordionHeading});
                          }
        
                      }  
                  );

    });

    $scope.updateParamObj = function(paramValue){
        sharedParameters.setDocContentNum(paramValue);
    }

    $scope.getData = function(busUnit, servLine){

                    // console.log('busUnit', busUnit);
                    // console.log('servLine', servLine);
                    
                    //Update URL without reloading window
                    $state.go('engagement-lifecycle/individual', {tileTitle: $stateParams.tileTitle, businessUnit: $stateParams.businessUnit, serviceLine: $stateParams.serviceLine}, {notify: false}); 
                
                    var busUnit  = $stateParams.businessUnit,
                        servLine = $stateParams.serviceLine;

                    //Get policy data according to ELS/BU/SL
                    policyData.getPolicyData().then(function(data){
                        $scope.policyDataObj = data.d.results;

                        //Get data for 'All' and 'All'
                        $scope.filteredPolicyData = $filter('filter')($scope.policyDataObj, {ELS: $scope.objData.els});
                        // console.log('$scope.filteredPolicyDataAll ',$scope.filteredPolicyData);

                        $scope.filteredPolicyDataAll = [];
                        angular.forEach($scope.filteredPolicyData, function(value, key){
                            if (value.BusinessUnit === 'All' && value.ServiceLine === 'All'){
                                $scope.filteredPolicyDataAll.push(value);
                            }
                        });
                        // console.log('$scope.filteredPolicyDataAll ',$scope.filteredPolicyDataAll);
                        
                        //Get data for custom BS and SL
                        $scope.filteredPolicyDataCustom = $filter('filter')($scope.policyDataObj, {ELS: $scope.objData.els, BusinessUnit: $scope.objData.busUn, ServiceLine: $scope.objData.servLine});
                        //console.log('$scope.filteredPolicyDataCustom ',$scope.filteredPolicyDataCustom);

                    });

                    //Get guidance data according to ELS/BU/SL
                    guidanceData.getGuidanceData().then(function(data){
                        $scope.guidanceDataObj = data.d.results;

                        //Get data for 'All' and 'All'
                        $scope.filteredGuidanceDataAll = $filter('filter')($scope.guidanceDataObj, {ELS: $scope.objData.els, BusinessUnit: 'All', ServiceLine: 'All'});

                        //Get data for custom BS and SL
                        $scope.filteredGuidanceDataCustom = $filter('filter')($scope.guidanceDataObj, {ELS: $scope.objData.els, BusinessUnit: $scope.objData.busUn, ServiceLine: $scope.objData.servLine});

                    });

                    //Get Resource data according to ELS/BU/SL
                    resourceData.getResourceData().then(function(data){


                        $scope.resourceDataObj = data.d.results;

                        elsTilesData.getELSTilesData().then(
                            function(data){
                                $scope.homeTilesData = data.d.results;
                                //Get corresponding Id of ELS value from ELS list
                                $scope.elsID = $filter('filter')($scope.homeTilesData, {Title: $scope.objData.els})[0]['ID'];    
                                
                                //console.log('ELS name & id: ', $scope.objData.els, ' & ', $scope.elsID);

                     
                        //Get data for 'All' and 'All'
                        $scope.filteredResourceDataAll = $filter('filter')($scope.resourceDataObj, {Related_x0020_ELS_x0020_TagId: $scope.elsID, Related_x0020_Business_x0020_Uni: 'All', Related_x0020_Service_x0020_Line: 'All'});
                        //console.log('$scope.filteredResourceDataAll',$scope.filteredResourceDataAll);

                        //Get data for custom BS and SL
                        $scope.filteredResourceDataCustom = $filter('filter')($scope.resourceDataObj, {Related_x0020_ELS_x0020_TagId: $scope.elsID, Related_x0020_Business_x0020_Uni: $scope.objData.busUn, Related_x0020_Service_x0020_Line: $scope.objData.servLine});

                        //console.log('$scope.filteredResourceDataCustom',$scope.filteredResourceDataCustom);

                        });

                    });
    }  
   
 
  
    $scope.updateSelection = function(busUn, servLine){

        //console.log('inside', busUn, '  ',  servLine);
        $stateParams.businessUnit = busUn;
        $stateParams.serviceLine = servLine;
    
         sharedParameters.setBusUnit(busUn);
         sharedParameters.setServLine(servLine);
        
         $scope.getData($scope.objData.busUn, $scope.objData.servLine);
     }
  

     
});  