function BooksList(books) {

    var books = books;

    var DELETE_BUTTON_TEXT = "x";

    var SORT_BY_DATE_FUNCTION = function (book1, book2) {
        if (book1.date > book2.date) return -1;
        if (book1.date < book2.date) return 1;
        return 0;
    };

    this.createHtmlView = function () {
//        $('#list-header').append(" " + books.length + " books were found.");
        var html = "";
        for (var i = 0; i < books.length; i++) {
            var bookName = books[i].name;
            var bookPath = books[i].path;
            var bookSize = books[i].size;
            var bookDate = books[i].date;
            html += generateDivItem(bookPath, bookName, bookDate, bookSize);
        }
        return html;
    }

    this.sortByDate = function () {
        books.sort(SORT_BY_DATE_FUNCTION);
    }

    function generateDivItem(bookPath, bookName, bookDate, bookSize) {
        var divItem = '<div class=".btn-group">';
        divItem += generateListItem(bookPath, bookName, bookDate, bookSize);
        divItem += generateDeleteButton(bookPath);
        divItem += '</div>';
        return divItem;
    }

    function generateListItem(bookPath, bookName, bookDate, bookSize) {
        var link = "<a class='list-group-item' href='book_view.html#";
        link += bookPath + '\'>';
        link += generateListItemHading(bookName);
        link += generateBadge(bookSize);
        link += '</br>';
        link += generateListItemText(bookDate);
        link += "</a>";
        return link;
    }

    function generateBadge(bookSize) {
        var badge = '<span class="badge">';
        badge += sizeToReadableFormat(bookSize);
        badge += '</span>';
        return badge;
    }

    function generateListItemHading(bookName) {
        var hading = '<span class="h5 list-group-item-heading">';
        hading += bookName;
        hading += '</span>';
        return hading;
    }

    function generateListItemText(bookDate) {
        var text = '<span class="h6 list-group-item-text">';
        text += "Book was added: ";
        var date = bookDate.toLocaleString();
        text += date.substr(0, 10);
        text += '</span>';
        return text;
    }

    function generateDeleteButton(bookPath) {
        var button = '<button onclick=';
        var method = '"' + 'document.bookRemover.removeBook(' + "'" + bookPath + "'" + ")" + '"';
        button += method;
        button += ' class="btn-del btn btn-default pull-right">';
        button += DELETE_BUTTON_TEXT;
        button += "</button>";
        return button;
    }

    function sizeToReadableFormat(sizeInBytes) {
        var kiloBytes = sizeInBytes / 1000;
        if (kiloBytes < 1000) {
            return kiloBytes.toFixed(1) + " KB";
        } else {
            var megaBytes = kiloBytes / 1000;
            megaBytes = megaBytes.toFixed(1);
            return megaBytes + " MB";
        }

    }

}