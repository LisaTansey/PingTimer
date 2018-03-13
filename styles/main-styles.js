import { StyleSheet } from 'react-native'
import Colors from './colors'

export default mainStyles = StyleSheet.create({ 

  app: {
    marginVertical: 20,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.appPrimary,
  },

  panel: {
    flex: 1,
    flexDirection: 'row',
    height: '10%',
    width: '100%',
  },

  left: {
    height: '100%',
    width: '50%',
    alignItems: 'flex-start',
  },

  right: {
    height: '100%',
    width: '50%',
    alignItems: 'flex-end',
  },

  icon: {
    height: 40,
    width: 40,
  }

})
