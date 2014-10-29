function BookLibraryView() {
	var _this = this;
    this.fillBookList  = function(books) {
		books.sort(
			function(a, b) {
				if(a.date > b.date) return -1;
    			if(a.date < b.date) return 1;
    			return 0;
			});
        for (var i = 0; i < books.length; i++) {
            var bookName = books[i].name;
            var bookPath = books[i].path;
            var bookSize = books[i].size;
            $(".list-group")
                .append("<div><a href=\"book_view.html#" + books[i].path + "\" " +
                    "class=\"list-group-item\"" +
                    " onclick=\"openBook(this)\">" + books[i].name + "</a><button" + " onclick=\"document.client.removeFile(\'" + books[i].path + "\')\" class=\"btn btn-default\"" + ">x</button></div>");
        }
        $("body").removeClass("loading");
    }
}

$(document).ready(function() {
    // List filling.
    var client = new DropboxClient();
	
	// Relatively shitty code down there
	document.client = client;
	
	$(document).bind("deleting_done",
                function(){
                	location.reload();
                }
        );
	// Shitty code has ended
	
    client.authentificate(onSuccessComplete);
    function onSuccessComplete() {
        client.findFb2Files(new BookLibraryView().fillBookList);
    }

    // Uploading stuff.
    var uploadForm = document.getElementById('upload-form');
    var fileSelect = document.getElementById('file-select');
    var uploadButton = document.getElementById('upload-button');
    var uploads_count = 0;

    uploadForm.onsubmit = function(event) {
        event.preventDefault();
        var files = fileSelect.files;
        var full_path = 'FReaderBooks/';
        $(document).bind("upload_done",
                function(){
                    if (uploads_count == files.length) {
                        location.reload();
                    }
                }
        );
        for (var i = 0; i < files.length; i++) {
            console.log(files[i]);
            client.writeFile(full_path + files[i].name, files[i],
                    function(fileName, requestState){
                        uploads_count++;
                        $(document).trigger('upload_done');
                        // Uploading status pop-up.
                        $( ".info" ).html(fileName);
                        $('.info').stop().fadeIn(400).delay(3000).fadeOut(400);
                    });
        }
    }
});