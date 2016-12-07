'use strict'

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7Il9fdiI6ImluaXQiLCJpc0FkbWluIjoiaW5pdCIsInBhc3N3b3JkIjoiaW5pdCIsImVtYWlsIjoiaW5pdCIsInVzZXJuYW1lIjoiaW5pdCIsIl9pZCI6ImluaXQifSwic3RhdGVzIjp7Imlnbm9yZSI6e30sImRlZmF1bHQiOnt9LCJpbml0Ijp7Il9fdiI6dHJ1ZSwiaXNBZG1pbiI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsImVtYWlsIjp0cnVlLCJ1c2VybmFtZSI6dHJ1ZSwiX2lkIjp0cnVlfSwibW9kaWZ5Ijp7fSwicmVxdWlyZSI6e319LCJzdGF0ZU5hbWVzIjpbInJlcXVpcmUiLCJtb2RpZnkiLCJpbml0IiwiZGVmYXVsdCIsImlnbm9yZSJdfSwiZW1pdHRlciI6eyJkb21haW4iOm51bGwsIl9ldmVudHMiOnt9LCJfZXZlbnRzQ291bnQiOjAsIl9tYXhMaXN0ZW5lcnMiOjB9fSwiaXNOZXciOmZhbHNlLCJfZG9jIjp7Il9fdiI6MCwiaXNBZG1pbiI6dHJ1ZSwicGFzc3dvcmQiOiJzZWNyZXQiLCJlbWFpbCI6Imljb0Bnbml0by5hdCIsInVzZXJuYW1lIjoiQmVybmVhdSIsIl9pZCI6IjU4NDdlOGNkZjhiZjEwNTExYjQ3NmQyNCJ9LCJfcHJlcyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbbnVsbCxudWxsXSwiJF9fb3JpZ2luYWxfdmFsaWRhdGUiOltudWxsXSwiJF9fb3JpZ2luYWxfcmVtb3ZlIjpbbnVsbF19LCJfcG9zdHMiOnsiJF9fb3JpZ2luYWxfc2F2ZSI6W10sIiRfX29yaWdpbmFsX3ZhbGlkYXRlIjpbXSwiJF9fb3JpZ2luYWxfcmVtb3ZlIjpbXX0sImlhdCI6MTQ4MTExNTI3NiwiZXhwIjoxNDgxMjAxNjc2fQ.QSHMcPzGPY3gOjk0EOeANoSskR3-4rhXoTDnZTWUbeE'
let mongoose = require('mongoose')
let Product = require('../models/product.model')
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../index')
let should = chai.should()

chai.use(chaiHttp)

describe('Product', () => {

  beforeEach((done) => {
    Product.remove({}, (err) => {
      done()
    })
  })

  describe('GET products', () => {

    it('should GET all products', (done) => {
      chai.request(server)
        .get('/api/products')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body.length.should.be.eql(0)
          done()
        })
    })

    it('should not GET all products without a token', (done) => {
      chai.request(server)
        .get('/api/products')
        .end((err, res) => {
          res.should.have.status(412)
          res.body.should.be.a('object')
          res.body.should.have.property('message').eql('No token provided')
          done()
        })
    })

  })
  // end GET products

  describe('GET product', () => {

    it('should get a product by its id', (done) => {
      let product = new Product({
        name: 'Test',
        season: 'Winter',
        category: 2
      })

      product.save((err, product) => {
        chai.request(server)
        .get('/api/products/' + product._id)
        .set('x-access-token', token)
        .send(product)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('_id').eql(product._id.toString())
          done()
        })
      })
    })

    it('should return a message if no product with given id is found', (done) => {
      chai.request(server)
        .get('/api/products/notavalidid')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(404)
          res.body.should.be.a('object')
          res.body.should.have.property('message').eql('Product not found')
          done()
        })
    })

  })
  // end GET product

  describe('POST product', () => {

    it('should POST a valid product', (done) => {
      let product = {
        name: 'Test',
        description: 'Lorem ipsum',
        season: 'Autumn',
        imageUrl: 'www.test.to',
        category: 1
      }
      chai.request(server)
        .post('/api/products')
        .set('x-access-token', token)
        .send(product)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('_id')
          done()
        })
    })

    it('should not POST a product without a name', (done) => {
      let product = {
        description: 'Lorem ipsum',
        season: 'Autumn',
        imageUrl: 'www.test.to',
        category: 1
      }
      chai.request(server)
        .post('/api/products')
        .set('x-access-token', token)
        .send(product)
        .end((err, res) => {
          res.should.have.status(412)
          res.body.should.be.a('object')
          res.body.should.have.property('message').eql('Missing fields')
          done()
        })
    })

    it('should not POST a product without a season', (done) => {
      let product = {
        name: 'Test',
        description: 'Lorem ipsum',
        imageUrl: 'www.test.to',
        category: 1
      }
      chai.request(server)
        .post('/api/products')
        .set('x-access-token', token)
        .send(product)
        .end((err, res) => {
          res.should.have.status(412)
          res.body.should.be.a('object')
          res.body.should.have.property('message').eql('Missing fields')
          done()
        })
    })

    it('should not POST a product without a category', (done) => {
      let product = {
        name: 'Test',
        description: 'Lorem ipsum',
        season: 'Autumn',
        imageUrl: 'www.test.to'
      }
      chai.request(server)
        .post('/api/products')
        .set('x-access-token', token)
        .send(product)
        .end((err, res) => {
          res.should.have.status(412)
          res.body.should.be.a('object')
          res.body.should.have.property('message').eql('Missing fields')
          done()
        })
    })

  })
  // end POST product

})
// end product
