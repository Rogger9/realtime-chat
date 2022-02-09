const express = require('express')
const path = require('path')
const { createServer } = require('http')
const socketio = require('socket.io')
const logger = require('./middlewares/loggerMiddleware')
const formatMessage = require('./utils/message')

const app = express()
app.use(express.static(path.join(__dirname, '../', 'public')))
app.use(logger)

const server = createServer(app)
const io = socketio(server)
const nameBot = 'ChatApp Bot'

io.on('connection', socket => {
  socket.emit('message', formatMessage(nameBot, 'Welcome to Chat!'))

  socket.broadcast.emit('message', formatMessage(nameBot, 'A user has joined the chat!'))

  socket.on('disconnect', () => io.emit('message', formatMessage(nameBot, 'A user has left the chat!')))

  socket.on('chatMessage', message => io.emit('message', formatMessage('USER', message)))
})

module.exports = server
