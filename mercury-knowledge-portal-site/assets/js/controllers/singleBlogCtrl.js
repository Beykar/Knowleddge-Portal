/* Single Blog Controller
====================================================================================================
==================================================================================================*/ 

eyMercuryKnowledgeApp.controller('singleBlogCtrl', function(sharedParameters, communityUserData, $scope, $http, $sanitize, $sce, $window, $timeout, $rootScope, $stateParams) {


    $scope.trustAsHtml = function(html) {
        return $sce.trustAsHtml(html);
      }


$scope.Getblog = function () { 
    
    console.log('in single blog ctrl');

    $scope.dataObj = sharedParameters.getDataObj();

        var id = $stateParams.id;
        console.log('id: ', id);
        switch (id) {
        case '1':
        $scope.blogurl = 1;
        break;

        case '2':
        $scope.blogurl = 2;
        break;

        case '3':
        $scope.blogurl = 3;
        break;

        
        default:

        }
        console.log($scope.blogurl)

        $http({  

            method: 'GET',  
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('Lst_Blogs')/items?$select=*&$filter=BlogID eq '" + id + "'",
            headers: { "Accept": "application/json;odata=verbose" }  

        }).then(function (response, status, headers, config) {  

            $scope.blog1 = response.data.d.results[0].BlogContent;
            $scope.blogContent = $scope.trustAsHtml($scope.blog1);

        },function (error) {  
            console.log(error, 'can not get data.');
        });  

   
  

}

$scope.Getblog();

 });


