/*! This file uses the yepnope conditional loader (a component of Modernizr) - more info: http://yepnopejs.com */

yepnope.errorTimeout = 4000; // set to 4 second error timeout

// these can be executed asynchronously
yepnope([
	{
		// load essential plugins
		load: [
			'/js/plugins.min.js',
			'/js/polyfills/jquery.details.min.js',
			'/js/polyfills/jquery.placeholder.min.js',
			'/js/vendor/google-code-prettify/prettify.min.js'
		],
		complete: function (url, res, key) {
			jQuery(function() { // start DOM ready


				// hide address bar on mobile devices (except if #hash present, so we don't mess up deep linking)
				if (Modernizr.touch && !window.location.hash) {
					$(window).load(function () {
						setTimeout(function () {
							// at load, if user hasn't scrolled more than 20px or so...
							if ($(window).scrollTop() < 20) {
								window.scrollTo(0, 1);
							}
						}, 0);
					});
				}


				// initiate Responsive-Nav.js
				var navigation = responsiveNav("#nav", {
					animate: true,       // Boolean: Use CSS3 transitions, true or false
					transition: 400,     // Integer: Speed of the transition, in milliseconds
					label: "Menu",       // String: Label for the navigation toggle
					insert: "before",     // String: Insert the toggle before or after the navigation
					customToggle: "",    // Selector: Specify the ID of a custom toggle
					openPos: "relative", // String: Position of the opened nav, relative or static
					jsClass: "js"        // String: 'JS enabled' class which is added to <html> el
				});


				// display cookie disclaimer on first visit
				if ($.cookie('acceptedCookies') != 1) {
					$('body').prepend('<aside id="cookie-disclaimer"><div class="container"><p><strong>This website uses cookies to enhance your experience.</strong> By continuing to use this website you agree to cookies being placed on your computer. If you wish to use this website but do not wish for cookies to be placed on your computer you can change the settings in your internet browser. <a href="#" data-action="close">Close</a>.</p></div></aside>');
					// show disclaimer
					$('#cookie-disclaimer').css('display', 'block');
					// mark disclaimer as viewed, keep cookie for 4 years (1461 days)
					$.cookie('acceptedCookies', 1, { expires: 1461 });
					// close button
					$('[data-action="close"]').click(function () {
						$('#cookie-disclaimer').slideUp('fast');
						return false;
					});
				}


				// test for SVG support via Modernizr, if yes then replace PNGs with SVGs
				if (Modernizr.svg) {
					$('img.svg').attr('src', function () {
						return $(this).attr('src').replace('.png', '.svg');
					});
				}


				// test for HTML5 details/summary tag support, use polyfill fallback
				$('details').details();
				// add conditional classname based on support
				$('html').addClass($.fn.details.support ? 'details' : 'no-details');


				// test for HTML5 form placeholder attribute support, use polyfill fallback
				$('input, textarea').placeholder();


				// Google+ '+1' button
				window.___gcfg = {lang: 'en-GB'};
				(function () {
					var po = document.createElement('script');
					po.async = true;
					po.src = 'https://apis.google.com/js/plusone.js';
					var s = document.getElementsByTagName('script')[0];
					s.parentNode.insertBefore(po, s);
				})();


				// Twitter 'tweet' button
				!function (d, s, id) {
					var js, fjs = d.getElementsByTagName(s)[0];
					if (!d.getElementById(id)) {
						js = d.createElement(s);
						js.id = id;
						js.src = 'https://platform.twitter.com/widgets.js';
						fjs.parentNode.insertBefore(js, fjs);
					}
				}
				(document, 'script', 'twitter-wjs');


				// make code pretty
				window.prettyPrint && prettyPrint();


			}); // end DOM ready
		}
	}
]);


// these need to wait for DOM ready
$(function () { // start DOM ready

	yepnope([
		{
			// Flowplayer
			load: [
				'/js/vendor/flowplayer/skin/minimalist.css', // Options: functional.css, minimalist.css, playful.css
				'/js/vendor/flowplayer/flowplayer.min.js'
			],
			complete: function (url, res, key) {
				$('.videoplayer').flowplayer({
					splash: 'true',
					ratio: 0.417
				});
			}
		}
	]);

}); // end DOM ready
