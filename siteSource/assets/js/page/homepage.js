$(function () {
    var homepageTitleAnimation = $('#lifecycle .flat-title');
    var resizeTitle = function () {
        var movedPix = $(window).scrollTop() + 0;
        if (movedPix > 200) {
            movedPix = 200;
        }
        var newHeight = movedPix / 2 + 80
        if (homepageTitleAnimation.css('height') != newHeight) {
            homepageTitleAnimation.css({
                height: newHeight,
                top: -newHeight,
                paddingTop: movedPix / 4 + 'px',
                marginBottom: -newHeight,
                backgroundColor: 'rgba(48,68,87,' + (0.8 + movedPix / 1000) + ')'
            });
        }
    }

    if (homepageTitleAnimation.length){
        resizeTitle();
        $(window).scroll(function () {
            resizeTitle();
        });
    }
});
