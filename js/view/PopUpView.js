var PopUpView = {

    defaultFadeInTime: 400,
    defaultDelayTime: 3000,
    defaultFadeOutTime: 400,

    showPopUpTimed: function (text, fadeInTime, delayTime, fadeOutTime) {
        $(".info").html(text);
        $('.info').stop().fadeIn(fadeInTime).delay(delayTime).fadeOut(fadeOutTime);
    },

    showPopUp: function (text) {
        $(".info").html(text);
        $('.info').stop().fadeIn(this.defaultFadeInTime)
            .delay(this.defaultDelayTime)
            .fadeOut(this.defaultFadeOutTime);
    }

};