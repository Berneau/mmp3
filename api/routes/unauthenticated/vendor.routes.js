var Vendor = require('../../models/vendor.model')

module.exports = function(router) {

  router.route('/vendors')
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
    .skip(parseInt(skip))
    .limit(parseInt(limit))
  })

  router.route('/vendors/:id')
    /**
     * @api {get} /vendors/:id Get vendor
     * @apiName GetVendor
     * @apiGroup Vendors
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
