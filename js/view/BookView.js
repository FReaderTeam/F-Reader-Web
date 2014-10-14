function BookView(){
    this.show = function(book_content,book_stat){
        var book = new Parser().getBookFromXml(book_content,book_stat);
        $('.b-reading').xslt(book.string_book_xml,'fb2-to-html.xsl');
        $("body").removeClass("loading");
    }
}