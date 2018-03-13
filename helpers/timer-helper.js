import React from 'react'
import { Text } from 'react-native'

const timeToStr = (timeObj) => {
  let result = ''
  let hours = timeObj.getHours()
  if (hours < 10) {
    result += '0'
  }
  result += hours.toString() + ':'
  let minutes = timeObj.getMinutes()
  if (minutes < 10) {
    result += '0'
  }
  result += minutes.toString() + ':'
  let seconds = timeObj.getSeconds()
  if (seconds < 10) {
    result += '0'
  }
  result += seconds.toString()
  return result
}

module.exports = { timeToStr }
