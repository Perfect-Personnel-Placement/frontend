import { mount, shallow } from 'enzyme';
import { Pressable } from 'react-native';
import { wrapComponent } from './functions';
import  { ExampleComponent } from './constants';

let wrapper;
let shallowWrap;
const username = 'dummyuser';

describe('some examples of tests you could write', () => {

    beforeEach( () => {
        wrapper = mount( <ExampleComponent username={username} /> );
        shallowWrap = shallow( <ExampleComponent username={username} /> );
    });

    it('should contain a textbox welcoming the user', () => {
        const node = wrapper.findWhere( node_ => 
            node_.text().toLowerCase().includes(username)
        );
        expect(node.length).toBeGreaterThan(0);
        
    });

    it('has pressable text with functional event handler', () => {        
        const wrap = shallowWrap.find(Pressable);
        const mockEventHandler = jest.spyOn(wrap.props(), 'onPress');
        wrap.simulate('press');
        expect(mockEventHandler).toHaveBeenCalled();
    });

});

const returnComponent = (userName = 'dummyuser') => {
    const props = {
        username: userName,
    }
    return () => {
        return <ExampleComponent {...props}/>
    }
}

describe('some examples of tests you could write, but with the wrapComponent function', () => {

    beforeEach( () => {
        wrapper = mount( wrapComponent(returnComponent(username)) );
        // shallow won't work with the heavily nested component
        // shallowWrap = shallow( wrapComponent(returnComponent(username)) );
    });

    it('should contain a textbox welcoming the user', () => {
        expect(
            wrapper.findWhere( node => 
                node.text().toLowerCase().includes(username)
            )
            .length
        ).toBeGreaterThan(0);
    });

    it('has pressable text with functional press event handler', () => {
        const wrap = wrapper.find(Pressable);
        const mockEventHandler = jest.spyOn(wrap.props(), 'onPress');
        wrap.prop('onPress')(); //simulate doesn't work with mounted components
        expect(mockEventHandler).toHaveBeenCalled();
    });

});