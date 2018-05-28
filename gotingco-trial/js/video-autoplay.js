$(document).ready(function() {
    /* Automatic video playback */
    $('.video').waypoint(function (direction) {
        var currentVideo = $(this).attr('id'); /* When class name is reached, get it's ID */
        if (direction==="down") {
            document.getElementById(currentVideo).play(); /* Use the ID to pinpoint and play the audio file */
        }else{
            document.getElementById(currentVideo).pause();
        }
    }, { offset: '20%' })
    $('.video').waypoint(function (direction) {
        var currentVideo = $(this).attr('id');
        if (direction==="down") {
            document.getElementById(currentVideo).pause();
        }else{
            document.getElementById(currentVideo).play();
        }
    }, { offset: '-40%'})

    /* Automatic audio playback */
    $('.audio-waypoint').waypoint(function (direction) {
        var currentAudio = $(this).find('.audio').attr('id'); /* When class name is reached, get it's ID */
        if (direction==="down") {
            document.getElementById(currentAudio).play(); /* Use the ID to pinpoint and play the audio file */
        }else{
            document.getElementById(currentAudio).pause();
        }
    }, { offset: '20%' })
    $('.audio-waypoint').waypoint(function (direction) {
        var currentAudio = $(this).find('.audio').attr('id'); /* When class name is reached, get it's ID */
        if (direction==="down") {
            document.getElementById(currentAudio).pause();
        }else{
            document.getElementById(currentAudio).play();
        }
    }, { offset: '-40%'})
});