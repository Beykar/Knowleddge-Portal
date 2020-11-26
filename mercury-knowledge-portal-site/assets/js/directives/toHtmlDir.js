/* Search Input Directive
=========================================================
==================================================================================================*/ 
eyMercuryKnowledgeApp.directive('toHtml', function($timeout,$sce) {
    return {
        restrict: 'A',
        link: function($scope, element, attrs, ctrl) {
            $timeout(function() {
                element.html($sce.getTrustedHtml(element[0].innerText) || '');
            }, 200);
        }
    };
 })