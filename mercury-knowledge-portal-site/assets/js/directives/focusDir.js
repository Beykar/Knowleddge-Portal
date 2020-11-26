/* Search Input Directive
=========================================================
==================================================================================================*/ 
eyMercuryKnowledgeApp.directive("focusMe", ['$location', '$interval', function($location, $interval) {
    return {
        restrict: "A",
        link: function(scope, elem, attrs) {
            $interval(function() {
            if ($('ul.ng-isolate-scope').is(":visible")){
                 var $firstElement = $('ul.ng-isolate-scope').find('li:first');
                     $firstElement.focus();
                     //console.log('1st element :: ',  $firstElement);
                    $('ul.ng-isolate-scope').keydown(function(e){
                        e.preventDefault();
                        if (e.keyCode == 40 ){
                            $firstElement.closest('li').focus();
                        } else if (e.keyCode == 38){
                            //console.log('clicked up!!');
                        }
                    });

                } else {
                     //console.log('List empty!!!', $('ul.ng-isolate-scope'));
                }         
            }, 100);           
        }       
    }
}]);