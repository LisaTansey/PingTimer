const Realm = require('realm')

const TimerSchema = {
  name: 'Timer',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    active: 'bool',
    time: 'date',
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

module.exports = { TimerSchema }
