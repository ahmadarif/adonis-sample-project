'use strict'

const Lucid = use('Lucid')

class Token extends Lucid {

  static get visible () {
    return ['token']
  }

  user () {
    return this.belongsTo('App/Model/User')
  }

}

module.exports = Token
