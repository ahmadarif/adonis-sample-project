'use strict'

const Profile = use('App/Model/Profile')

const User = {}

User.createProfile = function * (next) {
  console.log(`hook, user_id = ${this.id}`)
  const profile = new Profile()
  profile.user_id = this.id
  yield profile.save()
  yield next
}

module.exports = User
