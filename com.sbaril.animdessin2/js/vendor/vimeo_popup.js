$(document).ready(function () {
    $('.play-video').click(function (ev) {
        $('#thevideo').css('display', 'block');
        setTimeout(function () {
            $('.popup').addClass('active');
        }, 100);

        var videoId = $(this).attr('data-youtubeurl');
        
        //Vimeo
        $('#videoPlyr').replaceWith('<iframe id="videoPlyr" class="mbr-embedded-video" src="https://player.vimeo.com/video/' + videoId + '?rel=1&autoplay=1" width="1280" height="720" frameborder="0" allowfullscreen="allowFullScreen" style="max-width: 90%;max-height: 65%; "></iframe>');
        
        // Youtube ISSUE with playback WIP
        // "https://www.youtube.com/embed/l1-LN2NlB54?autoplay=false&cc_load_policy=0&controls=1&disablekb=0&fs=1&iv_load_policy=1&modestbranding=0&playsinline=0&rel=0&showinfo=1&enablejsapi=1&origin=https%3A%2F%2Fwww.schoolofmotion.com&widgetid=1"
        // $('#videoPlyr').replaceWith('<iframe class="mbr-embedded-video" id="videoPlyr" src="https://www.youtube.com/embed/' + videoId + '?rel=1&autoplay=1" width="1280" height="720" frameborder="0" allowfullscreen="allowFullScreen" style="max-width: 90%; height: 90%;"></iframe>');
        // $('#videoPlyr').replaceWith('<iframe class="mbr-embedded-video" id="videoPlyr" src="https://www.youtube.com/embed/' + videoId + '?autoplay=false" width="1280" height="720" frameborder="0" allowfullscreen="allowFullScreen" style="max-width: 90%; height: 90%;"></iframe>');
        // $('#videoPlyr').replaceWith('<iframe class="mbr-embedded-video" id="videoPlyr" src="https://www.youtube.com/embed/l1-LN2NlB54?autoplay=false&enablejsapi=1&origin=1&playsinline=1" width="1280" height="720" frameborder="0" allowfullscreen="1" allow="autoplay; rel;" style="max-width: 90%; height: 90%;" ></iframe>');
        // $('#videoPlyr').replaceWith('<iframe class="mbr-embedded-video" id="videoPlyr" src="https://www.youtube.com/embed/l1-LN2NlB54?autoplay=false&amp;cc_load_policy=0&amp;controls=1&amp;disablekb=0&amp;fs=1&amp;iv_load_policy=1&amp;modestbranding=0&amp;playsinline=0&amp;rel=0&amp;showinfo=1&amp;enablejsapi=1&amp;origin=https%3A%2F%2Fwww.schoolofmotion.com&amp;widgetid=1" width="1280" height="720" frameborder="0" allowfullscreen="1" allow="autoplay" style="max-width: 90%; height: 90%;" ></iframe>');
        ev.preventDefault();

    });
    $(".popup").click(function(ev) {
        var videoId = $(this).attr('data-youtubeurl');

        $('.popup').removeClass('active');
        setTimeout(function() {
            $('#thevideo').css('display', 'none');
        }, 400);
        
        $('#videoPlyr').replaceWith('<iframe id="videoPlyr" class="mbr-embedded-video" src="https://www.youtube.com/embed/' + videoId + '??autoplay=false&enablejsapi=1&origin=1&playsinline=1" width="1280" height="720" frameborder="0" allowfullscreen="allowFullScreen" style="max-width: 90%;max-height: 65%; "></iframe>f');
        ev.preventDefault();
    });
});

