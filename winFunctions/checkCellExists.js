module.exports = (board, column, row) => {
  return (column >= 0 && column < board.length) && (row >= 0 && row < board[0].length)
}
