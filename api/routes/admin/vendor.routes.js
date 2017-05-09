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

      // not a valid vendor object
      res.status(412).json({
        ok: false,
        message: 'Missing fields'
      })
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
          city: req.body.address ? req.body.address : undefined,
          zip: req.body.address ? req.body.address : undefined,
          street: req.body.address ? req.body.address : undefined,
          lat: req.body.address ? req.body.address : undefined,
          long: req.body.address ? req.body.address : undefined
        }
      })

      vendor.save(function(err) {

        // internal server error
        if (err) res.status(500).json({
          ok: false,
          err: err.message
        })

        // return created vendor
        else res.status(200).json({
          ok: true,
          vendor: vendor
        })
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

          // not a valid id
          if (err && err.name != 'CastError') res.status(404).json({
            ok: false,
            err: err.message
          })

          else if (!err && vendor) {
            if (vendorIsValid(req.body)) {

              vendor.name = req.body.name,
              vendor.userUid = req.body.userUid,
              vendor.email = req.body.email,
              vendor.description = req.body.description,
              vendor.imageUrl = req.body.imageUrl,
              vendor.subName = req.body.subName,
              vendor.tel = req.body.tel,
              vendor.address.city = req.body.address ? req.body.address.city : undefined,
              vendor.address.zip = req.body.address ? req.body.address.zip : undefined,
              vendor.address.street = req.body.address ? req.body.address.street : undefined,
              vendor.address.lat = req.body.address ? req.body.address.lat : undefined,
              vendor.address.long = req.body.address ? req.body.address.long : undefined

              vendor.save(function(err) {

                // internal server error
                if (err) res.status(500).json({
                  ok: false,
                  err: err.message
                })

                // return the updated vendor
                else res.status(200).json({
                  ok: true,
                  vendor: vendor
                })
              })

              // not a valid vendor
            } else res.status(412).json({
              ok: false,
              message: 'Missing fields'
            })

            // no vendor with this id
          } else res.status(404).json({
            ok: false,
            message: 'Vendor not found'
          })
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

          // not a valid id
          if (err && err.name != 'CastError') res.status(404).json({
            ok: false,
            err: err.message
          })

          else if (!err && vendor) {
            Vendor.remove({ _id: req.params.id }, function(err, vendor) {

              // internal server error
              if (err) res.status(500).json({
                ok: false,
                err: err.message
              })

              // successfully deleted
              else res.status(200).json({
                ok: true,
                message: 'Successfully deleted'
              })
            })

            // no vendor with this id
          } else res.status(404).json({
            ok: false,
            message: 'Vendor not found'
          })
        })
      })

    function vendorIsValid(vendor) {
      if (!vendor.name ||
          !vendor.userUid ||
          !vendor.email) return false
      else return true
    }
}
