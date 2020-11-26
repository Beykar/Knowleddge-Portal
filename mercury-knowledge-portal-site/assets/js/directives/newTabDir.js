/* Nav Update Selection Button Directive
====================================================================================================
==================================================================================================*/ 

eyMercuryKnowledgeApp.directive('newTab', [function(){
    return{
        restrict: 'A',
            link: function(scope, elem){  

                setTimeout(function(){            
                    var $container = $('#level3Template div.mkp__accordion-content--wording.ng-binding a').attr('target', '_blank');
                },251);

            }        
        }
}])
