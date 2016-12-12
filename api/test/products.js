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

  beforeEach((done) => {
    Product.remove({}, (err) => {
      done()
    })
  })

  beforeEach((done) => {
    chai.request(server)
      .post('/api/auth')
      .send({ username: 'Berneau', password: 'secret' })
      .end((err, res) => {
        token = res.body.token
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

  describe('PUT product', () => {

    it('should UPDATE and return a product', (done) => {
      let product1 = new Product({
        name: 'Test',
        season: 'Winter',
        category: 2
      })
      let product2 = new Product({
        name: 'Test2',
        season: 'Autumn',
        category: 1
      })
      product1.save((err, product1) => {
        chai.request(server)
        .put('/api/products/' + product1._id)
        .set('x-access-token', token)
        .send(product2)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('name').eql('Test2')
          res.body.should.have.property('season').eql('Autumn')
          res.body.should.have.property('category').eql(1)
          done()
        })
      })
    })

    it('should not UPDATE the product if it is not valid', (done) => {
      let product1 = new Product({
        name: 'Test',
        season: 'Winter',
        category: 2
      })
      let product2 = new Product({
        name: 'Test2',
        season: 'Autumn'
      })
      product1.save((err, product1) => {
        chai.request(server)
        .put('/api/products/' + product1._id)
        .set('x-access-token', token)
        .send(product2)
        .end((err, res) => {
          res.should.have.status(412)
          res.body.should.be.a('object')
          res.body.should.have.property('message').eql('Missing fields')
          done()
        })
      })
    })

    it('should not UPDATE a product if the id is not valid', (done) => {
      let product1 = new Product({
        name: 'Test',
        season: 'Winter',
        category: 2
      })
      let product2 = new Product({
        name: 'Test2',
        season: 'Autumn',
        category: 2
      })
      product1.save((err, product1) => {
        chai.request(server)
          .put('/api/products/abc')
          .set('x-access-token', token)
          .send(product2)
          .end((err, res) => {
            res.should.have.status(404)
            res.body.should.be.a('object')
            res.body.should.have.property('message').eql('Product not found')
            done()
          })
      })
    })

  })
  // end PUT product

  describe('DELETE product', () => {

    it('should DELETE a product if it exists', (done) => {
      let product1 = new Product({
        name: 'Test',
        season: 'Winter',
        category: 2
      })
      product1.save((err, product1) => {
        chai.request(server)
          .delete('/api/products/' + product1._id)
          .set('x-access-token', token)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('message').eql('Successfully deleted')
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
          res.body.should.be.a('object')
          res.body.should.have.property('message').eql('Product not found')
          done()
        })
    })

  })
  // end DELETE product

})
// end product
