/* big switch Controller
====================================================================================================
==================================================================================================*/ 

eyMercuryKnowledgeApp.controller('bigSwitchCtrl', function(bigSwitch,$scope,$http, $location, $state, $sce, $window, $timeout, $stateParams ) {

    'use strict';
    window.scrollTo(0,0);
    $scope.$sce = $sce;


    bigSwitch.getBigSwitchData().then(function(data){ 
      $scope.data = data.d.results;
      //console.log('big switch data : ', $scope.data);
      $scope.bigSwitchContent = $scope.data[0].PageContent;
      $scope.coExistenceContent = $scope.data[1].PageContent;
      $scope.blackoutTempContent = $scope.data[2].PageContent;
      $scope.actionsToTakeContent = $scope.data[3].PageContent;
    });

  });

