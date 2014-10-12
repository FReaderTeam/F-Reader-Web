function DropboxClient() {

    var appKey = 'jcyec8tqzehdwe9';
    var client = new Dropbox.Client({ key: appKey });

    this.authentificate = function auth() {
        client.authenticate({ interactive: true }, function (error, client) {
            if (error) {
                console.log('Authentication error: ' + error);
            }
            else {
                console.log('User has successfully authorized.');
            }
        });
    }

    this.isAuthenticated = function () {
        return client.isAuthentificated();
    }

    this.findFb2Files = function (on_success) {
        client.findByName('', '.fb2', '',
            function (error, file_stats) {
                var filesMetadata = [];
                for (i = 0; i < file_stats.length; i++) {
                    filesMetadata[i] = {
                        path: file_stats[i].path,
                        name: file_stats[i].name,
                        size: file_stats[i].size
                    };
                }
                on_success(filesMetadata);
            });
    }

}
