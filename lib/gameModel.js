function GameModel(startingState) {
    var state;

    if (startingState) {
        state = startingState.split('').map(function(s) {
            return parseInt(s);
        });
    } else {
        state = this._randomBoard();
    }

    this._history = [this._wrapStateForHistory(state)]
}



GameModel.prototype.history = function() {
    return this._history;
}

GameModel.prototype.toString = function() {
    return this.currentState().join("")
}

GameModel.prototype.currentState = function() {
    return this._history[this._history.length - 1].board;
}

GameModel.prototype.currentDetails = function() {
    return this._history[this._history.length - 1];
}


GameModel.prototype.move = function(move_name) {

    var start_board = this.currentState();

    var status = { move: move_name };

    status.board = this[`_${move_name}_impl`](start_board);

    if (!this._boardsEqual(status.board, start_board)) {
        var gaps = this._emptyIndexes(status.board);

        if (gaps.length > 0) {
            status.spawn_location = this._spawnLocation(gaps);
            status.spawn_value = this._spawnValue();
            status.board[status.spawn_location] = status.spawn_value;
            status.finished = false;
        } else {
            status.finished = true;
        }

        status.score = this._score(status.board)
        status.finished = this._finished(status.board)

        this._pushHistory(status);
    } else {
        //console.log('No Move!')
    }

}

GameModel.prototype.left = function() {
    return this.move('left');
}

GameModel.prototype.right = function() {
    return this.move('right');
}

GameModel.prototype.down = function() {
    return this.move('down');
}

GameModel.prototype.up = function() {
    return this.move('up');
}




GameModel.prototype._wrapStateForHistory = function(state) {
    return {
        board: state,
        finished: this._finished(state),
        score: this._score(state)
    }
}

GameModel.prototype._finished = function(board) {
    for (var i = 0; i < board.length; i++) {
        if (board[i] === 0) {
            return false
        }
    }

    var attempts = [
        this._up_impl(board),
        this._down_impl(board),
        this._left_impl(board),
        this._right_impl(board)
    ];

    for (var i = 0; i < board.length; i++) {
        if (
            board[i] != attempts[0][i] || board[i] != attempts[1][i] || board[i] != attempts[2][i] || board[i] != attempts[3][i]
        ) {
            return false
        }
    }

    return true;
}

GameModel.prototype._emptyIndexes = function(state) {
    var candidates = []

    state.forEach(function(item, index) {
        if (item === 0) {
            candidates.push(index)
        }
    });
    return candidates;
}

GameModel.prototype._spawnValue = function() {
    return Math.random() > 0.9 ? 4 : 2;
}

GameModel.prototype._spawnLocation = function(gaps) {
    return gaps[Math.floor(Math.random() * gaps.length)];
}

GameModel.prototype._boardsEqual = function(b1, b2) {
    return b1.reduce(function(memo, value, index) {
        return memo && value === b2[index];
    }, true);
}

GameModel.prototype._pushHistory = function(new_state) {
    this._history.push(new_state);
}



GameModel.prototype._score = function(board) {
    return board.reduce(function(memo, item) {
        return item + memo;
    }, 0);
}

GameModel.prototype._START_COUNT = 12;

GameModel.prototype._POSITIONS = [
    0, 1, 2, 3,
    4, 5, 6, 7,
    8, 9, 10, 11,
    12, 13, 14, 15
];


GameModel.prototype._EMPTY_BOARD = [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0
];


GameModel.prototype._randomBoard = function() {
    // duplicate the state
    var state = this._EMPTY_BOARD.slice(0);
    var options = this._POSITIONS.slice(0);
    var index;

    var location;

    for (var counter = this._START_COUNT; this._START_COUNT > 0; this._START_COUNT--) {
        index = Math.floor(Math.random() * options.length); // Random Index position in the array
        location = options.splice(index, 1); // Splice out a random element using the ri var
        state[location] = 2
    }

    return state;
}

GameModel.prototype._getRowsFromState = function(game_state) {
    return this._chunkArray(game_state, 4);
}

GameModel.prototype._getColumnsFromState = function(game_state) {
    var cols = [
        [],
        [],
        [],
        []
    ];

    game_state.forEach(function(item, index) {
        cols[index % 4].push(item)
    });

    return cols;
}

GameModel.prototype._consolidateSet = function(row) {
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

GameModel.prototype._rowsToState = function(rows) {
    return rows.reduce(function(memo, row) {
        return memo.concat(row);
    });
}


GameModel.prototype._columnsToState = function(columns) {
    var state = new Array(16);
    columns.forEach(function(column, col_index) {
        state[(4 * 0) + col_index] = column[0];
        state[(4 * 1) + col_index] = column[1];
        state[(4 * 2) + col_index] = column[2];
        state[(4 * 3) + col_index] = column[3];
    });
    return state;
}


GameModel.prototype._left_impl = function(game_state) {
    var that = this;
    var rows = this._getRowsFromState(game_state);
    var consolidatedSets = rows.map(function(row) {
        return that._consolidateSet(row);
    });

    return this._rowsToState(consolidatedSets);
}

GameModel.prototype._right_impl = function(game_state) {
    var that = this;
    var rows = this._getRowsFromState(game_state);
    var consolidatedSets = rows.map(function(row) {
        return that._consolidateSet(row.reverse()).reverse();
    });

    return this._rowsToState(consolidatedSets);
}

GameModel.prototype._down_impl = function(game_state) {
    var state = game_state.slice(0);

    var consolidatedSets = [];
    var that = this;

    var columns = this._getColumnsFromState(game_state);
    var consolidated = columns.map(function(column) {
        return that._consolidateSet(column.reverse()).reverse();
    });
    return this._columnsToState(consolidated);
}


GameModel.prototype._up_impl = function(game_state) {
    var consolidatedSets = [];
    var that = this;

    var columns = this._getColumnsFromState(game_state);
    var consolidated = columns.map(function(column) {
        return that._consolidateSet(column);
    });
    return this._columnsToState(consolidated);
}


GameModel.prototype._chunkArray = function(array, chunkSize) {
    var chunks = [];
    for (var i = 0, len = array.length; i < len; i += chunkSize)
        chunks.push(array.slice(i, i + chunkSize));
    return chunks;
}


module.exports = GameModel;
