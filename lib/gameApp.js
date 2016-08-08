var game = new GameModel();
var view = new GameView(jQuery, $('#game'),$('#history'));

view.refresh(game);

game.right();

view.refresh(game);

game.up();

view.refresh(game);

game.left();

view.refresh(game);

game.down();

view.refresh(game);
