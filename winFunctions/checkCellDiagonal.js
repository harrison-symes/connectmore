const checkCellExists = require('./checkCellExists')

solveDiagonalTopLeft =(board, column, row) => {
  var diagCount = 0;
  var stopped = false;
  var indexDiff = -1
  var winType = board[column][row].counter
  while(!stopped) {
    if (!checkCellExists(board, (column + indexDiff), row + indexDiff)) {
      stopped = true;
      continue;
    } else {
      const cell = board[column + indexDiff][row + indexDiff]
      //console.log({cell});
      if (!cell.empty && cell.counter == winType) {
        indexDiff--
        diagCount++
      } else stopped = true
    }
    if (diagCount == 3) stopped = true
  }
  return diagCount
}

solveDiagonalBottomRight =(board, column, row) => {
  var diagCount = 0;
  var stopped = false;
  var indexDiff = 1
  var winType = board[column][row].counter
  while(!stopped) {
    if (!checkCellExists(board, (column + indexDiff), row + indexDiff)) {
      stopped = true;
      continue;
    } else {
      const cell = board[column + indexDiff][row + indexDiff]
      //console.log({cell});
      if (!cell.empty && cell.counter == winType) {
        indexDiff++
        diagCount++
      } else stopped = true
    }
    if (diagCount == 3) stopped = true
  }
  return diagCount
}

solveDiagonalBottomLeft =(board, column, row) => {
  var diagCount = 0;
  var stopped = false;
  var indexDiff = 1
  var winType = board[column][row].counter
  while(!stopped) {
    if (!checkCellExists(board, (column + (-1 * indexDiff)), row + indexDiff)) {
      stopped = true;
      continue;
    } else {
      const cell = board[column + (-1 * indexDiff)][row + indexDiff]
      //console.log({cell});
      if (!cell.empty && cell.counter == winType) {
        indexDiff++
        diagCount++
      } else stopped = true
    }
    if (diagCount == 3) stopped = true
  }
  
  return diagCount
}

solveDiagonalTopRight =(board, column, row) => {
  var diagCount = 0;
  var stopped = false;
  var indexDiff = 1
  var winType = board[column][row].counter
  while(!stopped) {
    if (!checkCellExists(board, (column + indexDiff), row + (-1 *indexDiff))) {
      stopped = true;
      continue;
    } else {
      const cell = board[column + indexDiff][row + (-1 * indexDiff)]
      //console.log({cell});
      if (!cell.empty && cell.counter == winType) {
        indexDiff++
        diagCount++
      } else stopped = true
    }
    if (diagCount == 3) stopped = true
  }
  return diagCount
}

module.exports = (board, column, row) => {
  var leftToRight = solveDiagonalTopLeft(board, column, row) + solveDiagonalBottomRight(board, column, row) + 1
  var rightToLeft = solveDiagonalBottomLeft(board, column, row) + solveDiagonalTopRight(board, column, row)+ 1
  console.log({rightToLeft});
  return leftToRight >= 4 || rightToLeft >= 4
}
