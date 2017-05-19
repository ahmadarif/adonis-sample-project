'use strict'

const Helpers = use('Helpers')

class ApiController {

  * test (request, response) {
    response.json({ message: 'Test message from ApiController' })
  }

  * updateAvatar (request, response) {

    const avatar = request.file('avatar')

    const fileName = `${new Date().getTime()}.${avatar.extension()}`
    yield avatar.move(Helpers.storagePath(), fileName)

    if (!avatar.moved()) {
      response.badRequest(avatar.errors().message)
      return
    }

    response.json({
      message: 'Avatar updated successfully',
      path: avatar.uploadName()
    })
  }

}

module.exports = ApiController
