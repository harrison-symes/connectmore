var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  socket.emit('server', 'Connected to connect more')
  socket.on('chat', (msg) => {
    console.log(msg)
    io.emit('chat', msg)
  })
})

http.listen(3000)
