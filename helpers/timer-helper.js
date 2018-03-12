import React from 'react'
import { Text } from 'react-native'
import Timer from '../components/timers/timer'

const formatTimer = (data) => {
  return (
    <Timer
      key={data.id}
      name={data.name}
      active={data.active}
      time={{
        time: data.time
      }}
    /> 
  )
}

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

module.exports = { formatTimer, timeToStr }
