import {mount} from 'enzyme';

import RNPickerSelect from 'react-native-picker-select';

import ClientList from '../ClientList';

const mockSetClient = jest.fn( (arg0) => {/*no-op*/})

const props = {
    setClient: mockSetClient
}

describe('testing ClientList', () => {

    beforeEach( () => {
        wrapper = mount(<ClientList {...props} />)
    })
    
    it('If we choose something in the picker, value of picked choice is called as argument of the function in ClientList\'s props', () => {
        let client = 'client';
        wrapper.find(RNPickerSelect).invoke('onValueChange')(client);
        expect(props.setClient).toHaveBeenCalledWith(client);
    })

    it('the available clients are stored in the picker', () => {
        expect(1).toBe(0);
        /* not yet implemented */
    })
})