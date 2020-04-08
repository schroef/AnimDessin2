$(document).ready(function () {
    // Dirty image show fix
    $(window).scrollTop(1);

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
        // Auto close search on scroll
        if (fromTop >= 300) {
            if ($("#nav").hasClass("opened")) {
                $("#nav-toggle").trigger("click");
                $("#searchbar-product").trigger('blur');

                $("#nav").removeClass('opened');
            }
        }
    });
});