const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const should = chai.should()

chai.use(chaiHttp)

describe('/POST echoAtTime', function () {
    it('it should print a message', function (done) {
            let time = new Date()
            time.setMinutes(time.getMinutes() + 1)
            const body = {
                message: 'this message appears',
                time: time,
            }
            chai.request(app)
                .post('/echoAtTime')
                .send(body)
                .end(function (err, res) {
                    res.should.have.status(200)
                    done()
                })
        }
    )

    it('it should return en error', function (done) {
            let time = new Date()
            time.setMinutes(time.getMinutes() - 1)
            const body = {
                message: 'this message will never appear',
                time: time,
            }
            chai.request(app)
                .post('/echoAtTime')
                .send(body)
                .end(function (err, res) {
                    res.should.have.status(500)
                    done()
                })
        }
    )
})


