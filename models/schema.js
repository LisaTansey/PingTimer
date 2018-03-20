const Realm = require('realm')

const TimerSchema = {
  name: 'Timer',
  primaryKey: 'id',
  properties: {
    id: 'int',
    time: 'date',
    active: 'bool',
    name: 'string',
  },
}

const SettingsSchema = {
  name: 'Settings',
  primaryKey: 'name',
  properties: {
    name: 'string',
    value: 'string',
  }
}

module.exports = { schema: [TimerSchema, SettingsSchema] }
