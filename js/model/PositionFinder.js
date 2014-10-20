function PositionFinder () {

    // Check whether element is in viewport (e.g. visible for user)
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

    // Estimate position of currently reading text in the book (Chapter and Paragraph)
    this.findCurrentChapterAndPosition = function() {

        var visible_section = undefined,
            vis_section_idx = undefined;

        var $sections = $(".section");
        $sections.removeClass("visible");

        // iteratively search for currently visible section (chapter)
        $sections.each(function(index, item){
            var is_visible = _isNodeVisible(item);
            if(is_visible) {
                vis_section_idx = index;
                visible_section = $(this);
                visible_section.addClass("visible");
                return false; // stop iterating
            }
        });

        // determ first current visible paragraph inside current visible section
        var current_par = undefined, current_par_idx = undefined;
        if(visible_section) {
            var $para = $(".p", visible_section);
            $para.removeClass("visible");
            $para.each(function(index, item){
                var is_visible = _isNodeVisible(item);
                if(is_visible) {
                    current_par_idx = index;
                    current_par = $(this);
                    current_par.addClass("visible");

                    return false; // stop iterating
                }
            });
        }

        if(vis_section_idx >= 0 && current_par_idx >= 0) {
            return { section : vis_section_idx, position : current_par_idx };
        }
    };
}
