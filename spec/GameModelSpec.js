describe("GameModel", function() {
  var GameModel = require('../../lib/GameModel');
  var gameModel;

  beforeEach(function() {
    gameModel = new GameModel();
    song = new Song();
  });

  it("should be able to play a Song", function() {
    gameModel.play(song);
    expect(gameModel.currentlyPlayingSong).toEqual(song);

    //demonstrates use of custom matcher
    expect(gameModel).toBePlaying(song);
  });

  describe("when song has been paused", function() {
    beforeEach(function() {
      gameModel.play(song);
      gameModel.pause();
    });

    it("should indicate that the song is currently paused", function() {
      expect(gameModel.isPlaying).toBeFalsy();

      // demonstrates use of 'not' with a custom matcher
      expect(gameModel).not.toBePlaying(song);
    });

    it("should be possible to resume", function() {
      gameModel.resume();
      expect(gameModel.isPlaying).toBeTruthy();
      expect(gameModel.currentlyPlayingSong).toEqual(song);
    });
  });

  // demonstrates use of spies to intercept and test method calls
  it("tells the current song if the user has made it a favorite", function() {
    spyOn(song, 'persistFavoriteStatus');

    gameModel.play(song);
    gameModel.makeFavorite();

    expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
  });

  //demonstrates use of expected exceptions
  describe("#resume", function() {
    it("should throw an exception if song is already playing", function() {
      gameModel.play(song);

      expect(function() {
        gameModel.resume();
      }).toThrowError("song is already playing");
    });
  });
});
