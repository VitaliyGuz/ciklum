const chai = require('chai')
const chaiHttp = require('chai-http')
const redis = require('redis')
const app = require('../app')
const should = chai.should()
const sinon = require('sinon')
const assert = chai.assert
const echoAtTime = require('../echoAtTime.controller')

chai.use(chaiHttp)

describe('/POST echoAtTime', function () {
    it('it should return status 200', function (done) {
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

    it('it should print a message', function (done) {
            this.timeout(3000)
            let time = new Date()
            time.setSeconds(time.getSeconds() + 2)
            const body = {
                message: 'this message appears',
                time: time,
            }
            chai.request(app)
                .post('/echoAtTime')
                .send(body)
                .end(function (err, res) {
                })
            let spy = sinon.spy(console, 'log')
            setTimeout(function () {
                assert(spy.calledWith('this message appears'))
                spy.restore()
                done()
            }, 1000 * 2)
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


