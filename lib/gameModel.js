function GameModel(startingState) {
    if (startingState) {
        this.history = [startingState.split('').map(function(s) {
            return parseInt(s);
        })];
    } else {
        this.history = [this.random()];
    }
}

GameModel.prototype.toString = function() {
    return this.currentState().join("")
}

GameModel.prototype.currentState = function() {
    return this.history[this.history.length - 1];
}

GameModel.prototype.left = function() {
    this.history.push(this.left_impl(this.currentState()));
}

GameModel.prototype.right = function() {
    this.history.push(this.right_impl(this.currentState()));
}

GameModel.prototype.down = function() {
    this.history.push(this.down_impl(this.currentState()));
}

GameModel.prototype.up = function() {
    this.history.push(this.up_impl(this.currentState()));
}

GameModel.prototype.START_COUNT = 3;

GameModel.prototype.POSITIONS = [
    0, 1, 2, 3,
    4, 5, 6, 7,
    8, 9, 10, 11,
    12, 13, 14, 15
];


GameModel.prototype.EMPTY_BOARD = [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0
];


GameModel.prototype.random = function() {
    // duplicate the state
    var state = this.EMPTY_BOARD.slice(0);
    var options = this.POSITIONS.slice(0);
    var index;
    var location;

    for (var counter = this.START_COUNT; this.START_COUNT > 0; this.START_COUNT--) {
        index = Math.floor(Math.random() * options.length); // Random Index position in the array
        location = options.splice(index, 1); // Splice out a random element using the ri var
        console.log(options, index, location);
        state[location] = 2
    }

    return state;
}

GameModel.prototype.getRowsFromState = function(game_state) {
    return this.chunk(game_state, 4);
}

GameModel.prototype.getColumnsFromState = function(game_state) {
    var cols = [[],[],[],[]];

    game_state.forEach(function(item, index){
      cols[index % 4].push(item)
    });

    return cols;
}

GameModel.prototype.consolidateSet = function(row) {
    var newSet = row.filter(function(item) {
        return item !== 0;
    }, []);

    newSet = newSet.reduce(function(memo, item) {
        if (memo.length > 0) {
            if (memo[memo.length - 1] == item) {
                memo[memo.length - 1] = item * 2;
            } else {
                memo.push(item);
            }
            return memo;
        } else {
            return [item];
        }
    }, []);

    while (newSet.length < row.length) {
        newSet.push(0);
    }

    return newSet;
}

GameModel.prototype.rowsToState = function(rows){
    return rows.reduce(function(memo, row) {
        return memo.concat(row);
    }, []);
}


GameModel.prototype.columnsToState = function(columns){

    var state = new Array(16);

    columns.forEach(function(column, col_index) {
        state[(4 * 0) + col_index] = column[0];
        state[(4 * 1) + col_index] = column[1];
        state[(4 * 2) + col_index] = column[2];
        state[(4 * 3) + col_index] = column[3];
    });

    return state;

}


GameModel.prototype.left_impl = function(game_state) {
    var that = this;
    var rows = this.getRowsFromState(game_state);
    var consolidatedSets = rows.map(function(row) {
       return that.consolidateSet(row);
    });

    return this.rowsToState(consolidatedSets);
}

GameModel.prototype.right_impl = function(game_state) {
    var state = game_state.slice(0);

    var rows = this.getRowsFromState(state);
    afads
    return state;
}

GameModel.prototype.down_impl = function(game_state) {
    var state = game_state.slice(0);
    asdasdsa
    return state;
}


GameModel.prototype.up_impl = function(game_state) {
    var consolidatedSets = [];
    var that = this;

    var columns = this.getColumnsFromState(game_state);
    var consolidated = columns.map(function(column){
       return that.consolidateSet(column);
    });
    return this.columnsToState(consolidated);
}


GameModel.prototype.chunk = function(array, chunkSize) {
    var chunks = [];
    for (var i = 0, len = array.length; i < len; i += chunkSize)
        chunks.push(array.slice(i, i + chunkSize));
    return chunks;
}


module.exports = GameModel;
