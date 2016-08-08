describe("GameModel", function() {
    var GameModel = require('../lib/GameModel');
    var gameModel;
    var startingState;

    beforeEach(function() {
        gameModel = new GameModel('0000202000000002');
        startingState = [0,0,0,0,2,0,2,0,0,0,0,0,0,0,0,2];
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

    describe("#getRows", function() {
        it("should return 4 rows", function() {
            expect(gameModel.getRowsFromState(startingState)).toEqual([[0,0,0,0],[2,0,2,0],[0,0,0,0],[0,0,0,2]]);
        });
    });
});
