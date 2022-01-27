const express = require('express')
const path = require('path')
const logger = require('./middlewares/loggerMiddleware')

const app = express()

const { PORT } = process.env
app.set('port', PORT || 4000)

app.use(express.static(path.join(__dirname, '../', 'public')))

app.use(logger)

module.exports = app
