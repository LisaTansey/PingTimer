import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import Timer from './timer'
import timerStyles from '../../styles/timer-styles'
const TimerModel = require('../../models/timer-model')

export default class Timers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timers: [],
      layout: this.props.layout,
      //enum layout
    }
  }

  componentDidMount() {
    TimerModel.getAll()
      .then(data => {
        let timers = []
        data.forEach(timer => {
          timers.push(this.formatTimer(timer))
        })
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
        this.setState({ timers: [newTimer, ...this.state.timers ]})
      })
  }
  
  destroyTimer(id) {
    let timer = this.state.timers.find(timer => (timer.id === id))
    let ind = this.state.timers.indexOf(timer)
    let timers = this.state.timers
    timers.splice(ind, 1)
    this.setState({ timers })
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
        { this.state.timers }
      </ScrollView>
    )
  }
}
