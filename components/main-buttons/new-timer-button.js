import React, { Component } from 'react'
import { Text, View, TouchableHighlight, Image } from 'react-native'
import mainStyles from '../../styles/main-styles'

export default class NewTimerButton extends Component {
  constructor(props) {
    super(props)
    //can disable if too many timers
  }

  create() {
    this.props.onPress()
  }

  render() {
    return (
      <View>
        <TouchableHighlight
          onPress={() => this.create()} 
        >
          <Image
            style={mainStyles.icon}
            source={require('../../assets/plus.png')}
          />
        </TouchableHighlight>
      </View>
    )
  }

}
