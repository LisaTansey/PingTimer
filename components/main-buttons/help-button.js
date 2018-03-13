import React, { Component } from 'react'
import { Text, View, TouchableHighlight, Image } from 'react-native'
import mainStyles from '../../styles/main-styles'

export default class HelpButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
    }
  }

  toggleActive() {

  }

  modal() {

  }

  render() {
    return (
      <TouchableHighlight
        onPress={this.toggleActive.bind(this)}
      >
        <View>
          { this.modal() }
          <Image
            style={mainStyles.icon}
            source={require('../../assets/question-mark.png')}
          />
        </View>
      </TouchableHighlight>
    )
  }
}
