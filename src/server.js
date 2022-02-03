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

io.on('connection', socket => console.log('New WS connection...'))

const PORT = process.env.PORT ?? 4000
;(async () => {
  await server.listen(PORT)
  console.log('serve on PORT', PORT)
})()
// module.exports = server
