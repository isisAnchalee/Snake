(function(rootObject) {
	var SnakeGame = rootObject.SnakeGame = rootObject.SnakeGame || {};
		
	var View = SnakeGame.View = function(el) { 
		this.$el = el;
		this.board = new SnakeGame.Board();
		this.registerEvents();
		this.session = setInterval(step.bind(this), 100);
		
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
		
		if (this.board.gameOver()){
			this.board.snake.move();
			this.renderView();
		} else {
			this.renderGameOver();
			clearInterval(this.session)
		}
	};
	
	View.prototype.renderGameOver = function(){
		var $overDiv = $('#gameOver');
		$overDiv.show();
	}
	
	View.prototype.renderView = function() {
		var megaString = "";
		var boardString = this.board.render();

		for (var i = 0; i < boardString.length; i++){
			if (boardString[i] === "."){
				megaString += "<div class=\"spot\"></div>"
			} else if (boardString[i] === "s"){
				megaString += "<div class=\"snake\"></div>"
			} else if (boardString[i] === "a"){
				megaString += "<div class=\"apple\"></div>"
			} else if (boardString[i] === 'r'){
				megaString += "<div class=\"rock\"></div>"
			}
		}


		this.$el.html(megaString);
	};
	
})(this);