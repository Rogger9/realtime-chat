const server = require('./server')
const PORT = process.env.PORT ?? 4000

;(async () => {
  await server.listen(PORT)
  console.log('serve on PORT', PORT)
})()
