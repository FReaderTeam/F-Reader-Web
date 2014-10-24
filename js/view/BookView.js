function BookView() {
    this.show = function(book_content,book_stat){
        var book = new Parser().getBookFromXml(book_content,book_stat);
        $('.b-reading').xslt(book.string_book_xml,'fb2-to-html.xsl');
        $("body").removeClass("loading");
        // on DOM changes
        document.addEventListener("DOMNodeInserted",function(){
            var full_path = window.location.hash.substr(1);
            var position = new PositionDao(window._datastore).getLastSavedPosition(full_path);
            if(!position){
                new PositionInstaller().setPosition(0,0);
            }
            else{
                new PositionInstaller().setPosition(position.section,position.paragraph);
            }
        });
    }
}

function onSuccessComplete() {
	var full_path = window.location.hash.substr(1);
	client.getDatastore(
		function(datastore){
			var positionDao = new PositionDao(datastore);
			var posFinder = new PositionFinder();
			var timer;
			_datastore = datastore
			$( window ).scroll(function() {
				if ( timer ) clearTimeout(timer);
				timer = setTimeout(function(){
					var position = posFinder.findCurrentChapterAndPosition();
					console.log(position);
					positionDao.savePosition(position.section,position.position,full_path);
				}, 200);
			});
			client.readBook(full_path, new BookView().show);
		}
	);
}

var client = new DropboxClient();
client.authentificate(onSuccessComplete);
var _datastore;

