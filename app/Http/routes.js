'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')
const Helpers = use('Helpers')
const geoip = use('geoip-lite')

Route.on('/').render('welcome')

Route.get('/storage/:file_name', function * (request, response) {
  const file = Helpers.storagePath(request.param('file_name'))
  response.download(file)
})

Route.group('api', function () {
  Route.get('/hello', function * (request, response) {
    const name = request.input('name')
    response.json({message: `Hello ${name}!`})
  })

  Route.get('/request', function * (request, response) {
    const data = request.all()
    data.ip = yield geoip.lookup('207.97.227.239').city
    response.json(data)
  })

  Route.get('/test', 'ApiController.test')
  Route.post('/upload', 'ApiController.updateAvatar')

  Route.get('/users', 'UserController.get')
  Route.get('/users/:id', 'UserController.getById')
  Route.post('/users', 'UserController.insert')
  Route.put('/users/:id', 'UserController.update')
  Route.delete('/users/:id', 'UserController.delete')

  Route.get('/query1', 'UserController.querySingle')
  Route.get('/query2', 'UserController.queryMultiple')
  Route.get('/paginate', 'UserController.paginate')
  Route.get('/relation/:id', 'UserController.relation')

  Route.post('login', 'UserController.login')
  Route.get('profile', 'UserController.profile')
  Route.get('sendMail', 'UserController.sendMail')
}).prefix('/api').middleware('throttle:5')
