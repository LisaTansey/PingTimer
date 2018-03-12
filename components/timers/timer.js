import React, { Component } from 'react'
import { Text, View, Modal, TextInput, TouchableOpacity, TouchableHighlight } from 'react-native'
import timerStyles from '../../styles/timer-styles'
import { timeToStr } from '../../helpers/timer-helper'
const TimerModel = require('../../models/timer-model')
const Time = require('../../services/time-service')

export default class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: this.props.active,
      time: this.props.time.time,
      name: this.props.name || 'New Alarm',
      timer: null,
      options: false,
      optionsCoords: {},
      editing: false,
    }
  }

  toggleActive() {
    let active = !this.state.active
    this.setState({ active })
    if (active) {
      this.setState({
        timer: setInterval(this.addSecond.bind(this), 1000)
      })
    } else {
      clearInterval(this.state.timer) 
    }
  }

  toggleOptions() {
    let options = !this.state.options
    this.setState({ options })
  }

  toggleEditing() {
    let editing = !this.state.editing
    this.toggleOptions()
    this.setState({ editing })
  }

  addSecond() {
    this.setState({ time: new Date(this.state.time.getTime() + 1000) })
  }

  name() {
    if (this.state.editing) {
      return (
        <TextInput
          style={timerStyles.name}
          onChangeText={(name) => this.setState({ name })}
          onEndEditing={() => this.setState({editing:false})}
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

  options() {
    return (
      <Modal
        visible={this.state.options}
        style={{height: 50, width: 50}}
      >
        <TouchableHighlight
          onPress={() => this.toggleEditing()}
        >
          <Text>Edit</Text>
        </TouchableHighlight>
        
        <TouchableHighlight
          onPress={() => this.deleteTimer()}
        >
          <Text>Delete</Text>
        </TouchableHighlight>
      </Modal>
    )
  }

  selectOption(val) {
    if (val === 'edit') {
      this.toggleEditing()
    } else if (val === 'delete') {
      //delete timer 
    }
  }

  render() {
    return (
      <TouchableOpacity 
        onPress={() => this.toggleActive()}
        onLongPress={(event) => this.toggleOptions(event)}
        style={timerStyles.timer}>
      >
        { this.options() }
        <View style={timerStyles.nameBox}>
          { this.name() }
        </View>

        <View style={timerStyles.time}>
          <Text style={timerStyles.timeText}>
            { timeToStr(this.state.time) }
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}
