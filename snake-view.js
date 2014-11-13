(function(rootObject) {
	var SnakeGame = rootObject.SnakeGame = rootObject.SnakeGame || {};
		
	var View = SnakeGame.View = function(el) { 
		this.$el = el;
		this.board = new SnakeGame.Board();
		this.registerEvents();
		
		setInterval(step.bind(this), 500);
		
	};
	
	View.prototype.registerEvents = function(){
		var that = this;
		$(document).on('keydown', function(e) {
			if (e.keyCode === 37) {
				that.board.snake.turn('W');
			} else if (e.keyCode === 38) {
				that.board.snake.turn('N'); 
			} else if (e.keyCode === 39) {
				that.board.snake.turn('E');
			} else if (e.keyCode === 40) {
				that.board.snake.turn('S');
			}
		});
	};
	
	var step = function() {
		this.board.snake.move();
		this.board.render();
		this.renderView();
		
	};
	
	View.prototype.renderView = function() {
		var megaString = "";
		var things = this.board.stringBoard;

		for (var i = 0; i < things.length; i++){
			if (things[i] === "."){
				megaString += "<div class=\"spot\"></div>"
			} else if (things[i] === "s"){
				megaString += "<div class=\"snake\"></div>"
			} else if (things[i] === "a"){
				megaString += "<div class=\"apple\"></div>"
			}
		}


		this.$el.html(megaString);
	};
	
})(this);