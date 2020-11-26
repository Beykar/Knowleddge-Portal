/* How To Single Controller
====================================================================================================
==================================================================================================*/
eyMercuryKnowledgeApp.controller('howToCtrl', function (communityUserData, elsTilesData, howToData, guidanceData, sharedParameters, policyData, resourceData, $rootScope, $scope, $state, $stateParams, $sce, $filter, $window) {
  'use strict';

  window.scrollTo(0, 0);
  $scope.$sce = $sce; 
  
  //get user name
  // $.ajax({
  //   url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/CurrentUser",
  //   method: "GET",
  //   cache: false,
  //   headers: {
  //       "accept": "application/json;odata=verbose",
  //       "content-Type": "application/json;odata=verbose"
  //   },
  //   success: function (response) {
  //   $scope.currentUserTitle = response.d.Title;
    
  //    var first_Name = $scope.currentUserTitle.split(' ')[0];

  //    $scope.currentUser = {};
  //    $scope.currentUser.First_Name = first_Name;

  //   //console.log(' first_Name', first_Name);
  //    //console.log('rootScope user object in ctrl:: ', $rootScope.currentUser);
  //   },
  //   error: function (data) {
  //       console.log('Error: ', data);
  //   }
  //   });



            

  
  //Get Params list from Factory

  $scope.dataObj = sharedParameters.getDataObj();
  $scope.tileTitle = $stateParams.tileTitle;
  $scope.howToTitle = $stateParams.howToTitle;

  // console.log('$scope.howToTitle ', $scope.howToTitle);
  
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


  // initiate an array to hold all active tabs
  $scope.activeTabs = [];
  $scope.action = "Open All"; // check if the tab is active

  $scope.isOpenTab = function (tab) {
    // check if this tab is already in the activeTabs array
    if ($scope.activeTabs.indexOf(tab) > -1) {
      // if so, return true
      return true;
    } else {
      // if not, return false
      return false;
    }
  }; // function to 'open' a tab


  $scope.openTab = function (tab) {
    //console.log('clicked'); // check if tab is already open

    if ($scope.isOpenTab(tab)) {
      //if it is, remove it from the activeTabs array
      $scope.activeTabs.splice($scope.activeTabs.indexOf(tab), 1);
    } else {
      // if it's not, add it!
      $scope.activeTabs.push(tab);
    }
  };

  $scope.openAll = function () {
    if ($scope.action === "Close All") {
      $scope.action = "Open All";
      $scope.activeTabs = [];
    } else {
      $scope.action = "Close All";

      for (var x = 1; x < 7; x++) {
        $scope.activeTabs.push(x);
      }
    }
  }; //console.log('$scope.titleTitle:: ', $scope.tileTitle);
  //console.log('$scope.howToTitle:: ', $scope.howToTitle);
  //Create and output values for Business Unit & Service Line Select menus

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

  $scope.businessUnitArr = ['UK', 'ROI', 'FSO UK', 'FSO ROI', 'FSO Channel Islands', 'All'];
  $scope.serviceLineArr = ['Advisory', 'Assurance', 'TAS', 'Tax', 'PAS', 'All']; // setTimeout(function(){
  //     sharedParameters.setELS($stateParams.tileTitle);
  //     sharedParameters.setBusUnit($stateParams.businessUnit);
  //     sharedParameters.setServLine($stateParams.serviceLine);
  //     //console.log('els in object at start in level3: ', sharedParameters.getDataObj());
  //     $scope.objData = sharedParameters.getDataObj();
  //     $scope.tileTitle = $scope.objData.els;
  //     $scope.selectedBusinessUnit = $scope.objData.busUn;
  //     $scope.selectedServiceLine = $scope.objData.servLine;
  //     //$scope.getData($scope.selectedBusinessUnit, $scope.selectedServiceLine);
  // }, 100);     

  setTimeout(function () {

    sharedParameters.setELS($stateParams.tileTitle);
    sharedParameters.setBusUnit($stateParams.businessUnit);
    sharedParameters.setServLine($stateParams.serviceLine); //console.log('els in object at start: ', sharedParameters.getDataObj());

    $scope.objData = sharedParameters.getDataObj(); //Populate selection boxes

    $scope.selectedBusinessUnit = $scope.objData.busUn; //console.log('$scope.selectedBusinessUnit init: ', $scope.selectedBusinessUnit);

    $scope.selectedServiceLine = $scope.objData.servLine; //console.log('$scope.selectedServiceLine init: ', $scope.selectedServiceLine);

    if ($scope.objData !== undefined) {
      $scope.loggedIn = true; //Display user name in partial

      // $scope.currentUser.First_Name = $rootScope.currentUser.First_Name; 
      // console.log('$scope.currentUser.First_Name init: ', $rootScope.currentUser.First_Name);
      //$scope.getData($scope.selectedBusinessUnit, $scope.selectedServiceLine);
      //$state.go('engagement-lifecycle/individual', {tileTitle: $stateParams.tileTitle, businessUnit: $scope.selectedBusinessUnit, serviceLine: $scope.selectedServiceLine}, {notify: false}); 

      sharedParameters.setELS($stateParams.tileTitle);
      sharedParameters.setBusUnit($scope.selectedBusinessUnit);
      sharedParameters.setServLine($scope.selectedServiceLine);
    } else {
      $scope.loggedIn = false;
    }

    $scope.tileTitle = $scope.objData.els;
    $scope.selectedBusinessUnit = $scope.objData.busUn;
    $scope.selectedServiceLine = $scope.objData.servLine; //$scope.getData($scope.selectedBusinessUnit, $scope.selectedServiceLine);
  }, 100); //get home page Tile Section Content

  elsTilesData.getELSTilesData().then(function (data) {
    $scope.homeTilesData = data.d.results; //Filter according to tile name and bring the corresponding image URL

    $scope.tileImage = $filter('filter')($scope.homeTilesData, {
      Title: $scope.tileTitle
    })[0]['ImageUrl'];
    $scope.elsFactoryName = $filter('filter')($scope.homeTilesData, {
      Title: $scope.tileTitle
    })[0]['ELSFactoryName']; //Get data of factory with $scope.elsFactoryName

    howToData.getHowToData($scope.elsFactoryName, $scope.howToTitle).then(function (data){
      $scope.howToDoc = data.d.results[0];
      // $scope.howToData = data.d.results;
      // $scope.howToDoc = $filter('filter')($scope.howToData, {
      //   Title: $scope.howToTitle
      // })[0]; 
      console.log('$scope.howToDoc: ', $scope.howToDoc);
      //build the final output array: $scope.howToDataItems

      $scope.howToItem = {
        Area: $scope.howToDoc.Area,
        Region: $scope.howToDoc.Region,
        BusinessUnit: $scope.howToDoc.BusinessUnit,
        ServiceLine: $scope.howToDoc.ServiceLine,
        ELS: $scope.howToDoc.ELS,
        UserCategories: $scope.howToDoc.UserCategories,
        ContentType: $scope.howToDoc.ContentType0,
        Chaptering: $scope.howToDoc.LevelTwoChaptering,
        Keywords: $scope.howToDoc.Keywords,
        Heading: $scope.howToDoc.Heading,
        StandFirst: $scope.howToDoc.StandFirst,
        Step1Heading: $scope.howToDoc.Step1Heading,
        Step1ContentTop1: $scope.howToDoc.Step1ContentTop1,
        Step1ContentImages1: $scope.howToDoc.Step1ContentImages1,
        Step1ContentBottom1: $scope.howToDoc.Step1ContentBottom1,
        Step1ContentTop2: $scope.howToDoc.Step1ContentTop2,
        Step1ContentImages2: $scope.howToDoc.Step1ContentImages2,
        Step1ContentBottom2: $scope.howToDoc.Step1ContentBottom2,
        Step1ContentTop3: $scope.howToDoc.Step1ContentTop3,
        Step1ContentImages3: $scope.howToDoc.Step1ContentImages3,
        Step1ContentBottom3: $scope.howToDoc.Step1ContentBottom3,
        Step1ContentTop4: $scope.howToDoc.Step1ContentTop4,
        Step1ContentImages4: $scope.howToDoc.Step1ContentImages4,
        Step1ContentBottom4: $scope.howToDoc.Step1ContentBottom4,
        Step1ContentTop5: $scope.howToDoc.Step1ContentTop5,
        Step1ContentImages5: $scope.howToDoc.Step1ContentImages5,
        Step1ContentBottom5: $scope.howToDoc.Step1ContentBottom5,
        Step1ContentTop6: $scope.howToDoc.Step1ContentTop6,
        Step1ContentImages6: $scope.howToDoc.Step1ContentImages6,
        Step1ContentBottom6: $scope.howToDoc.Step1ContentBottom6,
        Step2Heading: $scope.howToDoc.Step2Heading,
        Step2ContentTop1: $scope.howToDoc.Step2ContentTop1,
        Step2ContentImages1: $scope.howToDoc.Step2ContentImages1,
        Step2ContentBottom1: $scope.howToDoc.Step2ContentBottom1,
        Step2ContentTop2: $scope.howToDoc.Step2ContentTop2,
        Step2ContentImages2: $scope.howToDoc.Step2ContentImages2,
        Step2ContentBottom2: $scope.howToDoc.Step2ContentBottom2,
        Step2ContentTop3: $scope.howToDoc.Step2ContentTop3,
        Step2ContentImages3: $scope.howToDoc.Step2ContentImages3,
        Step2ContentBottom3: $scope.howToDoc.Step2ContentBottom3,
        Step2ContentTop4: $scope.howToDoc.Step2ContentTop4,
        Step2ContentImages4: $scope.howToDoc.Step2ContentImages4,
        Step2ContentBottom4: $scope.howToDoc.Step2ContentBottom4,
        Step2ContentTop5: $scope.howToDoc.Step2ContentTop5,
        Step2ContentImages5: $scope.howToDoc.Step2ContentImages5,
        Step2ContentBottom5: $scope.howToDoc.Step2ContentBottom5,
        Step2ContentTop6: $scope.howToDoc.Step2ContentTop6,
        Step2ContentImages6: $scope.howToDoc.Step2ContentImages6,
        Step2ContentBottom6: $scope.howToDoc.Step2ContentBottom6,
        Step3Heading: $scope.howToDoc.Step3Heading,
        Step3ContentTop1: $scope.howToDoc.Step3ContentTop1,
        Step3ContentImages1: $scope.howToDoc.Step3ContentImages1,
        Step3ContentBottom1: $scope.howToDoc.Step3ContentBottom1,
        Step3ContentTop2: $scope.howToDoc.Step3ContentTop2,
        Step3ContentImages2: $scope.howToDoc.Step3ContentImages2,
        Step3ContentBottom2: $scope.howToDoc.Step3ContentBottom2,
        Step3ContentTop3: $scope.howToDoc.Step3ContentTop3,
        Step3ContentImages3: $scope.howToDoc.Step3ContentImages3,
        Step3ContentBottom3: $scope.howToDoc.Step3ContentBottom3,
        Step3ContentTop4: $scope.howToDoc.Step3ContentTop4,
        Step3ContentImages4: $scope.howToDoc.Step3ContentImages4,
        Step3ContentBottom4: $scope.howToDoc.Step3ContentBottom4,
        Step3ContentTop5: $scope.howToDoc.Step3ContentTop5,
        Step3ContentImages5: $scope.howToDoc.Step3ContentImages5,
        Step3ContentBottom5: $scope.howToDoc.Step3ContentBottom5,
        Step3ContentTop6: $scope.howToDoc.Step3ContentTop6,
        Step3ContentImages6: $scope.howToDoc.Step3ContentImages6,
        Step3ContentBottom6: $scope.howToDoc.Step3ContentBottom6,
        Step4Heading: $scope.howToDoc.Step4Heading,
        Step4ContentTop1: $scope.howToDoc.Step4ContentTop1,
        Step4ContentImages1: $scope.howToDoc.Step4ContentImages1,
        Step4ContentBottom1: $scope.howToDoc.Step4ContentBottom1,
        Step4ContentTop2: $scope.howToDoc.Step4ContentTop2,
        Step4ContentImages2: $scope.howToDoc.Step4ContentImages2,
        Step4ContentBottom2: $scope.howToDoc.Step4ContentBottom2,
        Step4ContentTop3: $scope.howToDoc.Step4ContentTop3,
        Step4ContentImages3: $scope.howToDoc.Step4ContentImages3,
        Step4ContentBottom3: $scope.howToDoc.Step4ContentBottom3,
        Step4ContentTop4: $scope.howToDoc.Step4ContentTop4,
        Step4ContentImages4: $scope.howToDoc.Step4ContentImages4,
        Step4ContentBottom4: $scope.howToDoc.Step4ContentBottom4,
        Step4ContentTop5: $scope.howToDoc.Step4ContentTop5,
        Step4ContentImages5: $scope.howToDoc.Step4ContentImages5,
        Step4ContentBottom5: $scope.howToDoc.Step4ContentBottom5,
        Step4ContentTop6: $scope.howToDoc.Step4ContentTop6,
        Step4ContentImages6: $scope.howToDoc.Step4ContentImages6,
        Step4ContentBottom6: $scope.howToDoc.Step4ContentBottom6,
        Step5Heading: $scope.howToDoc.Step5Heading,
        Step5ContentTop1: $scope.howToDoc.Step5ContentTop1,
        Step5ContentImages1: $scope.howToDoc.Step5ContentImages1,
        Step5ContentBottom1: $scope.howToDoc.Step5ContentBottom1,
        Step5ContentTop2: $scope.howToDoc.Step5ContentTop2,
        Step5ContentImages2: $scope.howToDoc.Step5ContentImages2,
        Step5ContentBottom2: $scope.howToDoc.Step5ContentBottom2,
        Step5ContentTop3: $scope.howToDoc.Step5ContentTop3,
        Step5ContentImages3: $scope.howToDoc.Step5ContentImages3,
        Step5ContentBottom3: $scope.howToDoc.Step5ContentBottom3,
        Step5ContentTop4: $scope.howToDoc.Step5ContentTop4,
        Step5ContentImages4: $scope.howToDoc.Step5ContentImages4,
        Step5ContentBottom4: $scope.howToDoc.Step5ContentBottom4,
        Step5ContentTop5: $scope.howToDoc.Step5ContentTop5,
        Step5ContentImages5: $scope.howToDoc.Step5ContentImages5,
        Step5ContentBottom5: $scope.howToDoc.Step5ContentBottom5,
        Step5ContentTop6: $scope.howToDoc.Step5ContentTop6,
        Step5ContentImages6: $scope.howToDoc.Step5ContentImages6,
        Step5ContentBottom6: $scope.howToDoc.Step5ContentBottom6,
        Step6Heading: $scope.howToDoc.Step6Heading,
        Step6ContentTop1: $scope.howToDoc.Step6ContentTop1,
        Step6ContentImages1: $scope.howToDoc.Step6ContentImages1,
        Step6ContentBottom1: $scope.howToDoc.Step6ContentBottom1,
        Step6ContentTop2: $scope.howToDoc.Step6ContentTop2,
        Step6ContentImages2: $scope.howToDoc.Step6ContentImages2,
        Step6ContentBottom2: $scope.howToDoc.Step6ContentBottom2,
        Step6ContentTop3: $scope.howToDoc.Step6ContentTop3,
        Step6ContentImages3: $scope.howToDoc.Step6ContentImages3,
        Step6ContentBottom3: $scope.howToDoc.Step6ContentBottom3,
        Step6ContentTop4: $scope.howToDoc.Step6ContentTop4,
        Step6ContentImages4: $scope.howToDoc.Step6ContentImages4,
        Step6ContentBottom4: $scope.howToDoc.Step6ContentBottom4,
        Step6ContentTop5: $scope.howToDoc.Step6ContentTop5,
        Step6ContentImages5: $scope.howToDoc.Step6ContentImages5,
        Step6ContentBottom5: $scope.howToDoc.Step6ContentBottom5,
        Step6ContentTop6: $scope.howToDoc.Step6ContentTop6,
        Step6ContentImages6: $scope.howToDoc.Step6ContentImages6,
        Step6ContentBottom6: $scope.howToDoc.Step6ContentBottom6
      }; // console.log(' $scope.howToItem : ',  $scope.howToItem);
    });
  });

  $scope.getData = function (busUnit, servLine) {

    // if (busUnit === undefined || servLine === undefined){
    //   $scope.objData.busUn = $stateParams.businessUnit;
    //   $scope.objData.servLine = $stateParams.serviceLine;
    // }
    //Update URL without reloading window

    // console.log('howToTitle ', $stateParams.howToTitle);
    $state.go('engagement-lifecycle/individual-how-to/how-to', {
      tileTitle: $stateParams.tileTitle,
      businessUnit: $stateParams.businessUnit,
      serviceLine: $stateParams.serviceLine,
      howToTitle: $stateParams.howToTitle
    }, {
      notify: false
    });
    
    
    
    $scope.allContent = false; 
    //Get policy data according to ELS/BU/SL

    policyData.getPolicyData().then(function (data) {
      $scope.policyDataObj = data.d.results;

      if ($scope.objData.busUn !== 'All' && $scope.objData.servLine === 'All') {
        //Get data for business unit and All service lines (NOT 'All' tagged serviceline content)
        $scope.filteredPolicyDataCustom = $filter('filter')($scope.policyDataObj, {
          ELS: $scope.objData.els,
          BusinessUnit: $scope.objData.busUn
        }); //console.log('$scope.filteredPolicyDataAll BS + All: ', $scope.filteredPolicyDataCustom);
      } else if ($scope.objData.busUn === 'All' && $scope.objData.servLine !== 'All') {
        //Get data for All and  serviceline (NOT 'All' tagged business unit content)
        $scope.filteredPolicyDataCustom = $filter('filter')($scope.policyDataObj, {
          ELS: $scope.objData.els,
          ServiceLine: $scope.objData.servLine
        }); //console.log('$scope.filteredPolicyData All + SL: ', $scope.filteredPolicyDataCustom);
      } else if ($scope.objData.busUn !== 'All' && $scope.objData.servLine !== 'All') {
        //Get data for custom BS and SL
        $scope.filteredPolicyDataCustom = $filter('filter')($scope.policyDataObj, {
          ELS: $scope.objData.els,
          BusinessUnit: $scope.objData.busUn,
          ServiceLine: $scope.objData.servLine
        }); //console.log('$scope.filteredPolicyDataCustom ',$scope.filteredPolicyDataCustom);
      } else if ($scope.objData.busUn === 'All' && $scope.objData.servLine === 'All') {
        //Get data for All BU  and All SL 
        $scope.filteredPolicyDataCustom = $filter('filter')($scope.policyDataObj, {
          ELS: $scope.objData.els
        });
        $scope.allContent = true;
      } //Get data for 'All' and 'All' TAGGED CONTENT


      $scope.filteredPolicyData = $filter('filter')($scope.policyDataObj, {
        ELS: $scope.objData.els
      }); // console.log('$scope.filteredPolicyDataAll ',$scope.filteredPolicyData);

      $scope.filteredPolicyDataAll = [];
      angular.forEach($scope.filteredPolicyData, function (value, key) {
        if (value.BusinessUnit === 'All' && value.ServiceLine === 'All') {
          $scope.filteredPolicyDataAll.push(value);
        }
      }); // console.log('$scope.filteredPolicyDataAll ',$scope.filteredPolicyDataAll);
    }); //Get guidance data according to ELS/BU/SL

    guidanceData.getGuidanceData().then(function (data) {
      $scope.guidanceDataObj = data.d.results;

      if ($scope.objData.busUn !== 'All' && $scope.objData.servLine === 'All') {
        //Get data for business unit and All service lines (NOT 'All' tagged serviceline content)
        $scope.filteredGuidanceDataCustom = $filter('filter')($scope.guidanceDataObj, {
          ELS: $scope.objData.els,
          BusinessUnit: $scope.objData.busUn
        }); //console.log('$scope.filteredGuidanceDataAll BS + All: ', $scope.filteredGuidanceDataCustom);
      } else if ($scope.objData.busUn === 'All' && $scope.objData.servLine !== 'All') {
        //Get data for All and  serviceline (NOT 'All' tagged business unit content)
        $scope.filteredGuidanceDataCustom = $filter('filter')($scope.guidanceDataObj, {
          ELS: $scope.objData.els,
          ServiceLine: $scope.objData.servLine
        }); //console.log('$scope.filteredGuidanceData All + SL: ', $scope.filteredGuidanceDataCustom);
      } else if ($scope.objData.busUn !== 'All' && $scope.objData.servLine !== 'All') {
        //Get data for custom BS and SL
        $scope.filteredGuidanceDataCustom = $filter('filter')($scope.guidanceDataObj, {
          ELS: $scope.objData.els,
          BusinessUnit: $scope.objData.busUn,
          ServiceLine: $scope.objData.servLine
        });
        console.log('$scope.filteredGuidanceDataCustom ', $scope.filteredGuidanceDataCustom);
      } else if ($scope.objData.busUn === 'All' && $scope.objData.servLine === 'All') {
        //Get data for All BU  and All SL 
        $scope.filteredGuidanceDataCustom = $filter('filter')($scope.guidanceDataObj, {
          ELS: $scope.objData.els
        });
        $scope.allContent = true;
      } //Get data for 'All' and 'All' TAGGED CONTENT


      $scope.filteredGuidanceData = $filter('filter')($scope.guidanceDataObj, {
        ELS: $scope.objData.els
      });
      $scope.filteredGuidanceDataAll = [];
      angular.forEach($scope.filteredGuidanceData, function (value, key) {
        if (value.BusinessUnit === 'All' && value.ServiceLine === 'All') {
          $scope.filteredGuidanceDataAll.push(value);
        }
      }); //console.log('$scope.allContent', $scope.allContent);
      //console.log('$scope.filteredGuidanceDataAll ', $scope.filteredGuidanceDataAll);
    }); //Get Resource data according to ELS/BU/SL

    resourceData.getResourceData().then(function (data) {
      $scope.resourceDataObj = data.d.results;
      elsTilesData.getELSTilesData().then(function (data) {
        $scope.homeTilesData = data.d.results; //Get corresponding Id of ELS value from ELS list

        $scope.elsID = $filter('filter')($scope.homeTilesData, {
          Title: $scope.objData.els
        })[0]['ID']; //console.log('ELS name & id: ', $scope.objData.els, ' & ', $scope.elsID);

        if ($scope.objData.busUn !== 'All' && $scope.objData.servLine === 'All') {
          //Get data for business unit and All service lines (NOT 'All' tagged serviceline content)
          $scope.filteredResourceDataCustom = $filter('filter')($scope.resourceDataObj, {
            Related_x0020_ELS_x0020_TagId: $scope.elsID,
            Related_x0020_Business_x0020_Uni: $scope.objData.busUn
          }); //console.log('$scope.filteredResourceDataCustom BS + All: ', $scope.filteredResourceDataCustom);
        } else if ($scope.objData.busUn === 'All' && $scope.objData.servLine !== 'All') {
          //Get data for All and  serviceline (NOT 'All' tagged business unit content)
          $scope.filteredResourceDataCustom = $filter('filter')($scope.resourceDataObj, {
            Related_x0020_ELS_x0020_TagId: $scope.elsID,
            Related_x0020_Service_x0020_Line: $scope.objData.servLine
          }); //console.log('$scope.filteredResourceDataCustom All + SL: ', $scope.filteredResourceDataCustom);
        } else if ($scope.objData.busUn !== 'All' && $scope.objData.servLine !== 'All') {
          //Get data for custom BS and SL
          $scope.filteredResourceDataCustom = $filter('filter')($scope.resourceDataObj, {
            Related_x0020_ELS_x0020_TagId: $scope.elsID,
            Related_x0020_Business_x0020_Uni: $scope.objData.busUn,
            Related_x0020_Service_x0020_Line: $scope.objData.servLine
          }); //console.log('$scope.filteredResourceDataCustom ',$scope.filteredResourceDataCustom);
        } else if ($scope.objData.busUn === 'All' && $scope.objData.servLine === 'All') {
          //Get data for All BU  and All SL 
          $scope.filteredResourceDataCustom = $filter('filter')($scope.resourceDataObj, {
            Related_x0020_ELS_x0020_TagId: $scope.elsID
          });
          $scope.allContent = true;
        } //Get data for 'All' and 'All' TAGGED CONTENT


        $scope.filteredResourceData = $filter('filter')($scope.resourceDataObj, {
          Related_x0020_ELS_x0020_TagId: $scope.elsID
        });
        $scope.filteredResourceDataAll = [];
        angular.forEach($scope.filteredResourceData, function (value, key) {
          if (value.Related_x0020_Business_x0020_Uni === 'All' && value.Related_x0020_Service_x0020_Line === 'All') {
            $scope.filteredResourceDataAll.push(value);
          }
        }); //console.log('$scope.filteredResourceDataAll ',$scope.filteredResourceData);
      });
    });
  };

  $scope.updateSelection = function (busUn, servLine) {
    //console.log('inside', busUn, '  ',  servLine);
    $stateParams.businessUnit = busUn;
    $stateParams.serviceLine = servLine;
    sharedParameters.setBusUnit(busUn);
    sharedParameters.setServLine(servLine);
    $scope.getData($scope.objData.busUn, $scope.objData.servLine);
  };

  $scope.nullData = function () {
    if ($scope.howToItem === undefined) {
      return true;
    } else {
      if ($scope.howToItem.Step1Heading === null && $scope.howToItem.Step2Heading === null && $scope.howToItem.Step3Heading === null && $scope.howToItem.Step4Heading === null && $scope.howToItem.Step5Heading === null && $scope.howToItem.Step6Heading === null) {
        return true;
      } else {
        return false;
      }
    }
  };
});