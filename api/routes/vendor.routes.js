var Vendor = require('../models/vendor.model')

/**
 * @apiDefine NoAccessRights
 * @apiError (Error 403) NoAccessRights The auth <code>token</code> is not valid or missing.
 */

/**
 * @apiDefine MissingFields
 * @apiError (Error 412) MissingFields Required fields are missing.
 */

/**
 * @apiDefine DatabaseError
 * @apiError (Error 500) DatabaseError Error while altering the database.
 */

/**
 * @apiDefine VendorNotFound
 * @apiError (Error 404) VendorNotFound The vendor with the given <code>id</code> was not found.
 */


module.exports = function(router) {

  router.route('/vendors')
  /**
   * @api {post} /vendors Create Vendor
   * @apiName CreateVendor
   * @apiGroup Vendors
   *
   * @apiParam {String} name The name of the shop.
   * @apiParam {String} ownerName The name of the owner.
   * @apiParam {String} email Email address of the owner.
   * @apiParam {Number} category The id of the category of the shop.
   * @apiParam {String} city City of the shop.
   * @apiParam {Number} [tel] Tel number of the owner.
   * @apiParam {String} [description] A short description.
   * @apiParam {String} [street] Street of the shop.
   * @apiParam {Number} [zip] Postal code of the shop.
   * @apiParam {String} [imageUrl] The url to the image.
   * @apiParam {Number} [lat] Latitude of the shop.
   * @apiParam {Number} [long] Longitude of the shop.
   *
   * @apiSuccess {Object} vendor The created vendor.
   *
   * @apiUse MissingFields
 */
  .post(function(req, res) {

    if (!vendorIsValid(req.body)) {
      res.status(412).json({ message: 'Missing fields' })
    } else {

      var vendor = new Vendor({
        name: req.body.name,
        ownerName: req.body.ownerName,
        email: req.body.email,
        category: req.body.category,
        city: req.body.city,
        tel: req.body.tel,
        description: req.body.description,
        street: req.body.street,
        zip: req.body.zip,
        imageUrl: req.body.imageUrl,
        lat: req.body.lat,
        long: req.body.long
      })

      vendor.save(function(err) {
        if (err) res.status(500).end(err)
        res.status(200).json(vendor)
      })
    }

  })

  /**
   * @api {get} /vendors?skip=<skip>&limit=<limit>&filter=<filter> Get all vendors with pagination and optional search
   * @apiName GetVendors
   * @apiGroup Vendors
   *
   * @apiParam {Number} [skip] Pages to be skipped.
   * @apiParam {Number} [limit] Elements to be contained in one page.
   * @apiParam {String} [filter] The field name will be search by this.
   *
   * @apiSuccess {Array} vendor Array of vendors.
 */
  .get(function(req, res) {

    var skip = req.query.skip ? req.query.skip : 0
    var limit = req.query.limit ? req.query.limit : 0
    var filter = req.query.filter ? req.query.filter : ''

    Vendor
    .find({ 'name': { '$regex': filter } }, function(err, vendors) {
      if (err) res.status(500).end(err)
      res.json(vendors)
    })
    .sort({name: 1})
    .skip(skip)
    .limit(limit)
  })


    router.route('/vendors/:id')
      /**
       * @api {get} /vendors/:id Get vendor
       * @apiName GetVendor
       * @apiGroup Vendors
       *
       * @apiSuccess {Object} vendor The vendor for given id.
       *
       * @apiUse VendorNotFound
      */
      .get(function(req, res) {
        Vendor.findById(req.params.id, function(err, vendor) {

          if (err && err.name != 'CastError') res.status(404).json(err.message)
          else if (!err && vendor) res.status(200).json(vendor)
          else res.status(404).json({ message: 'Vendor not found'})
        })
      })

      /**
       * @api {put} /vendors/:id Update vendor
       * @apiName UpdateVendor
       * @apiGroup Vendors
       *
       * @apiParam {String} name The name of the shop.
       * @apiParam {String} ownerName The name of the owner.
       * @apiParam {String} email Email address of the owner.
       * @apiParam {Number} category The id of the category of the shop.
       * @apiParam {String} city City of the shop.
       * @apiParam {Number} [tel] Tel number of the owner.
       * @apiParam {String} [description] A short description.
       * @apiParam {String} [street] Street of the shop.
       * @apiParam {Number} [zip] Postal code of the shop.
       * @apiParam {String} [imageUrl] The url to the image.
       * @apiParam {Number} [lat] Latitude of the shop.
       * @apiParam {Number} [long] Longitude of the shop.
       *
       * @apiSuccess {Object} vendor The updated vendor.
       *
       * @apiUse MissingFields
       * @apiUse VendorNotFound
      */
      .put(function(req, res) {

        Vendor.findById(req.params.id, function(err, vendor) {
          if (err && err.name != 'CastError') res.status(404).json(err.message)

          else if (!err && vendor) {
            if (vendorIsValid(req.body)) {

              vendor.name = req.body.name,
              vendor.ownerName = req.body.ownerName,
              vendor.email = req.body.email,
              vendor.category = req.body.category,
              vendor.city = req.body.city,
              vendor.tel = req.body.tel,
              vendor.description = req.body.description,
              vendor.street = req.body.street,
              vendor.zip = req.body.zip,
              vendor.imageUrl = req.body.imageUrl,
              vendor.lat = req.body.lat,
              vendor.long = req.body.long

              vendor.save(function(err) {
                if (err) res.status(500).end(err)
                res.status(200).json(vendor)
              })

            } else res.status(412).json({ message: 'Missing fields' })

          } else res.status(404).json({ message: 'Vendor not found'})
        })
      })

      /**
       * @api {delete} /vendors/:id Delete vendor
       * @apiName DeleteVendor
       * @apiGroup Vendors
       *
       * @apiSuccess {String} message Success message.
       *
       * @apiUse VendorNotFound
      */
      .delete(function(req, res) {
        Vendor.findById(req.params.id, function(err, vendor) {
          if (err && err.name != 'CastError') res.status(404).json(err.message)

          else if (!err && vendor) {
            Vendor.remove({ _id: req.params.id }, function(err, vendor) {
              if (err) res.status(500).end(err)
              res.status(200).json({ message: 'Successfully deleted' })
            })
          } else res.status(404).json({ message: 'Vendor not found'})

        })
      })


    function vendorIsValid(vendor) {
      if (!vendor.name ||
          !vendor.ownerName ||
          !vendor.email ||
          !vendor.category ||
          !vendor.city) return false
      else return true
    }
}
