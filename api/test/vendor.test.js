'use strict'

let mongoose = require('mongoose')
let Vendor = require('../models/vendor.model')
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

  describe.skip('GET vendor', () => {

    it('should get a vendor by its id', (done) => {
      let vendor = new Vendor({
        name: 'Bauernhof',
        ownerName: 'Bauer',
        email: 'bauer@hof.at',
        category: 1,
        city: 'Lungau'
      })

      vendor.save((err, vendor) => {
        chai.request(server)
        .get('/api/vendors/' + vendor._id)
        .send(vendor)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('_id').eql(vendor._id.toString())
          done()
        })
      })
    })

    it('should return a message if no vendor with given id is found', (done) => {
      chai.request(server)
        .get('/api/vendors/notavalidid')
        .end((err, res) => {
          res.should.have.status(404)
          res.body.should.be.a('object')
          res.body.should.have.property('message').eql('Vendor not found')
          done()
        })
    })

  })
  // end GET vendor

  describe.skip('POST vendor', () => {

    it('should POST a valid vendor', (done) => {
      let vendor = new Vendor({
        name: 'Bauernhof',
        ownerName: 'Bauer',
        email: 'bauer@hof.at',
        category: 1,
        city: 'Lungau'
      })
      chai.request(server)
        .post('/api/vendors')
        .set('x-access-token', token)
        .send(vendor)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('_id')
          done()
        })
    })

    it('should not POST a vendor without a name', (done) => {
      let vendor = new Vendor({
        ownerName: 'Bauer',
        email: 'bauer@hof.at',
        category: 1,
        city: 'Lungau'
      })
      chai.request(server)
        .post('/api/vendors')
        .set('x-access-token', token)
        .send(vendor)
        .end((err, res) => {
          res.should.have.status(412)
          res.body.should.be.a('object')
          res.body.should.have.property('message').eql('Missing fields')
          done()
        })
    })

    it('should not POST a vendor without a ownerName', (done) => {
      let vendor = new Vendor({
        name: 'Bauernhof',
        email: 'bauer@hof.at',
        category: 1,
        city: 'Lungau'
      })
      chai.request(server)
        .post('/api/vendors')
        .set('x-access-token', token)
        .send(vendor)
        .end((err, res) => {
          res.should.have.status(412)
          res.body.should.be.a('object')
          res.body.should.have.property('message').eql('Missing fields')
          done()
        })
    })

    it('should not POST a vendor without a category', (done) => {
      let vendor = new Vendor({
        name: 'Bauernhof',
        ownerName: 'Bauer',
        email: 'bauer@hof.at',
        city: 'Lungau'
      })
      chai.request(server)
        .post('/api/vendors')
        .set('x-access-token', token)
        .send(vendor)
        .end((err, res) => {
          res.should.have.status(412)
          res.body.should.be.a('object')
          res.body.should.have.property('message').eql('Missing fields')
          done()
        })
    })

  })
  // end POST vendor

  describe.skip('PUT vendor', () => {

    it('should UPDATE and return a vendor', (done) => {
      let vendor1 = new Vendor({
        name: 'Bauernhof',
        ownerName: 'Bauer',
        email: 'bauer@hof.at',
        category: 1,
        city: 'Lungau'
      })
      let vendor2 = new Vendor({
        name: 'Hütte',
        ownerName: 'Bubi',
        email: 'bauer@hof.at',
        category: 2,
        city: 'Lungau'
      })
      vendor1.save((err, vendor1) => {
        chai.request(server)
        .put('/api/vendors/' + vendor1._id)
        .set('x-access-token', token)
        .send(vendor2)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('name').eql(vendor2.name)
          res.body.should.have.property('ownerName').eql(vendor2.ownerName)
          res.body.should.have.property('category').eql(vendor2.category)
          done()
        })
      })
    })

    it('should not UPDATE the vendor if it is not valid', (done) => {
      let vendor1 = new Vendor({
        name: 'Bauernhof',
        ownerName: 'Bauer',
        email: 'bauer@hof.at',
        category: 1,
        city: 'Lungau'
      })
      let vendor2 = new Vendor({
        name: 'Hütte',
        email: 'bauer@hof.at',
        category: 2,
        city: 'Lungau'
      })
      vendor1.save((err, vendor1) => {
        chai.request(server)
        .put('/api/vendors/' + vendor1._id)
        .set('x-access-token', token)
        .send(vendor2)
        .end((err, res) => {
          res.should.have.status(412)
          res.body.should.be.a('object')
          res.body.should.have.property('message').eql('Missing fields')
          done()
        })
      })
    })

    it('should not UPDATE a vendor if the id is not valid', (done) => {
      let vendor1 = new Vendor({
        name: 'Bauernhof',
        ownerName: 'Bauer',
        email: 'bauer@hof.at',
        category: 1,
        city: 'Lungau'
      })
      let vendor2 = new Vendor({
        name: 'Hütte',
        ownerName: 'Bubi',
        email: 'bauer@hof.at',
        category: 2,
        city: 'Lungau'
      })
      vendor1.save((err, vendor1) => {
        chai.request(server)
          .put('/api/vendors/abc')
          .set('x-access-token', token)
          .send(vendor2)
          .end((err, res) => {
            res.should.have.status(404)
            res.body.should.be.a('object')
            res.body.should.have.property('message').eql('Vendor not found')
            done()
          })
      })
    })

  })
  // end PUT vendor

  describe.skip('DELETE vendor', () => {

    it('should DELETE a vendor if it exists', (done) => {
      let vendor = new Vendor({
        name: 'Bauernhof',
        ownerName: 'Bauer',
        email: 'bauer@hof.at',
        category: 1,
        city: 'Lungau'
      })
      vendor.save((err, vendor1) => {
        chai.request(server)
          .delete('/api/vendors/' + vendor._id)
          .set('x-access-token', token)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('message').eql('Successfully deleted')
            done()
          })
      })
    })

    it('should not DELETE a vendor with an invalid id', (done) => {
      chai.request(server)
        .delete('/api/vendors/abc')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(404)
          res.body.should.be.a('object')
          res.body.should.have.property('message').eql('Vendor not found')
          done()
        })
    })

  })
  // end DELETE vendor

})
