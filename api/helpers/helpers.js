module.exports = {
  productIsValid: function (product) {
    if (!product.name ||
        !product.categoryId ||
        !product.vendorId ||
        !product.availableAt) return false

    if (!product.availableAt.fromPeriod ||
        !product.availableAt.fromMonth ||
        !product.availableAt.toPeriod ||
        !product.availableAt.toMonth) return false

    else return true
  },
  vendorIsValid: function (vendor) {
    if (!vendor.name ||
        !vendor.userUid ||
        !vendor.email) return false
    else return true
  },
  categoryIsValid: function (category) {
    if (!category.name ||
        !category.typeUid) return false
    else return true
  },
  typeIsValid: function (type) {
    if (!type.name) return false
    else return true
  },
  eventIsValid: function (event) {
    if (!event.name ||
        !event.date) return false
    else return true
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
    var re = /\S+@\S+\.\S+/
    return re.test(email)
}
}
