'use strict'

let mongoose = require('mongoose')
let User = require('../models/user.model')
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../index')
let should = chai.should()
let token = null

chai.use(chaiHttp)

describe('Auth', () => {

  before((done) => {
    User.remove({}, (err) => {
      done()
    })
  })

  describe('POST token', () => {

    it('should POST a user and return a token plus user if email and password is correct', (done) => {
      let user = new User({
        email: 'ico@gnito.at',
        password: 'test',
        isAdmin: true
      })

      user.save((err, user) => {
        chai.request(server)
        .post('/api/auth')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.property('ok').equal(true)
          res.body.should.have.property('token')
          res.body.should.have.property('user')
          done()
        })
      })
    })
  })
})
