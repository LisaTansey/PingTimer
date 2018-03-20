import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, Button } from 'react-native'
import Modal from 'react-native-modal'
import timerStyles from '../../styles/timer-styles'
import { timeToStr } from '../../helpers/timer-helper'
import TimerObject from '../../objects/timer'
const TimerModel = require('../../models/timer-model')

export default class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: this.props.active,
      time: this.props.time.time,
      name: this.props.name || 'New Alarm',
      timer: new TimerObject(),
      timerTask: null,
      options: false,
      editing: false,
    }
  }

  async toggleActive() {
    let active = !this.state.active
    let res = await TimerModel.toggleActive(this.props.id, this.state.active)
    if (res) {
      this.setState({ active })
      if (active) {
        this.startTiming()
      } else {
        this.stopTiming()
      }
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

  async addSecond() {
    this.setState({ time: new Date(this.state.time.getTime() + 1000) })
  }

  deleteTimer() {
    this.setState({ options: false })
    this.props.onDestroy(this.props.id)
  }

  startTiming() {
    this.state.timer.start()
    this.setState({ timerTask: setInterval(this.addSecond.bind(this), 1000)})
  }

  async stopTiming() {
    await this.state.timer.stop(this.props.id)
    clearInterval(this.state.timerTask) 
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
        isVisible={this.state.options}
        onBackdropPress={() => this.toggleOptions()}
        style={timerStyles.options}
        animationIn='fadeIn'
        animationOut='fadeOut'
      >
        <Button
          onPress={() => this.toggleEditing()}
          title='Edit'
          color='white'
        />

        <Button
          onPress={() => this.deleteTimer()}
          title='Delete'
          color='white'
        />
      </Modal>
    )
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
