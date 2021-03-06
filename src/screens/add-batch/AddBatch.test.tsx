import React from 'react';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import AddBatch from '.';

/**
 * Add Batch Test - test file for the AddBatch screen
 * @author Matthew Otto and Oriel Red Oral
 */

/** wrapper for mounting */
let wrapper: any;
let useEffect: any;
let cleanup: any;

/** mock react navigation */
const mockBack = jest.fn();
const mockNavigate = jest.fn();
jest.mock('react-native-toast-message');
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => {
      return {
        goBack: mockBack,
        navigate: mockNavigate,
      };
    },
  };
});

/** mockStore */
let mockStore = configureStore([thunk])({
  curriculum: [],
});

/** test suite */
describe('tests the AddBatch component', () => {
  beforeEach(() => {
    wrapper = mount(
      <Provider store={mockStore}>
        <AddBatch />
      </Provider>
    );
  });

  /** tests if the component is there */
  it('should be there', () => {
    expect(wrapper).not.toBe(undefined);
  });

  /** Tests the add button, this is probably not the right way to do it */
  it('pressing the button navigates to new screen', () => {
    let button = wrapper
      .find({ testID: 'addBatchButton' })
      .findWhere((node: any) => node.props().hasOwnProperty('onPress'))
      .last();
    button.invoke('onPress')();
  });

  /** Tests the calendar start date on change */
  it('should test the startdate calendar onchange', () => {
    let button = wrapper
      .find({ testID: 'startDateButton' })
      .findWhere((node: any) => node.props().hasOwnProperty('onPress'))
      .last();
    button.invoke('onPress')();

    wrapper
      .find({ testID: 'startDateTest' })
      .findWhere((node: any) => {
        return node.props().hasOwnProperty('onChange');
      })
      .forEach((node: any) => {
        node.invoke('onChange')(null, new Date(new Date(Date.now())));
        node.invoke('onChange')(null, false);
      });
  });

  /** Tests the calendar end date on change */
  it('should test the enddate calendar onchange', () => {
    let button = wrapper
      .find({ testID: 'endDateButton' })
      .findWhere((node: any) => node.props().hasOwnProperty('onPress'))
      .last();
    button.invoke('onPress')();

    wrapper
      .find({ testID: 'endDateTest' })
      .findWhere((node: any) => {
        return node.props().hasOwnProperty('onChange');
      })
      .forEach((node: any) => {
        node.invoke('onChange')(null, new Date(new Date(Date.now())));
        node.invoke('onChange')(null, false);
      });
  });

  it('should unmount the component', () => {
    useEffect = jest
      .spyOn(React, 'useEffect')
      .mockImplementation((cb) => (cleanup = cb()));
    wrapper.unmount();
  });
});
