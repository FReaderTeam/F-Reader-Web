function PositionInstaller(){

    // scroll page to previously saved paragraph
    this.setPosition = function(paragraph_idx){
        if(paragraph_idx >= 0) {
            var saved_paragraph = $(".p").slice(paragraph_idx, paragraph_idx + 1).first();
            var $saved_paragraph = $(saved_paragraph);
            if(saved_paragraph) {
                var offset = $saved_paragraph.offset();
                if(offset) {
                    $(window).scrollTop(offset.top);
                }
            }
        }
    }

}