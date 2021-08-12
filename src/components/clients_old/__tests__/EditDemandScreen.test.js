import { mount } from 'enzyme';
import { Text } from 'react-native'
import moment from 'moment';

import CalendarPicker from 'react-native-calendar-picker';

import EditDemandScreen from '../EditDemandScreen';

const props = {
    route: {
        params: [
            'clientName',
            'clientID',
        ]
    }
}

let wrapper;

describe('testing EditDemandScreen', () => {
    beforeEach( () => {
        wrapper = mount(<EditDemandScreen {...props}/>);
    })

    it('renders the component', () => {
        expect(wrapper).toBeDefined();
    })

    it('if we pick a date on calendar, some text elsewhere in the UI shows that date', () => {
        let calendar = wrapper.find(CalendarPicker);
        let date = Date.now();
        calendar.invoke('onDateChange')(date);
        let isNewDateShown = wrapper.find(Text).someWhere( node =>
            node.text().includes(moment(date).format('MM-DD-YYYY'))     
        )
        expect(isNewDateShown).toBeTruthy();
    })
})