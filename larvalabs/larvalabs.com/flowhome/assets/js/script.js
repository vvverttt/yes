var FH = {};

// FH Settings
FH.settings = {

    // time to wait for the second image to appear
    waitForImage: '800'
};

// FH Helper Functions
FH.helpers = (function () {

    var $window = $(window),
        windowHeight = $window.height();

    $window.resize(function () {
        //re calculate window's height
        windowHeight = $window.height();
    });    

    function whichTransitionEvent() {
        var t;
        var el = document.createElement('fakeelement');
        var transitions = {
          'animation':'animationend',
          'OAnimation':'oAnimationEnd',
          'MozAnimation':'animationend',
          'WebkitAnimation':'webkitAnimationEnd'
        }

        for(t in transitions){
            if( el.style[t] !== undefined ){
                return transitions[t];
            }
        }
    };

    function runAnimationOnScrollPos($el, callback, offset) {
        if (typeof offset === 'undefined') {
            offset = 0;
        }
        var funExecuted = false,
            elPos       = $el.offset().top + offset;

        $window.scroll(function () {
            var windowPos = $window.scrollTop() + (windowHeight / 2);

            if(windowPos >= elPos && !funExecuted) {

                console.log(elPos);

                callback();
                funExecuted = true;
            }
        });

    };

    return {
        selectTransition: whichTransitionEvent,
        runAnimationOnScrollPos: runAnimationOnScrollPos
    }

})();

// Magnific
FH.magnific = (function ($, global) {

    return {
        init: function () {
            $('.home_video-link').magnificPopup({
                type: 'iframe'
            });
        }
    }

})(jQuery, window);

// scroll module

FH.scroll = (function ($, global, skrollr) {

    var scroller       = $('#js-navigator'),
        menu           = $('#navigator'),
        startButton    = $('#arrow-continue'),
        dotsNav        = $('#fh-dot-navigation'),
        dotsNavList    = dotsNav.find('li'),
        returnObj      = {};


    function menuDetach() {
        menu.addClass('navigator_navigation--floating');
    }
    function menuAttach() {
        menu.removeClass('navigator_navigation--floating');
        // startButton.removeClass('hidden'); // show arrow button again
    }
    function goToSlide (event) {
        event.preventDefault();
        var page = parseInt($(event.target).data('goto'));
        pageScroller.goTo(page);

        // $(this).toggleClass('hidden');
    }
    function updateDots() {
        var page = menu.find('.active a').data('goto');
        // update dot
        dotsNavList.removeClass('active');
        dotsNavList.eq(page-1).addClass('active');
    }
    function init() {

        $(window).scroll(function () {

            // debugging - turn this off!
            //console.log($(window).scrollTop());

            var scrollPos = $(this).scrollTop();
            if (scrollPos > 70) {
                FH.scroll.menuDetach();
            } else {
                FH.scroll.menuAttach();
            }
        });

        startButton.on('click', FH.scroll.goToSlide);

        scroller.pageScroller({
            navigation: '.js-navigator_nav',
            onChange: FH.scroll.updateDots
        });

        dotsNav.on('click', 'a', FH.scroll.goToSlide);
    }

    returnObj = {
        init: init,
        menuDetach: menuDetach,
        menuAttach: menuAttach,
        goToSlide:  goToSlide,
        updateDots: updateDots
    }

    // store a reference to skroller to be used across
    // all scroll modules
    if ($(window).width() > 768) {
        returnObj.skrollr = skrollr.init();
    }
    

    return returnObj;

})(jQuery, window, skrollr);

FH.startAnimation = (function ($, global, helpers) {

    var $homeSection      = $('#home-section'),
        $startAnimationEl = $('.js-start-animation'),
        $phone            = $('#phone-container'),
        $homeLink         = $('#home-link');

    function init() {

        // wait for images and then trigger main animation
        $homeSection.waitForImages(function () {

            var transitionEnd = helpers.selectTransition();
            $startAnimationEl.addClass('start-animation-kick');

            // check when it's done!

            $startAnimationEl.eq(1).on(transitionEnd, function () {
                $homeLink.addClass('pumpit');
            });

        });

        // show phone
        $phone.waitForImages(function () {
            var img = $(this).children();
            img.addClass('show');
        });
    };

    return {
        init: init
    }

})(jQuery, window, FH.helpers);

// one place section

FH.scroll.onePlace = (function ($, global, helpers){

    var $window              = $(global),
        transitionEnd = helpers.selectTransition(),
        $onePlaceSec         = $('#one-place-section'),
        $imageWrapper        = $onePlaceSec.find('.one-place_main-img-wrapper'),
        animationStarted     = false;

        init = function () {

            FH.helpers.runAnimationOnScrollPos($onePlaceSec, function () {
               
                    $onePlaceSec.addClass('one-place--animated').on(transitionEnd, function () {
                    
                    setTimeout(function () {
                        $imageWrapper.addClass('one-place_main-img-wrapper--animated');
                    }, FH.settings.waitForImage);

                });
            });
        };

    return {
        init: init
    }

})(jQuery, window, FH.helpers);

// easy to use section

FH.scroll.easy = (function ($, global, helpers){

    var $window              = $(global),
        transitionEnd        = helpers.selectTransition(),
        $sec                 = $('#easy-section'),
        offset               = 5,
        animationStarted     = false;

        init = function () {

            FH.helpers.runAnimationOnScrollPos($sec, function () {
                $sec.addClass('easy__images-container--animate');
            }, -offset);
        };

    return {
        init: init
    }

})(jQuery, window, FH.helpers);


// personalized section

FH.scroll.personalized = (function ($, global, helpers){

    var $window              = $(global),
        transitionEnd        = helpers.selectTransition(),
        $sec                 = $('#personalized-container'),
        offset               = 5,
        animationStarted     = false;

        init = function () {

            FH.helpers.runAnimationOnScrollPos($sec, function () {
                $sec.addClass('personalize__image-container--animated');
            }, -offset);
        };

    return {
        init: init
    }

})(jQuery, window, FH.helpers);

// initialize modules
$(document).ready(function () {
    FH.scroll.init();
    FH.scroll.onePlace.init();
    FH.scroll.easy.init();
    FH.scroll.personalized.init();
    FH.startAnimation.init();
    FH.magnific.init();

    var href = location.href;
    var split = href.split("#");
    if(split[1] != null){
        if (split[1].trim() == "producthunt") {
            $('.producthunt').delay(3000).fadeIn(500);
            $('.navigator_navigation').delay(1500).addClass('navigator_navigation--with-hunted');
        }
    }

});

$(window).load(function () {
    
});
