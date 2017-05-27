var Event = require('../../models/event.model')
var eventIsValid = require('../../helpers/helpers').eventIsValid
var eventFactory = require('../../helpers/helpers').eventFactory

module.exports = function(router) {

  router.route('/events')
  /**
   * @api {post} /events Create Event
   * @apiName CreateEvent
   * @apiGroup Events
   * @apiPermission admin
   *
   * @apiParam {String} name The Title of the event
   * @apiParam {Date} date The Date of the event
   * @apiParam {String} description The Description of the event
   *
   * @apiSuccess {Object} event The created event
  */
  .post(function(req, res) {

    // not a valid event Object
    if(!eventIsValid(req.body)) return res.status(412).json({
      ok: false,
      message: 'Missing fields'
    })

    var event = new Event()
    event = eventFactory(req.body, event)

    event.save(function(err) {

      // internal server error
      if (err) return res.status(500).json({
        ok: false,
        err: err.message
      })

      // return created event
      res.status(200).json({
        ok: true,
        event: event
      })
    })

  })

  router.route('/events/:id')
  /**
   * @api {put} /events/:id Update Event
   * @apiName UpdateEvent
   * @apiGroup Events
   * @apiPermission admin
   *
   * @apiParam {String} name The name of the event
   * @apiParam {Date} date The date of the event
   * @apiParam {String} [description] the description of the event
   *
   * @apiSuccess {Object} event The updated event
  */
  .put(function(req, res) {

    Event.findById(req.params.id, function(err, event) {

      // not a valid id
      if (err && err.name != 'CastError') return res.status(404).json({
        ok: false,
        err: err.message
      })

      // no event with this id
      if (!event) return res.status(404).json({
        ok: false,
        message: 'Event not found'
      })

      // not a valid event
      if (!eventIsValid(req.body)) return res.status(412).json({
        ok: false,
        message: 'Missing fields'
      })

      event = eventFactory(req.body, event)

      event.save(function(err) {

        // internal server error
        if (err) return res.status(500).json({
          ok: false,
          err: err.message
        })

        // return the updated event
        res.status(200).json({
          ok: true,
          event: event
        })

      })

    })

  })

  /**
   * @api {delete} /events/:id Delete event
   * @apiName DeleteEvent
   * @apiGroup Events
   * @apiPermission admin
   *
   * @apiSuccess {String} message Success message.
  */
  .delete(function(req, res) {

    Event.findById(req.params.id, function(err, event) {

      // not a valid id
      if (err && err.name != 'CastError') return res.status(404).json({
        ok: false,
        err: err.message
      })

      // no event with this id
      if (!event) return res.status(404).json({
        ok: false,
        message: 'Event not found'
      })

      Event.remove({ _id: req.params.id }, function(err, event) {

        // internal server error
        if (err) return res.status(500).json({
          ok: false,
          err: err.message
        })

        // successfully deleted
        res.status(200).json({
          ok: true,
          message: 'Successfully deleted'
        })

      })

    })

  })

}
