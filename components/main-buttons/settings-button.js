import React, { Component } from 'react'
import { Text, View, TouchableHighlight, Image } from 'react-native'
import mainStyles from '../../styles/main-styles'

export default class SettingsButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
    }
  }

  render() {
    return (
      <Text>Settings</Text>
    )
  }
}
