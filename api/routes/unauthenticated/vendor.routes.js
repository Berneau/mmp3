var Vendor = require('../../models/vendor.model')

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
      if (err) res.status(500).end(err)
      res.json(vendors)
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

        if (err && err.name != 'CastError') res.status(404).json(err.message)
        else if (!err && vendor) res.status(200).json(vendor)
        else res.status(404).json({ message: 'Vendor not found'})
      })
    })

}
