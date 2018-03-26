import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import Timer from './timer'
import timerStyles from '../../styles/timer-styles'
import TimerRow from './timer-row'
const TimerModel = require('../../models/timer-model')
const SettingsModel = require('../../models/settings-model')
const Dimensions = require('Dimensions')

export default class Timers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timers: [],
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      visibleNumber: parseInt(Dimensions.get('window').width / 124),
      rows: [],
    }
  }

  async componentDidMount() {
    let data = await TimerModel.getAll()
    let timers = []
    data.forEach(timer => {
      timers.push(this.formatTimer(timer))
    })

    this.setState({ timers, 
      layout: this.props.layout, 
      colorScheme: this.props.colorScheme 
    }) 

    this.setState({ rows: this.initializeRows() })
    this.setSwapListener()
  } 

  componentWillReceiveProps(nextProps) {
    if (nextProps.colors) {
      this.setState({ colorScheme: nextProps.colorScheme })
    } else if (nextProps.layout) {
      this.setState({ layout: nextProps.layout })
    }
  }

  setSwapListener() {
    Dimensions.addEventListener('change', () => {
      let timers = this.state.timers.swapOrientation()
      this.setState({ timers })
    })
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', () => {
      let timers = this.state.timers.swapOrientation
      this.setState({ timers })
    })
  }

  initializeRows(timers=this.state.timers) {
    let visibleNumber = this.state.visibleNumber
    let rows = []
    for (i = 0; i < timers.length; i += visibleNumber) {
      let row = <TimerRow 
          visibleNumber={visibleNumber.toString()}
        >
          { timers.slice(i, (i + visibleNumber)) }
        </TimerRow>
      rows.push(row)
    }
    return rows
  }

  swapOrientation() {
    const width = this.state.height
    const height = this.state.width
    this.setState({ height, width, visibleNumber: width / 124 })
    let rows = this.initializeRows(this.timers)
    this.setState({ rows })
  }

  async addTimer() {
    let data = await TimerModel.create(this._blankTimer())
    const newTimer = this.formatTimer(data)
    this.setState({ timers: [...this.state.timers, newTimer ]})
    this.addToEnd(newTimer)
  }

  addToEnd(timer) {
    let lastRow = this.state.rows[this.state.rows.length - 1]
    if (lastRow.props.children.length >= this.state.visibleNumber) {
      this.addNewRow(timer)
    } else { 
      this.addToLastRow(timer)
    }
  }

  addNewRow(timers=[]) {
    let rows = this.state.rows
    rows.push(
      <TimerRow visibleNumber={this.state.visibleNumber.toString()}>
        { timers }
      </TimerRow>
    )
    this.setState({ rows })
  }

  addToLastRow(timer) {
    let rows = this.state.rows
    let lastRow = rows[rows.length -1]
    let lastChildren = React.Children.toArray(lastRow.props.children)
    lastChildren.push(timer) 
    rows[this.state.rows.length - 1] = <TimerRow visibleNumber={this.state.visibleNumber}>
      { lastChildren }
      </TimerRow>
    this.setState({ rows })
  }

  destroyTimer(id, row, column) {
    let rows = this.state.rows
    let newTimers = rows.splice(row)
    let flattendTimers = newTimers.map(row => row.props.children).flatten()
    flattenedTimers.pop(column)
    let newRows = this.initializeRows(flattenedTimers)
    this.setState({ rows: [...this.state.rows, ...newRows] }) 
    TimerModel.destroy(id)
  }

  formatTimer(timer) {
    return (
      <Timer 
        key={timer.id}
        id={timer.id}
        name={timer.name}
        active={timer.active}
        time={{
          time: timer.time
        }}
        colorScheme={this.state.colorScheme}
        onDestroy={this.destroyTimer.bind(this)}
      />
    )
  }

  render() {
    return (
      <ScrollView 
        style={timerStyles.timers}
        contentContainerStyle={timerStyles.thisShit}
      >
        { this.state.rows }
      </ScrollView>
    )
  }

  _blankTimer() {
    return {
      id: (new Date()).getTime(),
      active: false,
      name: 'New Timer',
      time: new Date(0,0,0,0,0,0),
    }
  }

}
