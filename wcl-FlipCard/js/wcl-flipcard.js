$(document).ready(function() {

    wclFlipCardInit();

});

function wclFlipCardInit() {
    $('.wcl-flipcard-container').mouseover(function() {
        $(this).addClass("wcl-flipcard-inversed");
        $(this).removeClass("wcl-flipcard-normal");
    });

    $('.wcl-flipcard-container').mouseout(function() {
        $(this).addClass("wcl-flipcard-normal");
        $(this).removeClass("wcl-flipcard-inversed");
    });
}