/* Search Controller
====================================================================================================
==================================================================================================*/
eyMercuryKnowledgeApp.controller('searchCtrl', function (keywordsService, elsTilesData, howToData, policyData, guidanceData, sharedParameters, $scope, $location, $window, $sce, $filter, $stateParams, $state) {
  'use strict';

  window.scrollTo(0, 0);
  $scope.$sce = $sce; //Disable Search 'Close' Button

  jQuery('.sm__close-button').attr('disabled', true); //Set display of 'Close button to none

  jQuery('.sm__close-button').css('display', 'none');
  $scope.itemsPerPage = 5;
  $scope.currentPage = 0;
  $scope.totalResults = 0;
  
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
	
	$scope.removeDuplicatesResults = function(myArray){ 
		var newArray = [];
		var titles = [];
		for(var i=0; i< myArray.length; i++){
			var myTitle = myArray[i]['Title'].trim();
			//console.log('my title:', myTitle);
			if( newArray.length === 0 ){
				newArray.push(myArray[i]);
			}else {
				for( var y=0; y < newArray.length; y++ ){
					//console.log('here:', newArray);
					if(newArray[y]['Title'] !== myTitle){
						newArray.push(myArray[i]);
					}
				}
			}
		}
		return newArray;
	}
	
	$scope.getSearch= function(){
		$scope.searchedKeyword = $("#search-input1").val();
		//$scope.searchedKeyword = document.getElementById('search-input').value;
		//console.log('get serach:', $scope.searchedKeyword);	
		$stateParams.q = $scope.searchedKeyword;
		$scope.getSearchResults($scope.searchedKeyword);
		
		$state.go('.', {q: $scope.searchedKeyword}, {notify: false});
		
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
							$scope.keywordsArr = $scope.removeDuplicates($scope.keywordsArr);
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
							$scope.keywordsArr = $scope.removeDuplicates($scope.keywordsArr);
							console.log('keywords:', $scope.keywordsArr);
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
							$scope.keywordsArr = $scope.removeDuplicates($scope.keywordsArr);
							console.log('keywords:', $scope.keywordsArr);
						}
					);
				});
			}
		)

		return function(element){			
			return element.toLowerCase().startsWith(viewValue.toLowerCase()) ? 0: 1;          
		}
  };*/
  
  $scope.keywordsAll = keywordsService.getAllKeywords();
		
		
	
	$scope.orderByStartsWith = function(viewValue) {
		$scope.keywordsArr = [];
			//console.log('heere');
		if (Array.isArray($scope.keywordsAll) && $scope.keywordsAll.length) {
			for (var i=0; i<$scope.keywordsAll.length; i++){
				if($scope.keywordsAll[i].toLowerCase().trim().indexOf(viewValue.toLowerCase())>=0){
					$scope.keywordsArr.push($scope.keywordsAll[i].trim());
				}
			}
		}
	}
  

  $scope.getSearchResults = function (keyword) {
    event.preventDefault(); // get the searched keyword from the input text

	$scope.resultsHT = [];
    $scope.resultsFAQ = [];
    $scope.resultsPG = [];
    $scope.nresults = 0; // get home page Tile Section Content
	
    if(keyword!== undefined){
		$scope.searchedKeyword = keyword;
		//console.log('search page');
	}else if($stateParams.q !== null || $stateParams.q !== undefined){
      $scope.searchedKeyword = $stateParams.q;
    }else{
      $scope.searchedKeyword = $("#search-input").val();
    }
    
    if ($scope.searchedKeyword !== "") {
      $scope.showResults = true;
      
      elsTilesData.getELSTilesData().then(function (data) {
        $scope.homeTilesData = data.d.results;
        angular.forEach($scope.homeTilesData, function (value, key) {
          var factory = value['ELSFactoryName'];
          howToData.getELSData(factory).then(function (data) {
            $scope.documentResults = data.d.results;
            angular.forEach($scope.documentResults, function (value, key) {
              keywordsFiltered(value, $scope.resultsHT);
            });
          });
        });
	  }); 
	  
	  //get policy Data from api
	  policyData.getPolicyData().then(function (data) {
        $scope.policyResults = data.d.results;
        angular.forEach($scope.policyResults, function (value, key) {
          keywordsFiltered(value, $scope.resultsPG);
        });
		
      }); 
	  
	  //get guidance Data from api
	  guidanceData.getGuidanceData().then(function (data) {
        $scope.guidanceResults = data.d.results;
        angular.forEach($scope.guidanceResults, function (value, key) {
          keywordsFiltered(value, $scope.resultsFAQ);
        });
      });
	  
	  $scope.totalResults = $scope.resultsHT.length + $scope.resultsPG.length + $scope.resultsFAQ.length;
	  
    }
  }; 
  
  //function filter the Keywords coming from the api object
  function keywordsFiltered(value, results) {
    if (value.Keywords !== null) {
      var keywordsFiltered = value.Keywords.trim().slice(0, -1);
      var keywordsArr = keywordsFiltered.split(";").map(function (item) {
        return item.trim();
      });

      if (keywordsArr.indexOf($scope.searchedKeyword) > -1) {
        /*if (value.ELS.indexOf('.') > -1) {
          value.ELS = value.ELS.substring(value.ELS.indexOf('.') + 1, value.ELS.length).trim();
        }*/
        
        var els = value.ELS.split(';')[0];
		if(value.StandFirst === null ){
			value.StandFirst = "";
		}

        results.push({
          Heading: value.Heading,
          StandFirst: value.StandFirst,
          ELS: els.split('.')[1].trim(),
          BU: value.BusinessUnit,
          SL: value.ServiceLine,
          Title: value.Title
        });
		
		$scope.totalResults ++;
      }
    }
  }

  $scope.prevPage = function () {
    if ($scope.currentPage > 0) {
      $scope.currentPage--;
    }
  };

  $scope.prevPageDisabled = function () {
    return $scope.currentPage === 0 ? "disabled" : "";
  };

  $scope.pageCount = function () {
    var count = 0;
	var acum = 0;
	

    if (Array.isArray($scope.resultsHT) && $scope.resultsHT.length) {
		acum += $scope.resultsHT.length;
    }
	if (Array.isArray($scope.resultsPG) && $scope.resultsPG.length) {
		acum += $scope.resultsPG.length;
    }
	if (Array.isArray($scope.resultsFAQ) && $scope.resultsFAQ.length) {
		acum += $scope.resultsFAQ.length;
    }
	
	if( acum > 0 ){
		count = Math.ceil(acum / $scope.itemsPerPage) - 1;
	}

    return count;
  };

  $scope.nextPage = function () {
    if ($scope.currentPage < $scope.pageCount()) {
      $scope.currentPage++;
    }
  };

  $scope.nextPageDisabled = function () {
    return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
  };
});