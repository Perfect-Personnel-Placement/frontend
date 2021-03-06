import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import BatchStats from '../batch-stats';
import {
  screenStyles,
  textStyles,
  buttonStyles,
  colors,
} from '../../../styles';
import axios from '../../../../axiosConfig';

/** We pass the filter state from the Batches screen to this component */
interface IProps {
  batches: {
    batchsize: number;
    batchid: number;
    curriculumid: number;
    trainerid: number;
    startdate: string;
    enddate: string;
  }[];
  selectedFilter: any;
  setSelectedFilter: any;
}

/**
 * Batch List Header - loads the Add Batch Button and the BatchStats component
 * @param {IProps} interface - includes information for batches
 * @returns {React.FC} - React Component for the Batches Add Button and Picker Filter
 * @author Matthew Otto and Oriel Red Oral
 */

const BatchesListHeader: React.FC<IProps> = (props: IProps) => {
  /** Navigation stuff */
  type mainScreenProp = StackNavigationProp<RootStackParamList, 'Main'>;
  const navigation = useNavigation<mainScreenProp>();

  /** Get trainers */
  const [trainers, setTrainers] = React.useState([
    {
      trainerid: 0,
    },
  ]);
  const getTrainers = async () => {
    await axios.get('trainer').then((res) => setTrainers(res.data));
  };

  /** Run the get trainers function once */
  React.useEffect(() => {
    getTrainers();

    return function cleanup() {
      setTrainers([]);
    };
  }, []);

  /** Planned and active batches */
  const plannedBatches = props.batches.length;
  const activeBatches = props.batches.filter(
    (date) =>
      new Date(date.startdate).getTime() < Date.now() &&
      new Date(date.enddate).getTime() > Date.now()
  );
  /** Get inactive trainers (active trainers will be the same as active batches) */
  const inactiveTrainers = trainers.length - activeBatches.length;

  return (
    <View style={screenStyles.mainView}>
      {/** Screen title */}
      <View style={screenStyles.titleContainer}>
        <Text style={textStyles.heading}>Batches</Text>

        {/** Add batch button */}
        <TouchableOpacity
          testID='button'
          style={buttonStyles.buttonContainer}
          onPress={() => navigation.navigate('AddBatch')}
        >
          <Text style={buttonStyles.buttonText}>Add Batch</Text>
        </TouchableOpacity>
      </View>

      {/** Gantt Chart */}
      <View style={styles.plannedBatchesTable}>
        <BatchStats
          data={[
            plannedBatches,
            activeBatches.length,
            activeBatches.length,
            inactiveTrainers,
          ]}
        />
      </View>

      {/** FlatList title text */}
      <View style={screenStyles.titleContainer}>
        <Text style={textStyles.subHeading}>
          {props.selectedFilter.charAt(0).toUpperCase() +
            props.selectedFilter.slice(1)}{' '}
          batches
        </Text>

        {/** Picker filter for the FlatList */}
        <Picker
          selectedValue={props.selectedFilter}
          mode='dropdown'
          onValueChange={(itemValue: any, itemIndex: any) =>
            props.setSelectedFilter(itemValue)
          }
          style={{ height: 50, width: 50 }}
          itemStyle={{ color: colors.screenBg }}
        >
          <Picker.Item label='All Batches' value='all' />
          <Picker.Item label='Active Batches' value='active' />
          <Picker.Item label='Upcoming Batches' value='upcoming' />
          <Picker.Item label='Completed Batches' value='completed' />
        </Picker>
      </View>
    </View>
  );
};

/** Local StyleSheet */
const styles = StyleSheet.create({
  plannedBatchesTable: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 20,
    width: '90%',
    backgroundColor: '#fafafa',
    borderRadius: 25,
  },
});

export default BatchesListHeader;
