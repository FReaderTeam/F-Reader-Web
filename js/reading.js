function readBook(bookName) {
    client.readFile(bookName, function (error, content, stat) {
        if (error) {
            alert('Book reading error: ' + error);
        } else {
            alert(content);
        }
    });
}

var book = sessionStorage.book;
readBook(book);