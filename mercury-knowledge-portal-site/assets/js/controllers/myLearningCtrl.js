/* My Learning Controller
====================================================================================================
==================================================================================================*/ 

eyMercuryKnowledgeApp.controller('MyLearningCtrl', function(sharedParameters, communityUserData, $scope, $http, $sanitize, $sce, $window, $timeout, $rootScope) {


    $scope.trustAsHtml = function(html) {
        return $sce.trustAsHtml(html);
      }

$scope.init = function(){

    communityUserData.getCommunityUserData().then(function(data){
    
           $scope.dataObj = $rootScope.currentUser;    
           console.log('data in my learing ctrl : ', data);

           setTimeout(function(){

             console.log('$scope.dataObj : ',$scope.dataObj);
            console.log('$scope.dataObj : ',$scope.dataObj.Comm);

           }, 5000);

           if($scope.dataObj.Comm !== undefined){
            $http({
                //url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('LstCommunity')/Items?$filter=Title eq '" + $scope.dataObj.userData.communityID + "'&$top=1"
                url: "urlSite/_api/web/lists/getbytitle('LstCommunity')/Items?$filter=Title eq '" + $scope.dataObj.Comm + "' &$top=1",
                method: "GET",
                cache: false,
                headers: {
                "accept": "application/json;odata=verbose",
                "content-Type": "application/json;odata=verbose"
            }
            })
            .then(function successCallback(response) {
                setTimeout(function(){
                    //console.log('response : ', response.data.d.results[0].LearningMSG);
        
                    $scope.LearningContent1 = response.data.d.results[0].LearningMSG;
                    //console.log('$scope.LearningContent : ', $scope.renderHtml);
    
                    $scope.LearningContent = $scope.trustAsHtml($scope.LearningContent1);
                

                }, 1000);
            
            });
           } else {
            $http({

                url: "urlSite/_api/web/lists/getbytitle('LstCommunity')/Items?$filter=Title eq 'C5' &$top=1",
                method: "GET",
                cache: false,
                headers: {
                "accept": "application/json;odata=verbose",
                "content-Type": "application/json;odata=verbose"
            }
            })
            .then(function successCallback(response) {
                setTimeout(function(){
                    //console.log('response : ', response.data.d.results[0].LearningMSG);
        
                    $scope.LearningContent1 = response.data.d.results[0].LearningMSG;
                    //console.log('$scope.LearningContent : ', $scope.renderHtml);
    
                    $scope.LearningContent = $scope.trustAsHtml($scope.LearningContent1);
                

                }, 1000);
           });

        }
    
           
    })
}

$scope.init();

 });


