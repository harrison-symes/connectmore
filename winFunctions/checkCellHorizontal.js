const checkCellExists = require('./checkCellExists')

solveHorizontalRight = (board, row, column) => {
  var rightCount = 0;
  var stopped = false;
  var colDiff = 1
  var winType = board[column][row].counter
  while(!stopped) {
    if (!checkCellExists(board, (column + colDiff), row)) {
      stopped = true;
      continue;
    } else {
      const cell = board[column + colDiff][row]
      //console.log({cell});
      if (!cell.empty && cell.counter == winType) {
        colDiff++
        rightCount++
      } else stopped = true
    }
    if (rightCount == 3) stopped = true
  }
  return rightCount
}

solveHorizontalLeft = (board, row, column) => {
  var leftCount = 0;
  var stopped = false;
  var colDiff = -1
  var winType = board[column][row].counter
  while(!stopped) {
    if (!checkCellExists(board, (column + colDiff), row)) {
      stopped = true;
      continue;
    } else {
      const cell = board[column + colDiff][row]
      //console.log({cell});
      if (!cell.empty && cell.counter == winType) {
        colDiff--
        leftCount++
      } else stopped = true
    }
    if (leftCount == 3) stopped = true
  }
  return leftCount
}

module.exports = (board, row, column) => {
  var count = (solveHorizontalRight(board, column, row) + solveHorizontalLeft(board, column, row) + 1)
  return count >= 4
}
