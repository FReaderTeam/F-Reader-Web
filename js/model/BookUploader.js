function BookUploader(client) {

//    CONSTRUCTOR
    var uploadForm = document.getElementById('upload-form');
    var fileInput = document.getElementById('file-select');
    var uploads_count = 0;
    var dropboxClient = client;
    var FULL_PATH = 'FReaderBooks/';

    uploadForm.onsubmit = function (event) {
        event.preventDefault();
        var files = fileInput.files;
        setUpTrigger(files.length);
        uploadBooks(files);
    }

    function uploadBooks(files) {
        for (var i = 0; i < files.length; i++) {
            var fileName = FULL_PATH + files[i].name;
            var file = files[i];
            dropboxClient.writeFile(fileName, file,
                function (fileName, requestState) {
                    uploads_count++;
                    $(document).trigger('upload_done');
                    PopUpView.showPopUp(fileName);
                });
        }
    }

    function setUpTrigger(files_count) {
        $(document).bind("upload_done",
            function () {
                if (uploads_count == files_count) {
                    location.reload();
                }
            }
        );
    }

};
