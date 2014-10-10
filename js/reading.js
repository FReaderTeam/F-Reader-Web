// Gets string representation of the file.
function readBook(bookName) {
    client.readFile(bookName, function (error, content, stat) {
        if (error) {
            alert('Book reading error: ' + error);
        } else {
            var xmlDoc = $.parseXML(content);
            var $xml = $(xmlDoc);
            var body = $xml.find("body");
            
            //
            for (var i = 0; i < body.length; i++) {
                var str = body[i].innerHTML;
                var res = str.replace(/\s*xmlns\s*=\s*".*"/g, "");
                res = res.replace(/<title>/g, "<h2>");
                res = res.replace(/<\/title>/g, "<\/h2>");
               // var res = str.replace(/(<title.*>).*(<\/title>)/g, "<h2>", "<\/h2>");

                $( "#stuff" ).append(res);
            }
            
            //document.getElementById('stuff').innerHTML += body.tex;
        }
    });
}

function openBook() {
        var bookName = window.location.hash.substr(1);
        readBook(bookName);
}

auth();
openBook();