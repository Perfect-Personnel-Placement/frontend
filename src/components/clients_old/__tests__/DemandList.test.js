import { mount } from 'enzyme';
import { FlatList } from 'react-native';

import DemandList from '../DemandList';

const props = {
    currClient: 'revaturejr',
}

const propsNoDemands = {
    currClient: 'balls fish',
} 

let wrapper;

describe('testing DemandList when current client has no demands', () => {
    beforeEach( () => {
        wrapper = mount(<DemandList {...propsNoDemands}/>)
    })

    it('does not render a FlatList', () => {
        expect(wrapper.find(FlatList).length).toBe(0);
    })

})

describe('testing DemandList with client who has demands', () => {
    beforeEach( () => {
        wrapper = mount(<DemandList {...props}/>)
    })

    it('renders a FlatList', () => {
        expect(wrapper.find(FlatList).length).toBeGreaterThan(0);
    })

    it('displays the demands of the client', () => {

    })

    it('when pressing a demand, the proper behavior ensues', () => {
        
    })

})

    
