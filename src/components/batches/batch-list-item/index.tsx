import React from 'react';
import axios from '../../../../axiosConfig';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types';
import { listStyles, badgesStyles } from '../../../styles';

interface IProps {
  batchId: number;
  batchSize: number;
  curriculumId: number;
  trainerId: number;
  startDate: string;
  endDate: string;
}

const BatchListItem: React.FC<IProps> = (props: IProps) => {
  /** Navigation stuff */
  type mainScreenProp = StackNavigationProp<RootStackParamList, 'Main'>;
  const navigation = useNavigation<mainScreenProp>();

  /** Get trainer and curriculum */
  const [curriculum, setCurriculum] = React.useState('');
  const [trainer, setTrainer] = React.useState('');

  /** getCurriculum */
  const getCurriculum = async () => {
    await axios
      .get(`curriculum/id/${props.curriculumId}`)
      .then((item) => setCurriculum(item.data[0].curriculumname));
  };

  /** getCurriculum */
  const getTrainer = async () => {
    await axios
      .get(`trainer/id/${props.trainerId}`)
      .then((item) =>
        setTrainer(item.data[0].trainerfirst + ' ' + item.data[0].trainerlast)
      );
  };

  /** set curriculum and uh trainer */
  React.useEffect(() => {
    getCurriculum();
    getTrainer();
  }, []);

  /** Dates */
  const startDate = new Date(props.startDate).getTime();
  const endDate = new Date(props.endDate).getTime();

  /**
   * Touchable Link to contain individual Batch information.
   * Will lead to Individual Batch information
   */

  return (
    /** Individual Batch Touchable */

    /** Structures and displays the data from the FlatList */
    <TouchableOpacity
      style={listStyles.listItemContainer}
      testID='button'
      onPress={() => {
        navigation.navigate('ViewBatch', {
          batchId: props.batchId,
          batchSize: props.batchSize,
          startDate: props.startDate,
          endDate: props.endDate,
          curriculum: curriculum,
          trainer: trainer,
        });
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={listStyles.heading}>{curriculum}</Text>
        {/* * Checks current date and start/end date of batch and applies tag based on status */}
        {startDate < Date.now() && endDate > Date.now() ? (
          <View style={[badgesStyles.badge, { backgroundColor: '#f26925' }]}>
            <Text style={badgesStyles.badgeText}>Active</Text>
          </View>
        ) : endDate < Date.now() ? (
          <View style={[badgesStyles.badge, { backgroundColor: '#25F269' }]}>
            <Text style={badgesStyles.badgeText}>Completed</Text>
          </View>
        ) : startDate > Date.now() ? (
          <View style={[badgesStyles.badge, { backgroundColor: '#474C55' }]}>
            <Text style={badgesStyles.badgeText}>Upcoming</Text>
          </View>
        ) : null}
        {/** End of date checker */}
      </View>

      <Text style={listStyles.subHeading}>{trainer}</Text>
      <Text style={listStyles.textRegular}>
        {new Date(props.startDate).toDateString() +
          '\nto ' +
          new Date(props.endDate).toDateString()}
      </Text>
    </TouchableOpacity>
  );
};

export default BatchListItem;
