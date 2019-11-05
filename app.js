const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const basicAuth = require('express-basic-auth')

const app = express()
const users = {}

app.use(cors({ origin: true }))
app.use(bodyParser.json())

/**
 * Get the username and respective password
 * by environemt variables. That way is easier
 * to change the valid credentials values
 * without the necessity to chnage the code.
 * 
 * Create a .env file if it does not exists.
 */
users[process.env.BASIC_AUTH_USERNAME] = process.env.BASIC_AUTH_PASSWORD

app.use(basicAuth({
  users,
  challenge: true,
  realm: 'Imb4T3st4pp',
  // Return an unathorized message if credentials
  // are invalid or not provided.
  unauthorizedResponse: req => req.auth
    ? 'Credentials invalid!'
    : 'No credentials provided!'
}))

app.get('/', (req, res) => {
  // In case of success authentication, show
  // the welcome message to the authenticated
  // user.
  res.send(`Welcome ${req.auth.user}!`)
})

module.exports = app
