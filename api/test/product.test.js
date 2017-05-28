'use strict'

let mongoose = require('mongoose')
let Product = require('../models/product.model')
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../index')
let should = chai.should()
let token = null

chai.use(chaiHttp)

describe('Product', () => {

  before((done) => {
    Product.remove({}, (err) => {
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

  describe('GET products', () => {

    it('should GET all products', (done) => {
      chai.request(server)
        .get('/api/products')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.property('products').be.a('array')
          res.body.should.have.property('ok').equal(true)
          res.body.products.length.should.be.equal(0)
          done()
        })
    })

  })
  // end GET products

  describe('GET product', () => {

    it('should GET a product by its id', (done) => {
      let product = new Product({
        name: 'Rote Äpfel',
        categoryId: 'asd123',
        vendor: 'abc',
        imageUrl: 'dev.null',
        availableAt: {
          fromPeriod: 'Anfang',
          fromMonth: 'Mai',
          toPeriod: 'Ende',
          toMonth: 'September'
        }
      })

      product.save((err, product) => {
        chai.request(server)
          .get('/api/products/' + product._id)
          .send(product)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.have.property('product')
            res.body.should.have.property('ok').equal(true)
            res.body.product.should.have.property('_id').equal(product._id.toString())
            done()
        })
      })
    })

    it('should return a message if no product with given id is found', (done) => {
      chai.request(server)
        .get('/api/products/notavalidid')
        .end((err, res) => {
          res.should.have.status(404)
          res.body.should.have.property('message').equal('Product not found')
          done()
        })
    })

  })
  // end GET product

  describe('POST product', () => {

    it('should POST a valid product', (done) => {
      let product = {
        name: 'Rote Äpfel',
        categoryId: 'asd123',
        vendor: 'abc',
        imageUrl: 'dev.null',
        availableAt: {
          fromPeriod: 'Anfang',
          fromMonth: 'Mai',
          toPeriod: 'Ende',
          toMonth: 'September'
        }
      }
      chai.request(server)
        .post('/api/products')
        .set('x-access-token', token)
        .send(product)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.property('ok').equal(true)
          res.body.should.have.property('product')
          done()
        })
    })

    it('should not POST a product without a name', (done) => {
      let product = {
        categoryId: 'asd123',
        vendor: {},
        imageUrl: 'dev.null',
        availableAt: {
          fromPeriod: 'Anfang',
          fromMonth: 'Mai',
          toPeriod: 'Ende',
          toMonth: 'September'
        }
      }
      chai.request(server)
        .post('/api/products')
        .set('x-access-token', token)
        .send(product)
        .end((err, res) => {
          res.should.have.status(412)
          res.body.should.have.property('ok').equal(false)
          res.body.should.have.property('message').equal('Missing fields')
          done()
        })
    })

    it('should not POST a product without a categoryId', (done) => {
      let product = {
        name: 'Rote Äpfel',
        vendor: {},
        imageUrl: 'dev.null',
        availableAt: {
          fromPeriod: 'Anfang',
          fromMonth: 'Mai',
          toPeriod: 'Ende',
          toMonth: 'September'
        }
      }
      chai.request(server)
        .post('/api/products')
        .set('x-access-token', token)
        .send(product)
        .end((err, res) => {
          res.should.have.status(412)
          res.body.should.have.property('ok').equal(false)
          res.body.should.have.property('message').equal('Missing fields')
          done()
        })
    })

    it('should not POST a product without a vendor', (done) => {
      let product = {
        name: 'Rote Äpfel',
        categoryId: 'asd123',
        imageUrl: 'dev.null',
        availableAt: {
          fromPeriod: 'Anfang',
          fromMonth: 'Mai',
          toPeriod: 'Ende',
          toMonth: 'September'
        }
      }
      chai.request(server)
        .post('/api/products')
        .set('x-access-token', token)
        .send(product)
        .end((err, res) => {
          res.should.have.status(412)
          res.body.should.have.property('ok').equal(false)
          res.body.should.have.property('message').equal('Missing fields')
          done()
        })
    })

  })
  // end POST product

  describe('PUT product', () => {

    it('should UPDATE and return a product', (done) => {
      let product1 = new Product ({
        name: 'Rote Äpfel',
        categoryId: 'asd123',
        vendor: 'abc',
        imageUrl: 'dev.eins',
        availableAt: {
          fromPeriod: 'Anfang',
          fromMonth: 'Mai',
          toPeriod: 'Ende',
          toMonth: 'September'
        }
      })
      let product2 = new Product({
        name: 'Grüne Äpfel',
        categoryId: 'qwe123',
        vendor: 'abc',
        imageUrl: 'dev.null',
        availableAt: {
          fromPeriod: 'Anfang',
          fromMonth: 'Mai',
          toPeriod: 'Ende',
          toMonth: 'September'
        }
      })
      product1.save((err, product1) => {
        chai.request(server)
        .put('/api/products/' + product1._id)
        .set('x-access-token', token)
        .send(product2)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.property('ok').equal(true)
          res.body.should.have.property('product')
          res.body.product.should.have.property('name').equal('Grüne Äpfel')
          res.body.product.should.have.property('imageUrl').equal('dev.null')
          res.body.product.should.have.property('categoryId').equal('qwe123')
          res.body.product.should.have.property('vendor')
          done()
        })
      })
    })

    it('should not UPDATE the product if it is not valid', (done) => {
      let product1 = new Product ({
        name: 'Rote Äpfel',
        categoryId: 'asd123',
        vendor: 'abc',
        imageUrl: 'dev.eins',
        availableAt: {
          fromPeriod: 'Anfang',
          fromMonth: 'Mai',
          toPeriod: 'Ende',
          toMonth: 'September'
        }
      })
      let product2 = new Product({
        categoryId: 'qwe123',
        vendor: {},
        imageUrl: 'dev.null',
        availableAt: {
          fromPeriod: 'Anfang',
          fromMonth: 'Mai',
          toPeriod: 'Ende',
          toMonth: 'September'
        }
      })
      product1.save((err, product1) => {
        chai.request(server)
        .put('/api/products/' + product1._id)
        .set('x-access-token', token)
        .send(product2)
        .end((err, res) => {
          res.should.have.status(412)
          res.body.should.have.property('ok').equal(false)
          res.body.should.have.property('message').equal('Missing fields')
          done()
        })
      })
    })

    it('should not UPDATE a product if the id is not valid', (done) => {
      let product1 = new Product ({
        name: 'Rote Äpfel',
        categoryId: 'asd123',
        vendor: {},
        imageUrl: 'dev.eins',
        availableAt: {
          fromPeriod: 'Anfang',
          fromMonth: 'Mai',
          toPeriod: 'Ende',
          toMonth: 'September'
        }
      })
      let product2 = new Product({
        name: 'Grüne Äpfel',
        categoryId: 'qwe123',
        vendor: {},
        imageUrl: 'dev.null',
        availableAt: {
          fromPeriod: 'Anfang',
          fromMonth: 'Mai',
          toPeriod: 'Ende',
          toMonth: 'September'
        }
      })
      product1.save((err, product1) => {
        chai.request(server)
          .put('/api/products/abc')
          .set('x-access-token', token)
          .send(product2)
          .end((err, res) => {
            res.should.have.status(404)
            res.body.should.have.property('ok').equal(false)
            res.body.should.have.property('message').equal('Product not found')
            done()
          })
      })
    })

  })
  // end PUT product

  describe('DELETE product', () => {

    it('should DELETE a product if it exists', (done) => {
      let product = new Product ({
        name: 'Grüne Äpfel',
        categoryId: 'qwe123',
        vendor: 'abc',
        imageUrl: 'dev.null',
        availableAt: {
          fromPeriod: 'Anfang',
          fromMonth: 'Mai',
          toPeriod: 'Ende',
          toMonth: 'September'
        }
      })
      product.save((err, product) => {
        chai.request(server)
          .delete('/api/products/' + product._id)
          .set('x-access-token', token)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.have.property('ok').equal(true)
            res.body.should.have.property('message').equal('Successfully deleted')
            done()
          })
      })
    })

    it('should not DELETE a product with an invalid id', (done) => {
      chai.request(server)
        .delete('/api/products/abc')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(404)
          res.body.should.have.property('ok').equal(false)
          res.body.should.have.property('message').equal('Product not found')
          done()
        })
    })

  })
  // end DELETE product

})
// end product
