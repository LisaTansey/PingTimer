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
      layout: 1,
    }
  }

  componentDidMount() {
    TimerModel.getAll()
      .then(timers => this.setState({ timers }))
  } 

  
  addTimer() {
    TimerModel.create({
      id: (new Date()).getTime(),
      active: false,
      name: 'New Timer',
      time: new Date(0,0,0,0,0,0),
    })
      .then(newTimer => {
        this.setState({ timers: [newTimer, ...this.state.timers ]})
      })
  }
  
  render() {
    return (
      <View style={timerStyles.timers}>
        { this.state.timers }
      </View>
    )
  }
}
