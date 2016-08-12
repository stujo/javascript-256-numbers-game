function GameView($, $gameContainer, $historyContainer, $scoreContainer) {

    function refresh(game) {
        var details = game.currentDetails();

        if (details.finished) {
            $gameContainer.find('table').addClass('finished')
        }


        $gameContainer.find('td').removeClass();

        details.board.forEach(function(value, index) {
          var klazz = `value-${value}`;

          if(index === details.spawn_location){
              klazz += " spawned";
            }

            $gameContainer.find(`#cell-${index}`).html(value).addClass(klazz);
        });

        $historyContainer.html(game.history().concat().reverse().map(function(history) {
            return $('<div>').text(JSON.stringify(history));
        }));
        $scoreContainer.html(details.score);
    }

    function testAnimate() {
        // Slide a box from cell 0 to cell 3
        //debugger;
        var $cellFrom = $gameContainer.find('#cell-0');
        var $cellTo = $gameContainer.find('#cell-12');

        var offset = $cellFrom.offset();
        var $overlay = $('<td class="slider">S</td>');

        var offsetTo = $cellTo.offset();

        $overlay.css('top', offset.top);
        $overlay.css('left', offset.left);
        $overlay.css('width', $cellFrom.width());
        $overlay.css('height', $cellFrom.height());

        $($gameContainer).append($overlay);

        console.log(offsetTo);

        $overlay.animate({ top: offsetTo.top }, 1000, function() {
            $cellTo.html($overlay.html());
            $overlay.remove();
        });

    }


    // Allow the app to call me
    this.refresh = refresh;
    this.testAnimate = testAnimate
}

module.exports = GameView;
