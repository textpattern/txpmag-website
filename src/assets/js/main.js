(function ()
{
    'use strict';

    requirejs.config({
        paths:
        {
            'jquery': '//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min',
            'jqueryui': '//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min',
            'flowplayer': 'flowplayer/flowplayer.min'
        },
        shim:
        {
            'details': ['jquery'],
            'placeholder': ['jquery'],
            'flowplayer': ['jquery'],
            'cookie': ['jquery'],
            'jqueryui': ['jquery']
        }
    });

    define('modernizr', function ()
    {
        return window.Modernizr;
    });

    require(['jquery', 'details'], function ($)
    {
        $('details').details();
        $('html').addClass($.fn.details.support ? 'details' : 'no-details');
    });

    require(['jquery', 'placeholder'], function ($)
    {
        $('input, textarea').placeholder();
    });

    require(['prettify'], function ()
    {
        prettyPrint();
    });

    // Hack-fix for the iOS orientationchange zoom bug (NOTE: fixed in iOS 6).

    require(['jquery'], function ($)
    {
        var meta = $('meta[name=viewport]'), scales = [1, 1], fix = function ()
        {
            meta.attr('content', 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1]);
        };

        fix();
        scales = [0.25, 1.6];
        $(document).one('gesturestart', fix);
    });

    require(['jquery', 'modernizr'], function ($, Modernizr)
    {
        // Hide address bar on mobile devices (except if #hash present, so we don't mess up deep linking).

        if (Modernizr.touch && !window.location.hash)
        {
            $(window).load(function ()
            {
                if ($(window).scrollTop() < 20)
                {
                    window.scrollTo(0, 1);
                }
            });
        }

        // Test for SVG support via Modernizr, if yes then replace PNGs with SVGs.

        if (Modernizr.svg)
        {
            $('img.svg').attr('src', function ()
            {
                return $(this).attr('src').replace('.png', '.svg');
            });
        }
    });

    // Responsive navigation.

    require(['responsivenav'], function ()
    {
        responsiveNav('#nav', {
            animate: true,
            transition: 400,
            label: 'Menu',
            insert: 'before',
            customToggle: '',
            openPos: 'relative',
            jsClass: 'js'
        });
    });

    // EU-cookie disclaimer.

    require(['jquery', 'cookie'], function ($)
    {
        if (!$.cookie('acceptedCookies'))
        {
            var disclaimer = $('<aside id="cookie-disclaimer"><div class="container"><p><strong>This website uses cookies to enhance your experience.</strong> By continuing to use this website you agree to cookies being placed on your computer. If you wish to use this website but do not wish for cookies to be placed on your computer you can change the settings in your internet browser. <a href="#" data-action="close">Close</a>.</p></div></aside>');
            $('body').prepend(disclaimer);
            $.cookie('acceptedCookies', 1, {expires: 1461});

            disclaimer.find('a').click(function (e)
            {
                e.preventDefault();

                disclaimer.slideUp('fast', function ()
                {
                    disclaimer.remove();
                });
            });
        }
    });

    // Flowplayer.

    require(['jquery'], function ($)
    {
        var player = $('.videoplayer');

        if (player.length)
        {
            require(['flowplayer'], function ()
            {
                player.flowplayer({
                    splash: true,
                    ratio: 0.417
                });
            });
        }
    });

    // Disqus.

    require(['jquery'], function ($)
    {
        if ($('#disqus_thread').length)
        {
            require(['//txpmag.disqus.com/embed.js']);
        }
    });

    // Social buttons.

    require(['jquery'], function ($)
    {
        if ($('.twitter-share-button').length)
        {
            require(['https://platform.twitter.com/widgets.js']);
        }
    });

    // Analytics.

    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-26074605-2']);
    _gaq.push(['_setDomainName', 'none']);
    _gaq.push(['_trackPageview']);
    require(['https://www.google-analytics.com/ga.js']);

})();