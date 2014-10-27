function PositionFinder () {

    // Check if element is visible for user
    function _isNodeVisible(el){
        var top = el.offsetTop;
        var left = el.offsetLeft;
        var width = el.offsetWidth;
        var height = el.offsetHeight;

        while(el.offsetParent) {
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
    };

    // Find number of first paragraph that is visible for user
    this.findCurrentAbsoluteParagraph = function(){
        var paragraph_index = undefined;
        var $paragraphs = $(".p");
        $paragraphs.removeClass("visible");
        $paragraphs.each(function(index, item) {
            var is_visible = _isNodeVisible(item);
            if(is_visible) {
                paragraph_index = index;
                var current_par = $(this);
                current_par.addClass("visible");
                return false;
            }
        });
        return paragraph_index;
    };
}
