const Realm = require('realm')
const { schema } = require('./schema')

const getAll = async () => {
  let realm = await Realm.open({ schema })
  return realm.objects('Timer')
}

const get = async (id) => {
  try {
    let realm = await Realm.open({ schema })
    return realm.objectForPrimaryKey('Timer', id)
  } catch (e) {
    alert(e)
  }
}

const create = async (data) => {
  let realm = await Realm.open({ schema })
  realm.write(() => {
    realm.create('Timer', data)
  })
  return data
}

const destroy = async (id) => {
  let realm = await Realm.open({ schema })
  const timers = realm.objects('Timer').filtered(`id = ${id}`)
  realm.write(() => realm.delete(timers[0]))
  return timers[0]
}

const toggleActive = async (id, prevValue) => {
  try {
    let realm = await Realm.open({ schema })
    realm.write(() => realm.create('Timer', { id, active:!prevValue }, true))
    return true
  } catch (e) {
    return false
  }
}

const addTime = async (id, time) => {
  try {
    let realm = await Realm.open({ schema })
    let oldTime = await get(id)
    let newTime = new Date()
    newTime.setTime(oldTime.time.getTime() + time)
    realm.write(() => realm.create('Timer', { id, time: newTime }, true))
  } catch (e) {
    alert(e)
  }
}

module.exports = { getAll, get, create, destroy, toggleActive, addTime, }
