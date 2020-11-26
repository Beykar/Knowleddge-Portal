/* Share This Controller
====================================================================================================
==================================================================================================*/ 

eyMercuryKnowledgeApp.controller('shareThisCtrl', function(sharedParameters, $stateParams, elsTilesData, howToData, $scope, $location, $sce, $filter, $window) {
    'use strict';
    window.scrollTo(0,0);
	$scope.$sce = $sce;
	
	$scope.pageURL = $location.path();
    //console.log('$scope.pageURL : ', $scope.pageURL);
    //$scope.tileTitle = $stateParams.tileTitle;

    	// Get current user data
	$.ajax({
		url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/CurrentUser",
		method: "GET",
		cache: false,
		headers: {
			"accept": "application/json;odata=verbose",
			"content-Type": "application/json;odata=verbose"
		},
		success: function (response) {
		$scope.currentUser = {
			fullname:  response.d.Title,
			ID      :  response.d.Id,
			email   :  response.d.Email
		}                            
		//console.log('user object in ctrl:: ', $scope.currentUser);
		},
			error: function (data) {
				console.log('Error: ', data);
		}
	})
		
	$scope.shareThis = function(item){

		$scope.tileTitle = item.tileTitle;
		$scope.pageURL3 = '<urlSite' + $scope.pageURL.replace(' ', '%20')+'>';

        console.log('$scope.pageURL3: ',$scope.pageURL3);
        $scope.dataObj = sharedParameters.getDataObj();
        //console.log(' $scope.dataObj: ',  $scope.dataObj);

        var mailto_link = "mailto: " + "?subject= Information about " + $scope.tileTitle  + "&body=This information has been shared with you by: " + $scope.currentUser.fullname + "%0D%0AELS: " + $scope.tileTitle + "%0D%0ABusiness Unit: " + $scope.dataObj.busUn + "%0D%0AService Line : " + $scope.dataObj.servLine + "%0D%0A Link to document: "+ $scope.pageURL3;

        $window.open(mailto_link, '_self');

    } 

});