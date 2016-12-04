
//const checkCellHorizontal = require('./checkCellHorizontal')
const checkCellVertical = require('./checkCellVertical')
//const checkCellDiagonal = require('./checkCellDiagonal')

module.exports = (board, column, row) => {
  console.log("check win at ", column, row);
  //if (checkCellVertical(board, column, row)) return true
  // if (checkCellHorizontal(board, column, row)) return true
  // if (checkCellDiagonal(board, column, row)) return true
  return false
}
