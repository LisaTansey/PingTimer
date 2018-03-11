import 'react-native';
import React from 'react';
import App from '../App';
import Enzyme, { mount, shallow, configure } from 'enzyme'
import chai, { expect } from 'chai'
import Adapter from 'enzyme-adapter-react-16'
import { sinon } from 'sinon'
const Mocha = require('mocha')

Enzyme.configure({ adapter: new Adapter })

it('renders correctly', () => {
  const app = mount(<App />)
  expect(app.find('.create-button').length).to.equal(1)
});
