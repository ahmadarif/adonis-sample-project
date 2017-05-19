'use strict'

const User = use('App/Model/User')
const Hash = use('Hash')
const Validator = use('Validator')

const kue = use('Kue')
const Job = use('App/Jobs/Example')

class UserController {

  * get(request, response) {
    const users = yield User.all();
    response.ok(users)
  }

  * getById(request, response) {
    const user = yield User.findOrFail(request.param('id'))
    response.ok(user)
  }

  * insert(request, response) {
    const user = new User();
    user.username = request.input('username')
    user.email = request.input('email')
    user.password = yield Hash.make(request.input('password'))
    yield user.save()

    response.ok({ message: 'Save done!'})
  }

  * update(request, response) {
    const user = yield User.findBy('id', request.param('id'))
    user.username = request.input('username')
    user.email = request.input('email')
    user.password = yield Hash.make(request.input('password'))
    yield user.save()

    response.ok({ message: 'Update done!'})
  }

  * delete(request, response) {
    const user = yield User.findBy('id', request.param('id'))
    yield user.delete()

    response.ok({ message: 'Delete done!'})
  }

  * querySingle(request, response) {
    const users = yield User.query().where('username', 'user30').first()
    response.ok(users)
  }

  * queryMultiple(request, response) {
    const users = yield User.query().where('username', 'user30').fetch()
    response.ok(users)
  }

  * paginate(request, response) {
    const users = yield User.paginate(request.input('page', 1), 20)
    response.ok(users)
  }

  * relation(request, response) {
    const user = yield User.find(request.param('id'))
    yield user.related('profile').load()
    response.ok(user)
  }

  * login (request, response) {
    const rules = {
      email: 'required|email',
      password: 'required',
    }

    const validation = yield Validator.validateAll(request.all(), rules, [])
    if (validation.fails()) {
      response.status(400).json({ error: validation.messages() })
      return
    }

    const email = request.input('email')
    const password = request.input('password')

    // API TOKEN AUTH
    const tokenAuthenticator = request.auth.authenticator('api')
    const user = yield User.findBy('email', email)
    if (user) {
      const isSame = yield Hash.verify(password, user.password)
      if (isSame) {
        const token = yield tokenAuthenticator.generate(user)
        response.json(token)
        return
      }
    }
    response.status(401).json({ json: 'Invalid credentails' })
  }

  * profile (request, response) {
    const user = request.currentUser || request.authUser
    if (user) {
      response.ok(user)
      return
    }
    response.status(401).json({ error: 'You must login to view your profile'})
  }

  * sendMail(request, response) {
    const data = {
      to: 'ahmad.arif019@gmail.com',
      name: 'Ahmad Arif',
      from: 'no-reply@adonis.com',
      subject: 'Email Testing'
    }
    const job = kue.dispatch(Job.key, data)
    response.json({ message: 'Mail queue!' })
  }
}

module.exports = UserController
