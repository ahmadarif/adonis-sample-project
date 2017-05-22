'use strict'

const Redis = use('Redis')

class RedisController {

  * index(request, response) {
    const cachedUsers = yield Redis.get('users')
    if (cachedUsers) {
      response.json(JSON.parse(cachedUsers))
      return
    }

    const users = [
      { name: 'Ahmad' },
      { name: 'Arif' }
    ]
    yield Redis.set('users', JSON.stringify(users))
    response.json(users)
  }

  * post(request, response) {
    Redis.publish('music', JSON.stringify(request.all()))
    response.ok('Feel good!')
  }

}

module.exports = RedisController
