function DropboxClient() {

    var appKey = 'vahra3f0bhvq3pu';
    var client = new Dropbox.Client({ key: appKey });
    var extensions = ['.fb2', '.fb2.zip'];

    var _this = this;

    this.authentificate = function auth(success) {
        client.authenticate({ interactive: true }, function (error, client) {
            if (error) {
                console.log('Authentication error: ' + error);
            }
            else {
                console.log('User has successfully authorized.');
                success();
            }
        });
    }
	
	this.logOut = function() {
		client.signOff();
	}

    this.isAuthenticated = function () {
        return client.isAuthenticated();
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
                        size: file_stats[i].size,
						date: file_stats[i].modifiedAt
                    };
                }
                on_success(filesMetadata);
            });
    }

    this.readBook = function(full_path, on_success) {
        if (new RegExp('.fb2.zip$').test(full_path)) {
            this.readFb2Zip(full_path, on_success);
        }
        else {
            this.readFb2(full_path, on_success);
        }
    }

    this.readFb2 = function (full_path, on_success) {
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

    this.readFb2Zip = function (full_path, on_success) {
        // TODO modify exception handler
        client.readFile(full_path, { 'blob':true },
            function (error, content, stat) {
                if (error) {
                    alert('Book reading error: ' + error);
                } else {
                    // Hardcoded relative 'inflate.js' path.
                    zip.workerScriptsPath = '/spa/pl1nwdjuq0bvnzo/F-Reader/public/lib/zip/';
                    zip.createReader(new zip.BlobReader(content), function(reader) {
                        // get all entries from the zip
                        reader.getEntries(function(entries) {
                            if (entries.length) {

                                // get first entry content as text
                                entries[0].getData(new zip.TextWriter(), function(text) {
                                    // text contains the entry data as a String
                                    on_success(text,stat);
                                    console.log(text);

                                    // close the zip reader
                                    reader.close(function() {
                                        // onclose callback
                                    });

                                }, function(current, total) {
                                    // onprogress callback
                                });
                            }
                        });
                    }, function(error) {
                        // onerror callback
                    });
                }
            });
    }

    this.checkExtensions = function(file) {
        for (var i = 0; i < extensions.length; i++) {
            if (new RegExp(extensions[i] + '$').test(file.name)) {
                return true;
            }
        }
        alert('Error: bad file extension');
        return false;
    }

    this.writeFile = function (full_path, data, on_success) {
        if (this.checkExtensions(data)) {
            var request = client.writeFile(full_path, data, undefined,
                function (error, stat) {
                    if (error) {
                        alert('Book writing error: ' + error);
                    } else {
                        on_success(full_path, request.readyState);
                    }
                });
        }
    }

    this.getDatastore = function(callback){
        var manager = client.getDatastoreManager();
        manager.openDefaultDatastore(function(error, datastore){
            // TODO create normal error handler
            if(error){
                alert('Error opening default datastore: ' + error);
                return;
            }
            _this.datastore = datastore;
            callback(datastore);
        });
    }
	
	this.removeFile = function(path){
        client.remove(path, 
			function(error, stat) {
				if (error) {
                        alert('Book writing error: ' + error);
                    } else {
						$(document).trigger('deleting_done');
                    }
			});
    }

}
