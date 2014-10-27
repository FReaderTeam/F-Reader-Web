function PositionDao(datastore){

    PositionDao.table_name = 'position_android';

    // saves current position in the book to drobpox datastore
    this.savePosition = function(paragraph_number, bookPath){
        var positionTable = datastore.getTable(PositionDao.table_name);
        var results = positionTable.query({bookFullPath: bookPath});
        if(results.length == 1){
            results[0].set("paragraph",paragraph_number);
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
    this.getLastSavedPosition = function(bookPath){
        var positionTable = datastore.getTable(PositionDao.table_name);
        var results = positionTable.query({bookFullPath: bookPath});
        if(results.length == 0){
            return 0;
        }
        return results[0].get("paragraph");
    }

}