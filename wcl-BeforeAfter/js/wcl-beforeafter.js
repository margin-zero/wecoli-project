$(document).ready(function() {

    wclBeforeAfterInit();

});

function wclBeforeAfterInit() {
    var handles = $(".wcl-beforeafter-handle");

    handles.each(function() {
        let handleWidth = parseInt($(this).width(), 10);
        let handleHeight = parseInt($(this).height(), 10);
        let containerHeight = parseInt($(this).parent().height(), 10);
        let afterWidth = parseInt($(this).parent().children(".wcl-beforeafter-after").width(), 10);

        $(this).css("left", parseInt(afterWidth - (handleWidth / 2), 10) + "px");
        $(this).css("top", parseInt(((containerHeight - handleHeight) / 2), 10) + "px");
        $(this).css("display", "block");

        $(this).mousemove(function(event) {
            if (event.buttons == 1) {
                let mouseLeft = event.pageX - $(this).offset().left;
                let vector = parseInt((mouseLeft - (handleWidth / 2)), 10);

                $(this).css("left", ($(this).position().left + vector) + "px");

                $(this).parent().children(".wcl-beforeafter-after").css("width", parseInt($(this).position().left + (handleWidth / 2), 10) + "px");

            };
        });
    });
};