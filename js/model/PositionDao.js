function PositionDao(datastore) {

    var table_name = 'position_android';

    // saves current position in the book to drobpox datastore
    this.savePosition = function (paragraph_number, bookPath) {
        var positionTable = datastore.getTable(table_name);
        var results = positionTable.query({bookFullPath: bookPath});
        if (results.length == 1) {
            console.log("BEFORE: " + bookPath + results[0].get("paragraph"));
            results[0].set("paragraph", paragraph_number);
            console.log("AFTER: " + bookPath + results[0].get("paragraph"));
        }
        else {
            var position = {
                bookFullPath: bookPath,
                paragraph: paragraph_number
            };
            positionTable.insert(position);
        }
    }

    // obtain paragraph number that was installed for particular book
    this.getLastSavedPosition = function (bookPath) {
        var positionTable = datastore.getTable(table_name);
        var results = positionTable.query({bookFullPath: bookPath});
        if (results.length == 0) {
            return 0;
        }
        return results[0].get("paragraph");
    }

}