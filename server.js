var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html')
})
var board = []
io.on('connection', (socket) => {
  socket.emit('server', 'connected')
  socket.on('game', (newBoard) => {
    board = newBoard
    console.log(newBoard)
    io.emit('game', newBoard)
  })
  socket.on('chat', (msg) => {
    console.log(msg)
    io.emit('chat', msg)
  })
})

http.listen(3000)
