import 'react-native';
import React from 'react';
import App from '../App';
import Enzyme, { mount, shallow, configure } from 'enzyme'
import chai, { expect } from 'chai'
import Adapter from 'enzyme-adapter-react-16'
import { sinon } from 'sinon'
const pry = require('pryjs')
const Mocha = require('mocha')

Enzyme.configure({ adapter: new Adapter })

describe('timer tests', () => {
  it('can create a new timer', () => {
    const app = mount(<App />)
    eval(pry.it)
    app.find('.create-button').props.create()
    expect(app.find('.timer').length).to.equal(1)
  })
})
