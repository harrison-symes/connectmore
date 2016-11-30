var { createStore } = require('redux')
var { update } = require('yo-yo')
var reducer = require('./reducer')

var CreateApp = require('./components/app')

var initialState = {
  title: 'babeschat',
  messages: []
}

var { getState, dispatch, subscribe } = createStore(reducer, initialState)

var main = document.querySelector('main')
var initView = document.createElement('div')
main.appendChild(initView)

var App = CreateApp(dispatch)

subscribe(() => {
  var newView = App(getState())
  update(initView, newView)
})

dispatch({type: 'INIT'})
