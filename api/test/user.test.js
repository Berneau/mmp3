'use strict'

let mongoose = require('mongoose')
let User = require('../models/user.model')
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../index')
let should = chai.should()
let token = null

chai.use(chaiHttp)

describe('User', () => {

  before((done) => {
    chai.request(server)
      .post('/api/auth')
      .send({ email: 'ico@gnito.at', password: 'test' })
      .end((err, res) => {
        token = res.body.token
        done()
      })
  })

  describe('GET users', () => {

    it('should GET all users', (done) => {
      chai.request(server)
        .get('/api/users')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.property('ok').equal(true)
          res.body.should.have.property('users')
          res.body.users.should.be.a('array')
          done()
        })
    })
  })

  describe('GET user', () => {

    it('should GET a user by id', (done) => {
      let user = new User({
        email: 'noob@boon.com',
        password: 'noob',
        isAdmin: false
      })

      user.save((err, user) => {
        chai.request(server)
          .get('/api/users/' + user._id)
          .set('x-access-token', token)
          .send(user)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.have.property('ok').equal(true)
            res.body.should.have.property('user')
            res.body.user.should.have.property('_id').eql(user._id.toString())
            done()
          })
      })
    })
  })

  describe('POST user', () => {

    it('should create a user if no fields are missing', (done) => {
      let user = new User({
        email: 'test@null.com',
        password: 'test',
        isAdmin: false
      })

      chai.request(server)
        .post('/api/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.property('ok').equal(true)
          res.body.should.have.property('user')
          done()
        })
    })
  })

})
