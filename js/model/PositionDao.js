function PositionDao(datastore){

    this.savePosition = function(section, paragrah,bookPath){
        var positionTable = datastore.getTable('position');
        var results = positionTable.query({bookPath: bookPath});
        for(var i = 0; i < results.length; i++){
            results[i].deleteRecord();
        }
        var lastUserPosition = positionTable.insert({
            bookPath: bookPath,
            section: section,
            paragraph: paragrah
        });
    }

    this.getLastSavedPosition = function(bookPath){
        var positionTable = datastore.getTable('position');
        var results = positionTable.query({bookPath: bookPath});
        if(results.length == 0){
            return {section : 0, paragraph: 0};
        }
        return {section : results[0].get("section"), paragraph: results[0].get("paragraph")};
    }
}