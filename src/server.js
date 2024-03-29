const express = require('express')
const path = require('path')
const { createServer } = require('http')
const { Server: WedSocketServer } = require('socket.io')
const formatMessage = require('./utils/message')
const { userJoin, getCurrentUser, getRoomUser, userLeave } = require('./utils/users')

const app = express()
app.use(express.static(path.join(__dirname, '../', 'public')))

const server = createServer(app)
const io = new WedSocketServer(server)
const nameBot = 'ChatApp Bot'

io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room)
    socket.join(user.room)

    socket.emit('message', formatMessage(nameBot, 'Welcome to Chat!'))
    socket.broadcast
      .to(user.room)
      .emit('message', formatMessage(nameBot, `${user.username} has joined the chat!`))
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUser(user.room),
    })
  })

  socket.on('chatMessage', message => {
    const { username, room } = getCurrentUser(socket.id)
    io.to(room).emit('message', formatMessage(username, message))
  })

  socket.on('disconnect', () => {
    const user = userLeave(socket.id)
    if (!user) return
    io.to(user.room).emit('message', formatMessage(nameBot, `${user.username} has left the chat!`))
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUser(user.room),
    })
  })
})

module.exports = server
