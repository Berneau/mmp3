var exec = require('child_process').execSync

let vendors = 'mongoimport -d lungau_db -c vendors --drop --jsonArray --file dummy/vendors.json'
exec(vendors, (err, stdout, stderr) => {
  if(err !== null) console.log(err)
})

let users = 'mongoimport -d lungau_db -c users --drop --jsonArray --file dummy/users.json'
exec(users, (err, stdout, stderr) => {
  if(err !== null) console.log(err)
})

let categories = 'mongoimport -d lungau_db -c categories --drop --jsonArray --file dummy/categories.json'
exec(categories, (err, stdout, stderr) => {
  if(err !== null) console.log(err)
})

let products = 'mongoimport -d lungau_db -c products --drop --jsonArray --file dummy/products.json'
exec(products, (err, stdout, stderr) => {
  if(err !== null) console.log(err)
})

// TODO: recipes, types
