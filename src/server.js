const express = require('express')
const path = require('path')
const { createServer } = require('http')
const socketio = require('socket.io')
const logger = require('./middlewares/loggerMiddleware')

const app = express()
app.use(express.static(path.join(__dirname, '../', 'public')))
app.use(logger)

const server = createServer(app)
const io = socketio(server)

io.on('connection', socket => {
  socket.emit('message', 'Welcome to Chat!')

  socket.broadcast.emit('message', 'A user has joined the chat!')

  socket.on('disconnect', () => io.emit('message', 'A user has left the chat!'))

  socket.on('chatMessage', message => io.emit('message', message))
})

module.exports = server
