var Event = require('../../models/event.model')

module.exports = function(router) {

  router.route('/events')
  /**
   * @api {get} /events Get all the events
   * @apiName GetEvents
   * @apiGroup Events
   * @apiPermission none
   *
   * @apiSuccess {Array} event Array of events.
  */
  .get(function(req, res) {

    Event
    .find({}, function(err, events) {

      // internal server error
      if (err) res.status(500).json({
        ok: false,
        err: err.message
      })

      // return event list
      else res.status(200).json({
        ok: true,
        events: events
      })
    })
    .sort({name: 1})
  })

  router.route('/events/:id')
  /**
   * @api {get} /events/:id Get events
   * @apiName GetEvent
   * @apiGroup Events
   * @apiPermission none
   *
   * @apiSuccess {Object} event The event for given id.
  */
  .get(function(req, res) {
    Event.findById(req.params.id, function(err, event) {

      // internal server error
      if (err && err.name != 'CastError') res.status(404).json({
        ok: false,
        err: err.message
      })

      // return found event Object
      else if (!err && event) res.status(200).json({
        ok: true,
        event: event
      })

      // no event was found
      else res.status(404).json({
        ok: false,
        message: 'Event not found'
      })
    })
  })

}
