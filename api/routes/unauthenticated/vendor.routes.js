var Vendor = require('../../models/vendor.model')
var Product = require('../../models/product.model')

module.exports = function(router) {

  router.route('/vendors')
  /**
   * @api {get} /vendors?filter=<filter>&userId=<userId> Get all vendors with optional search or by userId
   * @apiName GetVendors
   * @apiGroup Vendors
   * @apiPermission none
   *
   * @apiParam {String} [filter] The fields name, subName, address.city and address.zip will be search by this.
   * @apiParam {String} [userId] Id of the id of a user (returns only one object)
   *
   * @apiSuccess {Array} vendor Array of vendors.
 */
  .get(function(req, res) {

    var userId = req.query.userId ? req.query.userId : ''
    var filter = req.query.filter ? req.query.filter : ''
    var regex = new RegExp(filter, 'i')
    var zip

    if (Number.isInteger(parseInt(filter))) zip = parseInt(filter)
    else zip = undefined


    // userId is given
    if (userId) {

      Vendor
      .findOne({ userUid: userId }, function(err, vendor) {

        // internal server error
        if (err) res.status(500).json({
          ok: false,
          err: err.message
        })

        // return
        else if (!vendor) res.status(404).json({
          ok: false,
          err: 'No Vendor found for this userId'
        })

        else res.status(200).json({
          ok: true,
          vendor: vendor
        })

      })

    }

    // no userId is given - normal list with optional search
    else {

      Vendor
      .find({
        $or: [
          { name: regex },
          { subName: regex },
          { 'address.city': regex },
          { 'address.zip': zip }
        ]
      }, function(err, vendors) {

        // internal server error
        if (err) res.status(500).json({
          ok: false,
          err: err.message
        })

        // return vendor list
        else res.status(200).json({
          ok: true,
          vendors: vendors
        })
      })
      .sort({name: 1})

    }

  })

  router.route('/vendors/:id')
    /**
     * @api {get} /vendors/:id Get vendor
     * @apiName GetVendor
     * @apiGroup Vendors
     * @apiPermission none
     *
     * @apiSuccess {Object} vendor The vendor for given id.
     * @apiSuccess {Array} products The products of the vendor.
    */
    .get(function(req, res) {
      Vendor.findById(req.params.id, function(err, vendor) {

        // internal server err
        if (err && err.name != 'CastError') res.status(404).json({
          ok: false,
          err: err.message
        })

        // return found vendor object
        else if (!err && vendor) {
          Product.find({ 'vendorId': vendor._id }, function(err, products) {

            res.status(200).json({
              ok: true,
              vendor: vendor,
              products: products
            })
          })
        }

        // no vendor was found
        else res.status(404).json({
          ok: false,
          message: 'Vendor not found'
        })
      })
    })

}
