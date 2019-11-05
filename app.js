const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const basicAuth = require('express-basic-auth')

const app = express()

app.use(cors({ origin: true }))
app.use(bodyParser.json())

app.use(basicAuth({
  users: { 'root': 'toor' },
  challenge: true,
  realm: 'Imb4T3st4pp',
  unauthorizedResponse: req => req.auth
    ? 'Credentials invalid!'
    : 'No credentials provided!'
}))

app.get('/', (req, res) => {
  res.send(`Welcome ${req.auth.user}!`)
})

module.exports = app
