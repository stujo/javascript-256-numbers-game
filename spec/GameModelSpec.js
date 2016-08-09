describe("GameModel", function() {
    var GameModel = require('../lib/GameModel');
    var gameModel;
    var startingState;

    beforeEach(function() {
        gameModel = new GameModel('0000202000000002');
        startingState = [0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2];
    });

    describe("#toString", function() {
        it("should return game state as string", function() {
            expect(gameModel.toString()).toEqual('0000202000000002');
        });
    });

    describe("#currentState", function() {
        it("should return game state", function() {
            expect(gameModel.currentState()).toEqual(startingState);
        });
    });

    describe("#currentDetails", function() {
        it("should include last move", function() {
            gameModel.left();
            expect(gameModel.currentDetails().move).toEqual('left');
        });
        it("should include board state", function() {
            expect(gameModel.currentDetails().board).toEqual(startingState);
        });
        it("should include finished state", function() {
            gameModel.right();
            expect(gameModel.currentDetails().finished).toEqual(false);
        });
        it("should include score", function() {
            expect(gameModel.currentDetails().score).toEqual(6);
        });
    });

    describe("#getRowsFromState", function() {
        it("should return 4 rows", function() {
            expect(gameModel.getRowsFromState(startingState)).toEqual([
                [0, 0, 0, 0],
                [2, 0, 2, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 2]
            ]);
        });
    });

    describe("#getColumnsFromState", function() {
        it("should return 4 columns", function() {
            expect(gameModel.getColumnsFromState(startingState)).toEqual([
                [0, 2, 0, 0],
                [0, 0, 0, 0],
                [0, 2, 0, 0],
                [0, 0, 0, 2]
            ]);
        });
    });



    describe("#consolidateSet", function() {
        it("should return blank row", function() {
            expect(gameModel.consolidateSet([0, 0, 0, 0])).toEqual([0, 0, 0, 0]);
        });

        it("should move zeros to end", function() {
            expect(gameModel.consolidateSet([2, 0, 0, 4])).toEqual([2, 4, 0, 0]);
        });

        it("should combine twos to a four", function() {
            expect(gameModel.consolidateSet([2, 0, 2, 0])).toEqual([4, 0, 0, 0]);
        });

        it("should not combine 2420", function() {
            expect(gameModel.consolidateSet([2, 4, 2, 0])).toEqual([2, 4, 2, 0]);
        });

        it("should combine 8008", function() {
            expect(gameModel.consolidateSet([8, 0, 0, 8])).toEqual([16, 0, 0, 0]);
        });

    });

    describe("#columnsToState", function() {
        it("join columns", function() {
            expect(gameModel.columnsToState([
                [2, 0, 0, 4],
                [2, 0, 0, 0],
                [0, 4, 0, 0],
                [0, 0, 0, 2]
            ])).toEqual([2, 2, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 4, 0, 0, 2]);
        });
    });

    describe("#rowsToState", function() {
        it("join rows", function() {
            expect(gameModel.rowsToState([
                [2, 0, 0, 4],
                [2, 0, 0, 0],
                [0, 4, 0, 0],
                [0, 0, 0, 2]
            ])).toEqual([2, 0, 0, 4, 2, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 2]);
        });
    });


    describe("#left_impl", function() {
        it("should combine the 4s to the left", function() {
            expect(gameModel.left_impl(startingState)).toEqual([
                0, 0, 0, 0,
                4, 0, 0, 0,
                0, 0, 0, 0,
                2, 0, 0, 0
            ]);
        });
    });

    describe("#right_impl", function() {
        it("should combine the 4's to the right", function() {
            expect(gameModel.right_impl(startingState)).toEqual([
                0, 0, 0, 0,
                0, 0, 0, 4,
                0, 0, 0, 0,
                0, 0, 0, 2
            ]);
        });
    });

    describe("#up_impl", function() {
        it("should move 2's to top row", function() {
            expect(gameModel.up_impl(startingState)).toEqual([
                2, 0, 2, 2,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0
            ]);
        });
    });
    describe("#down_impl", function() {
        it("should move 2's to top row", function() {
            expect(gameModel.down_impl(startingState)).toEqual([
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
                2, 0, 2, 2
            ]);
        });
    });

    describe('#boardsEqual', function(){
        it("should return true", function() {
            expect(gameModel.boardsEqual(startingState, startingState.slice(0))).toEqual(true);
        });
        it("should return false", function() {
            var altered = startingState.slice(0);
            altered[altered.length - 1] = altered[altered.length - 1] + 1;
            expect(gameModel.boardsEqual(startingState, altered)).toEqual(false);
        });
    });

    describe("#spawnLocation ", function() {
        it("should only pick empty locations", function() {
            expect(gameModel.spawnLocation([6,7,80])).toBeAnyOf([
                80,7,6
            ]);
        });
    });


});
