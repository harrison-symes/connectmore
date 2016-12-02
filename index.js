var { createStore } = require('redux')
var { update } = require('yo-yo')
var reducer = require('./reducer')

var CreateGame = require('./components/game')

var initialState = {
  title: 'Connect More',
  playerTurn: false,
  messages: [],
  stateBoard: []
}

var { getState, dispatch, subscribe } = createStore(reducer, initialState)

var main = document.querySelector('main')
var initView = document.createElement('div')
main.appendChild(initView)

dispatch({type: 'CREATE_BOARD'})

var Game = CreateGame(dispatch)

subscribe(() => {
  var newView = Game(getState())
  update(initView, newView)
})

dispatch({type: 'INIT'})
