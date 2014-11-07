var client = new DropboxClient();
client.authentificate(onAuthenticated);
var _datastore;

function onAuthenticated() {
    client.isAuthenticated()
    var full_path = window.location.hash.substr(1);
    client.getDatastore(
        function (datastore) {
            var positionDao = new PositionDao(datastore);
            var timer;
            _datastore = datastore;
            $(window).scroll(function () {
                if (timer) clearTimeout(timer);
                timer = setTimeout(function () {
                    var position = PositionUtils.getCurrentPosition();
                    console.log(full_path + " " + position);
                    positionDao.savePosition(position, full_path);
                }, 200);
            });
            client.readBook(full_path, new BookView().show);
        }
    );
}
