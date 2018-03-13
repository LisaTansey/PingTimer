import { StyleSheet } from 'react-native'
import Colors from './colors'

export default timerStyles = StyleSheet.create({

  timers: {
    height: '80%',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  timer: {
    height: '30%',
    width: '50%',
    backgroundColor: Colors.appTertiary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  time: {
    backgroundColor: 'red',
  },

  timeText: {
    fontSize: 30,
    color: 'black',
  },

  nameBox: {
    marginBottom: '10%',
  },

  name: {
    fontSize: 20,
  },

  options: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

})
