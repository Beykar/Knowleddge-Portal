eyMercuryKnowledgeApp.directive("loadPage", [
    function() {
        return {
            restrict: "A",
            link: function(scope, elem) { 
                $('.partialWrapper').hide();
                scope.$on('Data_Ready', function(){
                    $('.partialWrapper').show();
                })               
            }
        };
    }
]);
