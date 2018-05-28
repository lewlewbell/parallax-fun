function waypoints() {
    setTimeout(function(){
        /* Automatic video playback */
        if(autoplay===true && !isMobile.any()) { /* Waypoints will only be used if autoplay is not disabled by the browser, and the screen width is 1024px or larger */
            $('.video').waypoint(function (direction) {
                var currentVideo = $(this).attr('id'); /* When class name is reached, get it's ID */
                if (direction==='down') {
                    document.getElementById(currentVideo).play(); /* Use the ID to pinpoint and play the audio file */
                }
            }, { offset: '5%', triggerOnce: true });
            $('.video').waypoint(function (direction) {
                var currentVideo = $(this).attr('id');
                if (direction==='down') {
                    document.getElementById(currentVideo).pause();
                }
            }, { offset: '-80%', triggerOnce: true });
        }else{ /* If waypoints is not used, controls are added for user to initialise video manually */
            $('.video').attr('poster', 'images/gotingco-trial-video-placeholder-map.jpg'); // An empty space on videos looks odd when they don't autoplay. Added a nice poster for when they default to manual play.
        }
    }, 4000);
}