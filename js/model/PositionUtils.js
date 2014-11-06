var PositionUtils = {

    getCurrentPosition: function () {
        var paragraph_index = undefined;
        var $paragraphs = $(".p");
        $paragraphs.removeClass("visible");
        $paragraphs.each(function (index, item) {
            var is_visible = PositionUtils._isNodeVisible(item);
            if (is_visible) {
                paragraph_index = index;
                var current_par = $(this);
                current_par.addClass("visible");
                return false;
            }
        });
        return paragraph_index;
    },

    setPosition: function (paragraph_idx) {
        if (paragraph_idx >= 0) {
            var saved_paragraph = $(".p").slice(paragraph_idx, paragraph_idx + 1).first();
            var $saved_paragraph = $(saved_paragraph);
            if (saved_paragraph) {
                var offset = $saved_paragraph.offset();
                if (offset) {
                    $(window).scrollTop(offset.top);
                }
            }
        }
    },

    // Check if element is visible for user
    _isNodeVisible: function(el) {
        var top = el.offsetTop;
        var left = el.offsetLeft;
        var width = el.offsetWidth;
        var height = el.offsetHeight;

        while (el.offsetParent) {
            el = el.offsetParent;
            top += el.offsetTop;
            left += el.offsetLeft;
        }

        return (
        top < (window.pageYOffset + window.innerHeight) &&
        left < (window.pageXOffset + window.innerWidth) &&
        (top + height) > window.pageYOffset &&
        (left + width) > window.pageXOffset
        );
    }
}