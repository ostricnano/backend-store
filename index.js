const express = require('express')
const routerApi = require('./app/routes/index')
const { logErrors, errorHandler } = require('./app/middlewares/error.handler')
const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})
routerApi(app)

/* Los middlewares tiene que ir despues del routerApi(app) */
app.use(logErrors)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
