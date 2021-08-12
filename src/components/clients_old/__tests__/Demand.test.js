import { mount } from 'enzyme';

// import Demand from '../Demand';

Demand = () => {
    return <></>
}

let wrapper;
describe('testing Demand', () => {
    beforeEach( () => {
        wrapper = mount(<Demand/>)
    })

    it('demand is not yet implemented', () => {
        expect(1).toBe(0);
    })
})