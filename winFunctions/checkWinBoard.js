const checkWinCell = require('./checkWinCell')

module.exports = (board) => {
  board.forEach((column, columnIndex) => {
    column.forEach((cell, rowIndex) => {
      if (!cell.empty)
        if (checkWinCell(board, columnIndex, rowIndex)) return cell;
    })
  })
  return false;
}
