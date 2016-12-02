var yo = require('yo-yo')
var io = require('socket.io-client')

socket = io('http://localhost:3000')

function CreateGame (dispatch) {
  function listenForMessages(){
    socket.on('chat', (msg) => {
      dispatch({type: 'STORE_MESSAGE', payload: msg})
    })
  }
  function connected(){
    socket.on('server', (data) => {
    })
  }
  listenForMessages()

  function handleCounter (column) {
    dispatch({type: 'TURN_ACTION', payload: parseInt(column)})
  }
  return (state) => {
    const { title, messages, stateBoard } = state
    return yo`
      <div>
        <h1>${title}</h1>
        <hr>
        ${renderBoard()}
        ${renderMessages(messages)}
        <input id='message' onchange=${sendMessage} onkeyup=${clearMessageOnSubmit} >
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

    function sendMessage(e){
      socket.emit('chat', e.target.value)
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
