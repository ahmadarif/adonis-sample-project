'use strict'

const Schema = use('Schema')

class ProfilesTableSchema extends Schema {

  up () {
    this.create('profiles', (table) => {
      table.increments()
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('Users.id').onDelete('CASCADE')
      table.text('address', 'mediumtext')
      table.timestamps()
    })
  }

  down () {
    this.drop('profiles')
  }

}

module.exports = ProfilesTableSchema
