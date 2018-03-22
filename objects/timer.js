const TimerModel = require('../models/timer-model')

export default class TimerObject {
  constructor(params={}) {
    this.seconds = params.seconds || 0
    this.startTime = null
    this.stopTime = null
  }

  start() {
    this.startTime = Date.now()
  }

  async stop(id) {
    this.stopTime = Date.now()
    let difference = Math.abs(this.stopTime - this.startTime)
    await TimerModel.addTime(id, difference)
    this.startTime = null
    this.stopTime = null
  }

}
