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
    console.log(newState.playerTurn, payload.state.playerTeam);
      if(newState.playerTurn === payload.state.playerTeam) {
        newState.stateBoard = payload.state.stateBoard
        newState.playerTurn = payload.state.playerTurn
        //newState.playerTeam = state.playerTeam
        console.log(newState.playerTurn, payload.state.playerTeam);
        const column = newState.stateBoard[payload.column]
        for (var i = column.length-1; i >= 0; i--) {
          if(column[i].empty){
            column[i].empty = false
            column[i].counter = newState.playerTurn
            //checkWin here
            if (checkWinCell(newState.stateBoard, payload.column, i)) {
              console.log(`${ newState.playerTurn ? 'red wins' : 'yellow wins'}`)
            }

            break
          }
        }
        newState.playerTurn = !newState.playerTurn
      }

      return newState
    case 'SET_TEAM':
      newState.playerTeam = payload
      console.log("set team", payload);
      return newState
    case 'STORE_BOARD':
      newState.stateBoard = payload
      return newState
    default:
      return newState
  }
}
