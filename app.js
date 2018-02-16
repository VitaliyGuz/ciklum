const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const echoAtTime = require('./echoAtTime.controller')
const getAllMessages = require('./utils/getAllMessages')
const redis = require('redis')

const redisClient = redis.createClient({ host: 'localhost', port: 6379 })

getAllMessages(redisClient)


const app = express()

app.set('port', process.env.PORT || 3000)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/echoAtTime', echoAtTime(redisClient))

const server = http.createServer(app)
server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'))
})

module.exports = app; // for testing