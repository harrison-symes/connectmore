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
      const cell = newState.stateBoard[payload]
      console.log(cell);
      for (var i = cell.length-1; i >= 0; i--) {
        if(cell[i].empty){
          cell[i].empty = false
          cell[i].counter = newState.playerTurn
          break
        }
      }
      newState.playerTurn = !newState.playerTurn
      return newState
    default:
      return newState
  }
}
