import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types';
import { listStyles, colors } from '../../../styles';
import ITrainer from '../../../Entities/Trainer';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { deleteATrainer } from '../../../redux/actions/trainers-actions';
import ConfirmDialog from '../../confirm-dialog';

interface IProps
{
  trainer: ITrainer
}

/**
 * Trainer FlatList - a sub-component of the Main Trainer Screen that displays a list of trainers
 * @param {IProps} interface - properties of the entity trainer 
 * @returns {React.FC} - React Component that returns a flatlist of trainers
 * @author Joab Smith and Imran Ilyas
 */

const TrainersListItem: React.FC<IProps> = (props: IProps) =>
{
  // Navigation setup
  type mainScreenProp = StackNavigationProp<RootStackParamList, 'Main'>;
  const navigation = useNavigation<mainScreenProp>();
  const [selectedFilter, setSelectedFilter] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const [dialogType, setDialogType] = React.useState('');
  const [payload, setPayload] = React.useState(props.trainer.trainerid);

  const dispatch = useDispatch();

  return (
    // Structures and displays the data from the FlatList
    <View style={listStyles.listItemContainer}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={listStyles.heading}>{props.trainer.trainerfirst + ' ' + props.trainer.trainerlast}</Text>
        {/* Dropdown for selecting edit or delete trainer */}
        <Picker
            mode='dropdown'
            selectedValue={selectedFilter}
          onValueChange={(itemValue, itemIndex) => {
            // Navigate to Edit Trainer screen
            if(itemValue === 'Edit') {
              navigation.navigate('ViewEditTrainer', props.trainer)
             }
            // Delete Trainer 
            else if (itemValue === 'Delete') {
               setVisible(true);
            }
          }}
            style={{ width: 50 }}
        >
          <Picker.Item label='' enabled={false} value='default' style={{opacity: 0, height: 0 }}/>
          <Picker.Item label="Edit" value="Edit" />
          <Picker.Item label="Delete" value="Delete" />
        </Picker>
      </View>
      <Text style={listStyles.textRegular}>{'Email: ' + props.trainer.email}</Text>
      <ConfirmDialog
        type='deleteTrainer'
        visible={visible}
        setVisible={setVisible}
        payload={{
          batchId: 0,
          trainerId: props.trainer.trainerid,
          curriculumId: 0,
          skillId: 0,
        }}
      />
      </View>
  );
};

export default TrainersListItem;
