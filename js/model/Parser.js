function Parser(){

    // Create book object from string representation of fb2 file
    this.getBookFromXml = function(fb2_file_string){
        var book_xml = $.parseXML(fb2_file_string);
        var $book_dom = $(book_xml);
        return createBookModel($book_dom,fb2_file_string);
    }

    // Extract Book essence from XML file in FB2 format
    function createBookModel($dom,fb2_file_string) {
        var book_result = new Book();
        book_result.string_book_xml = fb2_file_string;
        book_result.title = $dom.find('description').find('book-title').text();

        var fb2_id =  $dom.find('document-info').find('id').text();
        book_result.fb2_id = (fb2_id) ? fb2_id.toUpperCase() : '';

        var $authors = $dom.find('description').find('author');
        var authors = [];
        authors.push($authors.find('last-name').text());
        authors.push($authors.find('first-name').text());
        authors.push($authors.find('middle-name').text());
        book_result.authors = authors.join(' ');
        book_result.cover = imageDataURI(extractCoverImage($dom));
        return book_result;
    };

    // Form cover image in DataURI format
    function imageDataURI($image) {
        if($image) {
            return "data:"+$image.attr('content-type')+';base64,'+$image.text();
        } else {
            return null;
        }
    };

    // Extracts image from binary section of xml file
    function extractCoverImage(xml) {
        var $xml = $(xml);

        var $coverpage0 = $xml.find('description').find('title-info').find('coverpage').find('image');
        var $coverpage1 = $xml.find('image');

        var getCoverImage = function(coverpage) {
            var coverId;
            if (coverpage && coverpage.length) {
                for (var i=0; i < coverpage[0].attributes.length; i++) {
                    if(coverpage[0].attributes[i].localName == 'href') {
                        coverId = coverpage[0].attributes[i].nodeValue;
                        if(coverId[0] == '#'){
                            coverId = coverId.slice(1);
                        }
                        break;
                    }
                }
                if(coverId) {
                    var $binarySections = $xml.find('binary');
                    return $binarySections.filter("[id='" + coverId + "']");
                }
            }
            return null;
        };

        // choose a cover image from one of two variants
        var cp = ($coverpage0 && $coverpage0.length) ? $coverpage0 : (($coverpage1 && $coverpage1.length) ? $coverpage1 : null);
        return getCoverImage(cp);
    };

}