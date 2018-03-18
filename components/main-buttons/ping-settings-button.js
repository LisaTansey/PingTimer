import React, { Component } from 'react'
import { Text, View, TouchableHighlight, Image, Picker, Button } from 'react-native'
import Modal from 'react-native-modal'
import mainStyles from '../../styles/main-styles'
import modalStyles from '../../styles/modal-styles'
const Settings = require('../../models/settings-model')

export default class PingSettingsButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      interval: '15',
      editing: false,
    }
  }

  componentDidMount() {
    Settings.getPingInterval()
      .then(interval => this.setState({ interval }))
      .catch(err => alert(err))
  }

  nextPing() {
    let utc_min = Date.now() / 60000
    let last_interval = utc_min - (utc_min % parseInt(this.state.interval)) 
    let date_next = new Date(0)
    date_next.setUTCMinutes(last_interval + parseInt(this.state.interval))
    return `${date_next.getHours() % 12}:${date_next.getMinutes()}`
  }
  
  setInterval() {
    Settings.setPingInterval(this.state.interval)
      .then(res => this.setState({editing:false}))
      .catch(err => alert(err))
  }

  modal() {
    return (
      <Modal
        isVisible={this.state.editing}
        onBackdropPress={() => this.setState({editing:false})}
        style={modalStyles.top}
        animationIn='fadeIn'
        animationOut='fadeOut'
      >
        <View
          style={{backgroundColor: 'white'}} 
        >
          <Text
            style={{fontSize: 20, justifyContent: 'center', color: 'blue'}}
          >
            {`Select Ping Interval, next ping at ${this.nextPing()}`}
          </Text>

          <Picker
            selectedValue={this.state.interval} 
            onValueChange={(interval, ind) => this.setState({interval})}
          >
            <Picker.Item label='5 min' value='5' />
            <Picker.Item label='10 min' value='10' />
            <Picker.Item label='15 min' value='15' />
            <Picker.Item label='20 min' value='20' />
            <Picker.Item label='30 min' value='30' />
            <Picker.Item label='45 min' value='45' />
            <Picker.Item label='1 hr' value='60' />
            <Picker.Item label='2 hrs' value='120' />
            <Picker.Item label='5 hrs' value='300' />
            <Picker.Item label='10 hrs' value='600' />
          </Picker>
        </View>
        
        <View>
          <Button
            title='Set Interval'
            onPress={this.setInterval.bind(this)}
          />
        </View>
      </Modal>
    )
  }

  render() {
    return (
      <TouchableHighlight
        onPress={() => this.setState({editing:true})} 
      >
        <View>
          { this.modal() }
          <Image
            style={mainStyles.icon}
            source={require('../../assets/exclamation.png')}
          />
        </View>
      </TouchableHighlight>
    )
  }
}
