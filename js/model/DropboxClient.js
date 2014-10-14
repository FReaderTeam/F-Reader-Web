function DropboxClient() {

    var appKey = 'vahra3f0bhvq3pu';
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
                // TODO modify exception handler
                if (error) {
                    alert(error);
                    return;
                }
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

    this.readFile = function (full_path, on_success) {
    // TODO modify exception handler
        client.readFile(full_path,
            function (error, content, stat) {
                if (error) {
                    alert('Book reading error: ' + error);
                } else {
                    on_success(content,stat);
                }
            });
    }
}
