module.exports = (state, action) => {
  var newState = require('clone')(state)
  var { type, payload } = action
  switch (type) {
    case 'INIT':
      return newState
    case 'STORE_MESSAGE':
      newState.messages.push(payload)
      return newState
    default:
      return newState
  }
}
