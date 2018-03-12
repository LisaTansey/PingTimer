import { TimerSchema } from './schema'
import { formatTimer } from '../helpers/timer-helper'
const Realm = require('realm')

const getAll = async () => {
  let realm = await Realm.open({ schema: [TimerSchema] })
  return realm.objects('Timer').map(timer => formatTimer(timer))
}

const create = async (data) => {
  let realm = await Realm.open({ schema: [TimerSchema] })
  realm.write(() => {
    realm.create('Timer', data)
  })
  return formatTimer(data)
}

const destroy = async (id) => {
  let realm = await Realm.open({ schema: [TimerSchema] })
  let timer = realm.objects('Timer').filtered(`id = ${id}`)
  realm.delete(timer)
  return formatTimer(timer)
}

module.exports = { getAll, create, destroy }
