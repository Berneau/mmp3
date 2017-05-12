var Event = require('../../models/event.model')
var eventIsValid = require('../../helpers/helpers').eventIsValid

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

    if(!eventIsValid(req.body)) {

      // not a valid event Object
      res.status(412).json({
        ok: false,
        message: 'Missing fields'
      })
    } else {

      var event = new Event({
        name: req.body.name,
        date: req.body.date,
        description: req.body.description
      })

      event.save(function(err) {

        // internal server error
        if (err) res.status(500).json({
          ok: false,
          err: err.message
        })

        // return created event
        else res.status(200).json({
          ok: true,
          event: event
        })
      })
    }

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
      if (err && err.name != 'CastError') res.status(404).json({
        ok: false,
        err: err.message
      })

      else if (!err && event) {
        if (eventIsValid(req.body)) {

          event.name = req.body.name,
          event.date = req.body.date,
          event.description = req.body.description

          event.save(function(err) {

            // internal server error
            if (err) res.status(500).json({
              ok: false,
              err: err.message
            })

            // return the updated event
            else res.status(200).json({
              ok: true,
              event: event
            })
          })

          // not a valid type
        } else res.status(412).json({
          ok: false,
          message: 'Missing fields'
        })

        // no event with this id
      } else res.status(404).json({
        ok: false,
        message: 'Event not found'
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
      if (err && err.name != 'CastError') res.status(404).json({
        ok: false,
        err: err.message
      })

      else if (!err && event) {
        Event.remove({ _id: req.params.id }, function(err, event) {

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

        // no event with this id
      } else res.status(404).json({
        ok: false,
        message: 'Event not found'
      })
    })
  })

}
