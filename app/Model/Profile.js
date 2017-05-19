'use strict'

const Lucid = use('Lucid')

class Profile extends Lucid {

  static get visible () {
    return ['address']
  }

  user () {
    return this.belongsTo('App/Model/User')
  }

}

module.exports = Profile
