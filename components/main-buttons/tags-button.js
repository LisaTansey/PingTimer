import React, { Component } from 'react'
import { Text, View, TouchableHighlight, Image } from 'react-native'
import mainStyles from '../../styles/main-styles'

export default class TagsButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
    }
  }

  modal() {

  }

  render() {
    return (
      <TouchableHighlight
        onPress={() => this.setState({active:true})}
      >
        <View>
          { this.modal() }
          <Image
            style={mainStyles.icon}
            source={require('../../assets/list.png')}
          />
        </View>
      </TouchableHighlight>
    )
  }
}
