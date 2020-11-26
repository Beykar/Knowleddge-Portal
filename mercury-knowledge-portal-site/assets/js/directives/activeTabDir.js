/* Nav active tab Directive
====================================================================================================
==================================================================================================*/ 

eyMercuryKnowledgeApp.directive('activeTab', [function(){
    return{
        restrict: 'A',
        link: function(scope, elem){
            $('.be-new__logo-anchor, .eylogo').on('click', function(){
				$('.mkp__nav-ul li').removeClass('active');
			});
			$('.mkp__nav-ul li').on('click', function(){	
			//console.log(' list clicked3');
			$('.mkp__nav-ul li').removeClass('active');
			$(this).addClass('active');
			});
            }        
        }
}])
