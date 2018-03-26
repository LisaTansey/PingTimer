import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class TimerRows extends Component {
  constructor(props) {
    super(props)
    this.state = {
      height: this.props.height,
      width: this.props.width,
      visibleNumber: parseInt(this.props.width / 124),
      rows: [],
    }
  }
  
  componentDidMount() {
    let rows = this.initializeRows()
    this.setState({ rows })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.height && nextProps.width) {
      this.swapOrientation()  
    }
  }

  initializeRows(timers=this.props.timers.timers) {
    let rows = []
    return <Text>{this.props.timers.timers.length}</Text>
    for (i = 0; i < timers.length; i += this.state.visibleNumber) {
      row = timers.slice(i, (i + this.visibleNumber))
      rows.push(row)
    }
    return rows
  }

  setLayout() {
    //this.props.layout
  }

  setColors() {
    //this.props.colorScheme
  }


  swapOrientation() {
    const width = this.state.height
    const height = this.state.width
    this.setState({ height, width, visibleNumber: width / 124 })
    let rows = this.initializeRows(this.timers)
    this.setState({ rows })
  }
  addToEnd(timer) {
    let rows = this.state.rows
    let lastRow = this.state.rows[this.state.rows.length - 1]
    if (lastRow.length < this.state.visibleNumber) {
      rows[this.state.rows.length - 1].push(timer)
      this.setState({ rows }) 
    } else { 
      rows.push([timer])
      this.setState({ rows }) 
    }
  }

  deleteTimer(id, row, column) {
    let rows = this.state.rows
    rows[row].pop(column)
    let newTimers = rows.splice(row).flatten()
    let newRows = this.initializeRows(newTimers)
  }
  
  render() {  
    return (
      <View>
      { this.state.rows }
        {/*this.formatRows(this.state.rows) */}
      </View>
    )
  }

  formatRows(rows) {
    let formattedRows = []
    this.state.rows.forEach(row => {
      formattedRows.push(
        <View style={{ flexDirection: 'row' }}>
          { row }
        </View>
      )
    })
    return formattedRows
  }

}
