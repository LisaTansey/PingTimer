import React, { Component } from 'react'
import mainStyles from './styles/main-styles'
import { Text, View } from 'react-native'
import PingSettingsButton from './components/main-buttons/ping-settings-button'
import HelpButton from './components/main-buttons/help-button'
import TagsButton from './components/main-buttons/tags-button'
import SettingsButton from './components/main-buttons/settings-button'
import NewTimerButton from './components/main-buttons/new-timer-button'
import Timers from './components/timers/timers.js'

export default class App extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <View style={mainStyles.app}>

        <View style={mainStyles.panel}>
          <View style={mainStyles.left}>
            <PingSettingsButton />
          </View>

          <View style={mainStyles.right}>
            <HelpButton />
          </View>
        </View>

        <Timers ref='timers' />

        <View style={mainStyles.panel}>
          <View style={mainStyles.left}>
            <TagsButton />
            <SettingsButton />
          </View>

          <View style={mainStyles.right}>
            <NewTimerButton 
              className='create-button'
              onPress={() => this.refs.timers.addTimer()}
            />
          </View>
        </View>

      </View>
    )
  }
}

