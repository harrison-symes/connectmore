var yo = require('yo-yo')
var io = require('socket.io-client')

socket = io('http://localhost:3000')

function createComponent (dispatch) {
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
  return (state) => {
    const { title, messages } = state
    return yo`
      <div>
        <h1>${title}</h1>
        <hr>
        ${renderMessages(messages)}
        <input id='message' onchange=${sendMessage} onkeyup=${clearMessageOnSubmit} >
      </div>
    `
    function renderMessages (messages) {
      return yo`
      <div>
        ${messages.map((message) => yo`<p>${message}</p>`)}
      </div>
      `
    }

    function sendMessage(e){
      socket.emit('chat', e.target.value)
    }
    function clearMessageOnSubmit(e) {
      if(e.which == 13)e.currentTarget.value = ''
    }
  }
}



module.exports = createComponent
