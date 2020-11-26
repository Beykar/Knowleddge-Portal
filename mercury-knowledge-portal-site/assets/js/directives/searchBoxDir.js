/* Nav Search Box Directive
====================================================================================================
==================================================================================================*/ 
eyMercuryKnowledgeApp.directive('searchBox', [function(){
    return{
        restrict: 'A',
        link: function(scope, elem){
            // Functions to open and close the search function hidden in the navigation bar
				
			var windowWidth = $(window).width();

			var resizeId;
			$(window).resize(function() {
				clearTimeout(resizeId);
				resizeId = setTimeout(doneResizing, 200);
			});

			function doneResizing(){
				windowWidth = $(window).width();
				searchToggle(windowWidth);
			}
			
			function searchToggle(windowWidth) {
				// Clear possible previous bindings
				$(".mkp_search-btn_element").unbind();
				$("#mkp_close-search-btn").unbind();
				console.log('searchToogle1');
				
				var $closeButton = $('.mkp__nav-search-wrapper #mkp_close-search-btn'),
					$searchInput = $('.mkp__nav-search-wrapper #search-input'),
					$navUL = $('.mkp__nav-ul');
					$searchTxt = $('.mkp__nav-search-wrapper span#mkp_search_text');

				$('.mkp_search-btn_element').on('click', function(){
					if (windowWidth >= 740) {
						$navUL.hide();
					}
					else if ($navUL.hasClass('active')) {
						$("#mkp__hamburger-menu").trigger("click");
					}
					$searchInput.toggleClass('mkp_slide-reveal-search-input',true, 500, "easeOutSine");
					$closeButton.show();
					$searchTxt.hide();
					
					/*var scopeHolder;
					angular.module('eyMercuryKnowledgeApp').controller('navCtrl', function ($scope) {
						scope.redirectSearchResults();
					})*/
					
					
					console.log('searchToogle2');
				});

				function showNavElements() {
					if (windowWidth >= 740) {
						$navUL.show('slow');
					}
				}

				$closeButton.on('click', function(){
					$searchInput.removeClass('mkp_slide-reveal-search-input');
					$closeButton.hide();
					$searchTxt.show();
					setTimeout(showNavElements, 50);
				});
			}
			
        }        
    }
}])
