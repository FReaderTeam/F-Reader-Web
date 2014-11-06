function BookRemover(client) {

    $(document).bind("deleting_done",
        function () {
            location.reload();
        }
    );

    this.removeBook = function (bookPath) {
        LoadingView.showLoading();
        client.removeFile(bookPath);
    }

}