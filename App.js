import React, { Component } from 'react'
import mainStyles from './styles/main-styles'
import { Text, View, Image } from 'react-native'
import PingSettingsButton from './components/main-buttons/ping-settings-button'
import HelpButton from './components/main-buttons/help-button'
import TagsButton from './components/main-buttons/tags-button'
import SettingsButton from './components/main-buttons/settings-button'
import NewTimerButton from './components/main-buttons/new-timer-button'
import Timers from './components/timers/timers.js'
const SettingsModel = require('./models/settings-model')

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      colors: {},
      layout: '',
    }
  }
  
  async componentDidMount() {
    const colors = await SettingsModel.getColors()
    const layout = await SettingsModel.getLayout()
    this.setState({ colors, layout })
  }

  render() {
    return (
      <View 
        style={mainStyles.app}
      >
        <Image
          source={require('./assets/background1.png')}
          style={{ opacity: 0.2, position: 'absolute', height: '100%', width: '100%' }}
        />

        <View style={mainStyles.panel}>
          <View style={mainStyles.left}>
            <PingSettingsButton />
          </View>

          <View style={mainStyles.right}>
            <HelpButton />
          </View>
        </View>

        <Timers 
          ref='timers' 
          colors={this.state.colors}
          layout={this.state.layout}
        />

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

