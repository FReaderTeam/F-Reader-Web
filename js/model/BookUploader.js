function BookUploader(client) {

    $("#add_book_button").click(function () {
        $("#file-select").click();
    });

    $('#file-select').change(function () {
        $('#adding_file_form').submit();
    });

    var uploads_count = 0;
    var dropboxClient = client;
    var FULL_PATH = 'FReaderBooks/';
    var uploadForm = document.getElementById('adding_file_form');
    var fileInput = document.getElementById('file-select');

    uploadForm.onsubmit = function (event) {
        event.preventDefault();
        var files = fileInput.files;
        if (files.length == 0) {
            return;
        }
        LoadingView.showLoading();
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
