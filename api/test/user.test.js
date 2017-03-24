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

  describe('GET users', () => {

    it('should GET all users', (done) => {
      chai.request(server)
        .get('/api/users')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          done()
        })
    })
  })

  describe('GET user', () => {

    it('should GET a user by id', (done) => {
      let user = new User({
        username: 'noob',
        password: 'noob',
        email: 'noob@boon.com',
        isAdmin: false
      })

      user.save((err, user) => {
        chai.request(server)
          .get('/api/users/' + user._id)
          .send(user)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('_id').eql(user._id.toString())
            done()
          })
      })
    })
  })

})
