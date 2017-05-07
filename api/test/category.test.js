'use strict'

let mongoose = require('mongoose')
let Category = require('../models/category.model')
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../index')
let should = chai.should()
let token = null

chai.use(chaiHttp)

describe('Category', () => {

  before((done) => {
    Category.remove({}, (err) => {
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

  describe('GET categories', () => {

    it('should GET all categories', (done) => {
      chai.request(server)
        .get('/api/categories')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.property('ok').equal(true)
          res.body.should.have.property('categories').be.a('array')
          res.body.categories.length.should.be.equal(0)
          done()
        })
    })
  })
  // end GET categories

  describe('GET category', () => {

    it('should get a category by its id', (done) => {
      let category = new Category({
        name: 'Äpfel',
        typeUid: 'asd123'
      })

      category.save((err, category) => {
        chai.request(server)
          .get('/api/categories/' + category._id)
          .send(category)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.have.property('ok').equal(true)
            res.body.should.have.property('category')
            res.body.category.should.have.property('_id').equal(category._id.toString())
            done()
          })
      })
    })

    it('should return a message if no category with given id is found', (done) => {
      chai.request(server)
        .get('/api/categories/notavalidid')
        .end((err, res) => {
          res.should.have.status(404)
          res.body.should.have.property('ok').equal(false)
          res.body.should.have.property('message').equal('Category not found')
          done()
        })
    })
  })
  // end GET category

  describe('POST category', () => {

    it('should POST a valid category', (done) => {
      let category = new Category({
        name: 'Äpfel',
        typeUid: 'asd123'
      })
      chai.request(server)
        .post('/api/categories')
        .set('x-access-token', token)
        .send(category)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.property('ok').equal(true)
          res.body.should.have.property('category')
          done()
        })
    })

    it('should not POST a category without a name', (done) => {
      let category = new Category({
        typeUid: 'asd123'
      })
      chai.request(server)
        .post('/api/categories')
        .set('x-access-token', token)
        .send(category)
        .end((err, res) => {
          res.should.have.status(412)
          res.body.should.have.property('ok').equal(false)
          res.body.should.have.property('message').equal('Missing fields')
          done()
        })
    })

    it('should not POST a category without a typeUid', (done) => {
      let category = new Category({
        name: 'Äpfel'
      })
      chai.request(server)
        .post('/api/categories')
        .set('x-access-token', token)
        .send(category)
        .end((err, res) => {
          res.should.have.status(412)
          res.body.should.have.property('ok').equal(false)
          res.body.should.have.property('message').equal('Missing fields')
          done()
        })
    })

  })
  // end POST category

  describe('PUT category', () => {

    it('should UPDATE and return a category', (done) => {
      let category1 = new Category({
        name: 'Äpfel',
        typeUid: 'asd123'
      })
      let category2 = new Category({
        name: 'Echtling',
        typeUid: 'asd123'
      })
      category1.save((err, category1) => {
        chai.request(server)
          .put('/api/categories/' + category1._id)
          .set('x-access-token', token)
          .send(category2)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.have.property('ok').equal(true)
            res.body.should.have.property('category')
            res.body.category.should.have.property('name').equal(category2.name)
            res.body.category.should.have.property('typeUid').equal(category2.typeUid)
            done()
          })
      })
    })

    it('should not UPDATE the category if it is not valid', (done) => {
      let category1 = new Category({
        name: 'Äpfel',
        typeUid: 'asd123'
      })
      let category2 = new Category({
        name: 'Echtling',
      })
      category1.save((err, category1) => {
        chai.request(server)
          .put('/api/categories/' + category1._id)
          .set('x-access-token', token)
          .send(category2)
          .end((err, res) => {
            res.should.have.status(412)
            res.body.should.have.property('ok').equal(false)
            res.body.should.have.property('message').equal('Missing fields')
            done()
          })
      })
    })

    it('should not UPDATE a category if the id is not valid', (done) => {
      let category1 = new Category({
        name: 'Äpfel',
        typeUid: 'asd123'
      })
      let category2 = new Category({
        name: 'Echtling',
        typeUid: 'asd123'
      })
      category1.save((err, category1) => {
        chai.request(server)
          .put('/api/categories/abc')
          .set('x-access-token', token)
          .send(category2)
          .end((err, res) => {
            res.should.have.status(404)
            res.body.should.have.property('ok').equal(false)
            res.body.should.have.property('message').equal('Category not found')
            done()
          })
      })
    })
  })
  // end PUT category

  describe('DELETE category', () => {

    it('should DELETE a category if it exists', (done) => {
      let category = new Category({
        name: 'Äpfel',
        typeUid: 'asd123'
      })
      category.save((err, category) => {
        chai.request(server)
          .delete('/api/categories/' + category._id)
          .set('x-access-token', token)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.have.property('ok').equal(true)
            res.body.should.have.property('message').equal('Successfully deleted')
            done()
          })
      })
    })

    it('should not DELETE a category with an invalid id', (done) => {
      chai.request(server)
        .delete('/api/categories/abc')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(404)
          res.body.should.have.property('ok').equal(false)
          res.body.should.have.property('message').equal('Category not found')
          done()
        })
    })
  })
  // end DELETE category

})
