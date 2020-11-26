/* faqs Controller
====================================================================================================
==================================================================================================*/ 

eyMercuryKnowledgeApp.controller('faqsCtrl', function(faqsData,$scope,$http, $location, $state, $sce, $window, $timeout, $stateParams ) {

    'use strict';
    window.scrollTo(0,0);
    $scope.$sce = $sce;


    faqsData.getFAQsData().then(function(data){ 
        $scope.faqs = data.d.results;
        //console.log('faqs: ', $scope.faqs);
      });

    $scope.renderHtml = function (htmlCode) {
      return $sce.trustAsHtml(htmlCode);
    }

});