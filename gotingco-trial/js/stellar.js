$(window).load(function(){
    if(!isMobile.any()) { // Enable Parallax backgrounds for non-mobile
        // Required for smoother parallax backgrounds
        $('.slides').addClass('desktop-slides');
        $('.slide').addClass('fixed-background');

        //initialise Stellar Parallax
        $.stellar({
            positionProperty: 'transform',
            hideDistantElements: true,
            horizontalScrolling: false,
            parallaxElements: false
        });
    }
});
