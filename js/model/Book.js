function Book() {
    this.id = 0;
    this.title = '';       // book title
    this.cover = null;
    this.string_book_xml = '';         // string representation of file
    this.size = 0;         // file_size
    this.path = '';  // path on dropbox
    this.chapter = 0; // current reading chapter number
    this.position = 0; // current reading paragraph position in chapter
    this.added_on = null; // is added to DB
    this.authors = '';  // book authors
}