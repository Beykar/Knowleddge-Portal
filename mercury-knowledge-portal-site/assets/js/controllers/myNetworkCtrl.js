/* faqs Controller
====================================================================================================
==================================================================================================*/ 

eyMercuryKnowledgeApp.controller('mynetworkCtrl', function(changeChampData,$scope,$http, $location, $state, $sce, $window, $timeout, $stateParams ) {

    'use strict';
    window.scrollTo(0,0);
    $scope.$sce = $sce;


    changeChampData.getChangecChampData().then(function(data){ 
        $scope.champions = data.d.results;
      });

    $scope.renderHtml = function (htmlCode) {
      return $sce.trustAsHtml(htmlCode);
    }

});