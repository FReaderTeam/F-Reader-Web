function getAllFileNames(callback) {
    var result = [];
    client.findByName('', '.fb2', '', function(error, file_stats) {
        for (i = 0; i < file_stats.length; i++) {
            result[i] = file_stats[i].name;
        }
        callback(result);
    });
}

function fillList(books) {
    for (i = 0; i < books.length; i++) {
        if (/\W*\.fb2$/.test(books[i]) || /\W*\.fb2\.zip$/.test(books[i])) {
            $(".list-group").append("<a href=\"" + books[i] + "\" class=\"list-group-item\" onclick=\"openBook(this)\">" + books[i] + "</a>");
        }
    }
}

function readBook(bookName) {
    client.readFile(bookName, function (error, content, stat) {
        if (error) {
            alert('Book reading error: ' + error);
        } else {
            alert(content);
        }
    });
}

function openBook(obj) {
        var bookName = obj.getAttribute("href");
        alert(bookName);
        readBook(bookName);
}

auth();
getAllFileNames(fillList);