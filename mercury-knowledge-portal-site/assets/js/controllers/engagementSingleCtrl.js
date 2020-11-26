
/* Engagement Lifecycle Single Controller
====================================================================================================
==================================================================================================*/
eyMercuryKnowledgeApp.controller('engagementSingleCtrl', function (elsTilesData, communityUserData, howToData, sharedParameters, policyData, guidanceData, resourceData, $rootScope, $scope, $state, $stateParams, $sce, $filter, $window) {
  'use strict';

  window.scrollTo(0, 0);
  $scope.$sce = $sce; 


  //get user name
  $.ajax({
    url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/CurrentUser",
    method: "GET",
    cache: false,
    headers: {
        "accept": "application/json;odata=verbose",
        "content-Type": "application/json;odata=verbose"
    },
    success: function (response) {
    $scope.currentUserTitle = response.d.Title;
    
     var first_Name = $scope.currentUserTitle.split(' ')[0];

     $scope.currentUser = {};
     $scope.currentUser.First_Name = first_Name;

    //console.log(' first_Name', first_Name);
     //console.log('rootScope user object in ctrl:: ', $rootScope.currentUser);
    },
    error: function (data) {
        console.log('Error: ', data);
    }
    });



  // initiate an array to hold all active tabs

  $scope.activeTabs = [];
  $scope.openedTabs = [];
  $scope.action = "Open All"; // check if the tab is active

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
	

 
  $scope.objData = sharedParameters.getDataObj();
  //console.log(' $scope.objData first time', $scope.objData);

  $scope.isOpenTab = function (tab, accordionHeader) {
    // check if this tab is already in the activeTabs array
    if ($scope.activeTabs.indexOf(tab) > -1 || $scope.openedTabs.indexOf(tab) > -1) {
      // if so, return true
      //$scope.getHowToDocs(accordionHeader);
      //console.log('isOpenTab');
      return true;
    } else {
      // if not, return false           
      return false;
    }
  }; // function to 'open' a tab


  $scope.openTab = function (tab, accordionHeader) {
    // check if tab is already open
    if ($scope.isOpenTab(tab)) {
      //if it is, remove it from the activeTabs array
      var obj = $scope.levelTwoChapteringArr.filter(function (o) {
        return o.Heading === accordionHeader;
      });

      var index = $scope.levelTwoChapteringArr.indexOf(obj);

      if (index > -1) {
        $scope.levelTwoChapteringArr[index].Content = [];
      }

      $scope.activeTabs.splice($scope.activeTabs.indexOf(tab), 1);
    } else {
      // if it's not, add it!
      $scope.activeTabs = [];
      $scope.activeTabs.push(tab);
      $scope.getHowToDocs(accordionHeader);
    }
  };

  $scope.openAll = function () {
    $scope.activeTabs = [];

    if ($scope.action === "Close All") {
      $scope.action = "Open All";
      angular.forEach($scope.levelTwoChapteringArr, function (value, key) {
        $scope.levelTwoChapteringArr[key].Content = [];
      });
    } else {
      $scope.action = "Close All";
      angular.forEach($scope.levelTwoChapteringArr, function (value, key) {
        var dataLink = $filter('filter')($scope.elsFactoryData, {
          LevelTwoChaptering: value.Heading
        });
        $scope.levelTwoChapteringArr[key].Content = dataLink;
        $scope.activeTabs.push(key);
      });
    } //console.log('open all-->', $scope.levelTwoChapteringArr);

  }; 
  
  // //Create and output values for Business Unit & Service Line Select menus
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
  $scope.serviceLineArr = ['Advisory', 'Assurance', 'TAS', 'Tax', 'PAS', 'All'];

  

 
      // $scope.userData = $rootScope.currentUser;
      //sharedParameters.setUserData($scope.userData); 
      //console.log('new user data set timeout: ', $scope.userData);

      setTimeout(function () {
        sharedParameters.setELS($stateParams.tileTitle);
        sharedParameters.setBusUnit($stateParams.businessUnit);
        sharedParameters.setServLine($stateParams.serviceLine); 
        //console.log('object at start: ', sharedParameters.getDataObj());

        $scope.objData = sharedParameters.getDataObj(); 
        
        //Populate selection boxes
        $scope.selectedBusinessUnit = $scope.objData.busUn; 
        //console.log('$scope.selectedBusinessUnit init: ', $scope.selectedBusinessUnit);

        $scope.selectedServiceLine = $scope.objData.servLine; 
        //console.log('$scope.selectedServiceLine init: ', $scope.selectedServiceLine);

        //$scope.objData.userData.businessUnit = $scope.selectedBusinessUnit;
        //$scope.objData.userData.serviceLine = $scope.selectedServiceLine;

        //console.log('$scope.objData ', $scope.objData);

       

        if ($scope.objData != undefined) {
          $scope.loggedIn = true; 

        } else {
          $scope.loggedIn = false;
        }

        $scope.tileTitle = $scope.objData.els;
        $scope.selectedBusinessUnit = $scope.objData.busUn;
        $scope.selectedServiceLine = $scope.objData.servLine; 
        //$scope.getData($scope.selectedBusinessUnit, $scope.selectedServiceLine);
      }, 500); 




  
//   $.ajax({
//     url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/CurrentUser",
//     method: "GET",
//     cache: false,
//     headers: {
//         "accept": "application/json;odata=verbose",
//         "content-Type": "application/json;odata=verbose"
//     },
//     success: function (response) {
//     $rootScope.currentUser = {
//         fullname:  response.d.Title,
//         ID      :  response.d.Id,
//         email   :  response.d.Email
//     }                            
//     //console.log('rootScope user object in ctrl:: ', $rootScope.currentUser);
//     },
//         error: function (data) {
//             console.log('Error: ', data);
//     }
// })


  //console.log('els in object inside getData: ', sharedParameters.getDataObj());

  $scope.objData = sharedParameters.getDataObj();
  $scope.tileTitle = $stateParams.tileTitle; 
  
  //get home page Tile Section Content

  elsTilesData.getELSTilesData().then(function (data) {
    $scope.homeTilesData = data.d.results; //console.log('home tiles :: ', $scope.homeTilesData);
    //Filter according to tile name and bring the corresponding image URL

    angular.forEach($scope.homeTilesData, function (value, key) {

      if (value.Title === $scope.tileTitle) {
        $scope.currentTileID = key + 1;
        $scope.currentFilterName = value.Filter_x002d_safe_x002d_name;
        sharedParameters.setELSFilterName($scope.currentFilterName);

        $scope.tileFullDescription = $filter('filter')($scope.homeTilesData, {
          ID: $scope.currentTileID
        })[0]['FullDescription'];

        $scope.tileImage = $filter('filter')($scope.homeTilesData, {
        ID: $scope.currentTileID
        })[0]['ImageUrl'];
      }

    });    

    
    //Get data factory name associated with ELS tile

    //console.log('$scope.objData.els ', $scope.tileTitle);

    $scope.dataFactoryName = $filter('filter')($scope.homeTilesData, {
      Title: $scope.tileTitle
    })[0]['ELSFactoryName']; 
    //console.log('$scope.dataFactoryName:: ', $scope.dataFactoryName);
    //Get data from factory using $scope.dataFactoryName


    howToData.getELSData($scope.dataFactoryName).then(function (data) {
      $scope.elsFactoryData = data.d.results; 
      //console.log('$scope.elsFactoryData:: ', $scope.elsFactoryData);
      //   //Filter factory according to Business Unit & Service Line
      //   $scope.busUnServLnFilter = $filter('filter')($scope.elsFactoryData, {BusinessUnit: busUnit, ServiceLine: servLine});
      //   console.log(' $scope.busUnServLnFilter:: ',  $scope.busUnServLnFilter);
      //Put all level 2 chaptering values into an array

      $scope.levelTwoChapteringArr = []; //$scope.levelTwoChapteringSet = new Set();

      angular.forEach($scope.elsFactoryData, function (value, key) {
        //Put values into a set to remove duplicates from onset 
        //$scope.levelTwoChapteringSet.add(value.LevelTwoChaptering);
        $scope.levelTwoChapteringArr.push({
          Heading: value.LevelTwoChaptering,
          Content: []
        });
      });
      $scope.levelTwoChapteringArr = uniqueData($scope.levelTwoChapteringArr, "Heading"); //console.log('$scope.levelTwoChapteringArr: ', $scope.levelTwoChapteringArr); 
      
      //function to retrieve data according to clicked levelTwoChapter accordion heading
      $scope.getHowToDocs = function (accordionHeading) {
        //$scope.howToDocsArr = $filter('filter')($scope.elsFactoryData,{LevelTwoChaptering:accordionHeading});
        
        var obj1 = $scope.levelTwoChapteringArr.filter(function (o) {
          return o.Heading === accordionHeading;
        });
       
        var index = $scope.levelTwoChapteringArr.indexOf(obj1[0]); 
        
        //getting the links for the list content according to the accordionHeading chosen
        var dataLink = $filter('filter')($scope.elsFactoryData, {
          LevelTwoChaptering: accordionHeading
        });

        if (index > -1) {
          $scope.levelTwoChapteringArr[index].Content = dataLink;
        } //console.log('levelTwoFinal:', $scope.levelTwoChapteringArr);

      };
    });
  });

  function uniqueData(collection, value) {
    var output = [],
        keys = [];
    angular.forEach(collection, function (item) {
      var key = item[value];

      if (keys.indexOf(key) === -1) {
        keys.push(key);
        output.push(item);
      }
    });
    return output;
  }

  ;

  $scope.updateParamObj = function (paramValue) {
    sharedParameters.setDocContentNum(paramValue);
  };

  

  $scope.getData = function (busUnit, servLine) {
    // console.log('busUnit', busUnit);
    // console.log('servLine', servLine);

    console.log('sharedParams', sharedParameters.getDataObj());

    if (busUnit === undefined && servLine === undefined){
      busUnit = $stateParams.businessUnit;
      servLine = $stateParams.serviceLine;
      $scope.objData.busUn = $stateParams.businessUnit;
      $scope.objData.servLine = $stateParams.serviceLine;
    }
    
     
 
    //Update URL without reloading window  

    $state.go('engagement-lifecycle/individual', {
      tileTitle: $stateParams.tileTitle,
      businessUnit: $stateParams.businessUnit,
      serviceLine: $stateParams.serviceLine
    }, {
      notify: false
  });
    

  $scope.objData.busUn = $stateParams.businessUnit;
  $scope.objData.servLine = $stateParams.serviceLine;

    $scope.objData = sharedParameters.getDataObj();
    //console.log(' $scope.objData ',  $scope.objData);
	  //console.log('bu:', $scope.objData.busUn);
	  //console.log('sl:', $scope.objData.servLine);

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
        });
        //console.log('$scope.filteredPolicyDataCustom ', $scope.filteredPolicyDataCustom);
      } else if ($scope.objData.busUn === 'All' && $scope.objData.servLine === 'All') {
        //console.log('in if statement');
        //Get data for All BU  and All SL 
        $scope.filteredPolicyDataCustom = $filter('filter')($scope.policyDataObj, {
          ELS: $scope.objData.els
        });
        $scope.allContent = true;
      } 
      //Get data for 'All' and 'All' TAGGED CONTENT
      $scope.filteredPolicyData = $filter('filter')($scope.policyDataObj, {
        ELS: $scope.objData.els
      }); // console.log('$scope.filteredPolicyDataAll ',$scope.filteredPolicyData);

      $scope.filteredPolicyDataAll = [];
      angular.forEach($scope.filteredPolicyData, function (value, key) {
        if (value.BusinessUnit === 'All' && value.ServiceLine === 'All') {
          $scope.filteredPolicyDataAll.push(value);
        }
      }); //console.log('$scope.filteredPolicyDataAll ',$scope.filteredPolicyDataAll);
      //console.log('$scope.allContent: ', $scope.allContent);
    });
	
	//Get guidance data according to ELS/BU/SL

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
        }); //console.log('$scope.filteredGuidanceDataCustom for bu & sl : ', $scope.filteredGuidanceDataCustom);
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
      }); //console.log('$scope.filteredGuidanceDataAll ', $scope.filteredGuidanceDataAll);
    }); //Get Resource data according to ELS/BU/SL

    resourceData.getResourceData().then(function (data) {
      $scope.resourceDataObj = data.d.results;
      elsTilesData.getELSTilesData().then(function (data) {
        $scope.homeTilesData = data.d.results; //Get corresponding Id of ELS value from ELS list

        $scope.elsID = $filter('filter')($scope.homeTilesData, {
          Title: $scope.objData.els
        })[0]['ID']; //console.log('ELS name & id: ', $scope.objData.els, ' & ', $scope.elsID);
        //console.log('business Unit: ', $scope.objData.busUn, ' serviceLine: ', $scope.objData.servLine);

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
          $scope.allContent = true; //console.log('$scope.filteredResourceDataCustom ', $scope.filteredResourceDataCustom);
        } 
        
        
        //Get data for 'All' and 'All' TAGGED CONTENT
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

  setTimeout(function(){
    $scope.getData($scope.objData.busUn, $scope.objData.servLine);
  },500);

  

  $scope.updateSelection = function (busUn, servLine) {

    //console.log('inside', busUn, '  ',  servLine);
    $stateParams.businessUnit = busUn;
    $stateParams.serviceLine = servLine;
    sharedParameters.setBusUnit(busUn);
    sharedParameters.setServLine(servLine);

    $scope.getData($scope.objData.busUn, $scope.objData.servLine);
  };

  $scope.goToHomePage = function (bus, serv) {
    sharedParameters.setBusUnit(bus);
    sharedParameters.setServLine(serv);
    // $rootScope.currentUser.businessUnit = bus;
    // $rootScope.currentUser.servLine = serv;
    $state.go('task-support', {
      notify: false
    });
  };
});