'use strict'

let mongoose = require('mongoose')
let Event = require('../models/event.model')
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../index')
let should = chai.should()
let token = null

chai.use(chaiHttp)

describe('Event', () => {

  before((done) => {
    Event.remove({}, (err) => {
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

  describe('GET events', () => {

    it('should GET all events', (done) => {
      chai.request(server)
        .get('/api/events')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.property('ok').equal(true)
          res.body.should.have.property('events').be.a('array')
          res.body.events.length.should.be.equal(0)
          done()
        })
    })
  })
  // end GET events

  describe('GET event', () => {

    it('should GET an event by its id', (done) => {
      let event = new Event({
        name: 'Schranne',
        date: new Date(),
        description: 'Moakt füa ois'
      })

      event.save((err, event) => {
        chai.request(server)
          .get('/api/events/' + event._id)
          .send(event)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.have.property('ok').equal(true)
            res.body.should.have.property('event')
            res.body.event.should.have.property('_id').equal(event._id.toString())
            done()
          })
      })
    })

    it('should return a message if no event with given id is found', (done) => {
      chai.request(server)
        .get('/api/events/notavalidid')
        .end((err, res) => {
          res.should.have.status(404)
          res.body.should.have.property('ok').equal(false)
          res.body.should.have.property('message').equal('Event not found')
          done()
        })
    })

  })
  // end GET event

  describe('POST event', () => {

    it('should POST a valid event', (done) => {
      let event = new Event({
        name: 'Schranne',
        date: new Date(),
        description: 'Moakt füa ois'
      })
      chai.request(server)
        .post('/api/events')
        .set('x-access-token', token)
        .send(event)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.property('ok').equal(true)
          res.body.should.have.property('event')
          done()
        })
    })

    it('should not POST an event without a name', (done) => {
      let event = new Event({
        date: new Date(),
        description: 'Moakt füa ois'
      })
      chai.request(server)
        .post('/api/events')
        .set('x-access-token', token)
        .send(event)
        .end((err, res) => {
          res.should.have.status(412)
          res.body.should.have.property('ok').equal(false)
          res.body.should.have.property('message').equal('Missing fields')
          done()
        })
    })

    it('should not POST a event without a date', (done) => {
      let event = new Event({
        name: 'Schranne',
        description: 'Moakt füa ois'
      })
      chai.request(server)
        .post('/api/events')
        .set('x-access-token', token)
        .send(event)
        .end((err, res) => {
          res.should.have.status(412)
          res.body.should.have.property('ok').equal(false)
          res.body.should.have.property('message').equal('Missing fields')
          done()
        })
    })

  })
  // end POST event

  describe('PUT event', () => {

    it('should UPDATE and return an event', (done) => {
      let event1 = new Event({
        name: 'Schranne',
        date: new Date(),
        description: 'Moakt füa ois'
      })
      let event2 = new Event({
        name: 'Schranne',
        date: new Date(),
        description: 'Do ned ois'
      })
      event1.save((err, event1) => {
        chai.request(server)
          .put('/api/events/' + event1._id)
          .set('x-access-token', token)
          .send(event2)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.have.property('ok').equal(true)
            res.body.should.have.property('event')
            res.body.event.should.have.property('name').equal(event2.name)
            res.body.event.should.have.property('description').equal(event2.description)
            done()
          })
      })
    })

    it('should not UPDATE the event if it is not valid', (done) => {
      let event1 = new Event({
        name: 'Schranne',
        date: new Date(),
        description: 'Moakt füa ois'
      })
      let event2 = new Event({
        date: new Date(),
        description: 'Do ned ois'
      })
      event1.save((err, event1) => {
        chai.request(server)
          .put('/api/events/' + event1._id)
          .set('x-access-token', token)
          .send(event2)
          .end((err, res) => {
            res.should.have.status(412)
            res.body.should.have.property('ok').equal(false)
            res.body.should.have.property('message').equal('Missing fields')
            done()
          })
      })
    })

    it('should not UPDATE the event if the id is not valid', (done) => {
      let event1 = new Event({
        name: 'Schranne',
        date: new Date(),
        description: 'Moakt füa ois'
      })
      let event2 = new Event({
        date: new Date(),
        description: 'Do ned ois'
      })
      event1.save((err, event1) => {
        chai.request(server)
          .put('/api/events/abc')
          .set('x-access-token', token)
          .send(event2)
          .end((err, res) => {
            res.should.have.status(404)
            res.body.should.have.property('ok').equal(false)
            res.body.should.have.property('message').equal('Event not found')
            done()
          })
      })
    })

  })
  // end PUT event

  describe('DELETE event', () => {

    it('should DELETE an event if it exists', (done) => {
      let event = new Event({
        name: 'Schranne',
        date: new Date(),
        description: 'Moakt füa ois'
      })
      event.save((err, event) => {
        chai.request(server)
          .delete('/api/events/' + event._id)
          .set('x-access-token', token)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.have.property('ok').equal(true)
            res.body.should.have.property('message').equal('Successfully deleted')
            done()
          })
      })
    })

    it('should not DELETE a event with an invalid id', (done) => {
      chai.request(server)
        .delete('/api/events/abc')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(404)
          res.body.should.have.property('ok').equal(false)
          res.body.should.have.property('message').equal('Event not found')
          done()
        })
    })
  })
  // end DELETE event

})
