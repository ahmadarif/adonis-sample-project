'use strict'

const Env = use('Env')
const Youch = use('youch')
const Http = {}

/**
 * handle errors occured during a Http request.
 *
 * @param  {Object} error
 * @param  {Object} request
 * @param  {Object} response
 */
Http.handleError = function * (error, request, response) {
  const status = error.status || 500
  const type = request.accepts('json', 'html')

  if (type === 'json') {
    switch (error.name) {
      case 'ModelNotFoundException':
        response.status(401).json({ message: 'Model not found!' }); return
        break
      case 'HttpException':
        response.status(404).json({ message: 'REST API not found!' }); return
        break
      case 'Error':
        response.status(500).json({ message: error.message }); return
        break
      case 'TooManyRequests':
        response.status(429).json({ message: error.message }); return
        break
    }
  }

  /**
   * DEVELOPMENT REPORTER
   */
  if (Env.get('NODE_ENV') === 'development') {
    const formatMethod = type === 'json' ? 'toJSON' : 'toHTML'
    const youch = new Youch(error, request.request)
    const formattedErrors = yield youch[formatMethod]()
    response.status(status).send(formattedErrors)
    return
  }

  /**
   * PRODUCTION REPORTER
   */
  console.error(error.stack)
  yield response.status(status).sendView('errors/index', {error})
}

/**
 * listener for Http.start event, emitted after
 * starting http server.
 */
Http.onStart = function () {
}

module.exports = Http
