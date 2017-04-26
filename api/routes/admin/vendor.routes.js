var Vendor = require('../../models/vendor.model')

module.exports = function(router) {

  router.route('/vendors')
  /**
   * @api {post} /vendors Create Vendor
   * @apiName CreateVendor
   * @apiGroup Vendors
   * @apiPermission admin
   *
   * @apiParam {String} name The name of the shop.
   * @apiParam {String} userUid The id of the connected user
   * @apiParam {String} email Email address of the owner.
   * @apiParam {String} [description] A short description.
   * @apiParam {String} [imageUrl] The url to the image.
   * @apiParam {String} [subName] The name of the owner.
   * @apiParam {Number} [tel] Tel number of the owner.
   * @apiParam {Object} [address] Address-Wrapper
   * @apiParam {String} [address.city] Cityname
   * @apiParam {Number} [address.zip] Postal Code
   * @apiParam {String} [address.street] Street with Number
   * @apiParam {Number} [address.lat] Latitude
   * @apiParam {Number} [address.long] Longitude
   *
   * @apiSuccess {Object} vendor The created vendor.
 */
  .post(function(req, res) {

    if (!vendorIsValid(req.body)) {
      res.status(412).json({ message: 'Missing fields' })
    } else {

      var vendor = new Vendor({
        name: req.body.name,
        userUid: req.body.userUid,
        email: req.body.email,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        subName: req.body.subName,
        tel: req.body.tel,
        address: {
          city: req.body.city,
          zip: req.body.zip,
          street: req.body.street,
          lat: req.body.lat,
          long: req.body.long
        }
      })

      vendor.save(function(err) {
        if (err) res.status(500).end(err)
        res.status(200).json(vendor)
      })
    }

  })

    router.route('/vendors/:id')
      /**
       * @api {put} /vendors/:id Update vendor
       * @apiName UpdateVendor
       * @apiGroup Vendors
       * @apiPermission admin
       *
       * @apiParam {String} name The name of the shop.
       * @apiParam {String} userUid The id of the connected user
       * @apiParam {String} email Email address of the owner.
       * @apiParam {String} [description] A short description.
       * @apiParam {String} [imageUrl] The url to the image.
       * @apiParam {String} [subName] The name of the owner.
       * @apiParam {Number} [tel] Tel number of the owner.
       * @apiParam {Object} [address] Address-Wrapper
       * @apiParam {String} [address.city] Cityname
       * @apiParam {Number} [address.zip] Postal Code
       * @apiParam {String} [address.street] Street with Number
       * @apiParam {Number} [address.lat] Latitude
       * @apiParam {Number} [address.long] Longitude
       *
       * @apiSuccess {Object} vendor The updated vendor.
      */
      .put(function(req, res) {

        Vendor.findById(req.params.id, function(err, vendor) {
          if (err && err.name != 'CastError') res.status(404).json(err.message)

          else if (!err && vendor) {
            if (vendorIsValid(req.body)) {

              vendor.name = req.body.name,
              vendor.subName = req.body.subName,
              vendor.email = req.body.email,
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
       * @apiPermission admin
       *
       * @apiSuccess {String} message Success message.
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
          !vendor.userUid ||
          !vendor.email) return false
      else return true
    }
}
