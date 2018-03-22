import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import Timer from './timer'
import timerStyles from '../../styles/timer-styles'
import TimerRows from '../../objects/timer-rows'
const TimerModel = require('../../models/timer-model')
const SettingsModel = require('../../models/settings-model')
const Dimensions = require('Dimensions')

export default class Timers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timers: new TimerRows(Dimensions.get('window')),
    }
  }

  async componentDidMount() {
    let data = await TimerModel.getAll()
    let formattedData = []
    data.forEach(timer => {
      formattedData.push(this.formatTimer(timer))
    })
    let timers = this.state.timers.initializeRows(formattedData) 

    let layout = await SettingsModel.getLayout()
    let colorScheme = await SettingsModel.getColors()
    timers.setLayout(layout)
    timers.setColors(colorScheme)

    this.setState({ timers })
    Dimensions.addEventListener('change', () => {
      let timers = this.state.timers.swapOrientation()
      this.setState({ timers })
    })
  } 

  componentWillUnmount() {
    Dimensions.removeEventListener('change', () => {
      let timers = this.state.timers.swapOrientation
      this.setState({ timers })
    })
  }

  addTimer() {
    TimerModel.create({
      id: (new Date()).getTime(),
      active: false,
      name: 'New Timer',
      time: new Date(0,0,0,0,0,0),
    })
      .then(data => { 
        const newTimer = this.formatTimer(data)
        let timers = this.state.timers.addTimer(newTimer)
        this.setState({ timers })
        //this.setState({ timers: [newTimer, ...this.state.timers ]})
      })
  }
  
  destroyTimer(id) {
    let timers = TimerRows.deleteTimer(id)
    this.setState({ timers })
    /*let timer = this.state.timers.find(timer => (timer.id === id))
    let ind = this.state.timers.indexOf(timer)
    let timers = this.state.timers
    timers.splice(ind, 1)
    this.setState({ timers })*/
    TimerModel.destroy(id)
  }

  formatTimer(timer) {
    return (
      <Timer 
        key={timer.id}
        id={timer.id}
        name={timer.name}
        active={timer.active}
        time={{
          time: timer.time
        }}
        onDestroy={this.destroyTimer.bind(this)}
      />
    )
  }

  render() {
    return (
      <ScrollView 
        style={timerStyles.timers}
        contentContainerStyle={timerStyles.thisShit}
      >
        { this.state.timers.renderTimers() }
      </ScrollView>
    )
  }
}
