var BookCollectionViewUtils = {

    fillBookList: function (books) {
        var bookList = new BooksList(books);
        bookList.sortByDate();
        var htmlView = bookList.createHtmlView();
        $(".list-group").append(htmlView);
        LoadingView.hideLoading();
    }

};