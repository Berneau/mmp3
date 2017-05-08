'use strict'

let mongoose = require('mongoose')
let Type = require('../models/type.model')
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../index')
let should = chai.should()
let token = null

chai.use(chaiHttp)

describe('Type', () => {

  before((done) => {
    Type.remove({}, (err) => {
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

  describe('GET types', () => {

    it('should GET all types', (done) => {
      chai.request(server)
        .get('/api/types')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.property('ok').equal(true)
          res.body.should.have.property('types').be.a('array')
          res.body.types.length.should.be.equal(0)
          done()
        })
    })
  })
  // end GET types

  describe('GET type', (done) => {

    it('should get a type by its id', (done) => {
      let type = new Type({
        name: 'Gemüse'
      })
      type.save((err, type) => {
        chai.request(server)
        .get('/api/types/' + type._id)
        .send(type)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.property('ok').equal(true)
          res.body.should.have.property('type')
          res.body.type.should.have.property('_id').equal(type._id.toString())
          done()
        })
      })
    })

    it('should return a message if no type with given id is found', (done) => {
      chai.request(server)
        .get('/api/types/notavalidid')
        .end((err, res) => {
          res.should.have.status(404)
          res.body.should.have.property('ok').equal(false)
          res.body.should.have.property('message').equal('Type not found')
          done()
        })
    })
  })
  // end GET type

  describe('POST type', () => {

    it('should POST a valid type', (done) => {
      let type = new Type({
        name: 'Gemüse'
      })
      chai.request(server)
        .post('/api/types')
        .set('x-access-token', token)
        .send(type)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.property('ok').equal(true)
          res.body.should.have.property('type')
          done()
        })
    })

    it('should not POST a type without a name', (done) => {
      let type = new Type({
      })
      chai.request(server)
        .post('/api/types')
        .set('x-access-token', token)
        .send(type)
        .end((err, res) => {
          res.should.have.status(412)
          res.body.should.have.property('ok').equal(false)
          res.body.should.have.property('message').equal('Missing fields')
          done()
        })
    })
  })
  // end POST type

  describe('PUT type', () => {

    it('should UPDATE and return a type', (done) => {
      let type1 = new Type({
        name: 'Gemüse'
      })
      let type2 = new Type({
        name: 'Obst'
      })
      type1.save((err, type1) => {
        chai.request(server)
          .put('/api/types/' + type1._id)
          .set('x-access-token', token)
          .send(type2)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.have.property('ok').equal(true)
            res.body.should.have.property('type')
            res.body.type.should.have.property('name').equal(type2.name)
            done()
          })
      })
    })

    it('should not UPDATE the type if it is not valid', (done) => {
      let type1 = new Type({
        name: 'Gemüse'
      })
      let type2 = new Type({
      })
      type1.save((err, type1) => {
        chai.request(server)
          .put('/api/types/' + type1._id)
          .set('x-access-token', token)
          .send(type2)
          .end((err, res) => {
            res.should.have.status(412)
            res.body.should.have.property('ok').equal(false)
            res.body.should.have.property('message').equal('Missing fields')
            done()
          })
      })
    })

    it('should not UPDATE a type if the id is not valid', (done) => {
      let type1 = new Type({
        name: 'Gemüse'
      })
      let type2 = new Type({
        name: 'Obst'
      })
      type1.save((err, type1) => {
        chai.request(server)
          .put('/api/types/abc')
          .set('x-access-token', token)
          .send(type2)
          .end((err, res) => {
            res.should.have.status(404)
            res.body.should.have.property('ok').equal(false)
            res.body.should.have.property('message').equal('Type not found')
            done()
          })
      })
    })
  })
  // end PUT type

  describe('DELETE type', () => {

    it('should DELETE a type if it exists', (done) => {
      let type = new Type({
        name: 'Gemüse'
      })
      type.save((err, type) => {
        chai.request(server)
          .delete('/api/types/' + type._id)
          .set('x-access-token', token)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.have.property('ok').equal(true)
            res.body.should.have.property('message').equal('Successfully deleted')
            done()
          })
      })
    })

    it('should not DELETE a type with an invalid id', (done) => {
      chai.request(server)
        .delete('/api/types/abc')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(404)
          res.body.should.have.property('ok').equal(false)
          res.body.should.have.property('message').equal('Type not found')
          done()
        })
    })
  })
  // end DELETE type

})
