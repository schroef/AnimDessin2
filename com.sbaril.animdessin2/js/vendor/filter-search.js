$(document).ready(function () {
    // Dirty trick plceholder to localize
    var holder = $("#placeholder").text();
    $("#searchbar-product").attr("placeholder", holder);

    if (window.location.hash) {
        var url = window.location.hash;
        $('a' + url).addClass("active").parent().addClass("active").next().show();
    }

    var noTemplate = $(".no-template");
    var inputtxt = $(".input-default");
    var resultTemplate = $(".cards");
    var resultTemplateFilter = $(".cards.filter");
    var accordionDT = $("#tools dl dt");
    var accordionDD = $("#tools dl dd");
    var searchProdTemplate = $("#search-product-template");
    var templateClose = $("#search-product-template .close-icon");
    var navToggleClose = $("#nav-toggle");

    //Close button
    templateClose.add(navToggleClose).click(function () {
        $("#searchbar-product").val("");
        // $("dl dt:first-child").removeClass("no-top-border");
        searchProdTemplate.removeClass("margin-bottom active");
        $(".cards, dt, dd, .templates-title, .Video-Title, .Video-Body, .vid-container").show();
        resultTemplate.removeClass("border-top");
        // accordionDD.hide();
        templateClose.hide();
        noTemplate.hide();
        // Dont hide navtoggle
        navToggleClose.show();
        inputtxt.show();
        accordionDT.removeClass("active border-top").children("a").removeClass("active").children(".title").next(".text-hover").remove();
    });

    //Search templates
    $("#search-product-template #searchbar-product").keyup(function (e) {
        var filter = $(this).val();
        searchProdTemplate.addClass("active margin-bottom");
        templateClose.show();
        inputtxt.hide();

        if ($("#search-product-template #searchbar-product").val().length == 0) {
            templateClose.trigger("click");
        } else {

            resultTemplate.hide();

            $("dl dt,dl dd, #videos .vid-container").each(function () {
                var parent = $(this);
                // var templateName = $(this).find(".title");
                var templateName = $(this);
                // console.log(templateName)
                var templateNameLength = templateName.text().length > 0;
                if (templateNameLength && templateName.text().search(new RegExp(filter, "i")) < 0) {
                    parent.hide();
                    parent.next().hide();
                } else {
                    resultTemplate.addClass("border-top");
                    // $("dl dt:first-child").addClass("no-top-border");
                    // templateTitle.hide();
                    resultTemplateFilter.show();
                    parent.show();
                    parent.next().show();
                    // If query found in DD also show title
                    $("dd:visible").prev().show();
                    $("dt:visible").next("dd").show();
                    // if ($("dt:visible")){
                    if (parent.is(":visible")){
                        // console.log(parent.text());
                        // parent.next().children().show();
                        // parent.find("dd").show();
                        parent.next("dd").show();
                        // $("dt:visible").next().show();
                        }
    

                    // Filters also by body tekst and show parent DT
                    // console.log(parent.prev("dd")=="dd");
                    // console.log(parent.closest(".title").find("dt"));
                    // var target = parent.closest(".title").find("dt");; //.find("dt");
                    // console.log($target.text());
                    // target.css('display','block');
                    // if (parent.prevUntil( ".title", "dt" )) {
                    // if (parent.closest(".title").find("dt")) {
                    //     parent.prev().show();
                    // }
                    // if (templateName.text().toLowerCase() == $("#search-product-template #searchbar-product").val().toLowerCase()) {
                    // 	$("dt:visible").addClass("active").next().slideDown(150);
                    // 	// if ($("dt:visible").children(".title").next(".text-hover").length == 0)
                    // 	// 	$("dt:visible").addClass("active").children(".title").after("<span class='text-hover'><span class='minus orange'>-</span> verberg templates</span>");
                    // } else {
                    // 	$("dt:visible").removeClass("active").next().hide();
                    // 	$("dt:visible").removeClass("active").children(".title").next(".text-hover").remove();
                    // }
                }
            });

        }

        if ($("#searchbar-product").val().length > 0 && $("dt:visible").length == 0 && filter && $(".vid-container:visible").length == 0 && filter) {
            noTemplate.show();
            resultTemplate.removeClass("border-top");
        } else {
            noTemplate.hide();
        }
    });

    $("#searchbar span.input-default").text("Zoek je product").css("color", "#ccc");

});