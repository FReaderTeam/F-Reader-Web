function BookLibraryView(){
    this.fillBookList  = function(books){
        for (var i = 0; i < books.length; i++) {
            var bookName = books[i].name;
            var bookPath = books[i].path;
            var bookSize = books[i].size;
            $(".list-group")
                .append("<a href=\"book_view.html#" + books[i].path + "\" " +
                    "class=\"list-group-item\"" +
                    " onclick=\"openBook(this)\">" + books[i].name + "</a>");
        }
        $("body").removeClass("loading");
    }
}
