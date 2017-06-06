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
let user4 = new User({
  email: 'franziska@hof.at',
  password: 'secret',
  isAdmin: false
})

let vendor1 = new Vendor({
  name: 'Elfriede Hackl',
  userUid: '',
  email: 'elfriede@hof.at',
  description: 'Sonniges Platzal',
  imageUrl: 'vendor_female1.png',
  farmImageUrl: 'farm1.png',
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
  imageUrl: 'vendor_male.png',
  farmImageUrl: 'farm2.png',
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
let vendor3 = new Vendor({
  name: 'Franziska Müller',
  userUid: '',
  email: 'franziska@hof.at',
  description: '',
  imageUrl: 'vendor_female2.png',
  farmImageUrl: 'farm3.png',
  subName: 'Müller-Hof',
  website: 'abc.com',
  tel: 0815123123,
  address: {
    city: 'Bergheim',
    zip: 5101,
    street: 'Hauptstraße 25',
    lat: 47.808271,
    long: 13.053993
  }
})

let type1 = new Type({
  name: 'Gemüse'
})
let type2 = new Type({
  name: 'Obst'
})
let type3 = new Type({
  name: 'Milchprodukte'
})
let type4 = new Type({
  name: 'Eier'
})
let type5 = new Type({
  name: 'Fleisch'
})

let category1 = new Category({
  name: 'Butter',
  typeUid: '',
  imageUrl: 'https://lungau.s3.eu-central-1.amazonaws.com/1496780940339'
})
let category2 = new Category({
  name: 'Radieschen',
  typeUid: '',
  imageUrl: 'https://lungau.s3.eu-central-1.amazonaws.com/1496780915742'
})
let category3 = new Category({
  name: 'Kirschen',
  typeUid: '',
  imageUrl: 'https://lungau.s3.eu-central-1.amazonaws.com/1496780948873'
})
let category4 = new Category({
  name: 'Karotten',
  typeUid: '',
  imageUrl: 'https://lungau.s3.eu-central-1.amazonaws.com/1496780974561'
})
let category5 = new Category({
  name: 'Eier',
  typeUid: '',
  imageUrl: 'https://lungau.s3.eu-central-1.amazonaws.com/1496780960878'
})
let product1 = new Product({
  name: 'Käuterbutter',
  categoryId: '',
  vendor: '',
  availableAt: {
    fromPeriod: 'Anfang',
    fromMonth: 'April',
    toPeriod: 'Ende',
    toMonth: 'September'
  },
  imageUrl: 'product_butter.png'
})
let product2 = new Product({
  name: 'Rote & Gelbe Radieschen',
  categoryId: '',
  vendor: '',
  availableAt: {
    fromPeriod: 'Anfang',
    fromMonth: 'April',
    toPeriod: 'Ende',
    toMonth: 'September'
  },
  imageUrl: 'product_radish.png'
})
let product3 = new Product({
  name: 'Süße Kirschen',
  categoryId: '',
  vendor: '',
  availableAt: {
    fromPeriod: 'Anfang',
    fromMonth: 'April',
    toPeriod: 'Ende',
    toMonth: 'September'
  },
  imageUrl: 'product_cherries.png'
})
let product4 = new Product({
  name: 'Wachteleier',
  categoryId: '',
  vendor: '',
  availableAt: {
    fromPeriod: 'Anfang',
    fromMonth: 'April',
    toPeriod: 'Ende',
    toMonth: 'September'
  },
  imageUrl: 'product_eggs.png'
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
  name: 'Wildfleisch',
  confirmed: true,
  description: 'Nur für kurze Zeit!',
  vendorId: '',
  imageUrl: 'postit_vension.png'
})
let postit2 = new Postit({
  name: 'Frisches Bauernbrot',
  confirmed: false,
  description: 'Frisch gebackenes Bauernbrot frisch aus dem Ofen!',
  location: 'Lungau',
  vendorId: '',
  imageUrl: 'postit_bread.png'
})
let postit3 = new Postit({
  name: 'Frische Gartenkräuter',
  confirmed: true,
  description: 'Nur solange der Vorrat reicht!',
  location: 'Lungau',
  vendorId: '',
  imageUrl: 'postit_herbs.png'
})
let postit4 = new Postit({
  name: 'Frischer Kräuteraufstrich',
  confirmed: true,
  description: 'Maximal 2 Wochen haltbar!',
  location: 'Lungau',
  vendorId: '',
  imageUrl: 'postit_spread.png'
})
let postit5 = new Postit({
  name: 'Köstliche Teemischung',
  confirmed: false,
  description: 'Individuell zusammengestellte Teemischungen zum aufbrühen!',
  location: '',
  vendorId: '',
  imageUrl: 'postit_tea.png'
})
let postit6 = new Postit({
  name: 'Feiner Traubensaft',
  confirmed: true,
  description: 'Individuell zusammengestellte Teemischungen zum aufbrühen!',
  location: '',
  vendorId: '',
  imageUrl: 'postit_juice.png'
})


setupUsers()

function setupUsers() {
  let u1 = new Promise((resolve, reject) => {
    chai.request(server)
      .post('/api/users')
      .send(user1)
      .end((err, res) => {
        if (err) reject('u1')
        else resolve(res.body.ok)
      })
  })
  let u2 = new Promise((resolve, reject) => {
    chai.request(server)
      .post('/api/users')
      .send(user2)
      .end((err, res) => {
        if (err) reject('u2')
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
        if (err) reject('u3')
        else {
          vendor2.userUid = res.body.user._id
          resolve(res.body.ok)
        }
      })
  })
  let u4 = new Promise((resolve, reject) => {
    chai.request(server)
      .post('/api/users')
      .send(user4)
      .end((err, res) => {
        if (err) reject('u4')
        else {
          vendor3.userUid = res.body.user._id
          resolve(res.body.ok)
        }
      })
  })

  Promise.all([u1, u2, u3, u4]).then(values => {
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
        if (err) reject('a1')
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
        if (err) reject('v1')
        else {
          product1.vendor = res.body.vendor._id
          product3.vendor = res.body.vendor._id
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
        if (err) reject('v2')
        else {
          product2.vendor = res.body.vendor._id
          product4.vendor = res.body.vendor._id
          postit3.vendorId = res.body.vendor._id
          resolve(res.body.ok)
        }
      })
  })
  let v3 = new Promise((resolve, reject) => {
    chai.request(server)
      .post('/api/vendors')
      .set('x-access-token', token)
      .send(vendor3)
      .end((err, res) => {
        if (err) reject('v3')
        else {
          postit5.vendorId = res.body.vendor._id
          resolve(res.body.ok)
        }
      })
  })

  Promise.all([v1, v2, v3]).then(values => {
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
        if (err) reject('t1')
        else {
          category2.typeUid = res.body.type._id
          category4.typeUid = res.body.type._id
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
        if (err) reject('t2')
        else {
          category3.typeUid = res.body.type._id
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
        if (err) reject('t3')
        else {
          category1.typeUid = res.body.type._id
          resolve(res.body.ok)
        }
      })
  })
  let t4 = new Promise((resolve, reject) => {
    chai.request(server)
      .post('/api/types')
      .set('x-access-token', token)
      .send(type4)
      .end((err, res) => {
        if (err) reject('t4')
        else {
          category5.typeUid = res.body.type._id
          resolve(res.body.ok)
        }
      })
  })
  let t5 = new Promise((resolve, reject) => {
    chai.request(server)
      .post('/api/types')
      .set('x-access-token', token)
      .send(type5)
      .end((err, res) => {
        if (err) reject('t5')
        else resolve(res.body.ok)
      })
  })

  Promise.all([t1, t2, t3, t4, t5]).then(values => {
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
        if (err) reject('c1')
        else {
          product1.categoryId = res.body.category._id
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
        if (err) reject('c2')
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
        if (err) reject('c3')
        else {
          product3.categoryId = res.body.category._id
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
        if (err) reject('c4')
        else {
          resolve(res.body.ok)
        }
      })
  })
  let c5 = new Promise((resolve, reject) => {
    chai.request(server)
      .post('/api/categories')
      .set('x-access-token', token)
      .send(category5)
      .end((err, res) => {
        if (err) reject('c5')
        else {
          product4.categoryId = res.body.category._id
          resolve(res.body.ok)
        }
      })
  })
  Promise.all([c1, c2, c3, c4, c5]).then(values => {
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
        if (err) reject('p1')
        else resolve(res.body.ok)
      })
  })
  let p2 = new Promise((resolve, reject) => {
    chai.request(server)
      .post('/api/products')
      .set('x-access-token', token)
      .send(product2)
      .end((err, res) => {
        if (err) reject('p2')
        else resolve(res.body.ok)
      })
  })
  let p3 = new Promise((resolve, reject) => {
    chai.request(server)
      .post('/api/products')
      .set('x-access-token', token)
      .send(product3)
      .end((err, res) => {
        if (err) reject('p3')
        else resolve(res.body.ok)
      })
  })
  let p4 = new Promise((resolve, reject) => {
    chai.request(server)
      .post('/api/products')
      .set('x-access-token', token)
      .send(product4)
      .end((err, res) => {
        if (err) reject('p4')
        else resolve(res.body.ok)
      })
  })

  Promise.all([p1, p2, p3, p4]).then(values => {
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
        if (err) reject('e1')
        else resolve(res.body.ok)
      })
  })
  let e2 = new Promise((resolve, reject) => {
    chai.request(server)
      .post('/api/events')
      .set('x-access-token', token)
      .send(event2)
      .end((err, res) => {
        if (err) reject('e2')
        else resolve(res.body.ok)
      })
  })

  Promise.all([e1, e2]).then(values => {
    console.log('Events: ' + values)
    setupPostits()
  })
}

function setupPostits() {
  let pt1 = new Promise((resolve, reject) => {
    chai.request(server)
      .post('/api/postits')
      .set('x-access-token', token)
      .send(postit1)
      .end((err, res) => {
        if (err) reject('pt1')
        else resolve(res.body.ok)
      })
  })
  let pt2 = new Promise((resolve, reject) => {
    chai.request(server)
      .post('/api/postits')
      .set('x-access-token', token)
      .send(postit2)
      .end((err, res) => {
        if (err) reject('pt2')
        else resolve(res.body.ok)
      })
  })
  let pt3 = new Promise((resolve, reject) => {
    chai.request(server)
      .post('/api/postits')
      .set('x-access-token', token)
      .send(postit3)
      .end((err, res) => {
        if (err) reject('pt3')
        else resolve(res.body.ok)
      })
  })
  let pt4 = new Promise((resolve, reject) => {
    chai.request(server)
      .post('/api/postits')
      .set('x-access-token', token)
      .send(postit4)
      .end((err, res) => {
        if (err) reject('pt4')
        else resolve(res.body.ok)
      })
  })
  let pt5 = new Promise((resolve, reject) => {
    chai.request(server)
      .post('/api/postits')
      .set('x-access-token', token)
      .send(postit5)
      .end((err, res) => {
        if (err) reject('pt5')
        else resolve(res.body.ok)
      })
  })
  let pt6 = new Promise((resolve, reject) => {
    chai.request(server)
      .post('/api/postits')
      .set('x-access-token', token)
      .send(postit6)
      .end((err, res) => {
        if (err) reject('pt6')
        else resolve(res.body.ok)
      })
  })

  Promise.all([pt1, pt2, pt3, pt4, pt5, pt6]).then(values => {
    console.log('Postits: ' + values)
    process.exit(0)
  })
}
