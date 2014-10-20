function BookView(){
    this.show = function(book_content,book_stat){
        var book = new Parser().getBookFromXml(book_content,book_stat);
        $('.b-reading').xslt(book.string_book_xml,'fb2-to-html.xsl');
        $("body").removeClass("loading");
        // on DOM changes
        document.addEventListener("DOMNodeInserted",function(){
            var full_path = window.location.hash.substr(1);
            var position = new PositionDao(window._datastore).getLastSavedPosition(full_path);
            if(!position){
                new PositionInstaller().setPosition(0,0);
            }
            else{
                new PositionInstaller().setPosition(position.section,position.paragraph);
            }
        });
    }
}