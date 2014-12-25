(function () {
  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var Coord = SnakeGame.Coord = function (i, j) {
    this.i = i;
    this.j = j;
  };

  Coord.prototype.equals = function (coord2) {
    return (this.i == coord2.i) && (this.j == coord2.j);
  };

  Coord.prototype.isOpposite = function (coord2) {
    return (this.i == (-1 * coord2.i)) && (this.j == (-1 * coord2.j));
  }

  Coord.prototype.plus = function (coord2) {
    return new Coord(this.i + coord2.i, this.j + coord2.j);
  };

  var Apple = SnakeGame.Apple = function (board) {
    this.board = board;
    this.replace();
  };

  var Stone = SnakeGame.Stone = function(board){}

  Apple.prototype.replace = function () {
    var x = Math.floor(Math.random() * 35);
    var y = Math.floor(Math.random() * 35);

    this.position = new Coord(x,y);
  };

  var Snake = SnakeGame.Snake = function (board) {
    this.dir = "N";
    this.board = board;
    var center = new Coord(Math.floor(35 / 2), Math.floor(35 / 2));
    this.segments = [center];

    this.growTurns = 0;
  };

  Snake.DIFFS = {
    "N": new Coord(-1, 0),
    "E": new Coord(0, 1),
    "S": new Coord(1, 0),
    "W": new Coord(0, -1)
  };

  Snake.prototype.head = function () {
    return this.segments[this.segments.length - 1];
  };

  Snake.prototype.isValid = function () {
    var head = this.head();

    if (!this.board.validPosition(this.head())) {
      return false;
    }

    for (var i = 0; i < this.segments.length - 1; i++) {
      if (this.segments[i].equals(head)) {
        return false;
      }
    }

    return true;
  };

  Snake.prototype.move = function () {

    this.segments.push(this.head().plus(Snake.DIFFS[this.dir]));
		
    if (this.eatApple()) {
       this.board.apple.replace();
     }
		 
    if (this.growTurns > 0) {
      this.growTurns -= 1;
    } else {
      this.segments.shift();
    }
		
    if (!this.isValid()) {
      this.segments = [];
    }
  };

  Snake.prototype.turn = function (dir) {
    if ((this.segments.length > 1) &&
      Snake.DIFFS[this.dir].isOpposite(Snake.DIFFS[dir])) {
      return;
    } else {
      this.dir = dir;
    }
  };
	
  Snake.prototype.eatApple = function () {
		var that = this;
		this.board.apples.forEach(function(apple, i){
	    if (that.head().equals(apple.position)) {
	      that.growTurns += 3;
				that.removeApple(apple, i)
	      return true;
	    } else {
	      return false;
	    }
		});
  };

  Snake.prototype.removeApple = function (apple, i) {
    var newApple = new Apple(this);
    this.board.apples.splice(i, 1, newApple);
  };

  var Board = SnakeGame.Board = function () {
    this.apples = [ new Apple(this), new Apple(this) ]
    this.snake = new Snake(this);
    this.rocks = [];
  };

	Board.prototype.gameOver = function(){
		var currentPos = this.snake.head();

		return this.validPosition(currentPos)
	}

  Board.blankGrid = function (dim) {
    var grid = [];

    for (var i = 0; i < dim; i++) {
      var row = [];
      for (var j = 0; j < dim; j++) {
        row.push(".");
      }
      grid.push(row);
    }

    return grid;
  };

  Board.prototype.render = function () {
    var grid = Board.blankGrid(35);

    this.snake.segments.forEach(function (segment) {
      grid[segment.i][segment.j] = "s";
    });
		
		this.apples.forEach(function (apple){
			 grid[apple.position.i][apple.position.j] = "a";
		});
    
    var gridString = grid.map(function (row) {
      return row.join("");
    }).join("\n");
		return gridString
		
  };
	
  Board.prototype.validPosition = function (coord) {

    return coord && (coord.i >= 0) && (coord.i <= 35) && (coord.j >= 0) && (coord.j <= 35) && (coord !== undefined);
  };
})();