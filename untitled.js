
var generateGrid = function() {
	var logicalGrid = []
	for (var i = 0; i < 35; i++) {
		logicalGrid.push([])
		for (var j = 0; j < 35; j++) {
			logicalGrid[i].push(j)
		}
	}
	return logicalGrid;
}

var render = function(){
	var segments = [[10, 10], [11, 10], [12, 10]]
	var superString = "";
	var grid = generateGrid();
	grid.forEach(function(row, rowInd){
		var flag = false;
		row.forEach(function(col, colInd){
			var pos = [rowInd, col].toString();
			segments.forEach(function(segment){
				console.log(segment.toString() + "xxxx" + pos)
				if (segment.toString() == pos){
					superString += "s";
				} else {
					superString += ".";
				}
			});
		});
		superString += "\n";
	});
	return superString;
};
	

segments.forEach(function(segPos) {
	if (segPos.toString() === gridPos.toString()) {
		flag = true;
	}
	if (flag){
		superString += "s";
	} else {
		superString += ".";
	}
	flag = false;
});