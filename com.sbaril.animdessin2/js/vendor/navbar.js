$(document).ready(function () {
    // Dirty image show fix
    // $(window).scrollTop(1);

    $("#nav-toggle").click(function () {
        $("#nav").toggleClass('opened', '');
        $("#searchbar-product").focus();
    });

    // Navbar short
    $(window).scroll(function () {
        var fromTop = $(window).scrollTop();
        if (fromTop >= 60) {
            $("#nav").addClass('short');

        } else {
            $("#nav").removeClass('short');
        }
        // Auto close search on scroll & focuse search is false
        // console.log($("#searchbar-product").is(":focus") !==false)
        if ((fromTop >= 300) && (!$("#searchbar-product").is(":focus"))){
            if ($("#nav").hasClass("opened")) {
                $("#nav-toggle").trigger("click");
                $("#searchbar-product").trigger('blur');

                $("#nav").removeClass('opened');
            }
        }
    });
});