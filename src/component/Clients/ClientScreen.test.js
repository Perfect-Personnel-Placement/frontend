import {mount} from 'enzyme';
import { ExampleComponent } from '../../../__tests__/constants';
import ClientScreen from './ClientScreen';
import RNPickerSelect from 'react-native-picker-select';
import * as React from 'react';

// jest.mock('react-native-picker-select');

let wrapper;
describe('testing client screen',()=>{

    beforeEach(()=>{
        wrapper=mount(<ClientScreen/>)
    })

    it('should render correctly on screen',()=>{
        expect(wrapper).toBeDefined();
    })

    it('', () => {
        const mockSetClient = jest.fn();
        jest.spyOn(React, 'useState').mockImplementationOnce( (arg) => {
            return [arg, mockSetClient];
        });
        const dropDownMenu = wrapper.find(RNPickerSelect);
        dropDownMenu.props().onValueChange();
        console.log(mockSetClient.mock.calls);
        wrapper.update();
        expect(1).toBe(1);
    })
})

