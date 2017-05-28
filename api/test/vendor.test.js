'use strict'

let mongoose = require('mongoose')
let Vendor = require('../models/vendor.model')
let User = require('../models/user.model')
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../index')
let should = chai.should()
let token = null

chai.use(chaiHttp)

describe('Vendor', () => {

  before((done) => {
    Vendor.remove({}, (err) => {
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

  describe('GET vendors', () => {

    it('should GET all vendors', (done) => {
      chai.request(server)
        .get('/api/vendors')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.property('ok').equal(true)
          res.body.should.have.property('vendors').be.a('array')
          res.body.vendors.length.should.be.equal(0)
          done()
        })
    })

  })
  // end GET vendors

  describe('GET vendor', () => {

    it('should get a vendor by its id', (done) => {
      let vendor = new Vendor({
        name: 'Bauernhof',
        userUid: 'asd123',
        email: 'bauern@hof.at'
      })

      vendor.save((err, vendor) => {
        chai.request(server)
        .get('/api/vendors/' + vendor._id)
        .send(vendor)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.property('ok').equal(true)
          res.body.should.have.property('vendor')
          res.body.vendor.should.have.property('_id').equal(vendor._id.toString())
          done()
        })
      })
    })

    it('should return a message if no vendor with given id is found', (done) => {
      chai.request(server)
        .get('/api/vendors/notavalidid')
        .end((err, res) => {
          res.should.have.status(404)
          res.body.should.have.property('ok').equal(false)
          res.body.should.have.property('message').equal('Vendor not found')
          done()
        })
    })

  })
  // end GET vendor

  describe('POST vendor', () => {

    it('should POST a valid vendor', (done) => {
      let vendor = new Vendor({
        name: 'Bauernhof',
        userUid: 'asd123',
        email: 'bauern@hof.at'
      })
      chai.request(server)
        .post('/api/vendors')
        .set('x-access-token', token)
        .send(vendor)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.property('ok').equal(true)
          res.body.should.have.property('vendor')
          done()
        })
    })

    it('should not POST a vendor without a name', (done) => {
      let vendor = new Vendor({
        userUid: 'asd123',
        email: 'bauern@hof.at'
      })
      chai.request(server)
        .post('/api/vendors')
        .set('x-access-token', token)
        .send(vendor)
        .end((err, res) => {
          res.should.have.status(412)
          res.body.should.have.property('ok').equal(false)
          res.body.should.have.property('message').equal('Missing fields')
          done()
        })
    })

    it('should not POST a vendor without a userUid', (done) => {
      let vendor = new Vendor({
        name: 'Bauernhof',
        email: 'bauern@hof.at'
      })
      chai.request(server)
        .post('/api/vendors')
        .set('x-access-token', token)
        .send(vendor)
        .end((err, res) => {
          res.should.have.status(412)
          res.body.should.have.property('ok').equal(false)
          res.body.should.have.property('message').equal('Missing fields')
          done()
        })
    })

    it('should not POST a vendor without a email', (done) => {
      let vendor = new Vendor({
        name: 'Bauernhof',
        userUid: 'asd123'
      })
      chai.request(server)
        .post('/api/vendors')
        .set('x-access-token', token)
        .send(vendor)
        .end((err, res) => {
          res.should.have.status(412)
          res.body.should.have.property('ok').equal(false)
          res.body.should.have.property('message').equal('Missing fields')
          done()
        })
    })

  })
  // end POST vendor

  describe('PUT vendor', () => {

    it('should UPDATE and return a vendor', (done) => {
      let vendor1 = new Vendor({
        name: 'Bauernhof',
        userUid: 'asd123',
        email: 'bauern@hof.at'
      })
      let vendor2 = new Vendor({
        name: 'Hüttn',
        userUid: 'asd123',
        email: 'bauern@hof.at'
      })
      vendor1.save((err, vendor1) => {
        chai.request(server)
        .put('/api/vendors/' + vendor1._id)
        .set('x-access-token', token)
        .send(vendor2)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.property('ok').equal(true)
          res.body.should.have.property('vendor')
          res.body.vendor.should.have.property('name').equal(vendor2.name)
          res.body.vendor.should.have.property('userUid').equal(vendor2.userUid)
          res.body.vendor.should.have.property('email').equal(vendor2.email)
          done()
        })
      })
    })

    it('should not UPDATE the vendor if it is not valid', (done) => {
      let vendor1 = new Vendor({
        name: 'Bauernhof',
        userUid: 'asd123',
        email: 'bauern@hof.at'
      })
      let vendor2 = new Vendor({
        userUid: 'asd123',
        email: 'bauern@hof.at'
      })
      vendor1.save((err, vendor1) => {
        chai.request(server)
        .put('/api/vendors/' + vendor1._id)
        .set('x-access-token', token)
        .send(vendor2)
        .end((err, res) => {
          res.should.have.status(412)
          res.body.should.have.property('ok').equal(false)
          res.body.should.have.property('message').equal('Missing fields')
          done()
        })
      })
    })

    it('should not UPDATE a vendor if the id is not valid', (done) => {
      let vendor1 = new Vendor({
        name: 'Bauernhof',
        userUid: 'asd123',
        email: 'bauern@hof.at'
      })
      let vendor2 = new Vendor({
        name: 'Hüttn',
        userUid: 'asd123',
        email: 'bauern@hof.at'
      })
      vendor1.save((err, vendor1) => {
        chai.request(server)
          .put('/api/vendors/abc')
          .set('x-access-token', token)
          .send(vendor2)
          .end((err, res) => {
            res.should.have.status(404)
            res.body.should.have.property('ok').equal(false)
            res.body.should.have.property('message').equal('Vendor not found')
            done()
          })
      })
    })

  })
  // end PUT vendor

  describe('DELETE vendor', () => {

    it('should DELETE a vendor if it exists', (done) => {
      let user = new User({
        email: 'abc@null.com',
        password: 'test',
        isAdmin: false
      })
      chai.request(server)
        .post('/api/users')
        .send(user)
        .end((err, res) => {

          let vendor = new Vendor({
            name: 'Bauernhof',
            userUid: res.body.user._id,
            email: 'bauern@hof.at'
          })
          vendor.save((err, vendor) => {
            chai.request(server)
            .delete('/api/vendors/' + vendor._id)
            .set('x-access-token', token)
            .end((err, res) => {
              res.should.have.status(200)
              res.body.should.have.property('ok').equal(true)
              res.body.should.have.property('message').equal('Successfully deleted vendor and associated user and products')
              done()
            })
          })

        })
    })

    it('should not DELETE a vendor with an invalid id', (done) => {
      chai.request(server)
        .delete('/api/vendors/abc')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(404)
          res.body.should.have.property('ok').equal(false)
          res.body.should.have.property('message').equal('Vendor not found')
          done()
        })
    })

  })
  // end DELETE vendor

})
