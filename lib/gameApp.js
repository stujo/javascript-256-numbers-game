var game = new GameModel();
var view = new GameView(jQuery, $('#game'),$('#history'));

$(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
          game.left();
          view.refresh(game);
        break;

        case 38: // up
          game.up();
          view.refresh(game);
        break;

        case 39: // right
          game.right();
          view.refresh(game);
        break;

        case 40: // down
          game.down();
          view.refresh(game);
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});


view.refresh(game);
