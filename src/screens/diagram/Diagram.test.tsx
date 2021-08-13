import React from 'react';
import {mount} from 'enzyme';
import Diagram from '.';
import { LineChart } from 'react-native-chart-kit';

let wrapper: any;

describe('Diagram', () => {
  beforeEach(() => {
    wrapper = mount(<Diagram/>); //for future wrap with store when redux is added -kai 
  });

  it('should be there', () => {
    expect(wrapper).not.toBe(undefined);
  });

  it('should display the LineChart', () => {
    expect(wrapper.find(LineChart).length).toBeGreaterThan(0)
  });
})