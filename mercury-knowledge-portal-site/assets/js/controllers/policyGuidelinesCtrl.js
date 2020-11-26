
/* PolicyGuidelines Controller
=====================================================================================================================================================================================*/
eyMercuryKnowledgeApp.controller('policyGuidelinesCtrl', function (communityUserData, policyData, guidanceData, sharedParameters, $rootScope, $scope, $stateParams, $sce, $filter, $window) {
  'use strict';


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
  
  

  window.scrollTo(0, 0);
  $scope.$sce = $sce;
  $scope.objData = sharedParameters.getDataObj();
  $scope.itemsPerPage = 5;
  $scope.currentPage = 0;
  $scope.totalResults = 0;

  $scope.businessUnitArr = ['UK', 'ROI', 'FSO UK', 'FSO ROI', 'FSO Channel Islands', 'All'];
  $scope.serviceLineArr = ['Advisory', 'Assurance', 'TAS', 'Tax', 'PAS', 'All'];
  
  // communityUserData.getBusinessUnitData().then(
  //   function(data){
  //       $scope.busUnData = data.d.results;
  //       $scope.busUnSet = new Set();
  //       $scope.businessUnitArr = [];
  //       angular.forEach($scope.busUnData, function(value,key){
  //           $scope.busUnSet.add(value.FSOUKIEYG);
  //       });
  //       $scope.businessUnitArr = Array.from($scope.busUnSet);
  //       $scope.businessUnitArr.push('All');
  //       console.log('$scope.busUnSetArr', $scope.businessUnitArr);
  //   }
  //   );
  //   communityUserData.getServiceLineData().then(
  //     function(data){
  //         $scope.servLineData = data.d.results;
  //         $scope.servLineSet = new Set();
  //         $scope.serviceLineArr = [];
  //         angular.forEach($scope.servLineData, function(value,key){
  //             $scope.servLineSet.add(value.Service_Line);
  //         });
  //         $scope.serviceLineArr = Array.from($scope.servLineSet);
  //         $scope.serviceLineArr.push('All');
  //         console.log('$scope.servLineArr', $scope.serviceLineArr);
  //     }
  //   );

  setTimeout(function () {
	
    communityUserData.getCommunityUserData().then(function (data) {
		$scope.userData = $rootScope.currentUser;
		sharedParameters.setUserData($scope.userData); 
        
        //$scope.objData = sharedParameters.getDataObj(); 
		
		    //console.log('object at start: ', $scope.objData);
        
        //console.log('$scope.objData.userData ', $scope.objData.userData);

        if ($scope.objData.busUn != undefined) {
          $scope.loggedIn = true; 
          //Display user name in partial
          $scope.currentUser.First_Name = $scope.objData.userData.First_Name; 
          //console.log('logged in');
          //console.log('$scope.objData.userData: ', $scope.objData.userData);
          //$scope.getData($scope.selectedBusinessUnit, $scope.selectedServiceLine);
          //$state.go('engagement-lifecycle/individual', {tileTitle: $stateParams.tileTitle, businessUnit: $scope.selectedBusinessUnit, serviceLine: $scope.selectedServiceLine}, {notify: false}); 

          $scope.selectedBusinessUnit = $scope.objData.busUn;
          $scope.selectedServiceLine = $scope.objData.servLine;
          sharedParameters.setBusUnit($scope.selectedBusinessUnit);
          sharedParameters.setServLine($scope.selectedServiceLine);
        } else {
		
				$scope.selectedBusinessUnit = $scope.businessUnitArr[5];
				$scope.selectedServiceLine = $scope.serviceLineArr[5];
		  
        sharedParameters.setBusUnit($scope.selectedBusinessUnit);
        sharedParameters.setServLine($scope.selectedServiceLine);
        $scope.loggedIn = false;
        //console.log('NOT logged in');
        }
		
        //$scope.getData($scope.selectedBusinessUnit, $scope.selectedServiceLine);
    });

    
  }, 100); //get home page Tile Section Content


  $scope.getAllPolicies = function () {

    if ($scope.selectedBusinessUnit === undefined || $scope.selectedServiceLine === undefined){
      $scope.selectedBusinessUnit = $scope.objData.busUn;
      $scope.selectedServiceLine = $scope.objData.servLine;
      console.log(' $scope.selectedBusinessUnit ',$scope.selectedBusinessUnit);
      console.log(' $scope.selectedServiceLine ',$scope.selectedServiceLine);
    }

    $scope.showResults = true;
    $scope.policies = []; //get policy Data from api
	  $scope.filteredPolicies = [];
	  $scope.filteredPolicies1 = [];
	  $scope.filteredPolicies2 = [];
	

    policyData.getPolicyData().then(function (data) {
      $scope.policyResults = data.d.results;
      //console.log('policy', $scope.policyResults); 
  
      
      //filter depending on ELS, Business Unit and Service Lines chosen
      if($scope.selectedBusinessUnit === "All" && $scope.selectedServiceLine !== "All") {
        $scope.filteredPolicies1 = $filter('filter')($scope.policyResults, {ServiceLine: $scope.selectedServiceLine}, true);
		$scope.filteredPolicies2 = $filter('filter')($scope.policyResults, {BusinessUnit: "All", ServiceLine: "All"}, true);
    $scope.filteredPolicies = $scope.filteredPolicies1.concat($scope.filteredPolicies2);

    angular.forEach($scope.filteredPolicies, function (value, key) {
      //console.log('val', value);
      var els = value.ELS;
        if(value.StandFirst === null ){
          value.StandFirst = "";
        }

      $scope.policies.push({
          Heading: value.Heading,
          StandFirst: value.StandFirst,
          ELS: els,
          BU: value.BusinessUnit,
          SL: value.ServiceLine,
          Title: value.Title
      });
   
      $scope.totalResults++;
    });

    console.log('$scope.policies',  $scope.policies);
		
      }else if($scope.selectedBusinessUnit !== "All" && $scope.selectedServiceLine === "All") {
        $scope.filteredPolicies1 = $filter('filter')($scope.policyResults, {BusinessUnit: $scope.selectedBusinessUnit}, true);
		$scope.filteredPolicies2 = $filter('filter')($scope.policyResults, {BusinessUnit: "All", ServiceLine: "All"}, true);
		$scope.filteredPolicies = $scope.filteredPolicies1.concat($scope.filteredPolicies2);
    console.log('$scope.filteredPolicies bu + all ', $scope.filteredPolicies);
    
    angular.forEach($scope.filteredPolicies, function (value, key) {
      //console.log('val', value);
      var els = value.ELS;
        if(value.StandFirst === null ){
          value.StandFirst = "";
        }

      $scope.policies.push({
          Heading: value.Heading,
          StandFirst: value.StandFirst,
          ELS: els,
          BU: value.BusinessUnit,
          SL: value.ServiceLine,
          Title: value.Title
      });
   
      $scope.totalResults++;
    });

    console.log('$scope.policies',  $scope.policies);


      }else if($scope.selectedBusinessUnit !== "All" && $scope.selectedServiceLine !== "All") {
        $scope.filteredPolicies1 = $filter('filter')($scope.policyResults, {BusinessUnit: $scope.selectedBusinessUnit, ServiceLine: $scope.selectedServiceLine}, true);
		$scope.filteredPolicies2 = $filter('filter')($scope.policyResults, {BusinessUnit: "All", ServiceLine: "All"}, true);
		$scope.filteredPolicies = $scope.filteredPolicies1.concat($scope.filteredPolicies2);
		console.log('filteredPolicies1', $scope.filteredPolicies1);
		console.log('filteredPolicies2', $scope.filteredPolicies2);
		console.log('filteredPolicies', $scope.filteredPolicies);
    
    angular.forEach($scope.filteredPolicies, function (value, key) {
      //console.log('val', value);
      var els = value.ELS;
        if(value.StandFirst === null ){
          value.StandFirst = "";
        }

      $scope.policies.push({
          Heading: value.Heading,
          StandFirst: value.StandFirst,
          // ELS: els.split('.')[1].trim(),
          ELS: els,
          BU: value.BusinessUnit,
          SL: value.ServiceLine,
          Title: value.Title
      });
     
      $scope.totalResults++;
    });
    console.log('$scope.policies',  $scope.policies);
		
	  }else {
        $scope.filteredPolicies = $scope.policyResults;
        angular.forEach($scope.filteredPolicies, function (value, key) {
          //console.log('val', value);
          var els = value.ELS;
            if(value.StandFirst === null ){
              value.StandFirst = "";
            }
    
          $scope.policies.push({
              Heading: value.Heading,
              StandFirst: value.StandFirst,
              ELS: els,
              BU: value.BusinessUnit,
              SL: value.ServiceLine,
              Title: value.Title
          });
       
          $scope.totalResults++;
        });

        console.log('$scope.policies',  $scope.policies);
      }

    
    });
  };

  $scope.getAllGuidelines = function () {
    $scope.showResults = true;
    $scope.guidelines = []; //get policy Data from api

    guidanceData.getGuidanceData().then(function (data) {
      $scope.guidelinesResults = data.d.results;
      
      //filter depending on ELS, Business Unit and Service Lines chosen
      if($scope.selectedBusinessUnit === "All" && $scope.selectedServiceLine !== "All") {
        $scope.filteredGuidelines = $filter('filter')($scope.guidelinesResults, {ServiceLine: $scope.selectedServiceLine}, true);
      }else if($scope.selectedServiceLine === "All" && $scope.selectedBusinessUnit !== "All") {
        $scope.filteredGuidelines = $filter('filter')($scope.guidelinesResults, {BusinessUnit: $scope.selectedBusinessUnit}, true);
      }else if($scope.selectedBusinessUnit !== "All" && $scope.selectedServiceLine !== "All") {
        $scope.filteredGuidelines = $filter('filter')($scope.guidelinesResults, {BusinessUnit: $scope.selectedBusinessUnit, ServiceLine: $scope.selectedServiceLine}, true);
      }else {
        $scope.filteredGuidelines = $scope.guidelinesResults;
      }

      angular.forEach($scope.filteredGuidelines, function (value, key) {
        var els = value.ELS.split(';')[0];
		
		if(value.StandFirst === null ){
			value.StandFirst = "";
		}

        $scope.guidelines.push({
          Heading: value.Heading,
          StandFirst: value.StandFirst,
          ELS: els.split('.')[1].trim(),
          BU: value.BusinessUnit,
          SL: value.ServiceLine,
          Title: value.Title
        });

        //$scope.totalResults++;
      });
    });
  };

  $scope.prevPage = function () {
    if ($scope.currentPage > 0) {
      $scope.currentPage--;
    }
  };

  $scope.prevPageDisabled = function () {
    return $scope.currentPage === 0 ? "disabled" : "";
  };

  $scope.pageCount = function () {
    var policies = 0, guidelines = 0;

    if (Array.isArray($scope.policies) && $scope.policies.length) {
      policies = $scope.policies.length;
    }

    if (Array.isArray($scope.guidelines) && $scope.guidelines.length) {
      guidelines = $scope.guidelines.length;
    }

    var total = Math.ceil( (policies + guidelines) / $scope.itemsPerPage) - 1;

    return total;
  };

  $scope.nextPage = function () {
    if ($scope.currentPage < $scope.pageCount()) {
      $scope.currentPage++;
    }
  };

  $scope.nextPageDisabled = function () {
    return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
  };
  
  $scope.updateSelection = function (busUn, servLine) {

    setTimeout(function () {
	$scope.totalResults = 0;
	$scope.currentPage = 0;
    sharedParameters.setBusUnit(busUn);
    sharedParameters.setServLine(servLine);
	$scope.selectedBusinessUnit = busUn;
	$scope.selectedServiceLine = servLine;
	$scope.getAllPolicies();
    $scope.getAllGuidelines();
    }, 100);
  };

});