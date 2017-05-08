var Vendor = require('../../models/vendor.model')
var Product = require('../../models/product.model')

module.exports = function(router) {

  router.route('/vendors')
  /**
   * @api {get} /vendors?filter=<filter> Get all vendors with optional search
   * @apiName GetVendors
   * @apiGroup Vendors
   * @apiPermission none
   *
   * @apiParam {String} [filter] The field name will be search by this.
   *
   * @apiSuccess {Array} vendor Array of vendors.
 */
  .get(function(req, res) {

    var filter = req.query.filter ? req.query.filter : ''

    Vendor
    .find({ 'name': { '$regex': filter } }, function(err, vendors) {

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
  })

  router.route('/vendors/:id')
    /**
     * @api {get} /vendors/:id Get vendor
     * @apiName GetVendor
     * @apiGroup Vendors
     * @apiPermission none
     *
     * @apiSuccess {Object} vendor The vendor for given id.
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
