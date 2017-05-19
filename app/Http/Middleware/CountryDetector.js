'use strict'

const geoip = use('geoip-lite')

class CountryDetector {
  * handle (request, response, next) {
    const ip = request.ip()
    request.country = geoip.lookup(ip).country
    yield next
  }
}

module.exports = CountryDetector
