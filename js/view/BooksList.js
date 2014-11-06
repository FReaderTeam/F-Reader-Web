function BooksList(books) {

    var books = books;

    var DELETE_BUTTON_TEXT = "x";

    var SORT_BY_DATE_FUNCTION = function (book1, book2) {
        if (book1.date > book2.date) return -1;
        if (book1.date < book2.date) return 1;
        return 0;
    };

    this.createHtmlView = function () {
        var html = "";
        for (var i = 0; i < books.length; i++) {
            var bookName = books[i].name;
            var bookPath = books[i].path;
            html += generateDivItem(bookPath, bookName);
        }
        return html;
    }

    this.sortByDate = function () {
        books.sort(SORT_BY_DATE_FUNCTION);
    }

    function generateDivItem(bookPath, bookName) {
        var listItem = "<div>";
        listItem += generateLink(bookPath, bookName);
        listItem += generateDeleteButton(bookPath);
        listItem += "</div>";
        return listItem;
    }

    function generateLink(bookPath, bookName) {
        var link = '<a href="book_view.html#';
        link += bookPath + '"';
        link += ' class="list-group-item"';
        link += ">";
        link += bookName;
        link += "</a>";
        return link;
    }

    function generateDeleteButton(bookPath) {
        var button = '<button onclick=';
        var method = '"' + 'document.bookRemover.removeBook(' + "'" + bookPath + "'" + ")" + '"';
        button += method;
        button += ' class="btn-del btn btn-default">';
        button += DELETE_BUTTON_TEXT;
        button += "</button>";
        return button;
    }
}