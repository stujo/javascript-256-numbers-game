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


GameModel.prototype.left_impl = function(game_state) {
    var consolidatedRows = [];

    var rows = this.getRowsFromState(game_state);

    rows.forEach(function(row) {
        consolidatedRows.push(this.consolidate(row))
    });

    var state = consolidatedRows.reduce(function(memo, row) {
        return memo.concat(row);
    }, []);

    return state;
}

GameModel.prototype.right_impl = function(game_state) {
    var state = game_state.slice(0);

    var rows = this.getRowsFromState(state);

    return state;
}

GameModel.prototype.down_impl = function(game_state) {
    var state = game_state.slice(0);

    return state;
}

GameModel.prototype.up_impl = function(game_state) {
    var state = game_state.slice(0);

    return state;
}


GameModel.prototype.chunk = function(array, chunkSize) {
    var chunks = [];
    for (var i = 0, len = array.length; i < len; i += chunkSize)
        chunks.push(array.slice(i, i + chunkSize));
    return chunks;
}


module.exports = GameModel;
