import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import Timer from './timer'
import timerStyles from '../../styles/timer-styles'

export default class Timers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timers: [],
      layout: 1,
    }
  }

  componentDidMount() {
    //add all timers
  } 

  
  addTimer() {
    this.setState({ timers: [
      <Timer
        key={this.state.timers.length}
        active={false}
        className='timer'
      />,
      ...this.state.timers ]})
  }
  
  render() {
    return (
      <View style={timerStyles.timers}>
        { this.state.timers }
      </View>
    )
  }
}
