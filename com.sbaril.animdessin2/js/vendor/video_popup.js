$(document).ready(function () {
    var csInterface = new CSInterface();
    $('.play-video').click(function (ev) {
        // TUNRED OFF
        // $('#thevideo').css('display', 'block');
        // setTimeout(function () {
        //     $('.popup').addClass('active');
        // }, 100);

        
        if ($(this).attr('data-youtubeurl')) {
            console.log("Youtube")
            var videoId = $(this).attr('data-youtubeurl');
            csInterface.openURLInDefaultBrowser("https://www.youtube.com/watch?v="+videoId);
            // $('#videoPlyr').replaceWith('<iframe id="videoPlyr" class="mbr-embedded-video" src="https://www.youtube.com/embed/' + videoId + '?autoplay=false&enablejsapi=1&origin=1&playsinline=1" width="1280" height="720" frameborder="0" allowfullscreen="allowFullScreen" style="max-width: 90%;max-height: 65%; "></iframe>');
            // $('#videoPlyr').replaceWith('<iframe id="videoPlyr" class="mbr-embedded-video" src="http://www.youtube.com/embed/' + videoId + '?autoplay=1" width="1280" height="720" frameborder="0" allowfullscreen="allowFullScreen" style="max-width: 90%;max-height: 65%; "></iframe>');
            // $('#videoPlyr').replaceWith('<iframe id="videoPlyr" class="mbr-embedded-video" src="https://www.youtube.com//embed/' + videoId + '?autoplay=false&enablejsapi=1&origin=1&playsinline=1" width="1280" height="720" frameborder="0" allowfullscreen="allowFullScreen" style="max-width: 90%;max-height: 65%; "></iframe>');
            // $('#videoPlyr').replaceWith('<iframe id="videoPlyr" class="mbr-embedded-video" src="https://www.youtube.com/embed/l1-LN2NlB54?&autoplay=1" frameborder="0" allowfullscreen="allowFullScreen" style="max-width:90%; max-height:65%; "></iframe>');
        }
        if ($(this).attr('data-vimeourl')) {
            console.log("Vimeo")
            var videoId = $(this).attr('data-vimeourl');
            csInterface.openURLInDefaultBrowser("https://www.vimeo.com/"+videoId);
            // $('#videoPlyr').replaceWith('<iframe id="videoPlyr" class="mbr-embedded-video" src="https://player.vimeo.com/video/' + videoId + '?rel=1&autoplay=1" width="1280" height="720" frameborder="0" allowfullscreen="allowFullScreen" style="max-width: 90%;max-height: 65%; "></iframe>');
        }
        
        // var videoId = $(this).attr('data-youtubeurl');
        
        //Vimeo Broken??
        // $('#videoPlyr').replaceWith('<iframe id="videoPlyr" class="mbr-embedded-video" src="https://player.vimeo.com/video/' + videoId + '?rel=1&autoplay=1" width="1280" height="720" frameborder="0" allowfullscreen="allowFullScreen" style="max-width: 90%;max-height: 65%; "></iframe>');
        
        // Youtube ISSUE with playback WIP
        // "https://www.youtube.com/embed/l1-LN2NlB54?autoplay=false&cc_load_policy=0&controls=1&disablekb=0&fs=1&iv_load_policy=1&modestbranding=0&playsinline=0&rel=0&showinfo=1&enablejsapi=1&origin=https%3A%2F%2Fwww.schoolofmotion.com&widgetid=1"
        // $('#videoPlyr').replaceWith('<iframe class="mbr-embedded-video" id="videoPlyr" src="https://www.youtube.com/embed/' + videoId + '?rel=1&autoplay=1" width="1280" height="720" frameborder="0" allowfullscreen="allowFullScreen" style="max-width: 90%; height: 90%;"></iframe>');
        // $('#videoPlyr').replaceWith('<iframe class="mbr-embedded-video" id="videoPlyr" src="https://www.youtube.com/embed/' + videoId + '?autoplay=false" width="1280" height="720" frameborder="0" allowfullscreen="allowFullScreen" style="max-width: 90%; height: 90%;"></iframe>');
        // $('#videoPlyr').replaceWith('<iframe class="mbr-embedded-video" id="videoPlyr" src="https://www.youtube.com/embed/l1-LN2NlB54?autoplay=false&enablejsapi=1&origin=1&playsinline=1" width="1280" height="720" frameborder="0" allowfullscreen="1" allow="autoplay; rel;" style="max-width: 90%; height: 90%;" ></iframe>');
        // $('#videoPlyr').replaceWith('<iframe class="mbr-embedded-video" id="videoPlyr" src="https://www.youtube.com/embed/l1-LN2NlB54?autoplay=false&amp;cc_load_policy=0&amp;controls=1&amp;disablekb=0&amp;fs=1&amp;iv_load_policy=1&amp;modestbranding=0&amp;playsinline=0&amp;rel=0&amp;showinfo=1&amp;enablejsapi=1&amp;origin=https%3A%2F%2Fwww.schoolofmotion.com&amp;widgetid=1" width="1280" height="720" frameborder="0" allowfullscreen="1" allow="autoplay" style="max-width: 90%; height: 90%;" ></iframe>');

        //Working youtube anim
        // $('#videoPlyr').replaceWith('<iframe class="mbr-embedded-video" id="videoPlyr" src="https://www.youtube.com/embed/l1-LN2NlB54?&autoplay=1" width="1280" height="720" frameborder="0" allowfullscreen="allowFullScreen" style="max-width: 90%;max-height: 65%;"></iframe>');
        ev.preventDefault();

    });
    $(".popup").click(function(ev) {
        // if ($(this).attr('data-youtubeurl')) {
        //     var videoId = $(this).attr('data-youtubeurl');
        // }
        // if ($(this).attr('data-vimeourl')) {
        //     var videoId = $(this).attr('data-vimeourl');
        // }

        $('.popup').removeClass('active');
        setTimeout(function() {
            $('#thevideo').css('display', 'none');
        }, 400);
        
        $('#videoPlyr').replaceWith('<iframe id="videoPlyr"></iframe>');
        ev.preventDefault();
    });
});
    // // Mobirise method check url to decide vimeo or youtbe 
    // var videoURL = $(this).attr('data-src');
    //             $(this).removeAttr('data-src');

    //             var parsedUrl = videoURL.match(/(http:\/\/|https:\/\/|)?(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(&\S+)?/);
    //             if (videoURL.indexOf('youtu') !== -1) {
    //                 $(this).attr('src', 'https://youtube.com/embed/' + parsedUrl[6] + '?rel=0&enablejsapi=1');
    //             } else if (videoURL.indexOf('vimeo') !== -1) {
    //                 $(this).attr('src', 'https://player.vimeo.com/video/' + parsedUrl[6] + '?autoplay=0&loop=0');
    //             }
    //         });


