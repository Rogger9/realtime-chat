const app = require('./server')
const port = app.get('port')

;(async () => {
  await app.listen(port)
  console.log('serve on PORT', port)
})()
