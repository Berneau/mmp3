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

      chai.request(server)
        .post('/api/users')
        .send(user)
        .end((err, res) => {

          chai.request(server)
          .post('/api/auth')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.have.property('ok').equal(true)
            res.body.should.have.property('token')
            res.body.should.have.property('user')
            res.body.user.should.not.have.property('password')
            res.body.user.should.not.have.property('hash')
            done()
          })

        })
    })

    it('should not return a token if the password and email dont match', (done) => {
      let user = new User({
        email: 'ico@gnito.at',
        password: 'secret',
        isAdmin: false
      })

      chai.request(server)
        .post('/api/auth')
        .send(user)
        .end((err, res) => {
          res.should.have.status(403)
          res.body.should.have.property('ok').equal(false)
          res.body.should.have.property('message').equal('Authentication failed.')
          done()
        })
    })

    it('should return missing token if no token is provided', (done) => {
      chai.request(server)
        .get('/api/users')
        .end((err, res) => {
          res.should.have.status(412)
          res.body.should.have.property('ok').equal(false)
          res.body.should.have.property('message').equal('No token provided')
          done()
        })

    })
  })
})
