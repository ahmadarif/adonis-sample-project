'use strict'

const Lucid = use('Lucid')

class User extends Lucid {

  /**
   * Yang dikirim hanya pada string ini
   * @returns {[string, .., String]}
   */
  static get visible () {
    return ['id', 'username', 'email']
  }

  /**
   * Enable soft delete | kirim nama fieldnya | defaultnya null
   * @returns {string}
   */
  static get deleteTimestamp () {
    return 'deleted_at'
  }

  static boot () {
    super.boot()
    this.addHook('afterCreate', 'User.createProfile')
  }

  static scopeActive (builder) {
    builder.where('deleted_at', null)
  }

  profile () {
    return this.hasOne('App/Model/Profile')
  }

  apiTokens () {
    return this.hasMany('App/Model/Token')
  }

  static get computed () {
    return ['tes']
  }

  getTes () {
    return 'Haha'
  }

}

module.exports = User
