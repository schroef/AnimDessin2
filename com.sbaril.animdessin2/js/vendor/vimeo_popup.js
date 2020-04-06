$(document).ready(function () {
    $('.play-video').click(function (ev) {
        $('#thevideo').css('display', 'block');
        setTimeout(function () {
            $('.popup').addClass('active');
        }, 100);

        var youtube_url = $(this).attr('data-youtubeurl');
        // <iframe src="https://player.vimeo.com/video/293905562" width="720" height="480" frameborder="0"
        //     allow="autoplay; fullscreen" allowfullscreen></iframe>
        // <p></p>
        $('#videoPlyr').replaceWith('<iframe id="videoPlyr" class="mbr-embedded-video" src="https://player.vimeo.com/video/' + youtube_url + '?rel=1&autoplay=1" width="1280" height="720" frameborder="0" allowfullscreen="allowFullScreen" style="max-width: 90%;max-height: 65%; "></iframe>');
        // $('#video').replaceWith('<iframe class="mbr-embedded-video" id="video" src="https://www.youtube.com/embed/' + youtube_url + '?rel=1&autoplay=1" width="1280" height="720" frameborder="0" allowfullscreen="allowFullScreen" style="max-width: 90%; height: 90%;"></iframe>');
        ev.preventDefault();
        // toggleGuide("video");
    });
    $(".popup").click(function(ev) {
        var youtube_url = $(this).attr('data-youtubeurl');

        $('.popup').removeClass('active');
        setTimeout(function() {
            $('#thevideo').css('display', 'none');
        }, 400);
        
        $('#videoPlyr').replaceWith('<iframe id="videoPlyr" class="mbr-embedded-video" src="https://www.youtube.com/embed/' + youtube_url + '?rel=1&autoplay=1" width="1280" height="720" frameborder="0" allowfullscreen="allowFullScreen" style="max-width: 100% !important; height: 100% !important;"></iframe>');
        ev.preventDefault();
        // toggleGuide("guide");
    });
});

