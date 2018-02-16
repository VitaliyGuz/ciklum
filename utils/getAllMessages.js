const printMessage = require('./printMessage')

function getAllMessages(redisClient) {
    redisClient.keys('key*', function (err, keys) {
        if (err) return console.log(err)
        const multi = redisClient.multi()

        keys.forEach(function (key) {
            multi.ttl(key.toString())
        })
        multi.exec(function (err2, ttls) {
            ttls.forEach(function (value, index) {
                redisClient.get(keys[index].toString(), function (err, message) {
                    printMessage(message, value * 1000)
                })
            })
        })
    })
}

module.exports = getAllMessages