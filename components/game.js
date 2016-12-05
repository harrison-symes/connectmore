var yo = require('yo-yo')
var io = require('socket.io-client')

socket = io('http://192.168.1.84:3000')

function CreateGame (dispatch) {
  function connected(){
    socket.on('server', (data) => {
      if(data != 'connected') dispatch({type: 'TURN_ACTION', payload: data})
    })
  }
  function listenForMessages(){
    socket.on('chat', (msg) => {
      if(msg == 'CLR'){
        socket.emit('clear', 'cleared')
      } else
      dispatch({type: 'STORE_MESSAGE', payload: msg})
    })
  }
  function listenForTurn(){
    socket.on('game', (data) => {
      dispatch({type: 'TURN_ACTION', payload: data})

    })
  }
  function listenForClear(){
    socket.on('clear', (e) => {
      dispatch({type: 'CREATE_BOARD'})
    })
  }
  connected()
  listenForMessages()
  listenForTurn()
  listenForClear()

  return (state) => {
    const { title, messages, stateBoard } = state
    return yo`
      <div>
        <h1>${title}</h1>
        <hr>
        <div class='container'>
          <div class="${state.playerTurn ? 'redTurn' : 'yellowTurn'}">
            <h1>It is ${state.playerTurn ? `Red's` : `Yellow's`} turn</h1>

          </div>
          <h2 class = ${state.playerTeam ? 'redTurn' : 'yellowTurn'}>
            You are in ${state.playerTeam ? 'Red' : 'Yellow'} team
          </h2>
          <div class='board'>
            ${renderBoard()}
          </div>
          <div class='messages'>
            ${renderMessages(messages)}
          </div>
          <input class='messageInput' onchange=${sendMessage} onkeyup=${clearMessageOnSubmit} >
        </div>
      </div>
    `
    function renderMessages (messages) {
      return yo`
      <div>
        <div>
          ${messages.map((message) => yo`<p>${message}</p>`)}
        </div>
      </div>
      `
    }
    function handleCounter (column) {
      sendTurn(column)

    }
    function sendMessage(e){
      if (e.target.value == "ST red") {
        dispatch({type: "SET_TEAM", payload: true})
      } else if (e.target.value == "ST yellow") {
        dispatch({type: "SET_TEAM", payload: false})
      } else socket.emit('chat', e.target.value)

    }
    function sendTurn(column){
      socket.emit('game', {state, column})
    }
    function clearMessageOnSubmit(e) {
      if(e.which == 13)e.currentTarget.value = ''
    }
    function renderBoard () {
      var board = []
      for (var i = 0; i < 6; i++) {
        var row = []
        for (var j = 0; j < 7; j++) {
          var counterColor = stateBoard[j][i].empty ? 'empty' : stateBoard[j][i].counter ? 'red' : 'yellow'
          row.push(yo`<img
            onclick=${(e) => {
              handleCounter(e.target.id)
            }}
            class=${counterColor+' hover'} id=${j}
            src='./resources/connect1.png'/>`)
        }
        board.push(yo`<div>${row}</div>`)
      }
      return board
    }
  }
}



module.exports = CreateGame
