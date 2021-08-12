import { mount } from 'enzyme';

import { Text } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';

import EditClient from '../EditClient';

const props = {
    route: {
        params: [
            'clientName',
            'clientID',
        ]
    }
}

let wrapper;
describe('testing EditClient', () => {
    beforeEach( () => {
        wrapper = mount(<EditClient {...props}/>)
    })

    it('renders the component', () => {
        expect(wrapper).toBeDefined();
    })

    it('event handlers don\'t throw errors', () => {
        wrapper.find(Text).forEach( node => {
            Object.values( node.props() ).forEach( x => {
                if (typeof x === 'function') {
                    x();
                }
            })
        })
        wrapper.find(TextInput).forEach( node => {
            Object.values( node.props() ).forEach( x => {
                if (typeof x === 'function') {
                    x('text');
                }
            })
        })
    })
})