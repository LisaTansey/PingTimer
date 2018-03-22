import React from 'react'
import { Text, View } from 'react-native'

export default class TimerRows {
  constructor(dimensions, timers=[]) {
    this.height = dimensions.height
    this.width = dimensions.width
    this.visibleNumber = parseInt(dimensions.width / 124)
    this.initializeRows(timers)
  }

  initializeRows(timers) {
    this.timers = timers
    let rows = this._parseArray(timers)
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

  addTimer(timer) {
    let lastRow = this.rows[this.rows.length - 1]
    if (lastRow.length < this.visibleNumber) {
      lastRow.push(timer)
    } else {
      this.rows.push([timer])
    }
    return this
  }

  deleteTimer(id) {

    return this
  }

  renderTimers() {
    let formattedRows = []
    this.rows.forEach(row => {
      formattedRows.push(
        <View style={{ flexDirection: 'row' }}>
          { row }
        </View>
      )
    })
    return formattedRows
  }

  _parseArray(timers, initial=[]) {
    let row = initial
    let rows = []
    for (i = 0; i < timers.length; i += this.visibleNumber) {
      row = timers.slice(i, (i + this.visibleNumber))
      rows.push(row)
    }
    return rows
  }

}
