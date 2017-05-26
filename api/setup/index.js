'use strict'

let mongoose = require('mongoose')
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../index')

let User = require('../models/user.model')
let Vendor = require('../models/vendor.model')
let Type = require('../models/type.model')
let Category = require('../models/category.model')
let Product = require('../models/product.model')
let Event = require('../models/event.model')
let Postit = require('../models/postit.model')

chai.use(chaiHttp)

mongoose.connect('mongodb://127.0.0.1:27017/lungau_db', function() {
  mongoose.connection.once('connected', function() {
    mongoose.connection.db.dropDatabase(console.log('lungau_db dropped'))
  })
})

let token = null

let user1 = new User({
  email: 'jasmin@admin.at',
  password: 'secret',
  isAdmin: true
})
let user2 = new User({
  email: 'elfriede@hof.at',
  password: 'secret',
  isAdmin: false
})
let user3 = new User({
  email: 'bertl@hof.at',
  password: 'secret',
  isAdmin: false
})

let vendor1 = new Vendor({
  name: 'Elfriede Hackl',
  userUid: '',
  email: 'elfriede@hof.at',
  description: 'Sonniges Platzal',
  imageUrl: 'vendor.png',
  farmImageUrl: 'farm.png',
  subName: 'Hacklhof',
  website: 'abc.com',
  tel: 0815123123,
  address: {
    city: 'Salzburg',
    zip: 5020,
    street: 'Landstraße 2',
    lat: 47.846384,
    long: 13.052578
  }
})
let vendor2 = new Vendor({
  name: 'Herbert Schmid',
  userUid: '',
  email: 'bertl@hof.at',
  description: 'Direkt am Fluß',
  imageUrl: 'vendor.png',
  farmImageUrl: 'farm.png',
  subName: 'Schmittnhüttn',
  website: 'abc.com',
  tel: 0815123123,
  address: {
    city: 'Bergheim',
    zip: 5101,
    street: 'Hauptstraße 25',
    lat: 47.758271,
    long: 13.063993
  }
})

let type1 = new Type({
  name: 'Gemüse'
})
let type2 = new Type({
  name: 'Obst'
})
let type3 = new Type({
  name: 'Käse'
})

let category1 = new Category({
  name: 'Echtling',
  typeUid: '',
  imageUrl: 'category.png'
})
let category2 = new Category({
  name: 'Kürbisse',
  typeUid: '',
  imageUrl: 'category.png'
})
let category3 = new Category({
  name: 'Äpfel',
  typeUid: '',
  imageUrl: 'category.png'
})
let category4 = new Category({
  name: 'Schnitzereien',
  typeUid: '',
  imageUrl: 'category.png'
})
let product1 = new Product({
  name: 'Grüne Äpfel',
  categoryId: '',
  vendor: '',
  availableAt: {
    fromPeriod: 'Anfang',
    fromMonth: 'April',
    toPeriod: 'Ende',
    toMonth: 'September'
  },
  imageUrl: 'product.png'
})
let product2 = new Product({
  name: 'Hokkaido Kürbis',
  categoryId: '',
  vendor: '',
  availableAt: {
    fromPeriod: 'Anfang',
    fromMonth: 'April',
    toPeriod: 'Ende',
    toMonth: 'September'
  },
  imageUrl: 'product.png'
})
let product3 = new Product({
  name: 'Mehlige Echtling',
  categoryId: '',
  vendor: '',
  availableAt: {
    fromPeriod: 'Anfang',
    fromMonth: 'April',
    toPeriod: 'Ende',
    toMonth: 'September'
  },
  imageUrl: 'product.png'
})
let event1 = new Event({
  name: 'Schranne',
  date: new Date(),
  description: 'Moakt füa ois',
  location: {
    name: 'Mirabellplatz',
    lat: 47.805761,
    long: 13.043496
  }
})
let event2 = new Event({
  name: 'Grünmarkt',
  date: new Date(),
  description: 'Grüner Moakt',
  location: {
    name: 'Salzburg Altstadt',
    lat: 47.799514,
    long: 13.043281
  }
})
let postit1 = new Postit({
  name: 'Wild',
  confirmed: true,
  description: 'Nur für kurze Zeit',
  vendorId: '',
  imageUrl: 'postit.png'
})
let postit2 = new Postit({
  name: 'Brot',
  confirmed: false,
  description: 'Frisch gebackenes Bauernbrot',
  location: 'Lungau',
  vendorId: '',
  imageUrl: 'postit.png'
})

setupUsers()

function setupUsers() {
  let u1 = new Promise((resolve, reject) => {
    chai.request(server)
      .post('/api/users')
      .send(user1)
      .end((err, res) => {
        if(err) reject('u1')
        else resolve(res.body.ok)
      })
  })
  let u2 = new Promise((resolve, reject) => {
    chai.request(server)
      .post('/api/users')
      .send(user2)
      .end((err, res) => {
        if(err) reject('u2')
        else {
          vendor1.userUid = res.body.user._id
          resolve(res.body.ok)
        }
      })
  })
  let u3 = new Promise((resolve, reject) => {
    chai.request(server)
      .post('/api/users')
      .send(user3)
      .end((err, res) => {
        if(err) reject('u3')
        else {
          vendor2.userUid = res.body.user._id
          resolve(res.body.ok)
        }
      })
  })

  Promise.all([u1, u2, u3]).then(values => {
    console.log('Users: ' + values)
    setupAuth()
  })
}
function setupAuth() {
  let a1 = new Promise((resolve, reject) => {
    chai.request(server)
      .post('/api/auth')
      .send(user1)
      .end((err, res) => {
        if(err) reject('a1')
        else resolve(res.body)
      })
  })

  a1.then(value => {
    console.log('Token: ' + value.ok)
    token = value.token
    setupVendors()
  })
}
function setupVendors() {
  let v1 = new Promise((resolve, reject) => {
    chai.request(server)
      .post('/api/vendors')
      .set('x-access-token', token)
      .send(vendor1)
      .end((err, res) => {
        if(err) reject('v1')
        else {
          product1.vendor = res.body.vendor._id
          product2.vendor = res.body.vendor._id
          postit1.vendorId = res.body.vendor._id
          resolve(res.body.ok)
        }
      })
  })
  let v2 = new Promise((resolve, reject) => {
    chai.request(server)
      .post('/api/vendors')
      .set('x-access-token', token)
      .send(vendor2)
      .end((err, res) => {
        if(err) reject('v2')
        else {
          product3.vendor = res.body.vendor._id
          postit2.vendorId = res.body.vendor._id
          resolve(res.body.ok)
        }
      })
  })

  Promise.all([v1, v2]).then(values => {
    console.log('Vendors: ' + values)
    setupTypes()
  })
}
function setupTypes() {
  let t1 = new Promise((resolve, reject) => {
    chai.request(server)
      .post('/api/types')
      .set('x-access-token', token)
      .send(type1)
      .end((err, res) => {
        if(err) reject('t1')
        else {
          category1.typeUid = res.body.type._id
          category2.typeUid = res.body.type._id
          resolve(res.body.ok)
        }
      })
  })
  let t2 = new Promise((resolve, reject) => {
    chai.request(server)
      .post('/api/types')
      .set('x-access-token', token)
      .send(type2)
      .end((err, res) => {
        if(err) reject('t2')
        else {
          category3.typeUid = res.body.type._id
          category4.typeUid = res.body.type._id
          resolve(res.body.ok)
        }
      })
  })
  let t3 = new Promise((resolve, reject) => {
    chai.request(server)
      .post('/api/types')
      .set('x-access-token', token)
      .send(type3)
      .end((err, res) => {
        if(err) reject('t3')
        else resolve(res.body.ok)
      })
  })

  Promise.all([t1, t2, t3]).then(values => {
    console.log('Types: ' + values)
    setupCategories()
  })
}
function setupCategories() {
  let c1 = new Promise((resolve, reject) => {
    chai.request(server)
      .post('/api/categories')
      .set('x-access-token', token)
      .send(category1)
      .end((err, res) => {
        if(err) reject('c1')
        else {
          product3.categoryId = res.body.category._id
          resolve(res.body.ok)
        }
      })
  })
  let c2 = new Promise((resolve, reject) => {
    chai.request(server)
      .post('/api/categories')
      .set('x-access-token', token)
      .send(category2)
      .end((err, res) => {
        if(err) reject('c2')
        else {
          product2.categoryId = res.body.category._id
          resolve(res.body.ok)
        }
      })
  })
  let c3 = new Promise((resolve, reject) => {
    chai.request(server)
      .post('/api/categories')
      .set('x-access-token', token)
      .send(category3)
      .end((err, res) => {
        if(err) reject('c3')
        else {
          product1.categoryId = res.body.category._id
          resolve(res.body.ok)
        }
      })
  })
  let c4 = new Promise((resolve, reject) => {
    chai.request(server)
      .post('/api/categories')
      .set('x-access-token', token)
      .send(category4)
      .end((err, res) => {
        if(err) reject('c4')
        else {
          resolve(res.body.ok)
        }
      })
  })

  Promise.all([c1, c2, c3, c4]).then(values => {
    console.log('Categories: ' + values)
    setupProducts()
  })

}
function setupProducts() {
  let p1 = new Promise((resolve, reject) => {
    chai.request(server)
      .post('/api/products')
      .set('x-access-token', token)
      .send(product1)
      .end((err, res) => {
        if(err) reject('p1')
        else resolve(res.body.ok)
      })
  })
  let p2 = new Promise((resolve, reject) => {
    chai.request(server)
      .post('/api/products')
      .set('x-access-token', token)
      .send(product2)
      .end((err, res) => {
        if(err) reject('p2')
        else resolve(res.body.ok)
      })
  })
  let p3 = new Promise((resolve, reject) => {
    chai.request(server)
      .post('/api/products')
      .set('x-access-token', token)
      .send(product3)
      .end((err, res) => {
        if(err) reject('p3')
        else resolve(res.body.ok)
      })
  })

  Promise.all([p1, p2, p3]).then(values => {
    console.log('Products: ' + values)
    setupEvents()
  })
}

function setupEvents() {
  let e1 = new Promise((resolve, reject) => {
    chai.request(server)
      .post('/api/events')
      .set('x-access-token', token)
      .send(event1)
      .end((err, res) => {
        if(err) reject('e1')
        else resolve(res.body.ok)
      })
  })
  let e2 = new Promise((resolve, reject) => {
    chai.request(server)
      .post('/api/events')
      .set('x-access-token', token)
      .send(event2)
      .end((err, res) => {
        if(err) reject('e2')
        else resolve(res.body.ok)
      })
  })

  Promise.all([e1, e2]).then(values => {
    console.log('Events: ' + values)
    setupPostits()
  })
}

function setupPostits() {
  let p1 = new Promise((resolve, reject) => {
    chai.request(server)
      .post('/api/postits')
      .set('x-access-token', token)
      .send(postit1)
      .end((err, res) => {
        if(err) reject('e1')
        else resolve(res.body.ok)
      })
  })
  let p2 = new Promise((resolve, reject) => {
    chai.request(server)
      .post('/api/postits')
      .set('x-access-token', token)
      .send(postit2)
      .end((err, res) => {
        if(err) reject('e1')
        else resolve(res.body.ok)
      })
  })

  Promise.all([p1, p2]).then(values => {
    console.log('Postits: ' + values)
    process.exit(0)
  })
}
