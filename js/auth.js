var appKey = 'jcyec8tqzehdwe9';
var client = new Dropbox.Client({ key: appKey });

function auth(){
    client.authenticate({ interactive: true }, function (error, client) {
        if (error) {
            console.log('Authentication error: ' + error);
            auth();
        }
        else {
            console.log('User has succesfully authorized.');
        }
    });
}