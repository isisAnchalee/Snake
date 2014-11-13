(function(rootObject) {
	var SnakeGame = rootObject.SnakeGame = rootObject.SnakeGame || {};
		
	var dirDeltas = {
		'N': [-1, 0],
		'S': [1, 0],
		'E': [0, 1],
		'W': [0, -1]
	};
	
	var opposites = {
		'N': 'S',
		'S': 'N',
		'E': 'W',
		'W': 'E'
	};
	
	var Snake = SnakeGame.Snake = function() {
		this.dir = "S";
		this.segments = [[10, 10], [11, 10], [12, 10]];
	};
	
	var combineArrays = function(arr1, arr2) {
		return [(arr1[0] + arr2[0]), (arr1[1] + arr2[1])];
	};
	
	Snake.prototype.move = function() {
		var that = this;
		var new_pos = combineArrays(this.segments[this.segments.length-1], dirDeltas[this.dir]);
		
		this.segments.push(new_pos);
		this.segments.shift();		
	};
	
	Snake.prototype.turn = function(dir) {
		if (!(opposites[this.dir] === dir)){
			this.dir = dir;
		}
	}
	
	var ourMoveLogic = function(direction, pos) {
		this.segments.push(combineArrays(dirDeltas[direction], pos));
		this.segments.shift();
	};
	
	var Board = SnakeGame.Board = function() { 
		this.logicalGrid = generateGrid();
		this.snake = new SnakeGame.Snake();
		this.stringBoard = "";

	};
	
	Board.prototype.render = function(){
		var superString = "";
		var that = this;
		var counter = 0;
		this.logicalGrid.forEach(function(row, rowInd){
			var flag = false;
			row.forEach(function(col, colInd){
				var pos = [rowInd, col].toString();
				var spot;
				that.snake.segments.forEach(function(segment){
					counter += 1;
					if (segment.toString() == pos){
						spot = "s";
					}
				});
				spot = spot || '.';
				superString += spot;
			});
			
			superString += "\n";
		});
		console.log(counter);
		this.stringBoard = superString;
		console.log(superString.length);
		return superString;
	};

	var generateGrid = function() {
		var logicalGrid = []
		for (var i = 0; i < 35; i++) {
			logicalGrid.push([])
			for (var j = 0; j < 35; j++) {
				logicalGrid[i].push(j)
			}
		}
		return logicalGrid;
	};
	
})(this);