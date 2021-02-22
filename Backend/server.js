const express = require('express')
const app = express()
const logger = require('morgan')
const cors = require('cors')

const config = require('./api/utils/config')
const db = require('./api/utils/db')
const v1Routes = require('./routes/routesWeb')
const v1RoutesAdmin = require('./routes/routesAdmin')

logger.token('date', () => {
  return new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
})
app.use(logger('[:date[]] :remote-addr ":method :url HTTP/:http-version" :status '))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

app.use('/api/v1', v1Routes)
app.use('/api/v1/admin', v1RoutesAdmin)

app.use('/admin-panel', express.static('build-admin'))
app.get('/admin-panel/*', (req, res) => {
  res.sendFile(__dirname + '/build-admin/index.html')
})
app.use('/', express.static('build-web'))
app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/build-web/index.html')
})

db.getConnection()
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Server Started at http://${config.host}:${config.port}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })

module.exports = app;