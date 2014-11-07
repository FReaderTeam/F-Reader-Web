function BookView() {
    this.show = function (book_content, book_stat) {
        var book = new Parser().getBookFromXml(book_content, book_stat);
        $('.b-reading').xslt(book.string_book_xml, 'fb2-to-html.xsl');
        $("body").removeClass("loading");
        // on DOM changes
        document.addEventListener("DOMNodeInserted", function () {
            var full_path = window.location.hash.substr(1);
            var position = new PositionDao(window._datastore).getLastSavedPosition(full_path);
            PositionUtils.setPosition(position);
        });
    }
}

function sidebarGlowing() {
    $('.sidebar').toggleClass("glowing");
}

function controlSlide() {
    var sidebar = $('.sidebar');
    var controls = $('.controls');
    if (sidebar.attr('class').indexOf("visible") != -1) {
        sidebar.fadeOut();
        controls.animate({'right': '-100px'}, 600, function () {
            sidebar.toggleClass("control-visible");
        });
        setTimeout(function () {
            sidebar.fadeIn()
        }, 600);

    }

    else {
        sidebar.fadeOut();
        controls.animate({'right': '5px'}, 600, function () {
            sidebar.toggleClass("control-visible");
        });
        setTimeout(function () {
            sidebar.fadeIn()
        }, 600);

    }
}

