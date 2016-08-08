function GameView($, $gameDiv, $historyDiv) {


  function refresh(game) {
     var state = game.currentState();
     $gameDiv.html(JSON.stringify(state))
     $historyDiv.html(JSON.stringify(game.history(), null, 2));
  }


  // Allow the app to call me
  this.refresh = refresh;
}


module.exports = GameView;
