import { mount } from 'enzyme';

import RNPickerSelect from 'react-native-picker-select'

import CurriculumList from '../CurriculumList';

mockSetCurriculum = jest.fn();

const props = {
    setCurriculum: mockSetCurriculum,
}

let wrapper;
describe('testing CurriculumList', () => {
    beforeEach( () => {
        wrapper = mount(<CurriculumList {...props}/>)
    })

    it('calls setCurriculum with its argument being that of the picked value', () => {
        const curriculum = 'curriculum';
        wrapper.find(RNPickerSelect).invoke('onValueChange')(curriculum);
        expect(mockSetCurriculum).toHaveBeenCalledWith(curriculum);
    })

    it('displays the curriculum list that the back end gives', () => {
        expect(1).toBe(0); // API call not yet implemented
    })
})