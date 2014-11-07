function BookView() {
    this.show = function (book_content, book_stat) {
        var book = new Parser().getBookFromXml(book_content, book_stat);
        $('.b-reading').xslt(book.string_book_xml, 'fb2-to-html.xsl');
        $("body").removeClass("loading");
        var isFirstTime = true;
        $('ul.dropdown-menu').on('click', function (event) {
            event.stopPropagation();
        });
        $('#sections-button').on('click', function (event) {
            if (isFirstTime) {
                var View = new SectionList().createHtmlView();
                isFirstTime = false;
            }
        });
        // on DOM changes
        document.addEventListener("DOMNodeInserted", function () {
            var full_path = window.location.hash.substr(1);
            var position = new PositionDao(window._datastore).getLastSavedPosition(full_path);
            PositionUtils.setPosition(position);
        });
    }
}


