const checkCellExists = require('./checkCellExists')

solveVerticalDown = (board, column, row) => {
  var upCount = 0;
  var stopped = false;
  var rowDiff = 1
  var winType = board[column][row].counter
  while(!stopped) {
    if (!checkCellExists(board, column, row + rowDiff)) {
      stopped = true;
      continue;
    } else {
      const cell = board[column][row + rowDiff]
      //console.log({cell});
      if (!cell.empty && cell.counter == winType) {
        rowDiff++
        upCount++
      } else stopped = true
    }
    if (upCount == 3) stopped = true
  }
  return upCount
}

module.exports = (board, column, row) => {
  var count = (solveVerticalDown(board, column, row) + 1)
  return count >= 4
}
