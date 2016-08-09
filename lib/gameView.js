function GameView($, $gameDiv, $historyDiv) {

  function refresh(game) {
     var state = game.currentState();

     $gameDiv.find('td').removeClass();

     state.forEach(function(value, index){
      $gameDiv.find(`#cell-${index}`).html(value).addClass(`value-${value}`);
     });
     
     $historyDiv.html(game.history().concat().reverse().map(function(history){
        return $('<div>').text(JSON.stringify(history));
     }));
  }

  // Allow the app to call me
  this.refresh = refresh;
}

module.exports = GameView;
