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

module.exports = { TimerSchema }
