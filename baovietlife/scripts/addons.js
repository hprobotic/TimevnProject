/**
 * fullPage 2.6.5
 */
 (function($) {
 	$.fn.fullpage = function(options) {
 		// Create some defaults, extending them with any options that were provided
 		options = $.extend({
 			//navigation
 			'menu': false,
 			'anchors':[],
 			'navigation': false,
 			'navigationPosition': 'right',
 			'navigationColor': '#000',
 			'navigationTooltips': [],
 			'slidesNavigation': false,
 			'slidesNavPosition': 'bottom',
 			'scrollBar': false,

 			//scrolling
 			'css3': true,
 			'scrollingSpeed': 700,
 			'autoScrolling': true,
 			'easing': 'easeInQuart',
 			'easingcss3': 'ease',
 			'loopBottom': false,
 			'loopTop': false,
 			'loopHorizontal': true,
 			'continuousVertical': false,
 			'normalScrollElements': null,
 			'scrollOverflow': false,
 			'touchSensitivity': 5,
 			'normalScrollElementTouchThreshold': 5,

 			//Accessibility
 			'keyboardScrolling': true,
 			'animateAnchor': true,
 			'recordHistory': true,

 			//design
 			'controlArrows': true,
 			'controlArrowColor': '#fff',
 			"verticalCentered": true,
 			'resize': true,
 			'sectionsColor' : [],
 			'paddingTop': 0,
 			'paddingBottom': 0,
 			'fixedElements': null,
 			'responsive': 0,

 			//Custom selectors
 			'sectionSelector': '.section',
 			'slideSelector': '.slide',


 			//events
 			'afterLoad': null,
 			'onLeave': null,
 			'afterRender': null,
 			'afterResize': null,
 			'afterReBuild': null,
 			'afterSlideLoad': null,
 			'onSlideLeave': null
 		}, options);

 	    displayWarnings();

 	    //easeInQuart animation included in the plugin
 	    $.extend($.easing,{ easeInQuart: function (x, t, b, c, d) { return c*(t/=d)*t*t*t + b; }});

 		//Defines the delay to take place before being able to scroll to the next section
 		//BE CAREFUL! Not recommened to change it under 400 for a good behavior in laptops and
 		//Apple devices (laptops, mouses...)
 		var scrollDelay = 600;

 		$.fn.fullpage.setAutoScrolling = function(value, type){
 			setVariableState('autoScrolling', value, type);

 			var element = $('.fp-section.active');

 			if(options.autoScrolling && !options.scrollBar){
 				$('html, body').css({
 					'overflow' : 'hidden',
 					'height' : '100%'
 				});

 				$.fn.fullpage.setRecordHistory(options.recordHistory, 'internal');

 				//for IE touch devices
 				container.css({
 					'-ms-touch-action': 'none',
 					'touch-action': 'none'
 				});

 				if(element.length){
 					//moving the container up
 					silentScroll(element.position().top);
 				}

 			}else{
 				$('html, body').css({
 					'overflow' : 'visible',
 					'height' : 'initial'
 				});

 				$.fn.fullpage.setRecordHistory(false, 'internal');

 				//for IE touch devices
 				container.css({
 					'-ms-touch-action': '',
 					'touch-action': ''
 				});

 				silentScroll(0);

 				//scrolling the page to the section with no animation
 				$('html, body').scrollTop(element.position().top);
 			}

 		};

 		/**
 		* Defines wheter to record the history for each hash change in the URL.
 		*/
 		$.fn.fullpage.setRecordHistory = function(value, type){
 			setVariableState('recordHistory', value, type);
 		};

 		/**
 		* Defines the scrolling speed
 		*/
 		$.fn.fullpage.setScrollingSpeed = function(value, type){
 			setVariableState('scrollingSpeed', value, type);
 		};

 		/**
 		* Adds or remove the possiblity of scrolling through sections by using the mouse wheel or the trackpad.
 		*/
 		$.fn.fullpage.setMouseWheelScrolling = function (value){
 			if(value){
 				addMouseWheelHandler();
 			}else{
 				removeMouseWheelHandler();
 			}
 		};

 		/**
 		* Adds or remove the possiblity of scrolling through sections by using the mouse wheel/trackpad or touch gestures.
 		* Optionally a second parameter can be used to specify the direction for which the action will be applied.
 		*
 		* @param directions string containing the direction or directions separated by comma.
 		*/
 		$.fn.fullpage.setAllowScrolling = function (value, directions){
 			if(typeof directions != 'undefined'){
 				directions = directions.replace(' ', '').split(',');
 				$.each(directions, function (index, direction){
 					setIsScrollable(value, direction);
 				});
 			}
 			else if(value){
 				$.fn.fullpage.setMouseWheelScrolling(true);
 				addTouchHandler();
 			}else{
 				$.fn.fullpage.setMouseWheelScrolling(false);
 				removeTouchHandler();
 			}
 		};

 		/**
 		* Adds or remove the possiblity of scrolling through sections by using the keyboard arrow keys
 		*/
 		$.fn.fullpage.setKeyboardScrolling = function (value){
 			options.keyboardScrolling = value;
 		};

 		$.fn.fullpage.moveSectionUp = function(){
 			var prev = $('.fp-section.active').prev('.fp-section');

 			//looping to the bottom if there's no more sections above
 			if (!prev.length && (options.loopTop || options.continuousVertical)) {
 				prev = $('.fp-section').last();
 			}

 			if (prev.length) {
 				scrollPage(prev, null, true);
 			}
 		};

 		$.fn.fullpage.moveSectionDown = function (){
 			var next = $('.fp-section.active').next('.fp-section');

 			//looping to the top if there's no more sections below
 			if(!next.length &&
 				(options.loopBottom || options.continuousVertical)){
 				next = $('.fp-section').first();
 			}

 			if(next.length){
 				scrollPage(next, null, false);
 			}
 		};

 		$.fn.fullpage.moveTo = function (section, slide){
 			var destiny = '';

 			if(isNaN(section)){
 				destiny = $('[data-anchor="'+section+'"]');
 			}else{
 				destiny = $('.fp-section').eq( (section -1) );
 			}

 			if (typeof slide !== 'undefined'){
 				scrollPageAndSlide(section, slide);
 			}else if(destiny.length > 0){
 				scrollPage(destiny);
 			}
 		};

 		$.fn.fullpage.moveSlideRight = function(){
 			moveSlide('next');
 		};

 		$.fn.fullpage.moveSlideLeft = function(){
 			moveSlide('prev');
 		};

 		/**
 		 * When resizing is finished, we adjust the slides sizes and positions
 		 */
 		$.fn.fullpage.reBuild = function(resizing){
 			isResizing = true;

 			var windowsWidth = $(window).width();
 			windowsHeight = $(window).height();  //updating global var

 			//text and images resizing
 			if (options.resize) {
 				resizeMe(windowsHeight, windowsWidth);
 			}

 			$('.fp-section').each(function(){
 				var scrollHeight = windowsHeight - parseInt($(this).css('padding-bottom')) - parseInt($(this).css('padding-top'));

 				//adjusting the height of the table-cell for IE and Firefox
 				if(options.verticalCentered){
 					$(this).find('.fp-tableCell').css('height', getTableHeight($(this)) + 'px');
 				}

 				$(this).css('height', windowsHeight + 'px');

 				//resizing the scrolling divs
 				if(options.scrollOverflow){
 					var slides = $(this).find('.fp-slide');

 					if(slides.length){
 						slides.each(function(){
 							createSlimScrolling($(this));
 						});
 					}else{
 						createSlimScrolling($(this));
 					}
 				}

 				//adjusting the position fo the FULL WIDTH slides...
 				var slides = $(this).find('.fp-slides');
 				if (slides.length) {
 					landscapeScroll(slides, slides.find('.fp-slide.active'));
 				}
 			});

 			//adjusting the position for the current section
 			var destinyPos = $('.fp-section.active').position();

 			var activeSection = $('.fp-section.active');

 			//isn't it the first section?
 			if(activeSection.index('.fp-section')){
 				scrollPage(activeSection);
 			}

 			isResizing = false;
 			$.isFunction( options.afterResize ) && resizing && options.afterResize.call( this )
 			$.isFunction( options.afterReBuild ) && !resizing && options.afterReBuild.call( this );
 		}

 		//flag to avoid very fast sliding for landscape sliders
 		var slideMoving = false;

 		var isTouchDevice = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|Windows Phone|Tizen|Bada)/);
 		var isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0) || (navigator.maxTouchPoints));
 		var container = $(this);
 		var windowsHeight = $(window).height();
 		var isMoving = false;
 		var isResizing = false;
 		var lastScrolledDestiny;
 		var lastScrolledSlide;
 		var nav;
 		var wrapperSelector = 'fullpage-wrapper';
 		var isScrollAllowed = { 'up':true, 'down':true, 'left':true, 'right':true };
 		var originals = jQuery.extend(true, {}, options); //deep copy

 		$.fn.fullpage.setAllowScrolling(true);

 		//if css3 is not supported, it will use jQuery animations
 		if(options.css3){
 			options.css3 = support3d();
 		}

 		if($(this).length){
 			container.css({
 				'height': '100%',
 				'position': 'relative'
 			});

 			//adding a class to recognize the container internally in the code
 			container.addClass(wrapperSelector);
 		}

 		//trying to use fullpage without a selector?
 		else{
 			showError('error', "Error! Fullpage.js needs to be initialized with a selector. For example: $('#myContainer').fullpage();");
 		}

 		//adding internal class names to void problem with common ones
 		$(options.sectionSelector).each(function(){
   			$(this).addClass('fp-section');
 		});
 		$(options.slideSelector).each(function(){
   			$(this).addClass('fp-slide');
 		});

 		//creating the navigation dots
 		if (options.navigation) {
 			addVerticalNavigation();
 		}

 		$('.fp-section').each(function(index){
 			var that = $(this);
 			var slides = $(this).find('.fp-slide');
 			var numSlides = slides.length;

 			//if no active section is defined, the 1st one will be the default one
 			if(!index && $('.fp-section.active').length === 0) {
 				$(this).addClass('active');
 			}

 			$(this).css('height', windowsHeight + 'px');

 			if(options.paddingTop || options.paddingBottom){
 				$(this).css('padding', options.paddingTop  + ' 0 ' + options.paddingBottom + ' 0');
 			}

 			if (typeof options.sectionsColor[index] !==  'undefined') {
 				$(this).css('background-color', options.sectionsColor[index]);
 			}

 			if (typeof options.anchors[index] !== 'undefined') {
 				$(this).attr('data-anchor', options.anchors[index]);
 			}

 			// if there's any slide
 			if (numSlides > 1) {
 				var sliderWidth = numSlides * 100;
 				var slideWidth = 100 / numSlides;

 				slides.wrapAll('<div class="fp-slidesContainer" />');
 				slides.parent().wrap('<div class="fp-slides" />');

 				$(this).find('.fp-slidesContainer').css('width', sliderWidth + '%');

 				if(options.controlArrows){
 					createSlideArrows($(this));
 				}

 				if(options.slidesNavigation){
 					addSlidesNavigation($(this), numSlides);
 				}

 				slides.each(function(index) {
 					$(this).css('width', slideWidth + '%');

 					if(options.verticalCentered){
 						addTableClass($(this));
 					}
 				});

 				var startingSlide = that.find('.fp-slide.active');

 				//if the slide won#t be an starting point, the default will be the first one
 				if(startingSlide.length == 0){
 					slides.eq(0).addClass('active');
 				}

 				//is there a starting point for a non-starting section?
 				else{
 					silentLandscapeScroll(startingSlide);
 				}

 			}else{
 				if(options.verticalCentered){
 					addTableClass($(this));
 				}
 			}

 		}).promise().done(function(){
 			$.fn.fullpage.setAutoScrolling(options.autoScrolling, 'internal');

 			//the starting point is a slide?
 			var activeSlide = $('.fp-section.active').find('.fp-slide.active');

 			//the active section isn't the first one? Is not the first slide of the first section? Then we load that section/slide by default.
 			if( activeSlide.length &&  ($('.fp-section.active').index('.fp-section') != 0 || ($('.fp-section.active').index('.fp-section') == 0 && activeSlide.index() != 0))){
 				silentLandscapeScroll(activeSlide);
 			}

 			//fixed elements need to be moved out of the plugin container due to problems with CSS3.
 			if(options.fixedElements && options.css3){
 				$(options.fixedElements).appendTo('body');
 			}

 			//vertical centered of the navigation + first bullet active
 			if(options.navigation){
 				nav.css('margin-top', '-' + (nav.height()/2) + 'px');
 				nav.find('li').eq($('.fp-section.active').index('.fp-section')).find('a').addClass('active');
 			}

 			//moving the menu outside the main container if it is inside (avoid problems with fixed positions when using CSS3 tranforms)
 			if(options.menu && options.css3 && $(options.menu).closest('.fullpage-wrapper').length){
 				$(options.menu).appendTo('body');
 			}

 			if(options.scrollOverflow){
 				if(document.readyState === "complete"){
 					createSlimScrollingHandler();
 				}
 				//after DOM and images are loaded
 				$(window).on('load', createSlimScrollingHandler);
 			}else{
 				$.isFunction( options.afterRender ) && options.afterRender.call( this);
 			}

 			responsive();

 			//getting the anchor link in the URL and deleting the `#`
 			var value =  window.location.hash.replace('#', '').split('/');
 			var destiny = value[0];

 			if(destiny.length){
 				var section = $('[data-anchor="'+destiny+'"]');

 				if(!options.animateAnchor && section.length){

 					if(options.autoScrolling){
 						silentScroll(section.position().top);
 					}
 					else{
 						silentScroll(0);
 						setBodyClass(destiny);

 						//scrolling the page to the section with no animation
 						$('html, body').scrollTop(section.position().top);
 					}

 					activateMenuAndNav(destiny, null);

 					$.isFunction( options.afterLoad ) && options.afterLoad.call( this, destiny, (section.index('.fp-section') + 1));

 					//updating the active class
 					section.addClass('active').siblings().removeClass('active');
 				}
 			}


 			$(window).on('load', function() {
 				scrollToAnchor();
 			});

 		});


 		/**
 		* Creates the control arrows for the given section
 		*/
 		function createSlideArrows(section){
 			section.find('.fp-slides').after('<div class="fp-controlArrow fp-prev"></div><div class="fp-controlArrow fp-next"></div>');

 			if(options.controlArrowColor!='#fff'){
 				section.find('.fp-controlArrow.fp-next').css('border-color', 'transparent transparent transparent '+options.controlArrowColor);
 				section.find('.fp-controlArrow.fp-prev').css('border-color', 'transparent '+ options.controlArrowColor + ' transparent transparent');
 			}

 			if(!options.loopHorizontal){
 				section.find('.fp-controlArrow.fp-prev').hide();
 			}
 		}

 		/**
 		* Creates a vertical navigation bar.
 		*/
 		function addVerticalNavigation(){
 			$('body').append('<div id="fp-nav"><ul></ul></div>');
 			nav = $('#fp-nav');

 			nav.css('color', options.navigationColor);
 			nav.addClass(options.navigationPosition);

 			for (var i = 0; i < $('.fp-section').length; i++) {
 				var link = '';
 				if (options.anchors.length) {
 					link = options.anchors[i];
 				}

 				var li = '<li><a href="#' + link + '"><span></span></a>';

 				// Only add tooltip if needed (defined by user)
 				var tooltip = options.navigationTooltips[i];
 				if (tooltip != undefined && tooltip != '') {
 					li += '<div class="fp-tooltip ' + options.navigationPosition + '">' + tooltip + '</div>';
 				}

 				li += '</li>';

 				nav.find('ul').append(li);
 			}
 		}

 		function createSlimScrollingHandler(){
 			$('.fp-section').each(function(){
 				var slides = $(this).find('.fp-slide');

 				if(slides.length){
 					slides.each(function(){
 						createSlimScrolling($(this));
 					});
 				}else{
 					createSlimScrolling($(this));
 				}

 			});
 			$.isFunction( options.afterRender ) && options.afterRender.call( this);
 		}

 		var scrollId;
 		var scrollId2;
 		var isScrolling = false;

 		//when scrolling...
 		$(window).on('scroll', scrollHandler);

 		function scrollHandler(){
 			if(!options.autoScrolling || options.scrollBar){
 				var currentScroll = $(window).scrollTop();
 				var visibleSectionIndex = 0;
 				var initial = Math.abs(currentScroll - $('.fp-section').first().offset().top);

 				//taking the section which is showing more content in the viewport
 				$('.fp-section').each(function(index){
 					var current = Math.abs(currentScroll - $(this).offset().top);

 					if(current < initial){
 						visibleSectionIndex = index;
 						initial = current;
 					}
 				});

 				//geting the last one, the current one on the screen
 				var currentSection = $('.fp-section').eq(visibleSectionIndex);
 			}

 			if(!options.autoScrolling){
 				//executing only once the first time we reach the section
 				if(!currentSection.hasClass('active')){
 					isScrolling = true;

 					var leavingSection = $('.fp-section.active').index('.fp-section') + 1;
 					var yMovement = getYmovement(currentSection);
 					var anchorLink  = currentSection.data('anchor');
 					var sectionIndex = currentSection.index('.fp-section') + 1;
 					var activeSlide = currentSection.find('.fp-slide.active');

 					if(activeSlide.length){
 						var slideAnchorLink = activeSlide.data('anchor');
 						var slideIndex = activeSlide.index();
 					}

 					currentSection.addClass('active').siblings().removeClass('active');

 					if(!isMoving){
 						$.isFunction( options.onLeave ) && options.onLeave.call( this, leavingSection, sectionIndex, yMovement);

 						$.isFunction( options.afterLoad ) && options.afterLoad.call( this, anchorLink, sectionIndex);
 					}

 					activateMenuAndNav(anchorLink, 0);

 					if(options.anchors.length && !isMoving){
 						//needed to enter in hashChange event when using the menu with anchor links
 						lastScrolledDestiny = anchorLink;

 						setState(slideIndex, slideAnchorLink, anchorLink, sectionIndex);
 					}

 					//small timeout in order to avoid entering in hashChange event when scrolling is not finished yet
 					clearTimeout(scrollId);
 					scrollId = setTimeout(function(){
 						isScrolling = false;
 					}, 100);
 				}
 			}

 			if(options.scrollBar){
 				//for the auto adjust of the viewport to fit a whole section
 				clearTimeout(scrollId2);
 				scrollId2 = setTimeout(function(){
 					if(!isMoving){
 						scrollPage(currentSection);
 					}
 				}, 1000);
 			}
 		}


 		/**
 		* Determines whether the active section or slide is scrollable through and scrolling bar
 		*/
 		function isScrollable(activeSection){
 			//if there are landscape slides, we check if the scrolling bar is in the current one or not
 			if(activeSection.find('.fp-slides').length){
 				scrollable= activeSection.find('.fp-slide.active').find('.fp-scrollable');
 			}else{
 				scrollable = activeSection.find('.fp-scrollable');
 			}

 			return scrollable;
 		}

 		/**
 		* Determines the way of scrolling up or down:
 		* by 'automatically' scrolling a section or by using the default and normal scrolling.
 		*/
 		function scrolling(type, scrollable){
 			if (!isScrollAllowed[type]){
 				return;
 			}

 			if(type == 'down'){
 				var check = 'bottom';
 				var scrollSection = $.fn.fullpage.moveSectionDown;
 			}else{
 				var check = 'top';
 				var scrollSection = $.fn.fullpage.moveSectionUp;
 			}

 			if(scrollable.length > 0 ){
 				//is the scrollbar at the start/end of the scroll?
 				if(isScrolled(check, scrollable)){
 					scrollSection();
 				}else{
 					return true;
 				}
 			}else{
 				// moved up/down
 				scrollSection();
 			}
 		}


 		var touchStartY = 0;
 		var touchStartX = 0;
 		var touchEndY = 0;
 		var touchEndX = 0;

 		/* Detecting touch events

 		* As we are changing the top property of the page on scrolling, we can not use the traditional way to detect it.
 		* This way, the touchstart and the touch moves shows an small difference between them which is the
 		* used one to determine the direction.
 		*/
 		function touchMoveHandler(event){
 			var e = event.originalEvent;

 			// additional: if one of the normalScrollElements isn't within options.normalScrollElementTouchThreshold hops up the DOM chain
 			if (!checkParentForNormalScrollElement(event.target)) {

 				if(options.autoScrolling && !options.scrollBar){
 					//preventing the easing on iOS devices
 					event.preventDefault();
 				}

 				var activeSection = $('.fp-section.active');
 				var scrollable = isScrollable(activeSection);

 				if (!isMoving && !slideMoving) { //if theres any #
 					var touchEvents = getEventsPage(e);

 					touchEndY = touchEvents['y'];
 					touchEndX = touchEvents['x'];

 					//if movement in the X axys is greater than in the Y and the currect section has slides...
 					if (activeSection.find('.fp-slides').length && Math.abs(touchStartX - touchEndX) > (Math.abs(touchStartY - touchEndY))) {

 					    //is the movement greater than the minimum resistance to scroll?
 					    if (Math.abs(touchStartX - touchEndX) > ($(window).width() / 100 * options.touchSensitivity)) {
 					        if (touchStartX > touchEndX) {
 					        	if(isScrollAllowed.right){
 					            	$.fn.fullpage.moveSlideRight(); //next
 					            }
 					        } else {
 					        	if(isScrollAllowed.left){
 					            	$.fn.fullpage.moveSlideLeft(); //prev
 					            }
 					        }
 					    }
 					}

 					//vertical scrolling (only when autoScrolling is enabled)
 					else if(options.autoScrolling && !options.scrollBar){

 						//is the movement greater than the minimum resistance to scroll?
 						if (Math.abs(touchStartY - touchEndY) > ($(window).height() / 100 * options.touchSensitivity)) {
 							if (touchStartY > touchEndY) {
 								scrolling('down', scrollable);
 							} else if (touchEndY > touchStartY) {
 								scrolling('up', scrollable);
 							}
 						}
 					}
 				}
 			}

 		}

 		/**
 		 * recursive function to loop up the parent nodes to check if one of them exists in options.normalScrollElements
 		 * Currently works well for iOS - Android might need some testing
 		 * @param  {Element} el  target element / jquery selector (in subsequent nodes)
 		 * @param  {int}     hop current hop compared to options.normalScrollElementTouchThreshold
 		 * @return {boolean} true if there is a match to options.normalScrollElements
 		 */
 		function checkParentForNormalScrollElement (el, hop) {
 			hop = hop || 0;
 			var parent = $(el).parent();

 			if (hop < options.normalScrollElementTouchThreshold &&
 				parent.is(options.normalScrollElements) ) {
 				return true;
 			} else if (hop == options.normalScrollElementTouchThreshold) {
 				return false;
 			} else {
 				return checkParentForNormalScrollElement(parent, ++hop);
 			}
 		}

 		function touchStartHandler(event){
 			var e = event.originalEvent;

 			var touchEvents = getEventsPage(e);
 			touchStartY = touchEvents['y'];
 			touchStartX = touchEvents['x'];
 		}


 		/**
 		 * Detecting mousewheel scrolling
 		 *
 		 * http://blogs.sitepointstatic.com/examples/tech/mouse-wheel/index.html
 		 * http://www.sitepoint.com/html5-javascript-mouse-wheel/
 		 */
 		function MouseWheelHandler(e) {
 			if(options.autoScrolling){
 				// cross-browser wheel delta
 				e = window.event || e;
 				var delta = Math.max(-1, Math.min(1,
 						(e.wheelDelta || -e.deltaY || -e.detail)));

 				//preventing to scroll the site on mouse wheel when scrollbar is present
 				if(options.scrollBar){
 					e.preventDefault ? e.preventDefault() : e.returnValue = false;

 				}

 				var activeSection = $('.fp-section.active');
 				var scrollable = isScrollable(activeSection);

 				if (!isMoving) { //if theres any #
 					//scrolling down?
 					if (delta < 0) {
 						scrolling('down', scrollable);

 					//scrolling up?
 					}else {
 						scrolling('up', scrollable);
 					}
 				}

 				return false;
 			}
 		}

 		function moveSlide(direction){
 		    var activeSection = $('.fp-section.active');
 		    var slides = activeSection.find('.fp-slides');

 		    // more than one slide needed and nothing should be sliding
 			if (!slides.length || slideMoving) {
 			    return;
 			}

 		    var currentSlide = slides.find('.fp-slide.active');
 		    var destiny = null;

 		    if(direction === 'prev'){
 		        destiny = currentSlide.prev('.fp-slide');
 		    }else{
 		        destiny = currentSlide.next('.fp-slide');
 		    }

 		    //isn't there a next slide in the secuence?
 			if(!destiny.length){
 				//respect loopHorizontal settin
 				if (!options.loopHorizontal) return;

 			    if(direction === 'prev'){
 			        destiny = currentSlide.siblings(':last');
 			    }else{
 			        destiny = currentSlide.siblings(':first');
 			    }
 			}

 		    slideMoving = true;

 		    landscapeScroll(slides, destiny);
 		}

 		/**
 		* Maintains the active slides in the viewport
 		* (Because he `scroll` animation might get lost with some actions, such as when using continuousVertical)
 		*/
 		function keepSlidesPosition(){
 			$('.fp-slide.active').each(function(){
 				silentLandscapeScroll($(this));
 			});
 		}

 		/**
 		* Scrolls the site to the given element and scrolls to the slide if a callback is given.
 		*/
 		function scrollPage(element, callback, isMovementUp){
 			var dest = element.position();
 			if(typeof dest === "undefined"){ return; } //there's no element to scroll, leaving the function

 			//local variables
 			var v = {
 				element: element,
 				callback: callback,
 				isMovementUp: isMovementUp,
 				dest: dest,
 				dtop: dest.top,
 				yMovement: getYmovement(element),
 				anchorLink: element.data('anchor'),
 				sectionIndex: element.index('.fp-section'),
 				activeSlide: element.find('.fp-slide.active'),
 				activeSection: $('.fp-section.active'),
 				leavingSection: $('.fp-section.active').index('.fp-section') + 1,

 				//caching the value of isResizing at the momment the function is called
 				//because it will be checked later inside a setTimeout and the value might change
 				localIsResizing: isResizing
 			};

 			//quiting when destination scroll is the same as the current one
 			if((v.activeSection.is(element) && !isResizing) || (options.scrollBar && $(window).scrollTop() === v.dtop)){ return; }

 			if(v.activeSlide.length){
 				var slideAnchorLink = v.activeSlide.data('anchor');
 				var slideIndex = v.activeSlide.index();
 			}

 			// If continuousVertical && we need to wrap around
 			if (options.autoScrolling && options.continuousVertical && typeof (v.isMovementUp) !== "undefined" &&
 				((!v.isMovementUp && v.yMovement == 'up') || // Intending to scroll down but about to go up or
 				(v.isMovementUp && v.yMovement == 'down'))) { // intending to scroll up but about to go down

 				v = createInfiniteSections(v);
 			}

 			element.addClass('active').siblings().removeClass('active');

 			//preventing from activating the MouseWheelHandler event
 			//more than once if the page is scrolling
 			isMoving = true;

 			setState(slideIndex, slideAnchorLink, v.anchorLink, v.sectionIndex);

 			//callback (onLeave) if the site is not just resizing and readjusting the slides
 			$.isFunction(options.onLeave) && !v.localIsResizing && options.onLeave.call(this, v.leavingSection, (v.sectionIndex + 1), v.yMovement);

 			performMovement(v);

 			//flag to avoid callingn `scrollPage()` twice in case of using anchor links
 			lastScrolledDestiny = v.anchorLink;

 			//avoid firing it twice (as it does also on scroll)
 			if(options.autoScrolling){
 				activateMenuAndNav(v.anchorLink, v.sectionIndex)
 			}
 		}

 		/**
 		* Performs the movement (by CSS3 or by jQuery)
 		*/
 		function performMovement(v){
 			// using CSS3 translate functionality
 			if (options.css3 && options.autoScrolling && !options.scrollBar) {

 				if (v.anchorLink == 'footer')
 				{
 					footer_a = $('#section-footer').height();
 					footer_h = $('#footer-text').height();
 					var translate3d = 'translate3d(0px, -' + (v.dtop - footer_a + footer_h) + 'px, 0px)';
 				}
 				else
 				{
 					var translate3d = 'translate3d(0px, -' + v.dtop + 'px, 0px)';
 				}

 				transformContainer(translate3d, true);

 				setTimeout(function () {
 					afterSectionLoads(v);
 				}, options.scrollingSpeed);
 			}

 			// using jQuery animate
 			else{

 				var scrollSettings = getScrollSettings(v);

 				$(scrollSettings.element).animate(
 					scrollSettings.options
 				, options.scrollingSpeed, options.easing).promise().done(function () { //only one single callback in case of animating  `html, body`
 					afterSectionLoads(v);
 				});
 			}
 		}

 		/**
 		* Gets the scrolling settings depending on the plugin autoScrolling option
 		*/
 		function getScrollSettings(v){
 			var scroll = {};

 			if(options.autoScrolling && !options.scrollBar){
 				scroll.options = { 'top': -v.dtop};
 				scroll.element = '.'+wrapperSelector;
 			}else{
 				scroll.options = { 'scrollTop': v.dtop};
 				scroll.element = 'html, body';
 			}

 			return scroll;
 		}

 		/**
 		* Adds sections before or after the current one to create the infinite effect.
 		*/
 		function createInfiniteSections(v){
 			// Scrolling down
 			if (!v.isMovementUp) {
 				// Move all previous sections to after the active section
 				$(".fp-section.active").after(v.activeSection.prevAll(".fp-section").get().reverse());
 			}
 			else { // Scrolling up
 				// Move all next sections to before the active section
 				$(".fp-section.active").before(v.activeSection.nextAll(".fp-section"));
 			}

 			// Maintain the displayed position (now that we changed the element order)
 			silentScroll($('.fp-section.active').position().top);

 			// Maintain the active slides visible in the viewport
 			keepSlidesPosition();

 			// save for later the elements that still need to be reordered
 			v.wrapAroundElements = v.activeSection;

 			// Recalculate animation variables
 			v.dest = v.element.position();
 			v.dtop = v.dest.top;
 			v.yMovement = getYmovement(v.element);

 			return v;
 		}

 		/**
 		* Fix section order after continuousVertical changes have been animated
 		*/
 		function continuousVerticalFixSectionOrder (v) {
 			// If continuousVertical is in effect (and autoScrolling would also be in effect then),
 			// finish moving the elements around so the direct navigation will function more simply
 			if (!v.wrapAroundElements || !v.wrapAroundElements.length) {
 				return;
 			}

 			if (v.isMovementUp) {
 				$('.fp-section:first').before(v.wrapAroundElements);
 			}
 			else {
 				$('.fp-section:last').after(v.wrapAroundElements);
 			}

 			silentScroll($('.fp-section.active').position().top);

 			// Maintain the active slides visible in the viewport
 			keepSlidesPosition();
 		};


 		/**
 		* Actions to do once the section is loaded
 		*/
 		function afterSectionLoads (v){
 			continuousVerticalFixSectionOrder(v);
 			//callback (afterLoad) if the site is not just resizing and readjusting the slides
 			$.isFunction(options.afterLoad) && !v.localIsResizing && options.afterLoad.call(this, v.anchorLink, (v.sectionIndex + 1));

 			setTimeout(function () {
 				isMoving = false;
 				$.isFunction(v.callback) && v.callback.call(this);
 			}, scrollDelay);
 		}


 		/**
 		* Scrolls to the anchor in the URL when loading the site
 		*/
 		function scrollToAnchor(){
 			//getting the anchor link in the URL and deleting the `#`
 			var value =  window.location.hash.replace('#', '').split('/');
 			var section = value[0];
 			var slide = value[1];

 			if(section){  //if theres any #
 				scrollPageAndSlide(section, slide);
 			}
 		}

 		//detecting any change on the URL to scroll to the given anchor link
 		//(a way to detect back history button as we play with the hashes on the URL)
 		$(window).on('hashchange', hashChangeHandler);

 		function hashChangeHandler(){
 			if(!isScrolling){
 				var value =  window.location.hash.replace('#', '').split('/');
 				var section = value[0];
 				var slide = value[1];

 				if(section.length){
 					//when moving to a slide in the first section for the first time (first time to add an anchor to the URL)
 					var isFirstSlideMove =  (typeof lastScrolledDestiny === 'undefined');
 					var isFirstScrollMove = (typeof lastScrolledDestiny === 'undefined' && typeof slide === 'undefined' && !slideMoving);

 					/*in order to call scrollpage() only once for each destination at a time
 					It is called twice for each scroll otherwise, as in case of using anchorlinks `hashChange`
 					event is fired on every scroll too.*/
 					if ((section && section !== lastScrolledDestiny) && !isFirstSlideMove || isFirstScrollMove || (!slideMoving && lastScrolledSlide != slide ))  {
 						scrollPageAndSlide(section, slide);
 					}
 				}
 			}
 		}


 		/**
 		 * Sliding with arrow keys, both, vertical and horizontal
 		 */
 		$(document).keydown(function(e) {
 			//Moving the main page with the keyboard arrows if keyboard scrolling is enabled
 			if (options.keyboardScrolling && options.autoScrolling) {

 				//preventing the scroll with arrow keys
 				if(e.which == 40 || e.which == 38){
 					e.preventDefault();
 				}

 				if(!isMoving){
 					switch (e.which) {
 						//up
 						case 38:
 						case 33:
 							$.fn.fullpage.moveSectionUp();
 							break;

 						//down
 						case 40:
 						case 34:
 							$.fn.fullpage.moveSectionDown();
 							break;

 						//Home
 						case 36:
 							$.fn.fullpage.moveTo(1);
 							break;

 						//End
 						case 35:
 							$.fn.fullpage.moveTo( $('.fp-section').length );
 							break;

 						//left
 						case 37:
 							$.fn.fullpage.moveSlideLeft();
 							break;

 						//right
 						case 39:
 							$.fn.fullpage.moveSlideRight();
 							break;

 						default:
 							return; // exit this handler for other keys
 					}
 				}
 			}
 		});

 		/**
 		* Scrolls to the section when clicking the navigation bullet
 		*/
 		$(document).on('click touchstart', '#fp-nav a', function(e){
 			e.preventDefault();
 			var index = $(this).parent().index();
 			scrollPage($('.fp-section').eq(index));
 		});

 		/**
 		* Scrolls the slider to the given slide destination for the given section
 		*/
 		$(document).on('click touchstart', '.fp-slidesNav a', function(e){
 			e.preventDefault();
 			var slides = $(this).closest('.fp-section').find('.fp-slides');
 			var destiny = slides.find('.fp-slide').eq($(this).closest('li').index());

 			landscapeScroll(slides, destiny);
 		});

 		if(options.normalScrollElements){
 			$(document).on('mouseenter', options.normalScrollElements, function () {
 				$.fn.fullpage.setMouseWheelScrolling(false);
 			});

 			$(document).on('mouseleave', options.normalScrollElements, function(){
 				$.fn.fullpage.setMouseWheelScrolling(true);
 			});
 		}

 		/**
 		 * Scrolling horizontally when clicking on the slider controls.
 		 */
 		$('.fp-section').on('click touchstart', '.fp-controlArrow', function() {
 			if ($(this).hasClass('fp-prev')) {
 				$.fn.fullpage.moveSlideLeft();
 			} else {
 				$.fn.fullpage.moveSlideRight();
 			}
 		});

 		/**
 		* Scrolls horizontal sliders.
 		*/
 		function landscapeScroll(slides, destiny){
 			var destinyPos = destiny.position();
 			var slidesContainer = slides.find('.fp-slidesContainer').parent();
 			var slideIndex = destiny.index();
 			var section = slides.closest('.fp-section');
 			var sectionIndex = section.index('.fp-section');
 			var anchorLink = section.data('anchor');
 			var slidesNav = section.find('.fp-slidesNav');
 			var slideAnchor = destiny.data('anchor');

 			//caching the value of isResizing at the momment the function is called
 			//because it will be checked later inside a setTimeout and the value might change
 			var localIsResizing = isResizing;

 			if(options.onSlideLeave){
 				var prevSlideIndex = section.find('.fp-slide.active').index();
 				var xMovement = getXmovement(prevSlideIndex, slideIndex);

 				//if the site is not just resizing and readjusting the slides
 				if(!localIsResizing && xMovement!=='none'){
 					$.isFunction( options.onSlideLeave ) && options.onSlideLeave.call( this, anchorLink, (sectionIndex + 1), prevSlideIndex, xMovement);
 				}
 			}

 			destiny.addClass('active').siblings().removeClass('active');


 			if(typeof slideAnchor === 'undefined'){
 				slideAnchor = slideIndex;
 			}

 			if(!options.loopHorizontal && options.controlArrows){
 				//hidding it for the fist slide, showing for the rest
 				section.find('.fp-controlArrow.fp-prev').toggle(slideIndex!=0);

 				//hidding it for the last slide, showing for the rest
 				section.find('.fp-controlArrow.fp-next').toggle(!destiny.is(':last-child'));
 			}

 			//only changing the URL if the slides are in the current section (not for resize re-adjusting)
 			if(section.hasClass('active')){
 				setState(slideIndex, slideAnchor, anchorLink, sectionIndex);
 			}

 			var afterSlideLoads = function(){
 				//if the site is not just resizing and readjusting the slides
 				if(!localIsResizing){
 					$.isFunction( options.afterSlideLoad ) && options.afterSlideLoad.call( this, anchorLink, (sectionIndex + 1), slideAnchor, slideIndex);
 				}
 				//letting them slide again
 				slideMoving = false;
 			};

 			if(options.css3){
 				var translate3d = 'translate3d(-' + destinyPos.left + 'px, 0px, 0px)';

 				addAnimation(slides.find('.fp-slidesContainer'), options.scrollingSpeed>0).css(getTransforms(translate3d));

 				setTimeout(function(){
 					afterSlideLoads();
 				}, options.scrollingSpeed, options.easing);
 			}else{
 				slidesContainer.animate({
 					scrollLeft : destinyPos.left
 				}, options.scrollingSpeed, options.easing, function() {

 					afterSlideLoads();
 				});
 			}

 			slidesNav.find('.active').removeClass('active');
 			slidesNav.find('li').eq(slideIndex).find('a').addClass('active');
 		}

 	    //when resizing the site, we adjust the heights of the sections, slimScroll...
 	    $(window).resize(resizeHandler);

 	    var previousHeight = windowsHeight;
 	    var resizeId;
 	    function resizeHandler(){
 	    	//checking if it needs to get responsive
 	    	responsive();

 	    	// rebuild immediately on touch devices
 			if (isTouchDevice) {

 				//if the keyboard is visible
 				if ($(document.activeElement).attr('type') !== 'text') {
 					var currentHeight = $(window).height();

 					//making sure the change in the viewport size is enough to force a rebuild. (20 % of the window to avoid problems when hidding scroll bars)
 					if( Math.abs(currentHeight - previousHeight) > (20 * Math.max(previousHeight, currentHeight) / 100) ){
 			        	$.fn.fullpage.reBuild(true);
 			        	previousHeight = currentHeight;
 			        }
 		        }
 	      	}else{
 	      		//in order to call the functions only when the resize is finished
 	    		//http://stackoverflow.com/questions/4298612/jquery-how-to-call-resize-event-only-once-its-finished-resizing
 	      		clearTimeout(resizeId);

 	        	resizeId = setTimeout(function(){
 	        		$.fn.fullpage.reBuild(true);
 	        	}, 500);
 	      	}
 	    }

 	    /**
 	    * Checks if the site needs to get responsive and disables autoScrolling if so.
 	    * A class `fp-responsive` is added to the plugin's container in case the user wants to use it for his own responsive CSS.
 	    */
 	    function responsive(){
 	    	if(options.responsive){
 	    		var isResponsive = container.hasClass('fp-responsive');
 	    		if ($(window).width() < options.responsive ){
 	    			if(!isResponsive){
 	    				$.fn.fullpage.setAutoScrolling(false, 'internal');
 	    				$('#fp-nav').hide();
 						container.addClass('fp-responsive');
 	    			}
 	    		}else if(isResponsive){
 	    			$.fn.fullpage.setAutoScrolling(originals.autoScrolling, 'internal');
 	    			$('#fp-nav').show();
 					container.removeClass('fp-responsive');
 	    		}
 	    	}
 	    }

 	    /**
 		* Adds transition animations for the given element
 		*/
 		function addAnimation(element){
 			var transition = 'all ' + options.scrollingSpeed + 'ms ' + options.easingcss3;

 			element.removeClass('fp-notransition');
 			return element.css({
 				'-webkit-transition': transition,
      			'transition': transition
        		});
 		}

 		/**
 		* Remove transition animations for the given element
 		*/
 		function removeAnimation(element){
 			return element.addClass('fp-notransition');
 		}

 		/**
 		 * Resizing of the font size depending on the window size as well as some of the images on the site.
 		 */
 		function resizeMe(displayHeight, displayWidth) {
 			//Standard dimensions, for which the body font size is correct
 			var preferredHeight = 825;
 			var preferredWidth = 900;

 			if (displayHeight < preferredHeight || displayWidth < preferredWidth) {
 				var heightPercentage = (displayHeight * 100) / preferredHeight;
 				var widthPercentage = (displayWidth * 100) / preferredWidth;
 				var percentage = Math.min(heightPercentage, widthPercentage);
 				var newFontSize = percentage.toFixed(2);

 				$("body").css("font-size", newFontSize + '%');
 			} else {
 				$("body").css("font-size", '100%');
 			}
 		}

 		/**
 		 * Activating the website navigation dots according to the given slide name.
 		 */
 		function activateNavDots(name, sectionIndex){
 			if(options.navigation){
 				$('#fp-nav').find('.active').removeClass('active');
 				if(name){
 					$('#fp-nav').find('a[href="#' + name + '"]').addClass('active');
 				}else{
 					$('#fp-nav').find('li').eq(sectionIndex).find('a').addClass('active');
 				}
 			}
 		}

 		/**
 		 * Activating the website main menu elements according to the given slide name.
 		 */
 		function activateMenuElement(name){
 			if(options.menu){
 				$(options.menu).find('.active').removeClass('active');
 				$(options.menu).find('[data-menuanchor="'+name+'"]').addClass('active');
 			}
 		}

 		function activateMenuAndNav(anchor, index){
 			activateMenuElement(anchor);
 			activateNavDots(anchor, index);
 		}

 		/**
 		* Return a boolean depending on whether the scrollable element is at the end or at the start of the scrolling
 		* depending on the given type.
 		*/
 		function isScrolled(type, scrollable){
 			if(type === 'top'){
 				return !scrollable.scrollTop();
 			}else if(type === 'bottom'){
 				return scrollable.scrollTop() + 1 + scrollable.innerHeight() >= scrollable[0].scrollHeight;
 			}
 		}

 		/**
 		* Retuns `up` or `down` depending on the scrolling movement to reach its destination
 		* from the current section.
 		*/
 		function getYmovement(destiny){
 			var fromIndex = $('.fp-section.active').index('.fp-section');
 			var toIndex = destiny.index('.fp-section');
 			if( fromIndex == toIndex){
 				return 'none'
 			}
 			if(fromIndex > toIndex){
 				return 'up';
 			}
 			return 'down';
 		}

 		/**
 		* Retuns `right` or `left` depending on the scrolling movement to reach its destination
 		* from the current slide.
 		*/
 		function getXmovement(fromIndex, toIndex){
 			if( fromIndex == toIndex){
 				return 'none'
 			}
 			if(fromIndex > toIndex){
 				return 'left';
 			}
 			return 'right';
 		}


 		function createSlimScrolling(element){
 			//needed to make `scrollHeight` work under Opera 12
 			element.css('overflow', 'hidden');

 			//in case element is a slide
 			var section = element.closest('.fp-section');
 			var scrollable = element.find('.fp-scrollable');

 			//if there was scroll, the contentHeight will be the one in the scrollable section
 			if(scrollable.length){
 				var contentHeight = scrollable.get(0).scrollHeight;
 			}else{
 				var contentHeight = element.get(0).scrollHeight;
 				if(options.verticalCentered){
 					contentHeight = element.find('.fp-tableCell').get(0).scrollHeight;
 				}
 			}

 			var scrollHeight = windowsHeight - parseInt(section.css('padding-bottom')) - parseInt(section.css('padding-top'));

 			//needs scroll?
 			if ( contentHeight > scrollHeight) {
 				//was there already an scroll ? Updating it
 				if(scrollable.length){
 					scrollable.css('height', scrollHeight + 'px').parent().css('height', scrollHeight + 'px');
 				}
 				//creating the scrolling
 				else{
 					if(options.verticalCentered){
 						element.find('.fp-tableCell').wrapInner('<div class="fp-scrollable" />');
 					}else{
 						element.wrapInner('<div class="fp-scrollable" />');
 					}

 					element.find('.fp-scrollable').slimScroll({
 						allowPageScroll: true,
 						height: scrollHeight + 'px',
 						size: '10px',
 						alwaysVisible: true
 					});
 				}
 			}

 			//removing the scrolling when it is not necessary anymore
 			else{
 				removeSlimScroll(element);
 			}

 			//undo
 			element.css('overflow', '');
 		}

 		function removeSlimScroll(element){
 			element.find('.fp-scrollable').children().first().unwrap().unwrap();
 			element.find('.slimScrollBar').remove();
 			element.find('.slimScrollRail').remove();
 		}

 		function addTableClass(element){
 			element.addClass('fp-table').wrapInner('<div class="fp-tableCell" style="height:' + getTableHeight(element) + 'px;" />');
 		}

 		function getTableHeight(element){
 			var sectionHeight = windowsHeight;

 			if(options.paddingTop || options.paddingBottom){
 				var section = element;
 				if(!section.hasClass('fp-section')){
 					section = element.closest('.fp-section');
 				}

 				var paddings = parseInt(section.css('padding-top')) + parseInt(section.css('padding-bottom'));
 				sectionHeight = (windowsHeight - paddings);
 			}

 			return sectionHeight;
 		}

 		/**
 		* Adds a css3 transform property to the container class with or without animation depending on the animated param.
 		*/
 		function transformContainer(translate3d, animated){
 			if(animated){
 				addAnimation(container);
 			}else{
 				removeAnimation(container);
 			}

 			container.css(getTransforms(translate3d));

 			//syncronously removing the class after the animation has been applied.
 			setTimeout(function(){
 				container.removeClass('fp-notransition');
 			},10)
 		}


 		/**
 		* Scrolls to the given section and slide
 		*/
 		function scrollPageAndSlide(destiny, slide){
 			if (typeof slide === 'undefined') {
 			    slide = 0;
 			}

 			if(isNaN(destiny)){
 				var section = $('[data-anchor="'+destiny+'"]');
 			}else{
 				var section = $('.fp-section').eq( (destiny -1) );
 			}


 			//we need to scroll to the section and then to the slide
 			if (destiny !== lastScrolledDestiny && !section.hasClass('active')){
 				scrollPage(section, function(){
 					scrollSlider(section, slide)
 				});
 			}
 			//if we were already in the section
 			else{
 				scrollSlider(section, slide);
 			}
 		}

 		/**
 		* Scrolls the slider to the given slide destination for the given section
 		*/
 		function scrollSlider(section, slide){
 			if(typeof slide != 'undefined'){
 				var slides = section.find('.fp-slides');
 				var destiny =  slides.find('[data-anchor="'+slide+'"]');

 				if(!destiny.length){
 					destiny = slides.find('.fp-slide').eq(slide);
 				}

 				if(destiny.length){
 					landscapeScroll(slides, destiny);
 				}
 			}
 		}

 		/**
 		* Creates a landscape navigation bar with dots for horizontal sliders.
 		*/
 		function addSlidesNavigation(section, numSlides){
 			section.append('<div class="fp-slidesNav"><ul></ul></div>');
 			var nav = section.find('.fp-slidesNav');

 			//top or bottom
 			nav.addClass(options.slidesNavPosition);

 			for(var i=0; i< numSlides; i++){
 				nav.find('ul').append('<li><a href="#"><span></span></a></li>');
 			}

 			//centering it
 			nav.css('margin-left', '-' + (nav.width()/2) + 'px');

 			nav.find('li').first().find('a').addClass('active');
 		}


 		/**
 		* Sets the state of the website depending on the active section/slide.
 		* It changes the URL hash when needed and updates the body class.
 		*/
 		function setState(slideIndex, slideAnchor, anchorLink, sectionIndex){
 			var sectionHash = '';

 			if(options.anchors.length){

 				//isn't it the first slide?
 				if(slideIndex){
 					if(typeof anchorLink !== 'undefined'){
 						sectionHash = anchorLink;
 					}

 					//slide without anchor link? We take the index instead.
 					if(typeof slideAnchor === 'undefined'){
 						slideAnchor = slideIndex;
 					}

 					lastScrolledSlide = slideAnchor;
 					setUrlHash(sectionHash + '/' + slideAnchor);

 				//first slide won't have slide anchor, just the section one
 				}else if(typeof slideIndex !== 'undefined'){
 					lastScrolledSlide = slideAnchor;
 					setUrlHash(anchorLink);
 				}

 				//section without slides
 				else{
 					setUrlHash(anchorLink);
 				}

 				setBodyClass(location.hash);
 			}
 			else if(typeof slideIndex !== 'undefined'){
 					setBodyClass(sectionIndex + '-' + slideIndex);
 			}
 			else{
 				setBodyClass(String(sectionIndex));
 			}
 		}

 		/**
 		* Sets the URL hash.
 		*/
 		function setUrlHash(url){
 			if(options.recordHistory){
 				location.hash = url;
 			}else{
 				//Mobile Chrome doesn't work the normal way, so... lets use HTML5 for phones :)
 				if(isTouchDevice || isTouch){
 					history.replaceState(undefined, undefined, "#" + url)
 				}else{
 					var baseUrl = window.location.href.split('#')[0];
 					window.location.replace( baseUrl + '#' + url );
 				}
 			}
 		}

 		/**
 		* Sets a class for the body of the page depending on the active section / slide
 		*/
 		function setBodyClass(text){
 			//changing slash for dash to make it a valid CSS style
 			text = text.replace('/', '-').replace('#','');

 			//removing previous anchor classes
 			$("body")[0].className = $("body")[0].className.replace(/\b\s?fp-viewing-[^\s]+\b/g, '');

 			//adding the current anchor
 			$("body").addClass("fp-viewing-" + text);
 		}

 		/**
 		* Checks for translate3d support
 		* @return boolean
 		* http://stackoverflow.com/questions/5661671/detecting-transform-translate3d-support
 		*/
 		function support3d() {
 			var el = document.createElement('p'),
 				has3d,
 				transforms = {
 					'webkitTransform':'-webkit-transform',
 					'OTransform':'-o-transform',
 					'msTransform':'-ms-transform',
 					'MozTransform':'-moz-transform',
 					'transform':'transform'
 				};

 			// Add it to the body to get the computed style.
 			document.body.insertBefore(el, null);

 			for (var t in transforms) {
 				if (el.style[t] !== undefined) {
 					el.style[t] = "translate3d(1px,1px,1px)";
 					has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
 				}
 			}

 			document.body.removeChild(el);

 			return (has3d !== undefined && has3d.length > 0 && has3d !== "none");
 		}



 		/**
 		* Removes the auto scrolling action fired by the mouse wheel and trackpad.
 		* After this function is called, the mousewheel and trackpad movements won't scroll through sections.
 		*/
 		function removeMouseWheelHandler(){
 			if (document.addEventListener) {
 				document.removeEventListener('mousewheel', MouseWheelHandler, false); //IE9, Chrome, Safari, Oper
 				document.removeEventListener('wheel', MouseWheelHandler, false); //Firefox
 			} else {
 				document.detachEvent("onmousewheel", MouseWheelHandler); //IE 6/7/8
 			}
 		}


 		/**
 		* Adds the auto scrolling action for the mouse wheel and trackpad.
 		* After this function is called, the mousewheel and trackpad movements will scroll through sections
 		*/
 		function addMouseWheelHandler(){
 			if (document.addEventListener) {
 				document.addEventListener("mousewheel", MouseWheelHandler, false); //IE9, Chrome, Safari, Oper
 				document.addEventListener("wheel", MouseWheelHandler, false); //Firefox
 			} else {
 				document.attachEvent("onmousewheel", MouseWheelHandler); //IE 6/7/8
 			}
 		}


 		/**
 		* Adds the possibility to auto scroll through sections on touch devices.
 		*/
 		function addTouchHandler(){
 			if(isTouchDevice || isTouch){
 				//Microsoft pointers
 				MSPointer = getMSPointer();

 				$(document).off('touchstart ' +  MSPointer.down).on('touchstart ' + MSPointer.down, touchStartHandler);
 				$(document).off('touchmove ' + MSPointer.move).on('touchmove ' + MSPointer.move, touchMoveHandler);
 			}
 		}

 		/**
 		* Removes the auto scrolling for touch devices.
 		*/
 		function removeTouchHandler(){
 			if(isTouchDevice || isTouch){
 				//Microsoft pointers
 				MSPointer = getMSPointer();

 				$(document).off('touchstart ' + MSPointer.down);
 				$(document).off('touchmove ' + MSPointer.move);
 			}
 		}


 		/*
 		* Returns and object with Microsoft pointers (for IE<11 and for IE >= 11)
 		* http://msdn.microsoft.com/en-us/library/ie/dn304886(v=vs.85).aspx
 		*/
 		function getMSPointer(){
 			var pointer;

 			//IE >= 11 & rest of browsers
 			if(window.PointerEvent){
 				pointer = { down: "pointerdown", move: "pointermove"};
 			}

 			//IE < 11
 			else{
 				pointer = { down: "MSPointerDown", move: "MSPointerMove"};
 			}

 			return pointer;
 		}
 		/**
 		* Gets the pageX and pageY properties depending on the browser.
 		* https://github.com/alvarotrigo/fullPage.js/issues/194#issuecomment-34069854
 		*/
 		function getEventsPage(e){
 			var events = new Array();

 			events['y'] = (typeof e.pageY !== 'undefined' && (e.pageY || e.pageX) ? e.pageY : e.touches[0].pageY);
 			events['x'] = (typeof e.pageX !== 'undefined' && (e.pageY || e.pageX) ? e.pageX : e.touches[0].pageX);

 			return events;
 		}

 		function silentLandscapeScroll(activeSlide){
 			$.fn.fullpage.setScrollingSpeed (0, 'internal');
 			landscapeScroll(activeSlide.closest('.fp-slides'), activeSlide);
 			$.fn.fullpage.setScrollingSpeed(originals.scrollingSpeed, 'internal');
 		}

 		function silentScroll(top){
 			if(options.scrollBar){
 				container.scrollTop(top);
 			}
 			else if (options.css3) {
 				var translate3d = 'translate3d(0px, -' + top + 'px, 0px)';
 				transformContainer(translate3d, false);
 			}
 			else {
 				container.css("top", -top);
 			}
 		}

 		function getTransforms(translate3d){
 			return {
 				'-webkit-transform': translate3d,
 				'-moz-transform': translate3d,
 				'-ms-transform':translate3d,
 				'transform': translate3d
 			};
 		}

 		function setIsScrollable(value, direction){
 			switch (direction){
 				case 'up': isScrollAllowed.up = value; break;
 				case 'down': isScrollAllowed.down = value; break;
 				case 'left': isScrollAllowed.left = value; break;
 				case 'right': isScrollAllowed.right = value; break;
 				case 'all': $.fn.fullpage.setAllowScrolling(value);
 			}
 		}


 		/*
 		* Destroys fullpage.js plugin events and optinally its html markup and styles
 		*/
 		$.fn.fullpage.destroy = function(all){
 			$.fn.fullpage.setAutoScrolling(false, 'internal');
  			$.fn.fullpage.setAllowScrolling(false);
  			$.fn.fullpage.setKeyboardScrolling(false);


  			$(window)
 				.off('scroll', scrollHandler)
   				.off('hashchange', hashChangeHandler)
   				.off('resize', resizeHandler);

 			$(document)
 				.off('click', '#fp-nav a')
 				.off('mouseenter', '#fp-nav li')
 				.off('mouseleave', '#fp-nav li')
 				.off('click', '.fp-slidesNav a')
   				.off('mouseover', options.normalScrollElements)
   				.off('mouseout', options.normalScrollElements);

 			$('.fp-section')
 				.off('click', '.fp-controlArrow');

 			//lets make a mess!
 			if(all){
 				destroyStructure();
 			}
  		};

  		/*
 		* Removes inline styles added by fullpage.js
 		*/
 		function destroyStructure(){
 			//reseting the `top` or `translate` properties to 0
 	 		silentScroll(0);

 			$('#fp-nav, .fp-slidesNav, .fp-controlArrow').remove();

 			//removing inline styles
 			$('.fp-section').css( {
 				'height': '',
 				'background-color' : '',
 				'padding': ''
 			});

 			$('.fp-slide').css( {
 				'width': ''
 			});

 			container.css({
 	 			'height': '',
 	 			'position': '',
 	 			'-ms-touch-action': '',
 	 			'touch-action': ''
 	 		});

 			//removing added classes
 			$('.fp-section, .fp-slide').each(function(){
 				removeSlimScroll($(this));
 				$(this).removeClass('fp-table active');
 			});

 			removeAnimation(container);
 			removeAnimation(container.find('.fp-easing'));

 			//Unwrapping content
 			container.find('.fp-tableCell, .fp-slidesContainer, .fp-slides').each(function(){
 				//unwrap not being use in case there's no child element inside and its just text
 				$(this).replaceWith(this.childNodes);
 			});

 			//scrolling the page to the top with no animation
 			$('html, body').scrollTop(0);
 		}

 		/*
 		* Sets the state for a variable with multiple states (original, and temporal)
 		* Some variables such as `autoScrolling` or `recordHistory` might change automatically its state when using `responsive` or `autoScrolling:false`.
 		* This function is used to keep track of both states, the original and the temporal one.
 		* If type is not 'internal', then we assume the user is globally changing the variable.
 		*/
 		function setVariableState(variable, value, type){
 			options[variable] = value;
 			if(type !== 'internal'){
 				originals[variable] = value;
 			}
 		}

 		/**
 		* Displays warnings
 		*/
 		function displayWarnings(){
 			// Disable mutually exclusive settings
 			if (options.continuousVertical &&
 				(options.loopTop || options.loopBottom)) {
 			    options.continuousVertical = false;
 			    showError('warn', "Option `loopTop/loopBottom` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled");
 			}
 			if(options.continuousVertical && options.scrollBar){
 				options.continuousVertical = false;
 				showError('warn', "Option `scrollBar` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled");
 			}

 			//anchors can not have the same value as any element ID or NAME
 			$.each(options.anchors, function(index, name){
 				if($('#' + name).length || $('[name="'+name+'"]').length ){
 					showError('error', "data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE).");
 				}
 			});
 		}

 		function showError(type, text){
 			console && console[type] && console[type]('fullPage: ' + text);
 		}
 	};
 })(jQuery);


/*! WOW - v1.1.2  */
(function(){var a,b,c,d,e,f=function(a,b){return function(){return a.apply(b,arguments)}},g=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};b=function(){function a(){}return a.prototype.extend=function(a,b){var c,d;for(c in b)d=b[c],null==a[c]&&(a[c]=d);return a},a.prototype.isMobile=function(a){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)},a.prototype.createEvent=function(a,b,c,d){var e;return null==b&&(b=!1),null==c&&(c=!1),null==d&&(d=null),null!=document.createEvent?(e=document.createEvent("CustomEvent"),e.initCustomEvent(a,b,c,d)):null!=document.createEventObject?(e=document.createEventObject(),e.eventType=a):e.eventName=a,e},a.prototype.emitEvent=function(a,b){return null!=a.dispatchEvent?a.dispatchEvent(b):b in(null!=a)?a[b]():"on"+b in(null!=a)?a["on"+b]():void 0},a.prototype.addEvent=function(a,b,c){return null!=a.addEventListener?a.addEventListener(b,c,!1):null!=a.attachEvent?a.attachEvent("on"+b,c):a[b]=c},a.prototype.removeEvent=function(a,b,c){return null!=a.removeEventListener?a.removeEventListener(b,c,!1):null!=a.detachEvent?a.detachEvent("on"+b,c):delete a[b]},a.prototype.innerHeight=function(){return"innerHeight"in window?window.innerHeight:document.documentElement.clientHeight},a}(),c=this.WeakMap||this.MozWeakMap||(c=function(){function a(){this.keys=[],this.values=[]}return a.prototype.get=function(a){var b,c,d,e,f;for(f=this.keys,b=d=0,e=f.length;e>d;b=++d)if(c=f[b],c===a)return this.values[b]},a.prototype.set=function(a,b){var c,d,e,f,g;for(g=this.keys,c=e=0,f=g.length;f>e;c=++e)if(d=g[c],d===a)return void(this.values[c]=b);return this.keys.push(a),this.values.push(b)},a}()),a=this.MutationObserver||this.WebkitMutationObserver||this.MozMutationObserver||(a=function(){function a(){"undefined"!=typeof console&&null!==console&&console.warn("MutationObserver is not supported by your browser."),"undefined"!=typeof console&&null!==console&&console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")}return a.notSupported=!0,a.prototype.observe=function(){},a}()),d=this.getComputedStyle||function(a){return this.getPropertyValue=function(b){var c;return"float"===b&&(b="styleFloat"),e.test(b)&&b.replace(e,function(a,b){return b.toUpperCase()}),(null!=(c=a.currentStyle)?c[b]:void 0)||null},this},e=/(\-([a-z]){1})/g,this.WOW=function(){function e(a){null==a&&(a={}),this.scrollCallback=f(this.scrollCallback,this),this.scrollHandler=f(this.scrollHandler,this),this.resetAnimation=f(this.resetAnimation,this),this.start=f(this.start,this),this.scrolled=!0,this.config=this.util().extend(a,this.defaults),this.animationNameCache=new c,this.wowEvent=this.util().createEvent(this.config.boxClass)}return e.prototype.defaults={boxClass:"wow",animateClass:"animated",offset:0,mobile:!0,live:!0,callback:null},e.prototype.init=function(){var a;return this.element=window.document.documentElement,"interactive"===(a=document.readyState)||"complete"===a?this.start():this.util().addEvent(document,"DOMContentLoaded",this.start),this.finished=[]},e.prototype.start=function(){var b,c,d,e;if(this.stopped=!1,this.boxes=function(){var a,c,d,e;for(d=this.element.querySelectorAll("."+this.config.boxClass),e=[],a=0,c=d.length;c>a;a++)b=d[a],e.push(b);return e}.call(this),this.all=function(){var a,c,d,e;for(d=this.boxes,e=[],a=0,c=d.length;c>a;a++)b=d[a],e.push(b);return e}.call(this),this.boxes.length)if(this.disabled())this.resetStyle();else for(e=this.boxes,c=0,d=e.length;d>c;c++)b=e[c],this.applyStyle(b,!0);return this.disabled()||(this.util().addEvent(window,"scroll",this.scrollHandler),this.util().addEvent(window,"resize",this.scrollHandler),this.interval=setInterval(this.scrollCallback,50)),this.config.live?new a(function(a){return function(b){var c,d,e,f,g;for(g=[],c=0,d=b.length;d>c;c++)f=b[c],g.push(function(){var a,b,c,d;for(c=f.addedNodes||[],d=[],a=0,b=c.length;b>a;a++)e=c[a],d.push(this.doSync(e));return d}.call(a));return g}}(this)).observe(document.body,{childList:!0,subtree:!0}):void 0},e.prototype.stop=function(){return this.stopped=!0,this.util().removeEvent(window,"scroll",this.scrollHandler),this.util().removeEvent(window,"resize",this.scrollHandler),null!=this.interval?clearInterval(this.interval):void 0},e.prototype.sync=function(){return a.notSupported?this.doSync(this.element):void 0},e.prototype.doSync=function(a){var b,c,d,e,f;if(null==a&&(a=this.element),1===a.nodeType){for(a=a.parentNode||a,e=a.querySelectorAll("."+this.config.boxClass),f=[],c=0,d=e.length;d>c;c++)b=e[c],g.call(this.all,b)<0?(this.boxes.push(b),this.all.push(b),this.stopped||this.disabled()?this.resetStyle():this.applyStyle(b,!0),f.push(this.scrolled=!0)):f.push(void 0);return f}},e.prototype.show=function(a){return this.applyStyle(a),a.className=a.className+" "+this.config.animateClass,null!=this.config.callback&&this.config.callback(a),this.util().emitEvent(a,this.wowEvent),this.util().addEvent(a,"animationend",this.resetAnimation),this.util().addEvent(a,"oanimationend",this.resetAnimation),this.util().addEvent(a,"webkitAnimationEnd",this.resetAnimation),this.util().addEvent(a,"MSAnimationEnd",this.resetAnimation),a},e.prototype.applyStyle=function(a,b){var c,d,e;return d=a.getAttribute("data-wow-duration"),c=a.getAttribute("data-wow-delay"),e=a.getAttribute("data-wow-iteration"),this.animate(function(f){return function(){return f.customStyle(a,b,d,c,e)}}(this))},e.prototype.animate=function(){return"requestAnimationFrame"in window?function(a){return window.requestAnimationFrame(a)}:function(a){return a()}}(),e.prototype.resetStyle=function(){var a,b,c,d,e;for(d=this.boxes,e=[],b=0,c=d.length;c>b;b++)a=d[b],e.push(a.style.visibility="visible");return e},e.prototype.resetAnimation=function(a){var b;return a.type.toLowerCase().indexOf("animationend")>=0?(b=a.target||a.srcElement,b.className=b.className.replace(this.config.animateClass,"").trim()):void 0},e.prototype.customStyle=function(a,b,c,d,e){return b&&this.cacheAnimationName(a),a.style.visibility=b?"hidden":"visible",c&&this.vendorSet(a.style,{animationDuration:c}),d&&this.vendorSet(a.style,{animationDelay:d}),e&&this.vendorSet(a.style,{animationIterationCount:e}),this.vendorSet(a.style,{animationName:b?"none":this.cachedAnimationName(a)}),a},e.prototype.vendors=["moz","webkit"],e.prototype.vendorSet=function(a,b){var c,d,e,f;d=[];for(c in b)e=b[c],a[""+c]=e,d.push(function(){var b,d,g,h;for(g=this.vendors,h=[],b=0,d=g.length;d>b;b++)f=g[b],h.push(a[""+f+c.charAt(0).toUpperCase()+c.substr(1)]=e);return h}.call(this));return d},e.prototype.vendorCSS=function(a,b){var c,e,f,g,h,i;for(h=d(a),g=h.getPropertyCSSValue(b),f=this.vendors,c=0,e=f.length;e>c;c++)i=f[c],g=g||h.getPropertyCSSValue("-"+i+"-"+b);return g},e.prototype.animationName=function(a){var b;try{b=this.vendorCSS(a,"animation-name").cssText}catch(c){b=d(a).getPropertyValue("animation-name")}return"none"===b?"":b},e.prototype.cacheAnimationName=function(a){return this.animationNameCache.set(a,this.animationName(a))},e.prototype.cachedAnimationName=function(a){return this.animationNameCache.get(a)},e.prototype.scrollHandler=function(){return this.scrolled=!0},e.prototype.scrollCallback=function(){var a;return!this.scrolled||(this.scrolled=!1,this.boxes=function(){var b,c,d,e;for(d=this.boxes,e=[],b=0,c=d.length;c>b;b++)a=d[b],a&&(this.isVisible(a)?this.show(a):e.push(a));return e}.call(this),this.boxes.length||this.config.live)?void 0:this.stop()},e.prototype.offsetTop=function(a){for(var b;void 0===a.offsetTop;)a=a.parentNode;for(b=a.offsetTop;a=a.offsetParent;)b+=a.offsetTop;return b},e.prototype.isVisible=function(a){var b,c,d,e,f;return c=a.getAttribute("data-wow-offset")||this.config.offset,f=window.pageYOffset,e=f+Math.min(this.element.clientHeight,this.util().innerHeight())-c,d=this.offsetTop(a),b=d+a.clientHeight,e>=d&&b>=f},e.prototype.util=function(){return null!=this._util?this._util:this._util=new b},e.prototype.disabled=function(){return!this.config.mobile&&this.util().isMobile(navigator.userAgent)},e}()}).call(this);

/* Selectbox 0.2 */
(function($,undefined){var PROP_NAME="selectbox",FALSE=false,TRUE=true;function Selectbox(){this._state=[];this._defaults={classHolder:"sbHolder",classHolderDisabled:"sbHolderDisabled",classSelector:"sbSelector",classOptions:"sbOptions",classGroup:"sbGroup",classSub:"sbSub",classDisabled:"sbDisabled",classToggleOpen:"sbToggleOpen",classToggle:"sbToggle",classFocus:"sbFocus",speed:200,effect:"slide",onChange:null,onOpen:null,onClose:null}}$.extend(Selectbox.prototype,{_isOpenSelectbox:function(target){if(!target){return FALSE}var inst=this._getInst(target);return inst.isOpen},_isDisabledSelectbox:function(target){if(!target){return FALSE}var inst=this._getInst(target);return inst.isDisabled},_attachSelectbox:function(target,settings){if(this._getInst(target)){return FALSE}var $target=$(target),self=this,inst=self._newInst($target),sbHolder,sbSelector,sbToggle,sbOptions,s=FALSE,optGroup=$target.find("optgroup"),opts=$target.find("option"),olen=opts.length;$target.attr("sb",inst.uid);$.extend(inst.settings,self._defaults,settings);self._state[inst.uid]=FALSE;$target.hide();function closeOthers(){var key,sel,uid=this.attr("id").split("_")[1];for(key in self._state){if(key!==uid){if(self._state.hasOwnProperty(key)){sel=$("select[sb='"+key+"']")[0];if(sel){self._closeSelectbox(sel)}}}}}sbHolder=$("<div>",{id:"sbHolder_"+inst.uid,"class":inst.settings.classHolder,tabindex:$target.attr("tabindex")});sbSelector=$("<a>",{id:"sbSelector_"+inst.uid,href:"#","class":inst.settings.classSelector,click:function(e){e.preventDefault();closeOthers.apply($(this),[]);var uid=$(this).attr("id").split("_")[1];if(self._state[uid]){self._closeSelectbox(target)}else{self._openSelectbox(target)}}});sbToggle=$("<a>",{id:"sbToggle_"+inst.uid,href:"#","class":inst.settings.classToggle,click:function(e){e.preventDefault();closeOthers.apply($(this),[]);var uid=$(this).attr("id").split("_")[1];if(self._state[uid]){self._closeSelectbox(target)}else{self._openSelectbox(target)}}});sbToggle.appendTo(sbHolder);sbOptions=$("<ul>",{id:"sbOptions_"+inst.uid,"class":inst.settings.classOptions,css:{display:"none"}});$target.children().each(function(i){var that=$(this),li,config={};if(that.is("option")){getOptions(that)}else{if(that.is("optgroup")){li=$("<li>");$("<span>",{text:that.attr("label")}).addClass(inst.settings.classGroup).appendTo(li);li.appendTo(sbOptions);if(that.is(":disabled")){config.disabled=true}config.sub=true;getOptions(that.find("option"),config)}}});function getOptions(){var sub=arguments[1]&&arguments[1].sub?true:false,disabled=arguments[1]&&arguments[1].disabled?true:false;arguments[0].each(function(i){var that=$(this),li=$("<li>"),child;if(that.is(":selected")){sbSelector.text(that.text());s=TRUE}if(i===olen-1){li.addClass("last")}if(!that.is(":disabled")&&!disabled){child=$("<a>",{href:"#"+that.val(),rel:that.val()}).text(that.text()).bind("click.sb",function(e){if(e&&e.preventDefault){e.preventDefault()}var t=sbToggle,$this=$(this),uid=t.attr("id").split("_")[1];self._changeSelectbox(target,$this.attr("rel"),$this.text());self._closeSelectbox(target)}).bind("mouseover.sb",function(){var $this=$(this);$this.parent().siblings().find("a").removeClass(inst.settings.classFocus);$this.addClass(inst.settings.classFocus)}).bind("mouseout.sb",function(){$(this).removeClass(inst.settings.classFocus)});if(sub){child.addClass(inst.settings.classSub)}if(that.is(":selected")){child.addClass(inst.settings.classFocus)}child.appendTo(li)}else{child=$("<span>",{text:that.text()}).addClass(inst.settings.classDisabled);if(sub){child.addClass(inst.settings.classSub)}child.appendTo(li)}li.appendTo(sbOptions)})}if(!s){sbSelector.text(opts.first().text())}$.data(target,PROP_NAME,inst);sbHolder.data("uid",inst.uid).bind("keydown.sb",function(e){var key=e.charCode?e.charCode:e.keyCode?e.keyCode:0,$this=$(this),uid=$this.data("uid"),inst=$this.siblings("select[sb='"+uid+"']").data(PROP_NAME),trgt=$this.siblings(["select[sb='",uid,"']"].join("")).get(0),$f=$this.find("ul").find("a."+inst.settings.classFocus);switch(key){case 37:case 38:if($f.length>0){var $next;$("a",$this).removeClass(inst.settings.classFocus);$next=$f.parent().prevAll("li:has(a)").eq(0).find("a");if($next.length>0){$next.addClass(inst.settings.classFocus).focus();$("#sbSelector_"+uid).text($next.text())}}break;case 39:case 40:var $next;$("a",$this).removeClass(inst.settings.classFocus);if($f.length>0){$next=$f.parent().nextAll("li:has(a)").eq(0).find("a")}else{$next=$this.find("ul").find("a").eq(0)}if($next.length>0){$next.addClass(inst.settings.classFocus).focus();$("#sbSelector_"+uid).text($next.text())}break;case 13:if($f.length>0){self._changeSelectbox(trgt,$f.attr("rel"),$f.text())}self._closeSelectbox(trgt);break;case 9:if(trgt){var inst=self._getInst(trgt);if(inst){if($f.length>0){self._changeSelectbox(trgt,$f.attr("rel"),$f.text())}self._closeSelectbox(trgt)}}var i=parseInt($this.attr("tabindex"),10);if(!e.shiftKey){i++}else{i--}$("*[tabindex='"+i+"']").focus();break;case 27:self._closeSelectbox(trgt);break}e.stopPropagation();return false}).delegate("a","mouseover",function(e){$(this).addClass(inst.settings.classFocus)}).delegate("a","mouseout",function(e){$(this).removeClass(inst.settings.classFocus)});sbSelector.appendTo(sbHolder);sbOptions.appendTo(sbHolder);sbHolder.insertAfter($target);$("html").live("mousedown",function(e){e.stopPropagation();$("select").selectbox("close")});$([".",inst.settings.classHolder,", .",inst.settings.classSelector].join("")).mousedown(function(e){e.stopPropagation()})},_detachSelectbox:function(target){var inst=this._getInst(target);if(!inst){return FALSE}$("#sbHolder_"+inst.uid).remove();$.data(target,PROP_NAME,null);$(target).show()},_changeSelectbox:function(target,value,text){var onChange,inst=this._getInst(target);if(inst){onChange=this._get(inst,"onChange");$("#sbSelector_"+inst.uid).text(text)}value=value.replace(/\'/g,"\\'");$(target).find("option[value='"+value+"']").attr("selected",TRUE);if(inst&&onChange){onChange.apply((inst.input?inst.input[0]:null),[value,inst])}else{if(inst&&inst.input){inst.input.trigger("change")}}},_enableSelectbox:function(target){var inst=this._getInst(target);if(!inst||!inst.isDisabled){return FALSE}$("#sbHolder_"+inst.uid).removeClass(inst.settings.classHolderDisabled);inst.isDisabled=FALSE;$.data(target,PROP_NAME,inst)},_disableSelectbox:function(target){var inst=this._getInst(target);if(!inst||inst.isDisabled){return FALSE}$("#sbHolder_"+inst.uid).addClass(inst.settings.classHolderDisabled);inst.isDisabled=TRUE;$.data(target,PROP_NAME,inst)},_optionSelectbox:function(target,name,value){var inst=this._getInst(target);if(!inst){return FALSE}inst[name]=value;$.data(target,PROP_NAME,inst)},_openSelectbox:function(target){var inst=this._getInst(target);if(!inst||inst.isOpen||inst.isDisabled){return }var el=$("#sbOptions_"+inst.uid),viewportHeight=parseInt($(window).height(),10),offset=$("#sbHolder_"+inst.uid).offset(),scrollTop=$(window).scrollTop(),height=el.prev().height(),diff=viewportHeight-(offset.top-scrollTop)-height/2,onOpen=this._get(inst,"onOpen");el.css({top:height+"px",maxHeight:(diff-height)+"px"});inst.settings.effect==="fade"?el.fadeIn(inst.settings.speed):el.slideDown(inst.settings.speed);$("#sbToggle_"+inst.uid).addClass(inst.settings.classToggleOpen);this._state[inst.uid]=TRUE;inst.isOpen=TRUE;if(onOpen){onOpen.apply((inst.input?inst.input[0]:null),[inst])}$.data(target,PROP_NAME,inst)},_closeSelectbox:function(target){var inst=this._getInst(target);if(!inst||!inst.isOpen){return }var onClose=this._get(inst,"onClose");inst.settings.effect==="fade"?$("#sbOptions_"+inst.uid).fadeOut(inst.settings.speed):$("#sbOptions_"+inst.uid).slideUp(inst.settings.speed);$("#sbToggle_"+inst.uid).removeClass(inst.settings.classToggleOpen);this._state[inst.uid]=FALSE;inst.isOpen=FALSE;if(onClose){onClose.apply((inst.input?inst.input[0]:null),[inst])}$.data(target,PROP_NAME,inst)},_newInst:function(target){var id=target[0].id.replace(/([^A-Za-z0-9_-])/g,"\\\\$1");return{id:id,input:target,uid:Math.floor(Math.random()*99999999),isOpen:FALSE,isDisabled:FALSE,settings:{}}},_getInst:function(target){try{return $.data(target,PROP_NAME)}catch(err){throw"Missing instance data for this selectbox"}},_get:function(inst,name){return inst.settings[name]!==undefined?inst.settings[name]:this._defaults[name]}});$.fn.selectbox=function(options){var otherArgs=Array.prototype.slice.call(arguments,1);if(typeof options=="string"&&options=="isDisabled"){return $.selectbox["_"+options+"Selectbox"].apply($.selectbox,[this[0]].concat(otherArgs))}if(options=="option"&&arguments.length==2&&typeof arguments[1]=="string"){return $.selectbox["_"+options+"Selectbox"].apply($.selectbox,[this[0]].concat(otherArgs))}return this.each(function(){typeof options=="string"?$.selectbox["_"+options+"Selectbox"].apply($.selectbox,[this].concat(otherArgs)):$.selectbox._attachSelectbox(this,options)})};$.selectbox=new Selectbox();$.selectbox.version="0.2"})(jQuery);
/*
jQuery custom scrollbar plugin
*/
(function(e){e.fn.customScrollbar=function(i,t){var o={skin:undefined,hScroll:true,vScroll:true,updateOnWindowResize:false,animationSpeed:300,onCustomScroll:undefined,swipeSpeed:1,wheelSpeed:40,fixedThumbWidth:undefined,fixedThumbHeight:undefined};var s=function(i,t){this.$element=e(i);this.options=t;this.addScrollableClass();this.addSkinClass();this.addScrollBarComponents();if(this.options.vScroll)this.vScrollbar=new n(this,new r);if(this.options.hScroll)this.hScrollbar=new n(this,new l);this.$element.data("scrollable",this);this.initKeyboardScrolling();this.bindEvents()};s.prototype={addScrollableClass:function(){if(!this.$element.hasClass("scrollable")){this.scrollableAdded=true;this.$element.addClass("scrollable")}},removeScrollableClass:function(){if(this.scrollableAdded)this.$element.removeClass("scrollable")},addSkinClass:function(){if(typeof this.options.skin=="string"&&!this.$element.hasClass(this.options.skin)){this.skinClassAdded=true;this.$element.addClass(this.options.skin)}},removeSkinClass:function(){if(this.skinClassAdded)this.$element.removeClass(this.options.skin)},addScrollBarComponents:function(){this.assignViewPort();if(this.$viewPort.length==0){this.$element.wrapInner('<div class="viewport" />');this.assignViewPort();this.viewPortAdded=true}this.assignOverview();if(this.$overview.length==0){this.$viewPort.wrapInner('<div class="overview" />');this.assignOverview();this.overviewAdded=true}this.addScrollBar("vertical","prepend");this.addScrollBar("horizontal","append")},removeScrollbarComponents:function(){this.removeScrollbar("vertical");this.removeScrollbar("horizontal");if(this.overviewAdded)this.$element.unwrap();if(this.viewPortAdded)this.$element.unwrap()},removeScrollbar:function(e){if(this[e+"ScrollbarAdded"])this.$element.find(".scroll-bar."+e).remove()},assignViewPort:function(){this.$viewPort=this.$element.find(".viewport")},assignOverview:function(){this.$overview=this.$viewPort.find(".overview")},addScrollBar:function(e,i){if(this.$element.find(".scroll-bar."+e).length==0){this.$element[i]("<div class='scroll-bar "+e+"'><div class='thumb'></div></div>");this[e+"ScrollbarAdded"]=true}},resize:function(e){if(this.vScrollbar)this.vScrollbar.resize(e);if(this.hScrollbar)this.hScrollbar.resize(e)},scrollTo:function(e){if(this.vScrollbar)this.vScrollbar.scrollToElement(e);if(this.hScrollbar)this.hScrollbar.scrollToElement(e)},scrollToXY:function(e,i){this.scrollToX(e);this.scrollToY(i)},scrollToX:function(e){if(this.hScrollbar)this.hScrollbar.scrollOverviewTo(e,true)},scrollToY:function(e){if(this.vScrollbar)this.vScrollbar.scrollOverviewTo(e,true)},remove:function(){this.removeScrollableClass();this.removeSkinClass();this.removeScrollbarComponents();this.$element.data("scrollable",null);this.removeKeyboardScrolling();if(this.vScrollbar)this.vScrollbar.remove();if(this.hScrollbar)this.hScrollbar.remove()},setAnimationSpeed:function(e){this.options.animationSpeed=e},isInside:function(i,t){var o=e(i);var s=e(t);var n=o.offset();var l=s.offset();return n.top>=l.top&&n.left>=l.left&&n.top+o.height()<=l.top+s.height()&&n.left+o.width()<=l.left+s.width()},initKeyboardScrolling:function(){var e=this;this.elementKeydown=function(i){if(document.activeElement===e.$element[0]){if(e.vScrollbar)e.vScrollbar.keyScroll(i);if(e.hScrollbar)e.hScrollbar.keyScroll(i)}};this.$element.attr("tabindex","-1").keydown(this.elementKeydown)},removeKeyboardScrolling:function(){this.$element.removeAttr("tabindex").unbind("keydown",this.elementKeydown)},bindEvents:function(){if(this.options.onCustomScroll)this.$element.on("customScroll",this.options.onCustomScroll)}};var n=function(e,i){this.scrollable=e;this.sizing=i;this.$scrollBar=this.sizing.scrollBar(this.scrollable.$element);this.$thumb=this.$scrollBar.find(".thumb");this.setScrollPosition(0,0);this.resize();this.initMouseMoveScrolling();this.initMouseWheelScrolling();this.initTouchScrolling();this.initMouseClickScrolling();this.initWindowResize()};n.prototype={resize:function(e){this.scrollable.$viewPort.height(this.scrollable.$element.height());this.sizing.size(this.scrollable.$viewPort,this.sizing.size(this.scrollable.$element));this.viewPortSize=this.sizing.size(this.scrollable.$viewPort);this.overviewSize=this.sizing.size(this.scrollable.$overview);this.ratio=this.viewPortSize/this.overviewSize;this.sizing.size(this.$scrollBar,this.viewPortSize);this.thumbSize=this.calculateThumbSize();this.sizing.size(this.$thumb,this.thumbSize);this.maxThumbPosition=this.calculateMaxThumbPosition();this.maxOverviewPosition=this.calculateMaxOverviewPosition();this.enabled=this.overviewSize>this.viewPortSize;if(this.scrollPercent===undefined)this.scrollPercent=0;if(this.enabled)this.rescroll(e);else this.setScrollPosition(0,0);this.$scrollBar.toggle(this.enabled)},calculateThumbSize:function(){var e=this.sizing.fixedThumbSize(this.scrollable.options);var i;if(e)i=e;else i=this.ratio*this.viewPortSize;return Math.max(i,this.sizing.minSize(this.$thumb))},initMouseMoveScrolling:function(){var i=this;this.$thumb.mousedown(function(e){if(i.enabled)i.startMouseMoveScrolling(e)});this.documentMouseup=function(e){i.stopMouseMoveScrolling(e)};e(document).mouseup(this.documentMouseup);this.documentMousemove=function(e){i.mouseMoveScroll(e)};e(document).mousemove(this.documentMousemove);this.$thumb.click(function(e){e.stopPropagation()})},removeMouseMoveScrolling:function(){this.$thumb.unbind();e(document).unbind("mouseup",this.documentMouseup);e(document).unbind("mousemove",this.documentMousemove)},initMouseWheelScrolling:function(){var e=this;this.scrollable.$element.mousewheel(function(i,t,o,s){if(e.enabled){if(e.mouseWheelScroll(o,s)){i.stopPropagation();i.preventDefault()}}})},removeMouseWheelScrolling:function(){this.scrollable.$element.unbind("mousewheel")},initTouchScrolling:function(){if(document.addEventListener){var e=this;this.elementTouchstart=function(i){if(e.enabled)e.startTouchScrolling(i)};this.scrollable.$element[0].addEventListener("touchstart",this.elementTouchstart);this.documentTouchmove=function(i){e.touchScroll(i)};document.addEventListener("touchmove",this.documentTouchmove);this.elementTouchend=function(i){e.stopTouchScrolling(i)};this.scrollable.$element[0].addEventListener("touchend",this.elementTouchend)}},removeTouchScrolling:function(){if(document.addEventListener){this.scrollable.$element[0].removeEventListener("touchstart",this.elementTouchstart);document.removeEventListener("touchmove",this.documentTouchmove);this.scrollable.$element[0].removeEventListener("touchend",this.elementTouchend)}},initMouseClickScrolling:function(){var e=this;this.scrollBarClick=function(i){e.mouseClickScroll(i)};this.$scrollBar.click(this.scrollBarClick)},removeMouseClickScrolling:function(){this.$scrollBar.unbind("click",this.scrollBarClick)},initWindowResize:function(){if(this.scrollable.options.updateOnWindowResize){var i=this;this.windowResize=function(){i.resize()};e(window).resize(this.windowResize)}},removeWindowResize:function(){e(window).unbind("resize",this.windowResize)},isKeyScrolling:function(e){return this.keyScrollDelta(e)!=null},keyScrollDelta:function(e){for(var i in this.sizing.scrollingKeys)if(i==e)return this.sizing.scrollingKeys[e](this.viewPortSize);return null},startMouseMoveScrolling:function(i){this.mouseMoveScrolling=true;e("html").addClass("not-selectable");this.setUnselectable(e("html"),"on");this.setScrollEvent(i)},stopMouseMoveScrolling:function(i){this.mouseMoveScrolling=false;e("html").removeClass("not-selectable");this.setUnselectable(e("html"),null)},setUnselectable:function(e,i){if(e.attr("unselectable")!=i){e.attr("unselectable",i);e.find(":not(input)").attr("unselectable",i)}},mouseMoveScroll:function(e){if(this.mouseMoveScrolling){var i=this.sizing.mouseDelta(this.scrollEvent,e);this.scrollThumbBy(i);this.setScrollEvent(e)}},startTouchScrolling:function(e){if(e.touches&&e.touches.length==1){this.setScrollEvent(e.touches[0]);this.touchScrolling=true;e.stopPropagation()}},touchScroll:function(e){if(this.touchScrolling&&e.touches&&e.touches.length==1){var i=-this.sizing.mouseDelta(this.scrollEvent,e.touches[0])*this.scrollable.options.swipeSpeed;var t=this.scrollOverviewBy(i);if(t){e.stopPropagation();e.preventDefault();this.setScrollEvent(e.touches[0])}}},stopTouchScrolling:function(e){this.touchScrolling=false;e.stopPropagation()},mouseWheelScroll:function(e,i){var t=-this.sizing.wheelDelta(e,i)*this.scrollable.options.wheelSpeed;if(t!=0)return this.scrollOverviewBy(t)},mouseClickScroll:function(e){var i=this.viewPortSize-20;if(e["page"+this.sizing.scrollAxis()]<this.$thumb.offset()[this.sizing.offsetComponent()])// mouse click over thumb
i=-i;this.scrollOverviewBy(i)},keyScroll:function(e){var i=e.which;if(this.enabled&&this.isKeyScrolling(i)){if(this.scrollOverviewBy(this.keyScrollDelta(i)))e.preventDefault()}},scrollThumbBy:function(e){var i=this.thumbPosition();i+=e;i=this.positionOrMax(i,this.maxThumbPosition);var t=this.scrollPercent;this.scrollPercent=i/this.maxThumbPosition;var o=i*this.maxOverviewPosition/this.maxThumbPosition;this.setScrollPosition(o,i);if(t!=this.scrollPercent){this.triggerCustomScroll(t);return true}else return false},thumbPosition:function(){return this.$thumb.position()[this.sizing.offsetComponent()]},scrollOverviewBy:function(e){var i=this.overviewPosition()+e;return this.scrollOverviewTo(i,false)},overviewPosition:function(){return-this.scrollable.$overview.position()[this.sizing.offsetComponent()]},scrollOverviewTo:function(e,i){e=this.positionOrMax(e,this.maxOverviewPosition);var t=this.scrollPercent;this.scrollPercent=e/this.maxOverviewPosition;var o=this.scrollPercent*this.maxThumbPosition;if(i)this.setScrollPositionWithAnimation(e,o);else this.setScrollPosition(e,o);if(t!=this.scrollPercent){this.triggerCustomScroll(t);return true}else return false},positionOrMax:function(e,i){if(e<0)return 0;else if(e>i)return i;else return e},triggerCustomScroll:function(e){this.scrollable.$element.trigger("customScroll",{scrollAxis:this.sizing.scrollAxis(),direction:this.sizing.scrollDirection(e,this.scrollPercent),scrollPercent:this.scrollPercent*100})},rescroll:function(e){if(e){var i=this.positionOrMax(this.overviewPosition(),this.maxOverviewPosition);this.scrollPercent=i/this.maxOverviewPosition;var t=this.scrollPercent*this.maxThumbPosition;this.setScrollPosition(i,t)}else{var t=this.scrollPercent*this.maxThumbPosition;var i=this.scrollPercent*this.maxOverviewPosition;this.setScrollPosition(i,t)}},setScrollPosition:function(e,i){this.$thumb.css(this.sizing.offsetComponent(),i+"px");this.scrollable.$overview.css(this.sizing.offsetComponent(),-e+"px")},setScrollPositionWithAnimation:function(e,i){var t={};var o={};t[this.sizing.offsetComponent()]=i+"px";this.$thumb.animate(t,this.scrollable.options.animationSpeed);o[this.sizing.offsetComponent()]=-e+"px";this.scrollable.$overview.animate(o,this.scrollable.options.animationSpeed)},calculateMaxThumbPosition:function(){return this.sizing.size(this.$scrollBar)-this.thumbSize},calculateMaxOverviewPosition:function(){return this.sizing.size(this.scrollable.$overview)-this.sizing.size(this.scrollable.$viewPort)},setScrollEvent:function(e){var i="page"+this.sizing.scrollAxis();if(!this.scrollEvent||this.scrollEvent[i]!=e[i])this.scrollEvent={pageX:e.pageX,pageY:e.pageY}},scrollToElement:function(i){var t=e(i);if(this.sizing.isInside(t,this.scrollable.$overview)&&!this.sizing.isInside(t,this.scrollable.$viewPort)){var o=t.offset();var s=this.scrollable.$overview.offset();var n=this.scrollable.$viewPort.offset();this.scrollOverviewTo(o[this.sizing.offsetComponent()]-s[this.sizing.offsetComponent()],true)}},remove:function(){this.removeMouseMoveScrolling();this.removeMouseWheelScrolling();this.removeTouchScrolling();this.removeMouseClickScrolling();this.removeWindowResize()}};var l=function(){};l.prototype={size:function(e,i){if(i)return e.width(i);else return e.width()},minSize:function(e){return parseInt(e.css("min-width"))||0},fixedThumbSize:function(e){return e.fixedThumbWidth},scrollBar:function(e){return e.find(".scroll-bar.horizontal")},mouseDelta:function(e,i){return i.pageX-e.pageX},offsetComponent:function(){return"left"},wheelDelta:function(e,i){return e},scrollAxis:function(){return"X"},scrollDirection:function(e,i){return e<i?"right":"left"},scrollingKeys:{37:function(e){return-10},39:function(e){return 10}},isInside:function(i,t){var o=e(i);var s=e(t);var n=o.offset();var l=s.offset();return n.left>=l.left&&n.left+o.width()<=l.left+s.width()}};var r=function(){};r.prototype={size:function(e,i){if(i)return e.height(i);else return e.height()},minSize:function(e){return parseInt(e.css("min-height"))||0},fixedThumbSize:function(e){return e.fixedThumbHeight},scrollBar:function(e){return e.find(".scroll-bar.vertical")},mouseDelta:function(e,i){return i.pageY-e.pageY},offsetComponent:function(){return"top"},wheelDelta:function(e,i){return i},scrollAxis:function(){return"Y"},scrollDirection:function(e,i){return e<i?"down":"up"},scrollingKeys:{38:function(e){return-10},40:function(e){return 10},33:function(e){return-(e-20)},34:function(e){return e-20}},isInside:function(i,t){var o=e(i);var s=e(t);var n=o.offset();var l=s.offset();return n.top>=l.top&&n.top+o.height()<=l.top+s.height()}};return this.each(function(){if(i==undefined)i=o;if(typeof i=="string"){var n=e(this).data("scrollable");if(n)n[i](t)}else if(typeof i=="object"){i=e.extend(o,i);new s(e(this),i)}else throw"Invalid type of options"})}})(jQuery);(function(e){var i=["DOMMouseScroll","mousewheel"];if(e.event.fixHooks){for(var t=i.length;t;){e.event.fixHooks[i[--t]]=e.event.mouseHooks}}e.event.special.mousewheel={setup:function(){if(this.addEventListener){for(var e=i.length;e;){this.addEventListener(i[--e],o,false)}}else{this.onmousewheel=o}},teardown:function(){if(this.removeEventListener){for(var e=i.length;e;){this.removeEventListener(i[--e],o,false)}}else{this.onmousewheel=null}}};e.fn.extend({mousewheel:function(e){return e?this.bind("mousewheel",e):this.trigger("mousewheel")},unmousewheel:function(e){return this.unbind("mousewheel",e)}});function o(i){var t=i||window.event,o=[].slice.call(arguments,1),s=0,n=true,l=0,r=0;i=e.event.fix(t);i.type="mousewheel";// Old school scrollwheel delta
if(t.wheelDelta){s=t.wheelDelta/120}if(t.detail){s=-t.detail/3}// New school multidimensional scroll (touchpads) deltas
r=s;// Gecko
if(t.axis!==undefined&&t.axis===t.HORIZONTAL_AXIS){r=0;l=s}// Webkit
if(t.wheelDeltaY!==undefined){r=t.wheelDeltaY/120}if(t.wheelDeltaX!==undefined){l=t.wheelDeltaX/120}// Add event and delta to the front of the arguments
o.unshift(i,s,l,r);return(e.event.dispatch||e.event.handle).apply(this,o)}})(jQuery);
(function(){function require(path,parent,orig){var resolved=require.resolve(path);if(null==resolved){orig=orig||path;parent=parent||"root";var err=new Error('Failed to require "'+orig+'" from "'+parent+'"');err.path=orig;err.parent=parent;err.require=true;throw err}var module=require.modules[resolved];if(!module.exports){module.exports={};module.client=module.component=true;module.call(this,module.exports,require.relative(resolved),module)}return module.exports}require.modules={};require.aliases={};require.resolve=function(path){if(path.charAt(0)==="/")path=path.slice(1);var paths=[path,path+".js",path+".json",path+"/index.js",path+"/index.json"];for(var i=0;i<paths.length;i++){var path=paths[i];if(require.modules.hasOwnProperty(path))return path;if(require.aliases.hasOwnProperty(path))return require.aliases[path]}};require.normalize=function(curr,path){var segs=[];if("."!=path.charAt(0))return path;curr=curr.split("/");path=path.split("/");for(var i=0;i<path.length;++i){if(".."==path[i]){curr.pop()}else if("."!=path[i]&&""!=path[i]){segs.push(path[i])}}return curr.concat(segs).join("/")};require.register=function(path,definition){require.modules[path]=definition};require.alias=function(from,to){if(!require.modules.hasOwnProperty(from)){throw new Error('Failed to alias "'+from+'", it does not exist')}require.aliases[to]=from};require.relative=function(parent){var p=require.normalize(parent,"..");function lastIndexOf(arr,obj){var i=arr.length;while(i--){if(arr[i]===obj)return i}return-1}function localRequire(path){var resolved=localRequire.resolve(path);return require(resolved,parent,path)}localRequire.resolve=function(path){var c=path.charAt(0);if("/"==c)return path.slice(1);if("."==c)return require.normalize(p,path);var segs=parent.split("/");var i=lastIndexOf(segs,"deps")+1;if(!i)i=0;path=segs.slice(0,i+1).join("/")+"/deps/"+path;return path};localRequire.exists=function(path){return require.modules.hasOwnProperty(localRequire.resolve(path))};return localRequire};require.register("component-transform-property/index.js",function(exports,require,module){var styles=["webkitTransform","MozTransform","msTransform","OTransform","transform"];var el=document.createElement("p");var style;for(var i=0;i<styles.length;i++){style=styles[i];if(null!=el.style[style]){module.exports=style;break}}});require.register("component-has-translate3d/index.js",function(exports,require,module){var prop=require("transform-property");if(!prop||!window.getComputedStyle){module.exports=false}else{var map={webkitTransform:"-webkit-transform",OTransform:"-o-transform",msTransform:"-ms-transform",MozTransform:"-moz-transform",transform:"transform"};var el=document.createElement("div");el.style[prop]="translate3d(1px,1px,1px)";document.body.insertBefore(el,null);var val=getComputedStyle(el).getPropertyValue(map[prop]);document.body.removeChild(el);module.exports=null!=val&&val.length&&"none"!=val}});require.register("yields-has-transitions/index.js",function(exports,require,module){exports=module.exports=function(el){switch(arguments.length){case 0:return bool;case 1:return bool?transitions(el):bool}};function transitions(el,styl){if(el.transition)return true;styl=window.getComputedStyle(el);return!!parseFloat(styl.transitionDuration,10)}var styl=document.body.style;var bool="transition"in styl||"webkitTransition"in styl||"MozTransition"in styl||"msTransition"in styl});require.register("component-event/index.js",function(exports,require,module){var bind=window.addEventListener?"addEventListener":"attachEvent",unbind=window.removeEventListener?"removeEventListener":"detachEvent",prefix=bind!=="addEventListener"?"on":"";exports.bind=function(el,type,fn,capture){el[bind](prefix+type,fn,capture||false);return fn};exports.unbind=function(el,type,fn,capture){el[unbind](prefix+type,fn,capture||false);return fn}});require.register("ecarter-css-emitter/index.js",function(exports,require,module){var events=require("event");var watch=["transitionend","webkitTransitionEnd","oTransitionEnd","MSTransitionEnd","animationend","webkitAnimationEnd","oAnimationEnd","MSAnimationEnd"];module.exports=CssEmitter;function CssEmitter(element){if(!(this instanceof CssEmitter))return new CssEmitter(element);this.el=element}CssEmitter.prototype.bind=function(fn){for(var i=0;i<watch.length;i++){events.bind(this.el,watch[i],fn)}return this};CssEmitter.prototype.unbind=function(fn){for(var i=0;i<watch.length;i++){events.unbind(this.el,watch[i],fn)}return this};CssEmitter.prototype.once=function(fn){var self=this;function on(){self.unbind(on);fn.apply(self.el,arguments)}self.bind(on);return this}});require.register("component-once/index.js",function(exports,require,module){var n=0;var global=function(){return this}();module.exports=function(fn){var id=n++;var called;function once(){if(this==global){if(called)return;called=true;return fn.apply(this,arguments)}var key="__called_"+id+"__";if(this[key])return;this[key]=true;return fn.apply(this,arguments)}return once}});require.register("yields-after-transition/index.js",function(exports,require,module){var has=require("has-transitions"),emitter=require("css-emitter"),once=require("once");var supported=has();module.exports=after;function after(el,fn){if(!supported||!has(el))return fn();emitter(el).bind(fn);return fn}after.once=function(el,fn){var callback=once(fn);after(el,fn=function(){emitter(el).unbind(fn);callback()})}});require.register("component-emitter/index.js",function(exports,require,module){module.exports=Emitter;function Emitter(obj){if(obj)return mixin(obj)}function mixin(obj){for(var key in Emitter.prototype){obj[key]=Emitter.prototype[key]}return obj}Emitter.prototype.on=Emitter.prototype.addEventListener=function(event,fn){this._callbacks=this._callbacks||{};(this._callbacks[event]=this._callbacks[event]||[]).push(fn);return this};Emitter.prototype.once=function(event,fn){var self=this;this._callbacks=this._callbacks||{};function on(){self.off(event,on);fn.apply(this,arguments)}on.fn=fn;this.on(event,on);return this};Emitter.prototype.off=Emitter.prototype.removeListener=Emitter.prototype.removeAllListeners=Emitter.prototype.removeEventListener=function(event,fn){this._callbacks=this._callbacks||{};if(0==arguments.length){this._callbacks={};return this}var callbacks=this._callbacks[event];if(!callbacks)return this;if(1==arguments.length){delete this._callbacks[event];return this}var cb;for(var i=0;i<callbacks.length;i++){cb=callbacks[i];if(cb===fn||cb.fn===fn){callbacks.splice(i,1);break}}return this};Emitter.prototype.emit=function(event){this._callbacks=this._callbacks||{};var args=[].slice.call(arguments,1),callbacks=this._callbacks[event];if(callbacks){callbacks=callbacks.slice(0);for(var i=0,len=callbacks.length;i<len;++i){callbacks[i].apply(this,args)}}return this};Emitter.prototype.listeners=function(event){this._callbacks=this._callbacks||{};return this._callbacks[event]||[]};Emitter.prototype.hasListeners=function(event){return!!this.listeners(event).length}});require.register("yields-css-ease/index.js",function(exports,require,module){module.exports={"in":"ease-in",out:"ease-out","in-out":"ease-in-out",snap:"cubic-bezier(0,1,.5,1)",linear:"cubic-bezier(0.250, 0.250, 0.750, 0.750)","ease-in-quad":"cubic-bezier(0.550, 0.085, 0.680, 0.530)","ease-in-cubic":"cubic-bezier(0.550, 0.055, 0.675, 0.190)","ease-in-quart":"cubic-bezier(0.895, 0.030, 0.685, 0.220)","ease-in-quint":"cubic-bezier(0.755, 0.050, 0.855, 0.060)","ease-in-sine":"cubic-bezier(0.470, 0.000, 0.745, 0.715)","ease-in-expo":"cubic-bezier(0.950, 0.050, 0.795, 0.035)","ease-in-circ":"cubic-bezier(0.600, 0.040, 0.980, 0.335)","ease-in-back":"cubic-bezier(0.600, -0.280, 0.735, 0.045)","ease-out-quad":"cubic-bezier(0.250, 0.460, 0.450, 0.940)","ease-out-cubic":"cubic-bezier(0.215, 0.610, 0.355, 1.000)","ease-out-quart":"cubic-bezier(0.165, 0.840, 0.440, 1.000)","ease-out-quint":"cubic-bezier(0.230, 1.000, 0.320, 1.000)","ease-out-sine":"cubic-bezier(0.390, 0.575, 0.565, 1.000)","ease-out-expo":"cubic-bezier(0.190, 1.000, 0.220, 1.000)","ease-out-circ":"cubic-bezier(0.075, 0.820, 0.165, 1.000)","ease-out-back":"cubic-bezier(0.175, 0.885, 0.320, 1.275)","ease-out-quad":"cubic-bezier(0.455, 0.030, 0.515, 0.955)","ease-out-cubic":"cubic-bezier(0.645, 0.045, 0.355, 1.000)","ease-in-out-quart":"cubic-bezier(0.770, 0.000, 0.175, 1.000)","ease-in-out-quint":"cubic-bezier(0.860, 0.000, 0.070, 1.000)","ease-in-out-sine":"cubic-bezier(0.445, 0.050, 0.550, 0.950)","ease-in-out-expo":"cubic-bezier(1.000, 0.000, 0.000, 1.000)","ease-in-out-circ":"cubic-bezier(0.785, 0.135, 0.150, 0.860)","ease-in-out-back":"cubic-bezier(0.680, -0.550, 0.265, 1.550)"}});require.register("component-query/index.js",function(exports,require,module){function one(selector,el){return el.querySelector(selector)}exports=module.exports=function(selector,el){el=el||document;return one(selector,el)};exports.all=function(selector,el){el=el||document;return el.querySelectorAll(selector)};exports.engine=function(obj){if(!obj.one)throw new Error(".one callback required");if(!obj.all)throw new Error(".all callback required");one=obj.one;exports.all=obj.all;return exports}});require.register("move/index.js",function(exports,require,module){var after=require("after-transition");var has3d=require("has-translate3d");var Emitter=require("emitter");var ease=require("css-ease");var query=require("query");var translate=has3d?["translate3d(",", 0)"]:["translate(",")"];module.exports=Move;var style=window.getComputedStyle||window.currentStyle;Move.version="0.3.2";Move.ease=ease;Move.defaults={duration:500};Move.select=function(selector){if("string"!=typeof selector)return selector;return query(selector)};function Move(el){if(!(this instanceof Move))return new Move(el);if("string"==typeof el)el=query(el);if(!el)throw new TypeError("Move must be initialized with element or selector");this.el=el;this._props={};this._rotate=0;this._transitionProps=[];this._transforms=[];this.duration(Move.defaults.duration)}Emitter(Move.prototype);Move.prototype.transform=function(transform){this._transforms.push(transform);return this};Move.prototype.skew=function(x,y){return this.transform("skew("+x+"deg, "+(y||0)+"deg)")};Move.prototype.skewX=function(n){return this.transform("skewX("+n+"deg)")};Move.prototype.skewY=function(n){return this.transform("skewY("+n+"deg)")};Move.prototype.translate=Move.prototype.to=function(x,y){return this.transform(translate.join(""+x+"px, "+(y||0)+"px"))};Move.prototype.translateX=Move.prototype.x=function(n){return this.transform("translateX("+n+"px)")};Move.prototype.translateY=Move.prototype.y=function(n){return this.transform("translateY("+n+"px)")};Move.prototype.scale=function(x,y){return this.transform("scale("+x+", "+(y||x)+")")};Move.prototype.scaleX=function(n){return this.transform("scaleX("+n+")")};Move.prototype.matrix=function(m11,m12,m21,m22,m31,m32){return this.transform("matrix("+[m11,m12,m21,m22,m31,m32].join(",")+")")};Move.prototype.scaleY=function(n){return this.transform("scaleY("+n+")")};Move.prototype.rotate=function(n){return this.transform("rotate("+n+"deg)")};Move.prototype.ease=function(fn){fn=ease[fn]||fn||"ease";return this.setVendorProperty("transition-timing-function",fn)};Move.prototype.animate=function(name,props){for(var i in props){if(props.hasOwnProperty(i)){this.setVendorProperty("animation-"+i,props[i])}}return this.setVendorProperty("animation-name",name)};Move.prototype.duration=function(n){n=this._duration="string"==typeof n?parseFloat(n)*1e3:n;return this.setVendorProperty("transition-duration",n+"ms")};Move.prototype.delay=function(n){n="string"==typeof n?parseFloat(n)*1e3:n;return this.setVendorProperty("transition-delay",n+"ms")};Move.prototype.setProperty=function(prop,val){this._props[prop]=val;return this};Move.prototype.setVendorProperty=function(prop,val){this.setProperty("-webkit-"+prop,val);this.setProperty("-moz-"+prop,val);this.setProperty("-ms-"+prop,val);this.setProperty("-o-"+prop,val);return this};Move.prototype.set=function(prop,val){this.transition(prop);this._props[prop]=val;return this};Move.prototype.add=function(prop,val){if(!style)return;var self=this;return this.on("start",function(){var curr=parseInt(self.current(prop),10);self.set(prop,curr+val+"px")})};Move.prototype.sub=function(prop,val){if(!style)return;var self=this;return this.on("start",function(){var curr=parseInt(self.current(prop),10);self.set(prop,curr-val+"px")})};Move.prototype.current=function(prop){return style(this.el).getPropertyValue(prop)};Move.prototype.transition=function(prop){if(!this._transitionProps.indexOf(prop))return this;this._transitionProps.push(prop);return this};Move.prototype.applyProperties=function(){for(var prop in this._props){this.el.style.setProperty(prop,this._props[prop],"")}return this};Move.prototype.move=Move.prototype.select=function(selector){this.el=Move.select(selector);return this};Move.prototype.then=function(fn){if(fn instanceof Move){this.on("end",function(){fn.end()})}else if("function"==typeof fn){this.on("end",fn)}else{var clone=new Move(this.el);clone._transforms=this._transforms.slice(0);this.then(clone);clone.parent=this;return clone}return this};Move.prototype.pop=function(){return this.parent};Move.prototype.reset=function(){this.el.style.webkitTransitionDuration=this.el.style.mozTransitionDuration=this.el.style.msTransitionDuration=this.el.style.oTransitionDuration="";return this};Move.prototype.end=function(fn){var self=this;this.emit("start");if(this._transforms.length){this.setVendorProperty("transform",this._transforms.join(" "))}this.setVendorProperty("transition-properties",this._transitionProps.join(", "));this.applyProperties();if(fn)this.then(fn);after.once(this.el,function(){self.reset();self.emit("end")});return this}});require.alias("component-has-translate3d/index.js","move/deps/has-translate3d/index.js");require.alias("component-has-translate3d/index.js","has-translate3d/index.js");require.alias("component-transform-property/index.js","component-has-translate3d/deps/transform-property/index.js");require.alias("yields-after-transition/index.js","move/deps/after-transition/index.js");require.alias("yields-after-transition/index.js","move/deps/after-transition/index.js");require.alias("yields-after-transition/index.js","after-transition/index.js");require.alias("yields-has-transitions/index.js","yields-after-transition/deps/has-transitions/index.js");require.alias("yields-has-transitions/index.js","yields-after-transition/deps/has-transitions/index.js");require.alias("yields-has-transitions/index.js","yields-has-transitions/index.js");require.alias("ecarter-css-emitter/index.js","yields-after-transition/deps/css-emitter/index.js");require.alias("component-event/index.js","ecarter-css-emitter/deps/event/index.js");require.alias("component-once/index.js","yields-after-transition/deps/once/index.js");require.alias("yields-after-transition/index.js","yields-after-transition/index.js");require.alias("component-emitter/index.js","move/deps/emitter/index.js");require.alias("component-emitter/index.js","emitter/index.js");require.alias("yields-css-ease/index.js","move/deps/css-ease/index.js");require.alias("yields-css-ease/index.js","move/deps/css-ease/index.js");require.alias("yields-css-ease/index.js","css-ease/index.js");require.alias("yields-css-ease/index.js","yields-css-ease/index.js");require.alias("component-query/index.js","move/deps/query/index.js");require.alias("component-query/index.js","query/index.js");if(typeof exports=="object"){module.exports=require("move")}else if(typeof define=="function"&&define.amd){define(function(){return require("move")})}else{this["move"]=require("move")}})();
