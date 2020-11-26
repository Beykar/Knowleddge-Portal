/* Nav Controller
====================================================================================================
==================================================================================================*/ 

eyMercuryKnowledgeApp.controller('navCtrl', function(keywordsService, elsTilesData, howToData, policyData, guidanceData, sharedParameters, $scope, $rootScope, $http, $sce,$window, $filter, $timeout, $location, $anchorScroll, $stateParams, $state) {

	'use strict';
	window.scrollTo(0,0);
	$scope.$sce = $sce;
	
	$scope.keywordsArr = [];
	$scope.keywordsAll = [];
	
	
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
	
	$scope.keywordsAll = keywordsService.getAllKeywords();
		
	
	$scope.orderByStartsWith = function(viewValue) {
		$scope.keywordsArr = [];
		
		//console.log('dups:', $scope.keywordsAll);
		//$scope.keywordsND = $scope.removeDuplicates($scope.keywordsAll);	
		//console.log('dups:', $scope.keywordsND);

		
		if (Array.isArray($scope.keywordsAll) && $scope.keywordsAll.length) {
			for (var i=0; i<$scope.keywordsAll.length; i++){
				if($scope.keywordsAll[i].toLowerCase().trim().indexOf(viewValue.toLowerCase())>=0){
					$scope.keywordsArr.push($scope.keywordsAll[i].trim());
				}
			}
		}
	}

	/*================================= this function sorts the display order of the typehead result according to the first letter that is typed in =================================================*/
	/*$scope.orderByStartsWith = function(viewValue) {
		console.log('viewValue:: ', viewValue);
		$scope.objData = sharedParameters.getDataObj();
		$scope.keywordsSet = new Set();
		$scope.keywordsArr = [];
		$scope.factoryName = [];

		elsTilesData.getELSTilesData().then(
			function(data){
				$scope.homeTilesData = data.d.results;
				angular.forEach($scope.homeTilesData, function(value, key){
					var factory = value['ELSFactoryName'];
					$scope.factoryName.push(factory);
					
					howToData.getELSData(factory).then(
						function(data){
							$scope.documentResults = data.d.results;
							$scope.personalisationFilter = $filter('filter')($scope.documentResults, {BusinessUnit: $scope.objData.busUn, ServiceLine: $scope.objData.servLine});
							
							angular.forEach($scope.personalisationFilter, function(value, key){
								var keywordsFiltered = value['Keywords'].slice(0, -1);
								var split = keywordsFiltered.split(';');
								
								if (Array.isArray(split) && split.length) {
									for (var i=0; i<split.length; i++){
										if(split[i].toLowerCase().trim().indexOf(viewValue.toLowerCase())>=0){
											$scope.keywordsArr.push(split[i].trim());
										}
									}
								}
							});
							// remove duplicates
							
							//$scope.keywordsArr = Array.from($scope.keywordsSet);
						}
					);
					
					policyData.getPolicyData().then(
						function (data) {
							$scope.policyResults = data.d.results;
							$scope.personalisationFilter = $filter('filter')($scope.policyResults, {BusinessUnit: $scope.objData.busUn, ServiceLine: $scope.objData.servLine});
							
							angular.forEach($scope.personalisationFilter, function(value, key){
								var keywordsFiltered = value['Keywords'].slice(0, -1);
								var split = keywordsFiltered.split(';');
								
								if (Array.isArray(split) && split.length) {
									for (var i=0; i<split.length; i++){
										if(split[i].toLowerCase().trim().indexOf(viewValue.toLowerCase())>=0){
											$scope.keywordsArr.push(split[i].trim());
										}
									}
								}
							});
							// remove duplicates
							
							//$scope.keywordsArr = Array.from($scope.keywordsSet);
						}
					);
					
					guidanceData.getGuidanceData().then(
						function (data) {
							$scope.guidanceResults = data.d.results;
							$scope.personalisationFilter = $filter('filter')($scope.guidanceResults, {BusinessUnit: $scope.objData.busUn, ServiceLine: $scope.objData.servLine});
							
							angular.forEach($scope.personalisationFilter, function(value, key){
								var keywordsFiltered = value['Keywords'].slice(0, -1);
								var split = keywordsFiltered.split(';');
								
								if (Array.isArray(split) && split.length) {
									for (var i=0; i<split.length; i++){
										if(split[i].toLowerCase().trim().indexOf(viewValue.toLowerCase())>=0){
											$scope.keywordsArr.push(split[i].trim());
										}
									}
								}
							});
							// remove duplicates
							
						}
					);
					
				});
				
				$scope.keywordsArr = $scope.removeDuplicates($scope.keywordsArr);
			}
		)

		return function(element){			
			return element.toLowerCase().startsWith(viewValue.toLowerCase()) ? 0: 1;          
		}
	};*/


	$scope.redirectSearchResults = function(){
		//console.log('redirect search');
        event.preventDefault();
		var searchedTagTerm = $("#search-input").val();
		$stateParams.term = searchedTagTerm;
		$("#search-input").val("");
		
        if (searchedTagTerm === "") {
              alert('nothing entered!');
        } else {
			//console.log('$scope.objData', $scope.objData);
			$state.go("search/query", {q: searchedTagTerm});
        } 
    }

});