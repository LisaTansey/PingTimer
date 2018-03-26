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

    this.setState({ 
      layout: this.props.layout, 
      colorScheme: this.props.colorScheme 
    }) 
    
    let rows = this.initializeRows(data)
    this.setState({ rows })
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

  initializeRows(timers=this.state.timers, alreadyFormatted=false) {
    let visibleNumber = this.state.visibleNumber
    let rows = []
    for (i = 0; i < timers.length; i += visibleNumber) {
      let formattedTimers = []
      if (!alreadyFormatted) {
        timers.slice(i, (i + visibleNumber)).forEach((timer, ind) => {
          formattedTimers.push(
            this.formatTimer(timer, rows.length, ind)
          )
        })
      } else {
        formattedTimers = timers.slice(i, i + visibleNumber)
      }
      let row = <TimerRow 
          visibleNumber={visibleNumber.toString()}
        >
          { formattedTimers }
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
    let newTimer = await TimerModel.create(this._blankTimer())
    this.setState({ timers: [...this.state.timers, newTimer ]})
    this.addToEnd(newTimer)
  }

  addToEnd(timer) {
    let lastRow = this.state.rows[this.state.rows.length - 1]
    if (!lastRow || lastRow.props.children.length >= this.state.visibleNumber) {
      this.addNewRow(timer)
    } else { 
      this.addToLastRow(timer)
    }
  }

  addNewRow(timer) {
    let rows = this.state.rows
    rows.push(
      <TimerRow visibleNumber={this.state.visibleNumber.toString()}>
        { this.formatTimer(timer, rows.length, 0) }
      </TimerRow>
    )
    this.setState({ rows })
  }

  addToLastRow(timer) {
    let rows = this.state.rows
    let lastRow = rows[rows.length -1]
    let lastChildren = React.Children.toArray(lastRow.props.children)
    let newTimer = this.formatTimer(timer, rows.length - 1, lastChildren.length)
    lastChildren.push(newTimer) 
    rows[this.state.rows.length - 1] = <TimerRow visibleNumber={this.state.visibleNumber}>
      { lastChildren }
      </TimerRow>
    this.setState({ rows })
  }

  destroyTimer(id, row, column) {
    let newTimers = this.state.rows.splice(row)
    let flattenedTimers = []
    newTimers.forEach(prevRow => {
      prevRow.props.children.forEach(prevTimer => {
        flattenedTimers.push(prevTimer)
      })
    })
    flattenedTimers.splice(column, 1)
    let newRows = this.initializeRows(flattenedTimers, true)
    this.setState({ rows: [...this.state.rows, ...newRows] }) 
    TimerModel.destroy(id)
  }

  formatTimer(timer, row, column) {
    return (
      <Timer 
        key={timer.id.toString()}
        id={timer.id}
        name={timer.name}
        active={timer.active}
        time={{
          time: timer.time
        }}
        row={row.toString()}
        column={column.toString()}
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
