var exec = require('child_process').execSync

let vendors = 'mongoimport -d lungau_db -c vendors --drop --file dummy/vendors.json'
exec(vendors, (err, stdout, stderr) => {
  if(err !== null) console.log(err)
})

let users = 'mongoimport -d lungau_db -c users --drop --file dummy/users.json'
exec(users, (err, stdout, stderr) => {
  if(err !== null) console.log(err)
})

// TODO: categories, products, recipes, types
