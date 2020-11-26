/* Detect class 'mkp__accordion' - if present, on click of the h3 or anchor, hide or reveal the content in the neighbouring UL or DIV
/* Also, look for the master switch with class 'mkp__master-accordion-switch', if clicked on, cause all the accordions to open or close
=========================================================
==================================================================================================*/ 

eyMercuryKnowledgeApp.directive('accordionToggle', [function(){
    return{
        restrict: 'A',
        link: function(scope, elem){

			// $('mkp__accordion-header').on('click',function(e){
			// 	e.preventDefault();
			// 	var $this = $(this);
			// 	console.log("clicked:: ", $this);
			// });
			// var acc = document.getElementsByClassName("mkp__accordion-header");
			// var i;

			// for (i = 0; i < acc.length; i++) {
			// acc[i].addEventListener("click", function() {
			// 	this.classList.toggle("active");
			// 	var panel = this.nextElementSibling;
			// 	console.log("panel:: ", panel);
			// 	if (panel.style.display === "block") {
			// 	panel.style.display = "none";
			// 	} else {
			// 	panel.style.display = "block";
			// 	}
			// });
			// }


			// $('#accordionOne').on('click', function(){
			// 	console.log('this ', $(this))
			// });

			// $('.mkp__accordion h3, .mkp__accordion a').on('click',function(){
			// 	console.log('this', $(this));
			// 	var $tag = $(this), // jQuery object
			// 		$title,
			// 		accordionState,
			// 		$anchor,
			// 		$accordion,
			// 		tagType = $tag.prop("tagName");
			// 		alert($tag);
			// 		console.log('clicked!', $tag);
			// 	if ($tag) {
			// 		if (tagType == "A") {
			// 			$anchor = $tag;
			// 			accordionState = $anchor.attr("data-open");
			// 			$accordion = $anchor.next();
			// 			$title = $anchor.prev();
			// 		}
			// 		else if (tagType == "H3") {
			// 			$title = $tag;
			// 			$anchor = $title.next();
			// 			$accordion = $anchor.next();
			// 			accordionState = $title.attr("data-open");
			// 		}
			// 		else {
			// 			console.log("Warning - unexpected tagType = " + tagType);
			// 		}

			// 		if (accordionState == "false") {
			// 			$anchor.addClass('mkp__rotate');
			// 			$anchor.attr("data-open", "true");
			// 			$title.attr("data-open", "true");
			// 			$accordion.show('slow');
			// 		}
			// 		else {
			// 			$anchor.removeClass('mkp__rotate');
			// 			$anchor.attr("data-open", "false");
			// 			$title.attr("data-open", "false");
			// 			$accordion.hide('slow');
			// 		}
			// 	}
			// });

			// $('.mkp__master-accordion-switch a').on('click',function(){

			// 	var $masterAnchor = $(this), // jQuery object
			// 		masterAccordionState,
			// 		$anchors = $('.mkp__accordion-switch');

			// 	//console.log('$masterAnchor = ' + $masterAnchor + ' masterAccordionState = ' + masterAccordionState +  '  $anchors = ' + $anchors);
			// 	if ($masterAnchor && $anchors) {
			// 		masterAccordionState = $masterAnchor.attr("data-open");
			// 		if (masterAccordionState == "false") {
			// 			$anchors.attr("data-open", "false");
			// 			$masterAnchor.attr("data-open", "true");
			// 		}
			// 		else {
			// 			$anchors.attr("data-open", "true");
			// 			$masterAnchor.attr("data-open", "false");
			// 		}
					
			// 		$anchors.trigger('click'); // Cause all the anchors to be triggered, thereby opening or closing all the accordions
			// 	}
			// });
		}
	}
}])

