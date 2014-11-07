$(document).ready(function () {
    LoadingView.showLoading();
    var client = new DropboxClient();
    client.authentificate(function () {
        client.findFb2Files(BookCollectionView.fillBookList);
        document.bookUploader = new BookUploader(client);
        document.bookRemover = new BookRemover(client);
    });
});
