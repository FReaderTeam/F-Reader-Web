function PositionInstaller(){

    var _this = this;

    this.setPosition = function(chapter, position){

        // scroll to previously saved position
        if(chapter >= 0 && position >= 0) {
            var cur_section = $(".section").slice(chapter, chapter + 1).first(),
                cur_pos = undefined;

            if(cur_section) {
                cur_pos = $(".p", cur_section).slice(position, position + 1).first();
                var $curpos = $(cur_pos);
                if(cur_pos) {
                    var offset = $curpos.offset();
                    if(offset) {
                        $(window).scrollTop(offset.top); //.scrollLeft(cur_pos.offset().left);
                    }
                }
            }
        }
    }

}