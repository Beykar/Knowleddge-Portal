/* Detect class 'mkp__level3' - if present, hide the mkp__personalisation-bar
=========================================================
==================================================================================================*/ 

eyMercuryKnowledgeApp.directive('personalisationBar', [function(){
    return{
        restrict: 'A',
        link: function(scope, elem){
			setTimeout(function(){
                var 
                    $personalisationBar = $('.mkp__personalisation-bar'),
                    $mainContainer = $('.mkp__main-cont'),
					$levelTestA = $('.mkp__level3'),
					$levelTestB = $('.mkp__search-results-page');

				//console.log('personalisationBar called - mkp__level3 length = ' + $levelTestA.length + ' - mkp__search-results-page length = ' + $levelTestB.length);
				if ($levelTestA.length > 0 || $levelTestB.length > 0 ) {
					//console.log('mkp__level3 or mkp__search-results-page present - remove bar');
					$personalisationBar.addClass('mkp__hide');
					$mainContainer.addClass('mkp__no-personalisation-bar');
				}
				else {
					//console.log('mkp__level3 or mkp__search-results-page absent - add bar');
					$personalisationBar.removeClass('mkp__hide');
					$mainContainer.removeClass('mkp__no-personalisation-bar');
				}    
            }, 500);        
		}
	}
}])
