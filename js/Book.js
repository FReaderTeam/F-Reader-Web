function Book() {
    this.id = 0;
    this.title = '';
    this.cover = null;
    this.body = '';
    this.size = 0;
    this.file_name = '';
    this.chapter = 0; // current reading chapter number
    this.position = 0; // current reading letter position in chapter
    this.added_on = null;
    this.authors = '';

    var _this = this;

    /*
     * Extract Book essence from XML file in FB2 format
     * */
    this.parseFromXML = function(dom, xml) {

        var $dom = $(dom);
        var fb2_id = $dom.find('document-info').find('id').text();

        _this.body = xml;
        _this.title = $dom.find('description').find('book-title').text();

        _this.fb2_id = (fb2_id) ? fb2_id.toUpperCase() : '';

        var $authors = $dom.find('description').find('author'),
            authors = [];

        authors.push($authors.find('last-name').text());
        authors.push($authors.find('first-name').text());
        authors.push($authors.find('middle-name').text());

        _this.authors = authors.join(' ');

        _this.cover = _this.ImageDataURI(this._extractCoverImage(dom));
    };

    /*
     * Return Binary section (jquery xml)
     * */
    this._getBinarySection = function() {
        var xml = _this.body;
        return $(xml).find('binary');
    };

    /*
     * Form cover image in DataURI format
     *  */
    this.ImageDataURI = function($image) {
        if($image) {
            return "data:"+$image.attr('content-type')+';base64,'+$image.text();
        } else {
            return null;
        }
    };


    this._extractCoverImage = function(xml) {
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
                    var $binarySections = _this._getBinarySection();
                    return $binarySections.filter("[id='" + coverId + "']");
                }

            }
            return null;
        };

        // choose a cover image from one of two variants
        var cp = ($coverpage0 && $coverpage0.length) ? $coverpage0 : (($coverpage1 && $coverpage1.length) ? $coverpage1 : null);
        return getCoverImage(cp);
    };

    this.getBody = function() {
        var xml = _this.body;

        var dom = (new DOMParser()).parseFromString(xml,'text/xml');

        return $(dom).find('body').first();

    }

}