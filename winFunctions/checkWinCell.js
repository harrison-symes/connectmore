
const checkCellHorizontal = require('./checkCellHorizontal')
const checkCellVertical = require('./checkCellVertical')
const checkCellDiagonal = require('./checkCellDiagonal')

module.exports = (board, column, row) => {
  if (checkCellVertical(board, Number(column), row)) return true
  if (checkCellHorizontal(board, Number(column), row)) return true
  if (checkCellDiagonal(board, Number(column), row)) return true
  return false
}
