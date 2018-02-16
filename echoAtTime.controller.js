const printMessage = require('./utils/printMessage')
const guid = require('./utils/guid')

function echoAtTime(redisClient) {
    return function echoAtTime(req, res) {
        const { message, time } = req.body
        const timeInMilliseconds = new Date(time) - new Date()
        if (timeInMilliseconds < 0) {
            res.status(500).send('time can not be in the past')
            return
        }
        redisClient.set(guid(), req.body.message, 'PX', timeInMilliseconds, function (err, reply) {
            if (err) throw new Error(err)
        })
        printMessage(message, timeInMilliseconds)
        res.status(200).end()
    }
}

module.exports = echoAtTime
