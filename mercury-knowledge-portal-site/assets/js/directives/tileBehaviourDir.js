/* Landing Page Tile Directive
====================================================================================================
==================================================================================================*/ 

eyMercuryKnowledgeApp.directive('tileBehaviour', [function(){
    return{
        restrict: 'A',
        link: function(scope, elem){
                $('.mkp-home__tile-anchor').on('click', function(e){        
                    e.preventDefault();              
                    $('.mkp-home__tile-overlay').removeClass('mkp-home__tile-overlay--reveal-tile');
                    $(this).next().addClass('mkp-home__tile-overlay--reveal-tile');
                });
            
                $('.mkp-home__close').on('click', function(e){
                    e.preventDefault(); 
                    $('.mkp-home__close').parent().removeClass('mkp-home__tile-overlay--reveal-tile');
                });
            }        
        }
}])
