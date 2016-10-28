var Vendor = require('.././models/vendor.model')

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

  router.route('/vendor')

    /**
     * @api {post} /vendor Create Vendor
     * @apiName CreateVendor
     * @apiGroup Vendor
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


    router.route('/vendors/:skip/:limit/:filter?')
    /**
     * @api {get} /vendors/:skip/:limit/:filter? Get all vendors with pagination and optional search
     * @apiName GetVendors
     * @apiGroup Vendor
     *
     * @apiSuccess {Array} vendor Array of vendors.
   */
    .get(function(req, res) {

      var filter = req.params.filter ? req.params.filter : ''

      Vendor
      .find({ 'name': { '$regex': filter } }, function(err, vendors) {
        if (err) res.status(500).end(err)
        res.json(vendors)
      })
      .sort({name: 1})
      .skip(req.params.skip)
      .limit(req.params.limit)
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
