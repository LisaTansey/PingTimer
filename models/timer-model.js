import { TimerSchema } from './schema'
const Realm = require('realm')

const getAll = async () => {
  let realm = await Realm.open({ schema: [TimerSchema] })
  return realm.objects('Timer')
}

const create = async (data) => {
  let realm = await Realm.open({ schema: [TimerSchema] })
  realm.write(() => {
    realm.create('Timer', data)
  })
  return data
}

const destroy = async (id) => {
  let realm = await Realm.open({ schema: [TimerSchema] })
  const timers = realm.objects('Timer').filtered(`id = ${id}`)
  realm.write(() => realm.delete(timers[0]))
  return timers[0]
}

module.exports = { getAll, create, destroy }
