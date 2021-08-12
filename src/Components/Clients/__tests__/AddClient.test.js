import { mount, shallow } from 'enzyme';

import { TextInput, Text } from 'react-native'; 
import AddClient from '../AddClient';
import Header from '../../Header/Header';

let wrapper;
let ID_input, name_input, button;

// jest.mock('../../Header/Header', () => {
//     return ({
//         __esModule: true,
//         default: () => {
//             return <></>
//         }
//     })
// })

const mockAddNewClient = jest.fn();

describe('testing AddClient', () => {
    
    beforeEach( () => {
        wrapper = mount(<AddClient addNewClient={mockAddNewClient}/>)
        ID_input = wrapper
            .find(TextInput)
            .findWhere( node => 
                node.prop('placeholder').toLowerCase().includes('id') // !! placeholder value is implementation detail
            )
            .last();
        name_input = wrapper
            .find(TextInput)
            .findWhere( node => 
                node.prop('placeholder').toLowerCase().includes('name') // !! placeholder value is implementation detail
            )
            .last();
        button = wrapper
            .find(Text)
            .findWhere( node => 
                   node.text().toLowerCase().includes('add')
                && node.text().toLowerCase().includes('client')
                && ( typeof node.prop('onPress') !== 'undefined' )
            )
            .last();
    })

    
    // it('displays Header', () => {
    //     let header = wrapper.find(Header);
    //     expect(header.length).toBeGreaterThan(0);
    // })

    // it('displays textInput whose placeholder reveals to user that it modifies client ID', () => {
    //     expect(ID_input.length).toBeGreaterThan(0);
    // })

    // it('displays textInput whose placeholder reveals to user that it modifies client name', () => {
    //     expect(name_input.length).toBeGreaterThan(0);
    // })

    // it('displays pressable button for adding client', () => {
    //     expect(button.length).toBeGreaterThan(0);
    // })

    const id = 'id';
    const name = 'name';
    it('pressing button calls listener whose arguments are the values in text boxes', () => {
        ID_input.invoke('onChangeText')(id);
        name_input.invoke('onChangeText')(name);

        // we must find button again or it won't call listener with new state
        // see https://github.com/enzymejs/enzyme/issues/2535
        button = wrapper
            .find(Text)
            .findWhere( node => 
                   node.text().toLowerCase().includes('add')
                && node.text().toLowerCase().includes('client')
                && ( typeof node.prop('onPress') !== 'undefined' )
            )
            .last();

        button.invoke('onPress')();
        expect(mockAddNewClient).toHaveBeenCalledWith(id, name);
    })
})