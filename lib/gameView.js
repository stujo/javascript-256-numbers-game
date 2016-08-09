function GameView($, $gameContainer, $historyContainer, $scoreContainer) {

  function refresh(game) {
     var details = game.currentDetails();

     $gameContainer.find('td').removeClass();

     details.board.forEach(function(value, index){
      $gameContainer.find(`#cell-${index}`).html(value).addClass(`value-${value}`);
     });
     
     $historyContainer.html(game.history().concat().reverse().map(function(history){
        return $('<div>').text(JSON.stringify(history));
     }));
     $scoreContainer.html(details.score);
  }

  // Allow the app to call me
  this.refresh = refresh;
}

module.exports = GameView;
