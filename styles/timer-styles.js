import { StyleSheet } from 'react-native'
import Colors from './colors'

export default timerStyles = StyleSheet.create({

  timers: {
    height: '61%',
    width: '100%',
  },

  timersInner: {
    height: '100%',
    flexDirection: 'row',
  },

  timer: {
    height: 145,
    width: 124,
    backgroundColor: Colors.appSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
  },

  time: {
  },

  timeText: {
    fontSize: 30,
    color: Colors.appTertiary,
  },

  nameBox: {
    marginBottom: '13%',
  },

  name: {
    fontSize: 23,
    color: Colors.appTertiary,
  },

  options: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

})
