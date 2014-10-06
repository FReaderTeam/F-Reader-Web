// Insert your CLIENT_ID of your project's client from Google Developers Console.
var CLIENT_ID = '27880399977-ok3ldrejbm3mtr5kusrm4tkq6ffdmkgc.apps.googleusercontent.com';
var SCOPES = 'https://www.googleapis.com/auth/drive';

// Called when the client library is loaded to start the authorization flow.
function handleClientLoad() {
    gapi.auth.init(function() {
      window.setTimeout(checkAuth, 1);
    });
}

// Check if the current user has authorized the application.
function checkAuth() {
    gapi.auth.authorize(
        {'client_id': CLIENT_ID, 'scope': SCOPES, 'immediate': true},
        handleAuthResult);
}

// Called when authorization server replies.
function handleAuthResult(authResult) {
    if (authResult && !authResult.error) {
        //window.location.replace("../bool_collection.html")
        makeRequest();
    }
    else {
        gapi.auth.init(function() {
            gapi.auth.authorize(
                {
                    'client_id': CLIENT_ID,
                    'scope': SCOPES,
                    'immediate': false
                },
                handleAuthResult);
        });
    }
}

// Fetch all .fb2 files (prints them to console).
function makeRequest() {
    gapi.client.load('drive', 'v2',
        function () {
            var request = gapi.client.drive.files.list(
                {
                    'q': 'title contains \'.fb2\' and trashed = false'
                }
            );
            request.execute(
                function (responce) {
                    for (i = 0; i < responce.items.length; i++) {
                        if (/\W*\.fb2$/.test(responce.items[i].title) || /\W*\.fb2\.zip$/.test(responce.items[i].title)) {
                            $(".list-group").append("<a href=\"#\" class=\"list-group-item\">" + responce.items[i].title + "</li>");
                        }
                    }
                }
            );
        }
    );
}