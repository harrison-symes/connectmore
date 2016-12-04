const checkCellExists = require('./checkCellExists')

solveVerticalUp = (board, column, row) => {
  var upCount = 0;
  // var stopped = false;
  // var rowDiff = -1
  // var wintype = board[column][row].counter
  // while(!stopped) {
  //   const cell = board[column][row + rowDiff]
  // //   if (checkCellExists(board, column, row) && !cell.empty && cell.counter == winType) {
  // //     rowDiff--
  // //     upCount++
  // //   } else stopped = true
  // // }
  return upCount
}

solveVerticalDown = (board, column, row) => {
    return 0
}

module.exports = (board, column, row) => {
  var count = (solveVerticalUp(board, column, row) + solveVerticalDown(board, column, row) + 1)
  return count >= 4
}
