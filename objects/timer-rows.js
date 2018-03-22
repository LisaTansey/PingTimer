import React from 'react'
import { Text, View } from 'react-native'

export default class TimerRows {
  constructor(dimensions, timers=[]) {
    this.height = dimensions.height
    this.width = dimensions.width
    this.visibleNumber = dimensions.width / 124
    this.initializeRows(timers)
  }

  initializeRows(timers) {
    this.timers = timers
    let row = []
    let rows = []
    for (i = 0; i < this.timers.length; i += this.visibleNumber) {
      row = this.timers.slice(i, (i + this.visibleNumber))
      rows.push(row)
    }
    this.rows = rows
    return this
  }
  
  setLayout(layout) {

    return this
  }

  setColors(colorScheme) {

    return this
  }

  swapOrientation() {
    const newWidth = this.height
    this.height = this.width
    this.width = newWidth
    this.initializeRows(this.timers)
    return this
  }

  add(timers) {
    timers.forEach    
    return this
  }

  addTimer(timer) {

    return this
  }

  deleteTimer(id) {

    return this
  }

  renderTimers() {
    let formattedRows = []
    this.rows.forEach(row => {
      formattedRows.push(
        <View style={{
          flexDirection: 'row'
        }}>
          { row }
        </View>
      )
    })
    return formattedRows
  }

}
