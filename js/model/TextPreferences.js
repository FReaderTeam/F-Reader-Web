var TextPreferences = {


    defaultFontSizeStep: 3,

    changeFontSize: function changeFontSize(delta) {
        var fontSize = parseInt($('.b-reading .b-reading-book').css('font-size'));
        var newFontSize = fontSize + delta;
        if (newFontSize <= 5 || newFontSize + delta > 72) {
            return;
        }
        $('.b-reading .b-reading-book').css('font-size', (newFontSize) + 'px');
        $('#fontValue').html('Font size: ' + newFontSize + 'px');
    },

    fontSizeIncrease: function () {
        this.changeFontSize(this.defaultFontSizeStep);
    },

    fontSizeDecrease: function () {
        this.changeFontSize(-this.defaultFontSizeStep);
    }
};







