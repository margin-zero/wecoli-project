$(document).ready(function() {

    // initialization of all wclSlideshows

    wclSlideshowInit();
    $(window).resize(wclSlideshowRefresh);

});

function wclSlideshowInit() {

    // for each slideShow on page do:
    $(".wcl-slideshow-container").each(function() {

        var dataSlideMode = "default";
        var dataSlideInterval = 5000;
        var dataSlideFit = "none";
        var dataSlideClip = "true";

        // 1. read data- attributes and set defaults if data- doesn't exists
        if ($(this).attr('data-slide-mode')) {
            dataSlideMode = $.trim($(this).attr('data-slide-mode').toString().toLowerCase());

            if ((dataSlideMode != "auto") && (dataSlideMode != "manual")) {
                dataSlideMode = "default";
            };

        } else {
            dataSlideMode = "default";
        };

        if (parseInt($(this).attr('data-slide-interval'), 10) > 0) {
            dataSlideInterval = parseInt($(this).attr('data-slide-interval'), 10);
        }

        if ($(this).attr('data-slide-fit')) {
            dataSlideFit = $.trim($(this).attr('data-slide-fit').toString().toLowerCase());

            if ((dataSlideFit != "contain") && (dataSlideFit != "cover") && (dataSlideFit != "width") && (dataSlideFit != "height")) {
                dataSlideFit = "none";
            };
        };
        $(this).attr('data-slide-fit', dataSlideFit); // we save verified value of data-slide-fit -> we'll need it later

        if ($(this).attr('data-slide-clip')) {
            dataSlideClip = $.trim($(this).attr('data-slide-clip').toString().toLowerCase());

            if ((dataSlideClip != "false")) {
                dataSlideClip = "true";
            };
        };

        // 2. set proper overflow of container - according to data-slide-clip value
        if (dataSlideClip == "false") {
            $(this).css("overflow", "visible");
        } else {
            $(this).css("overflow", "hidden");
        };

        // 3. generate function dedicated to current slideshow, changing slide to next one. The second parameter tells function
        // how to fit images into container

        var showNextSlide = nextSlideshowImage($(this), dataSlideFit);

        // 4. if data-slide-mode is "default" or "manual" then assign change slide by mouse click to slideShow
        if ((dataSlideMode == "default") || (dataSlideMode == "manual")) {
            $(this).click(showNextSlide);
        };

        // 5. if data-slide-mode is "default" or "auto" then assign automatic slide change with given time interval
        if ((dataSlideMode == "default") || (dataSlideMode == "auto")) {
            var myInterval = setInterval(function() { showNextSlide(); }, dataSlideInterval);
        };
    });
}

function nextSlideshowImage(slideshow, dataSlideFit) {

    var current = 0;
    var count = slideshow.children().length;

    slideshow.attr("data-current-image", current);
    if (dataSlideFit != "none") { resizeSlideshowImage(slideshow.children("img").eq(current), dataSlideFit); }

    slideshow.children("img").eq(current).css("display", "block");

    return function() {
        slideshow.children("img").eq(current).css("display", "none");
        current++;
        if (current > (count - 1)) { current = 0 };
        if (dataSlideFit != "none") { resizeSlideshowImage(slideshow.children("img").eq(current), dataSlideFit); }
        slideshow.children("img").eq(current).css("display", "block");
        slideshow.attr("data-current-image", current);
    }
}

function resizeSlideshowImage(image, dataSlideFit) {

    var containerWidth = parseInt(image.parent().width(), 10);
    var containerHeight = parseInt(image.parent().height(), 10);
    var imageHeight = parseInt(image.height(), 10);
    var imageWidth = parseInt(image.width(), 10);

    // calculating proportions of image and container
    var imageProportion = imageWidth / imageHeight;
    var containerProportion = containerWidth / containerHeight;

    image.removeClass("fitwidth").removeClass("fitheight");

    if ((containerWidth > 0) && (containerHeight > 0)) {
        switch (dataSlideFit) {
            case "width":
                image.addClass("fitwidth");
                break;
            case "height":
                image.addClass("fitheight");
                break;
            case "contain":
                if (imageProportion == containerProportion) {
                    image.width(image.parent().width());
                    image.height(image.parent().height());
                };

                if (containerProportion > imageProportion) {
                    image.css("width", "auto");
                    image.height(image.parent().height());
                    image.css("left", parseInt((image.parent().width() - image.width()) / 2), 10);
                }

                if (containerProportion < imageProportion) {
                    image.css("height", "auto");
                    image.width(image.parent().width());
                    image.css("top", parseInt((image.parent().height() - image.height()) / 2), 10);
                }
                break;

            case "cover":
                if (imageProportion == containerProportion) {
                    image.width(image.parent().width());
                    image.height(image.parent().height());
                    image.css("top", "0");
                    image.css("left", "0");
                };

                if (containerProportion > imageProportion) {
                    image.css("height", "auto");
                    image.width(image.parent().width());
                    image.css("top", parseInt((image.parent().height() - image.height()) / 2), 10);
                    image.css("left", "0");
                };

                if (containerProportion < imageProportion) {
                    image.css("width", "auto");
                    image.height(image.parent().height());
                    image.css("left", parseInt((image.parent().width() - image.width()) / 2), 10);
                    image.css("top", "0");
                };
                break;
        };
    };
};

function wclSlideshowRefresh() {
    $(".wcl-slideshow-container").each(function() {
        var slideId = parseInt($(this).attr("data-current-image"), 10);
        image = $(this).children("img").eq(slideId);
        dataSlideFit = $(this).attr("data-slide-fit");
        resizeSlideshowImage(image, dataSlideFit)
    });
};