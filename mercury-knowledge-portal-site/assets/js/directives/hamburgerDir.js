eyMercuryKnowledgeApp.directive("hamburgerMenu", [
    function() {
        return {
            restrict: "A",
            link: function(scope, elem) {
				// Animate the hamburger icon, reveal or hide the navigation menu elements
				var windowWidth = $(window).width();
				
				var resizeId;
				$(window).resize(function() {
					clearTimeout(resizeId);
					resizeId = setTimeout(doneResizing, 200);
				});

				function doneResizing(){
					windowWidth = $(window).width();
					if (windowWidth <= 740) {
						hamburgerReaction();
					}
				}


				function hamburgerReaction() {
                    var $hamburger = $("#mkp__hamburger-menu");

                    // Clear possible previous bindings
                    $hamburger.unbind();
                    $(".mkp__nav-ul li a").unbind();

                    $hamburger.on("click", function(e) {
                        e.preventDefault();
						var menuBtnGrandParent = $(this).parent().parent();

						if ($('#mkp_close-search-btn')) {
                            $('#mkp_close-search-btn').trigger('click');
						}

                        if (
                            menuBtnGrandParent
                                .find(".mkp__nav-ul")
                                .hasClass("active")
                        ) {
                            $(".mkp__nav-ul").removeClass("active");
                            $(this).removeClass("open");
                        } else {
                            $(this).addClass("open");
                            menuBtnGrandParent
                                .find(".mkp__nav-ul")
                                .addClass("active");
                        }
                    });

                    $(".mkp__nav-ul li a").on("click", function(e) {
                        e.preventDefault();
                        var itemLink = $(this).attr("href");
                        $(".mkp__nav-ul").removeClass("active");
                        $hamburger.removeClass("open");
                        window.location.href = itemLink;
                    });
                }
            }
        };
    }
]);
