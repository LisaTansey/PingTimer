import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity } from 'react-native'
import timerStyles from '../../styles/timer-styles'
const Time = require('../../services/time-service')

export default class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: this.props.active,
      time: '28:48',
      name: this.props.name || 'New Alarm',
      editing: false,
    }
  }

  toggleActive() {
    let active = !this.state.active
    this.setState({ active })   
  }

  toggleEditing() {
    let editing = !this.state.editing
    this.setState({ editing })
  }

  name() {
    if (this.state.editing) {
      return (
        <TextInput
          style={timerStyles.name}
          onChangeText={(name) => this.setState({ name })}
          value={this.state.name}
        />
      )
    } else {
      return (
        <Text style={timerStyles.name}>
          { this.state.name }
        </Text>
      )
    }
  }

  render() {
    return (
      <TouchableOpacity 
        onPress={() => this.toggleActive()}
        onLongPress={() => this.toggleEditing()}
        style={timerStyles.timer}>
      >
        <View style={timerStyles.nameBox}>
          { this.name() }
        </View>

        <View style={timerStyles.time}>
          <Text style={timerStyles.timeText}>{ this.state.time }</Text>
        </View>
      </TouchableOpacity>
    )
  }
}
