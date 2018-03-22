const Realm = require('realm')
const { schema } = require('./schema')

const getPingInterval = async () => {
  let realm = await Realm.open({ schema })
  let pingSetting = realm.objects('Settings').filtered('name = "pingInterval"')
  if (pingSetting) {
    return parseInt(pingSetting.value)
  } else {
    return await initializePingInterval()
  }
}

const setPingInterval = async (time) => {
  let realm = await Realm.open({ schema })
  realm.write(() => {
    realm.create('Settings', {
      name: 'pingInterval',
      value: time
    }, true)
  })
}

const initializePingInterval = async (time='15') => {
  let realm = await Realm.open({ schema })
  realm.write(() => {
    realm.create('Settings', {
      name: 'pingInterval',
      value: time
    })
  })
  return time
}

const getLayout = async () => {

}

const setLayout = async (layout) => {

}

const getColors = async () => {

}

const setColors = async (colorScheme) => {

}

module.exports = { 
  getPingInterval, 
  setPingInterval, 
  getLayout,
  setLayout,
  getColors,
  setColors,
}
