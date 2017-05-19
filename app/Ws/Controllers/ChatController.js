'use strict'

class ChatController {

  constructor (socket, request) {
    this.socket = socket
    this.request = request
    console.log('socket connected:', socket.id)
  }

  disconnected(socket) {
    console.log('socket disconnected:', socket.id)
  }

  onMessage(message) {
    this.socket.toEveryone().emit('message', message)
  }

}

module.exports = ChatController
