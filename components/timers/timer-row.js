import React, { Component } from 'react'
import { View } from 'react-native'

export default class TimerRow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filled: this.isFilled(),
      visibleNumber: parseInt(this.props.visibleNumber),
    }
  }

  isFilled() {
    return true
    //return Boolean(this.props.children.count === this.state.visibleNumber)
  }

  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        { this.props.children } 
      </View>
    )
  }
  
}
