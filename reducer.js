const checkWinCell = require('./winFunctions/checkWinCell')

module.exports = (state, action) => {
  var newState = require('clone')(state)
  var { type, payload } = action
  switch (type) {
    case 'INIT':
      return newState
    case 'STORE_MESSAGE':
      newState.messages.push(payload)
      return newState
    case 'CREATE_BOARD':
      var board = []
      for (var i = 0; i < 7; i++) {
        var row = []
        for (var j = 0; j < 6; j++) {
          row.push({empty: true, counter: false})
        }
        board.push(row)
      }
      newState.stateBoard = board
      return newState
    case 'TURN_ACTION':
      newState = payload.state
      const column = newState.stateBoard[payload.column]
      console.log(column)
      for (var i = column.length-1; i >= 0; i--) {
        if(column[i].empty){
          column[i].empty = false
          column[i].counter = newState.playerTurn
          //checkWin here
          checkWinCell(newState.stateBoard, payload.column, i)
          break
        }
      }

      newState.playerTurn = !newState.playerTurn
      return newState
    case 'STORE_BOARD':
      newState.stateBoard = payload
      return newState
    default:
      return newState
  }
}
