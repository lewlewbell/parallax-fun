;
/** @namespace */
var nz     = nz || {};
    nz.ffx = nz.ffx || {};

(function ($) {

    // Social
    var SocialDesktop = {

        social: '',

        init: function(social, socialStoryContent) {
            var _this = this;
            var mqDesktop = 960;
            var $window = $(window);
            var $container = social.find('.social__bar-container');

            this.social = social;

            // We need to get a list of the classes on a given element
            // so that we can use them as a selector.
            $.fn.classNames = function() {
                var classNames = this[0].className.split(/\s+/);
                return classNames.map(function(className){
                    return '.' + className;
                }).join('');
            };

            social.find('[class*="icon--before"].u-toggle').on('click', function(){
                // Toggle all elements which have the same class names as
                // the current element.
                social.find( $(this).classNames() ).toggleClass('u-active');
            });

            // Our target element .social--fixed always starts off hidden.
            var socialFixedTop = false;
            var scrollHandler = function (e) {
                if (!socialFixedTop && $window.scrollTop() > social.offset().top) {

                    // Fixed the social bar to the top of the viewport.
                    $container.addClass('social__bar-container--fixed-top');

                    if (window.matchMedia('screen and (min-width:' + mqDesktop +'px)').matches) {
                        // get the width of the container element
                        var width = $container.parent().width();
                        $container.css({ 'width': width });

                        $container.removeClass('social__bar-container--full-width');

                        // Fade out the byline
                        socialStoryContent.velocity('fadeOut', 100, 'linear');
                    } else {
                        // make container full width
                        $container.css({ 'width': '100%' });
                        $container.addClass('social__bar-container--full-width');

                        // Hide the byline straight away, to avoid the social bar wrapping to two lines on narrow screens
                        socialStoryContent.hide();
                    }



                    socialFixedTop = true;
                }
                if (socialFixedTop && $window.scrollTop() < social.offset().top) {
                    // Unfix the social bar from the top of the viewport.
                    $container.removeClass('social__bar-container--fixed-top');

                    $container.css({'width':'auto'});

                    // Fade in the byline
                    socialStoryContent.velocity('fadeIn', 100, 'linear');

                    socialFixedTop = false;
                }
            }

            // Our DOM elements
            var scroller = $window;

            // Bind our scroll handler
            if (scroller) {
                scroller.on('scroll.social.desktop', scrollHandler);
            }

            // When the browser window resizes, reposition the scroll bar
            enquire.register('screen and (min-width:' + mqDesktop +'px)', {
                match : function() {
                    socialFixedTop = false;
                    $(window).trigger('scroll');
                },

                unmatch : function() {
                    socialFixedTop = false;
                    $(window).trigger('scroll');
                }
            });

            // Handle clicks on the social more button.
            // This involves animating in the hidden buttons from the right
            // and revealing them.
            // Note that we need to change the z-index of social-right to ensure
            // that its first icon sits on top of the more button.
            social.find('.icon--before--more').one('click', function() {
                $('.social--right')
                    .css({'z-index': 1})
                    .velocity({ 'margin-right': '0' }, { duration: 100 })
                    .velocity('fadeIn', { duration: 100 });

                social.find('.icon--before--more')
                    .velocity({'opacity': 0}, { duration: 100 });
            });

            // Initialise the comment count if comments exist

/*
            try {
                if (nz.ffx.GigyaStuff) {
                    var that = this;
                    nz.ffx.GigyaStuff().getCommentCount(function(count) {
                        that.comments(count);
                    });
                }
            } catch (e) {
                console.log(e.message);
            }
*/
        },

        abbreviateComments: function (value) {
            var newValue = value;
            if (value >= 1000) {
                var suffixes = ["", "k", "m", "b","t"];
                var suffixNum = Math.floor( (""+value).length/3 );
                var shortValue = '';
                for (var precision = 2; precision >= 1; precision--) {
                    shortValue = parseFloat( (suffixNum != 0 ? (value / Math.pow(1000,suffixNum) ) : value).toPrecision(precision));
                    var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');
                    if (dotLessShortValue.length <= 2) { break; }
                }
                var newValue = shortValue+suffixes[suffixNum];
            }
            return newValue;
        },

        comments : function (total) {
            // Set the comments count
            this.social.find('.icon--before--comment span').html( this.abbreviateComments(total) );
        }

    }

    //attach SocialDesktop to the nz.ffx namespace.
    nz.ffx.SocialDesktop = SocialDesktop;

}) ($);

;
/** @namespace */
var nz     = nz || {};
    nz.ffx = nz.ffx || {};

(function ($) {

    // Social
    var SocialMobile = {

        social: '',

        init: function(social) {

            this.social = social;

            // Handle clicks on the social more button.
            // This involves animating in the hidden buttons from the right
            // (on desktop) or below (on mobile) and revealing them.
            social.find('.icon--before--more').on('click', function(){

                if ($(this).hasClass('icon--before--more')) {

                    $(this).closest('.social').velocity({
                        height: '112px',
                        'margin-bottom': '8px'
                    });

                    social.find('.icon--before--more')
                        .removeClass('icon--before--more')
                        .addClass('icon--before--close-round');
                } else {

                    $(this).closest('.social').velocity({
                        height: '56px',
                        'margin-bottom': 0
                    });

                    social.find('.icon--before--close-round')
                        .removeClass('icon--before--close-round')
                        .addClass('icon--before--more');
                }
            });

            social.find('[class*="icon--before"].u-toggle').on('click', function(){
                $(this).toggleClass('u-active');
            });

            // Our JS media queries.
            // Amongst other things, we need to handle screen orientation changes.

            enquire.register("screen and (max-width: 471px)", {
                match : function() {
                    if ( !social.find('.icon--before--comment').length ) {
                        if ( social.find('.icon--before--close-round').length ) {
                            social.css({
                                height: '112px',
                                'margin-bottom': '8px'
                            });
                        }
                    }
                }
            });

            // If the comments icon is not present, then we can remove the 'more'
            // button and show the last social icon at a smaller breakpoint (8 icons wide).
            enquire.register("screen and (min-width: 472px)", {
                match : function() {
                    if ( !social.find('.icon--before--comment').length ) {

                        social.find('.icon--before--more, .icon--before--close-round')
                            .addClass('is-hidden');

                        social.css({
                            height: '64px',
                            'margin-bottom': 0
                        });
                    }
                },
                unmatch : function() {
                    if ( !social.find('.icon--before--comment').length ) {

                        social.find('.icon--before--more, .icon--before--close-round')
                            .removeClass('is-hidden');

                    }
                }
            });

            enquire.register("screen and (max-width: 527px)", {
                match : function() {
                    if ( social.find('.icon--before--comment').length ) {
                        if ( social.find('.icon--before--close-round').length ) {
                            social.css({
                                height: '112px',
                                'margin-bottom': '8px'
                            });
                        }
                    }
                }
            });

            // If the comments icon is present, then we remove the 'more' button and
            // show the last social icon at a larger breakpoint (9 icons wide).
            enquire.register("screen and (min-width: 528px)", {
                match : function() {
                    if ( social.find('.icon--before--comment').length ) {

                        social.find('.icon--before--more, .icon--before--close-round')
                            .addClass('is-hidden');

                        social.css({
                            height: '64px',
                            'margin-bottom': 0
                        });

                    }
                },
                unmatch : function() {
                    if ( social.find('.icon--before--comment').length ) {
                        social.find('.icon--before--more, .icon--before--close-round')
                            .removeClass('is-hidden');
                    }
                }
            });

        },

        abbreviateComments: function (value) {
            var newValue = value;
            if (value >= 1000) {
                var suffixes = ["", "k", "m", "b","t"];
                var suffixNum = Math.floor( (""+value).length/3 );
                var shortValue = '';
                for (var precision = 2; precision >= 1; precision--) {
                    shortValue = parseFloat( (suffixNum != 0 ? (value / Math.pow(1000,suffixNum) ) : value).toPrecision(precision));
                    var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');
                    if (dotLessShortValue.length <= 2) { break; }
                }
                var newValue = shortValue+suffixes[suffixNum];
            }
            return newValue;
        },

        comments : function (total) {
            // Set the comments count
            this.social.find('.icon--before--comment span').html( this.abbreviateComments(total) );
        }

    };

    //attach SocialMobile to the nz.ffx namespace.
    nz.ffx.SocialMobile = SocialMobile;

}) ($);

;
/** @namespace */
var nz     = nz || {};
    nz.ffx = nz.ffx || {};

(function ($) {

    // Share
    var Share = (function() {

        var config = {
            winWidth: 520,
            winHeight: 350
        };

/*
        // Load Facebook SDK
        window.fbAsyncInit = function() {
        FB.init({
            appId      : '822353077836177',
            xfbml      : true,
            version    : 'v2.2'
        });
        };

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
*/

        function _open(socialNetowork, url, winWidth, winHeight, scrollbars) {
            var winTop = (screen.height / 2) - (winHeight / 2);
            var winLeft = (screen.width / 2) - (winWidth / 2);
            scrollbars = scrollbars ? '1' : '0';

            window.open(url, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight + ',scrollbars=' + scrollbars);
            
            // Omniture analytics fired when social share is clicked
            s.eVar22=socialNetowork;
            s.events = s.apl(s.events,"event18",",",1);
            s.linkTrackVars='events,eVar22';
            s.linkTrackEvents='event18';
            s.tl(this,'o','Share social clicked');
        }

        function facebook(href, text, summary, appId) {

            // The newer dialog/feed api has the problem of canceling causing the compulsorry redirect_uri
            // to load in the popup, rather than the popup closing.
            //var url = 'https://www.facebook.com/dialog/feed?app_id=207633159308175&display=popup&caption=' + text + '&link=' + href + '&redirect_uri=' + href;

/*
            // The even newer FB.ui SDK causes an error -- possibly something to do with our app id not being set up correctly
            FB.ui({
                method: 'feed',
                link: href,
                caption: text,
            }, function(response){});
*/
            // Default to our dummy app id if one is not supplied.
            appId = appId || '822353077836177';
            var url = 'https://www.facebook.com/sharer/sharer.php?app_id=' + appId + '&sdk=joey&u=' + encodeURIComponent(href) + '&display=popup&ref=plugin';
            _open('Facebook', url, config.winWidth, config.winHeight);

        }

        function twitter(href, text, summary) {
            var url = 'https://twitter.com/intent/tweet?original_referer=' + encodeURIComponent(href) + '&url=' + encodeURIComponent(href) + '&text=' + encodeURIComponent(text);
            _open('Twitter', url, config.winWidth, 490);
        }

        function linkedin(href, text, summary) {
            var url = 'https://www.linkedin.com/shareArticle?url=' + encodeURIComponent(href) + '&mini=true&title=' + encodeURIComponent(text) + '&ro=false&summary=' + encodeURIComponent(summary);
            _open('Linkedin', url, 580, 530);
        }

        function googleplus(href, text, summary) {
            var url = 'https://plus.google.com/share?url=' + encodeURIComponent(href);
            _open('Google Plus', url, config.winWidth, 525, true);
        }

        function reddit(href, text, summary) {
            var url = 'https://www.reddit.com/submit?url=' + encodeURIComponent(href);
            _open('Reddit', url, 880, 820, true);
        }

        function whatsapp(href, text, summary) {
            var url = 'whatsapp://send?text=' + text + ' ' + encodeURIComponent(href);
            window.location = url;
        }

        function comment(href, text, summary) {
            window.location = href;
        }

        return {
            'facebook'  : facebook,
            'twitter'   : twitter,
            'linkedin'  : linkedin,
            'googleplus': googleplus,
            'reddit'    : reddit,
            'whatsapp'  : whatsapp,
            'comment'   : comment
        };
    })();

    //attach Share to the nz.ffx namespace.
    nz.ffx.Share = Share;

}) ($);

;
'use strict';

(function () {

    // We can only call this component when layout is complete,
    // otherwise we'll end up with the bar fixed to the top.
    $(document).ready(function(){
        nz.ffx.SocialDesktop.init($('.social-desktop'), $('.social__story-content'));
        // To set the comment count (prettified), use something like the following
        // nz.ffx.SocialDesktop.comments('8940');
    });

    $(document).ready(function(){
        nz.ffx.SocialMobile.init($('.social-mobile'));
        // To set the comment count (prettified), use something like the following
        // nz.ffx.SocialDesktop.comments('8940');
    });

    // Add a classname if media queries are not supported
    // This is mainly for IE8 fallbacks
    if (!Modernizr.mq('only all')) {
        document.documentElement.className += " no-mq";
    }
})()
