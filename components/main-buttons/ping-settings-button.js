import React, { Component } from 'react'
import { Text, View, TouchableHighlight, Image } from 'react-native'
import Modal from 'react-native-modal'
import mainStyles from '../../styles/main-styles'
const Settings = require('../../models/settings-model')

export default class PingSettingsButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      interval: 15,
      editing: false,
    }
  }

  componentDidMount() {
    Settings.getPingInterval()
      .then(interval => this.setState({ interval }))
  }

  modal() {

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
