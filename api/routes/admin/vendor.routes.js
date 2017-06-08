var Vendor = require('../../models/vendor.model')
var Product = require('../../models/product.model')
var User = require('../../models/user.model')
var vendorIsValid = require('../../helpers/helpers').vendorIsValid
var vendorFactory = require('../../helpers/helpers').vendorFactory
var deleteImages = require('../../helpers/helpers').deleteImages

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
   * @apiParam {String} [farmImageUrl] The url of the farm image.
   * @apiParam {String} [subName] The name of the owner.
   * @apiParam {String} [website] The website of the vendor.
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

    // not a valid vendor object
    if (!vendorIsValid(req.body)) return res.status(412).json({
      ok: false,
      message: 'Missing fields'
    })

    var vendor = new Vendor()
    vendor = vendorFactory(req.body, vendor)

    vendor.save(function(err) {

      // internal server error
      if (err) return res.status(500).json({
        ok: false,
        err: err.message
      })

      // return created vendor
      res.status(200).json({
        ok: true,
        vendor: vendor
      })

    })

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
   * @apiParam {String} [farmImageUrl] The url of the farm image.
   * @apiParam {String} [subName] The name of the owner.
   * @apiParam {String} [website] The website of the vendor.
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
      if (err && err.name != 'CastError') return res.status(404).json({
        ok: false,
        err: err.message
      })

      // no vendor with this id
      if (!vendor) return res.status(404).json({
        ok: false,
        message: 'Vendor not found'
      })

      // not a valid vendor
      if (!vendorIsValid(req.body)) return res.status(412).json({
        ok: false,
        message: 'Missing fields'
      })

      // image has been changed
      var params
      var multiple = false
      if (req.body.imageKey != vendor.imageKey && req.body.farmImageKey != vendor.farmImageKey) {
        params = {
          Bucket: 'lungau',
          Delete: {
            Objects: [
              { Key: vendor.imageKey },
              { Key: vendor.farmImageKey }
            ]
          }
        }
        multiple = true
      } else if (req.body.imageKey != vendor.imageKey) {
        params = {
          Bucket: 'lungau',
          Key: vendor.imageKey
        }
      } else if (req.body.farmImageKey != vendor.farmImageKey) {
        params = {
          Bucket: 'lungau',
          Key: vendor.farmImageKey
        }
      }

      vendor = vendorFactory(req.body, vendor)

      vendor.save(function(err) {

        // internal server error
        if (err) return res.status(500).json({
          ok: false,
          err: err.message
        })

        // old image has to be deleted
        if (params) {

          if (multiple) {

            deleteImages(params, function(err) {

              // error deleting image
              if (err) return res.status(200).json({
                ok: true,
                message: 'Updated vendor, but error deleting old images'
              })

              // return the updated vendor
              res.status(200).json({
                ok: true,
                vendor: vendor
              })

            })

          } else {

            deleteImage(params, function(err) {

              // error deleting image
              if (err) return res.status(200).json({
                ok: true,
                message: 'Updated vendor, but error deleting old image'
              })

              // return the updated vendor
              res.status(200).json({
                ok: true,
                vendor: vendor
              })

            })

          }

        // return the updated vendor
        } else res.status(200).json({
          ok: true,
          vendor: vendor
        })

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
      if (err && err.name != 'CastError') return res.status(404).json({
        ok: false,
        err: err.message
      })

      // no vendor with this id
      if (!vendor) return res.status(404).json({
        ok: false,
        message: 'Vendor not found'
      })

      // remove all products of this vendor
      Product.remove({ vendor: vendor._id }, function(err, removed) {

        // internal server error
        if (err) return res.status(500).json({
          ok: false,
          err: err.message
        })

        // remove the associated user
        User.remove({ _id: vendor.userUid }, function(err, removed) {

          // internal server error
          if (err) return res.status(500).json({
            ok: false,
            err: err.message
          })

          // set imageKey before vendor is deleted
          var params = {
            Bucket: 'lungau',
            Delete: {
              Objects: [
                { Key: vendor.imageKey },
                { Key: vendor.farmImageKey }
              ]
            }
          }

          // remove the vendor
          Vendor.remove({ _id: req.params.id }, function(err, removed) {

            // internal server error
            if (err) return res.status(500).json({
              ok: false,
              err: err.message
            })

            if (!params.Delete.Objects[0].Key && !params.Delete.Objects[1].Key) return res.status(200).json({
              ok: true,
              message: 'Removed vendor, no images found tho'
            })

            deleteImages(params, function(err) {

              // error deleting image
              if (err) return res.status(200).json({
                ok: true,
                message: 'Removed category, but error deleting image'
              })

              // successfully deleted
              res.status(200).json({
                ok: true,
                message: 'Successfully deleted vendors and associated user, products and images'
              })

            })

          })

        })

      })

    })

  })

}
