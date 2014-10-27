function BookView() {
    this.show = function(book_content,book_stat){
        var book = new Parser().getBookFromXml(book_content,book_stat);
        $('.b-reading').xslt(book.string_book_xml,'fb2-to-html.xsl');
        $("body").removeClass("loading");
        // on DOM changes
        document.addEventListener("DOMNodeInserted",function(){
            var full_path = window.location.hash.substr(1);
            var position = new PositionDao(window._datastore).getLastSavedPosition(full_path);
            new PositionInstaller().setPosition(position);
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
					var position = posFinder.findCurrentAbsoluteParagraph();
					console.log(full_path + " " + position);
					positionDao.savePosition(position,full_path);
				}, 200);
			});
			client.readBook(full_path, new BookView().show);
		}
	);
}

function changeFontSize(delta) {
	var fontSize = parseInt($('.b-reading .b-reading-book').css('font-size')) + delta;
	
	$('.b-reading .b-reading-book').css('font-size', (fontSize) + 'px');
	$('#fontValue').html('Font size: ' + fontSize + 'px');
}

function fontSizeIncrease() {
	changeFontSize(3);
}

function fontSizeDecrease() {
	changeFontSize(-3);
}

var client = new DropboxClient();
client.authentificate(onSuccessComplete);
var _datastore;

