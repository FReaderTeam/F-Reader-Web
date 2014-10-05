// Insert your CLIENT_ID of your project's client from Google Developers Console.
var CLIENT_ID = '27880399977-ok3ldrejbm3mtr5kusrm4tkq6ffdmkgc.apps.googleusercontent.com';
var SCOPES = 'https://www.googleapis.com/auth/drive';

// Called when authorization server replies.
function handleAuthResult(authResult) {
    if (authResult && !authResult.error) {
        makeRequest();
    } else {
        gapi.auth.authorize({'client_id': CLIENT_ID, 'scope': SCOPES, 'immediate': false}, handleAuthResult);
    }
}

// Check if the current user has authorized the application.
function checkAuth() {
    gapi.auth.authorize({'client_id': CLIENT_ID, 'scope': SCOPES, 'immediate': true}, handleAuthResult);
}

// Called when the client library is loaded to start the authorization flow.
function handleClientLoad() {
    window.setTimeout(checkAuth, 1);
}

// Fetch all .fb2 files (prints them to console).
function makeRequest() {
    gapi.client.load('drive', 'v2',
        function () {
            var request = gapi.client.drive.files.list(
                {
                    'q': 'title contains \'.fb2\' or title contains \'.fb2.zip\''
                }
            );
            request.execute(
                function (responce) {
                    for (i = 0; i < responce.items.length; i++) {
                        $(".list-group").append("<a href=\"#\" class=\"list-group-item\">" + responce.items[i].title + "</li>");
                    }
                }
            );

        }
    );
}