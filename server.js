var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html')
})
var globalState = 'connected'
io.on('connection', (client) => {
  console.log(io);
  client.emit('server', globalState)
  client.on('game', (data) => {
    globalState = data
    io.emit('game', data)
  })
  client.on('chat', (msg) => {
    io.emit('chat', msg)
  })
  client.on('clear', (e) => {
    globalState = 'connected'
    io.emit('clear', e)
  })
})

http.listen(3000)
