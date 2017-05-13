'use strict'

let mongoose = require('mongoose')
let Postit = require('../models/postit.model')
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../index')
let should = chai.should()
let token = null

chai.use(chaiHttp)

describe('Postit', () => {

  before((done) => {
    Postit.remove({}, (err) => {
      done()
    })
  })

  before((done) => {
    chai.request(server)
      .post('/api/auth')
      .send({ email: 'ico@gnito.at', password: 'test' })
      .end((err, res) => {
        token = res.body.token
        done()
      })
  })

  describe('GET postits', () => {

    it('should GET all postits', (done) => {
      chai.request(server)
        .get('/api/postits')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.property('ok').equal(true)
          res.body.should.have.property('postits').be.a('array')
          res.body.postits.length.should.be.equal(0)
          done()
        })
    })
  })
  // end GET postits

  describe('GET postit', () => {

    it('should get a postit by its id', (done) => {
      let postit = new Postit({
        name: 'Wild',
        description: 'Nur für kurze Zeit',
        imageUrl: 'image.url'
      })

      postit.save((err, postit) => {
        chai.request(server)
          .get('/api/postits/' + postit._id)
          .send(postit)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.have.property('ok').equal(true)
            res.body.should.have.property('postit')
            res.body.postit.should.have.property('_id').equal(postit._id.toString())
            done()
          })
      })
    })

    it('should return a message if no postit with given id is found', (done) => {
      chai.request(server)
        .get('/api/postits/notavalidid')
        .end((err, res) => {
          res.should.have.status(404)
          res.body.should.have.property('ok').equal(false)
          res.body.should.have.property('message').equal('Postit not found')
          done()
        })
    })
  })
  // end GET postit

  describe('POST postit', () => {

    it('should POST a valid postit', (done) => {
      let postit = new Postit({
        name: 'Wild',
        description: 'Nur für kurze Zeit',
        imageUrl: 'image.url'
      })
      chai.request(server)
        .post('/api/postits')
        .set('x-access-token', token)
        .send(postit)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.property('ok').equal(true)
          res.body.should.have.property('postit')
          done()
        })
    })

    it('should not POST a postit without a name', (done) => {
      let postit = new Postit({
        description: 'Nur für kurze Zeit',
        imageUrl: 'image.url'
      })
      chai.request(server)
        .post('/api/postits')
        .set('x-access-token', token)
        .send(postit)
        .end((err, res) => {
          res.should.have.status(412)
          res.body.should.have.property('ok').equal(false)
          res.body.should.have.property('message').equal('Missing fields')
          done()
        })
    })

  })
  // end POST postit

  describe('PUT postit', () => {

    it('should UPDATE and return a postit', (done) => {
      let postit1 = new Postit({
        name: 'Wild',
        description: 'Nur für kurze Zeit',
        imageUrl: 'image.url'
      })
      let postit2 = new Postit({
        name: 'Schwein',
        description: 'Nur für lange Zeit',
        imageUrl: 'image.url'
      })
      postit1.save((err, postit1) => {
        chai.request(server)
          .put('/api/postits/' + postit1._id)
          .set('x-access-token', token)
          .send(postit2)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.have.property('ok').equal(true)
            res.body.should.have.property('postit')
            res.body.postit.should.have.property('name').equal(postit2.name)
            res.body.postit.should.have.property('description').equal(postit2.description)
            done()
          })
      })
    })

    it('should not UPDATE the postit if it is not valid', (done) => {
      let postit1 = new Postit({
        name: 'Wild',
        description: 'Nur für kurze Zeit',
        imageUrl: 'image.url'
      })
      let postit2 = new Postit({
        description: 'Nur für lange Zeit',
        imageUrl: 'image.url'
      })
      postit1.save((err, postit1) => {
        chai.request(server)
          .put('/api/postits/' + postit1._id)
          .set('x-access-token', token)
          .send(postit2)
          .end((err, res) => {
            res.should.have.status(412)
            res.body.should.have.property('ok').equal(false)
            res.body.should.have.property('message').equal('Missing fields')
            done()
          })
      })
    })

    it('should not UPDATE a postit if the id is not valid', (done) => {
      let postit1 = new Postit({
        name: 'Wild',
        description: 'Nur für kurze Zeit',
        imageUrl: 'image.url'
      })
      let postit2 = new Postit({
        name: 'Schwein',
        description: 'Nur für lange Zeit',
        imageUrl: 'image.url'
      })
      postit1.save((err, postit1) => {
        chai.request(server)
          .put('/api/postits/abc')
          .set('x-access-token', token)
          .send(postit2)
          .end((err, res) => {
            res.should.have.status(404)
            res.body.should.have.property('ok').equal(false)
            res.body.should.have.property('message').equal('Postit not found')
            done()
          })
      })
    })
  })
  // end PUT postit

  describe('DELETE postit', () => {

    it('should DELETE a postit if it exists', (done) => {
      let postit = new Postit({
        name: 'Wild',
        description: 'Nur für kurze Zeit',
        imageUrl: 'image.url'
      })
      postit.save((err, postit) => {
        chai.request(server)
          .delete('/api/postits/' + postit._id)
          .set('x-access-token', token)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.have.property('ok').equal(true)
            res.body.should.have.property('message').equal('Successfully deleted')
            done()
          })
      })
    })

    it('should not DELETE a postit with an invalid id', (done) => {
      chai.request(server)
        .delete('/api/postits/abc')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(404)
          res.body.should.have.property('ok').equal(false)
          res.body.should.have.property('message').equal('Postit not found')
          done()
        })
    })
  })
  // end DELETE postit

})
