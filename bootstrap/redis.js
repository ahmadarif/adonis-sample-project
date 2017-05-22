'use strict'

const Redis = use('Redis')

Redis.subscribe('music', function * (track) {
  console.log('received track', track)
})
