import { SettingsSchema } from './schema'
const Realm = require('realm')

const getPingInterval = async () => {
  let realm = await Realm.open({schema: [SettingsSchema] })
  let pingSetting = realm.objects('Settings').filtered('name = "pingInterval"')
  if (pingSetting) {
    return parseInt(pingSetting.value)
  } else {
    await setPingInterval()
    return 15
  }
}

const setPingInterval = async (time='15') => {
  let realm = await Realm.open({schema: [SettingsSchema] })
  realm.write(() => {
    realm.create('Settings', {
      name: 'pingInterval',
      value: time
    })
  })
}

module.exports = { getPingInterval }
