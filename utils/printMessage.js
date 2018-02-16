function printMessage(message, time) {
    setTimeout(function () {
        console.log(message)
    }, time)
}

module.exports = printMessage
