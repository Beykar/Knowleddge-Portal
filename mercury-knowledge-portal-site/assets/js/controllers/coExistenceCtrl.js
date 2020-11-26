define([
    'angularAMD','ngConfirm'
], function(angularAMD) {

    'use strict';

    angularAMD.controller('coExistenceCtrl', ['$scope', '$ngConfirm','$http', '$location', '$state', '$sce', '$window', '$timeout', '$stateParams', function($scope, $ngConfirm,$http, $location, $state, $sce, $window, $timeout, $stateParams) {

        $scope.renderHtml = function(htmlCode) {
            return $sce.trustAsHtml(htmlCode);
        }
        $scope.renderURL = function(URLCode) {
            return $sce.trustAsResourceUrl(URLCode);
        }

        $http({  
          method: 'GET',  
          url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('Lst_BigSwitch')/items?$select=*",
          headers: { 
            "Accept": "application/json;odata=verbose" 
          }  
        })
        .then(function (response, status, headers, config) {  
          $scope.data = response.data.d.results;

          //console.log('data:: ', $scope.data)
    
          $scope.coExistenceContent = $scope.data[1].PageContent;
    
        }, function (error) {  
          console.log(error, 'can not get data.');
        }); 

    }]);


});