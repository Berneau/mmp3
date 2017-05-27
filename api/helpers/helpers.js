module.exports = {
  productIsValid: function (product) {
    if (!product.name ||
        !product.categoryId ||
        !product.vendor ||
        !product.availableAt) return false

    if (!product.availableAt.fromPeriod ||
        !product.availableAt.fromMonth ||
        !product.availableAt.toPeriod ||
        !product.availableAt.toMonth) return false

    else return true
  },
  productFactory: function (data, product) {
    product.name = data.name
    product.categoryId = data.categoryId
    product.vendor = data.vendor
    product.availableAt.fromPeriod = data.availableAt ? data.availableAt.fromPeriod : undefined
    product.availableAt.fromMonth = data.availableAt ? data.availableAt.fromMonth : undefined
    product.availableAt.toPeriod = data.availableAt ? data.availableAt.toPeriod : undefined
    product.availableAt.toMonth = data.availableAt ? data.availableAt.toMonth : undefined
    product.imageUrl = data.imageUrl
    return product
  },
  vendorIsValid: function (vendor) {
    if (!vendor.name ||
        !vendor.userUid ||
        !vendor.email) return false
    else return true
  },
  vendorFactory: function (data, vendor) {
    vendor.name = data.name
    vendor.userUid = data.userUid
    vendor.email = data.email
    vendor.description = data.description
    vendor.imageUrl = data.imageUrl
    vendor.farmImageUrl = data.farmImageUrl
    vendor.subName = data.subName
    vendor.website = data.website
    vendor.tel = data.tel
    vendor.address.city = data.address ? data.address.city : undefined
    vendor.address.zip = data.address ? data.address.zip : undefined
    vendor.address.street = data.address ? data.address.street : undefined
    vendor.address.lat = data.address ? data.address.lat : undefined
    vendor.address.long = data.address ? data.address.long : undefined
    return vendor
  },
  categoryIsValid: function (category) {
    if (!category.name ||
        !category.typeUid) return false
    else return true
  },
  categoryFactory: function(data, category) {
    category.name = data.name
    category.typeUid = data.typeUid
    category.imageUrl = data.imageUrl
    return category
  },
  typeIsValid: function (type) {
    if (!type.name) return false
    else return true
  },
  typeFactory: function (data, type) {
    type.name = data.name
    return type
  },
  eventIsValid: function (event) {
    if (!event.name ||
        !event.date) return false
    else return true
  },
  eventFactory: function (data, event) {
    event.name = data.name
    event.date = data.date
    event.description = data.description
    event.location.name = data.location ? data.location.name : undefined
    event.location.lat = data.location ? data.location.lat : undefined
    event.location.long = data.location ? data.location.long : undefined
    return event
  },
  postitIsValid: function (postit) {
    if (!postit.name ||
        !postit.hasOwnProperty('confirmed')) return false
    else return true
  },
  postitFactory: function (data, postit) {
    postit.name = data.name
    postit.confirmed = data.confirmed
    postit.description = data.description
    postit.location = data.location
    postit.vendorId = data.vendorId
    postit.imageUrl = data.imageUrl
    return postit
  },
  userIsValid: function (user) {
    if (!user.password ||
        !user.email ||
        !user.hasOwnProperty('isAdmin')) return false
    else return true
  },
  stripUserObject: function (user) {
    user.password = undefined
    user.salt = undefined
    return user
  },
  stripUserArray: function (arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].password = undefined
      arr[i].salt = undefined
    }
    return arr
  },
  emailIsValid: function (email) {
    var regex = /\S+@\S+\.\S+/
    return regex.test(email)
  },
  clearDupes: function(arr) {
    var noDupes = {}
    var result = []

    for (var i = 0; i < arr.length; i++) {
      var item = arr[i]
      noDupes[item.name] = item
    }

    for (var item in noDupes) {
      result.push(noDupes[item])
    }
    return result
  }
}
