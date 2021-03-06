import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from '../../../axiosConfig';
import {
  screenStyles,
  textStyles,
  inputStyles,
  colors,
  buttonStyles,
} from '../../styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { updateBatch } from '../../redux/actions/batch-actions';
import Toast from 'react-native-toast-message';

/**
 * Edit Batch - the component for editing a batch
 * @param {route} interface - includes information of batch that is to be edited
 * @returns {React.FC} - React Component for the edit batch screen
 * @author Matthew Otto and Oriel Red Oral
 */

interface IProps {
  route: {
    params: {
      batchid: number;
      curriculumid: number;
      trainerid: number;
      batchsize: number;
      startdate: string;
      enddate: string;
    };
  };
}

/** Main component screen */
const EditBatch: React.FC<IProps> = ({ route }) => {
  /** States for inputs (listeners) */
  const [curriculumValue, setCurriculumValue] = React.useState(
    route.params.curriculumid
  );
  const [trainerValue, setTrainerValue] = React.useState(
    route.params.trainerid
  );
  const [isStartPickerShow, setIsStartPickerShow] = React.useState(false);
  const [batchSizeValue, setBatchSizeValue] = React.useState(
    route.params.batchsize
  );
  /** States for Date Picker */
  const [startDate, setStartDate] = React.useState(
    new Date(route.params.startdate)
  );
  const [endDate, setEndDate] = React.useState(new Date(route.params.enddate));
  const [isEndPickerShow, setIsEndPickerShow] = React.useState(false);
  /** States for trainer and curricula list */
  const [curricula, setCurricula] = React.useState([]);
  const [trainers, setTrainers] = React.useState([]);
  /** Navigation for going back a screen */
  const navigation = useNavigation();
  const dispatch = useDispatch();

  /** Get all curricula */
  const getAllCurricula = async () => {
    await axios.get(`curriculum`).then((item) => setCurricula(item.data));
  };

  /** Get all trainers */
  const getAllTrainers = async () => {
    await axios.get(`trainer`).then((item) => setTrainers(item.data));
  };

  /** Fetch data */
  React.useEffect(() => {
    getAllCurricula();
    getAllTrainers();

    return function cleanup() {
      setCurricula([]);
      setTrainers([]);
    };
  }, []);

  /** Input listener for Start Date Picker */
  const onStartChange = (e: any, val: any) => {
    if (val) {
      setStartDate(val);
      setIsStartPickerShow(false);
    } else {
      setStartDate(new Date(Date.now()));
      setIsStartPickerShow(false);
    }
  };

  /** Input listener for End Date Picker */
  const onEndChange = (e: any, val: any) => {
    if (val) {
      setEndDate(val);
      setIsEndPickerShow(false);
    } else {
      setEndDate(new Date(new Date(Date.now())));
      setIsEndPickerShow(false);
    }
  };

  /** Add batch function */
  const UpdateExistingBatch = () => {
    dispatch(
      updateBatch({
        batchId: route.params.batchid,
        trainerId: trainerValue,
        curriculumId: curriculumValue,
        batchSize: batchSizeValue,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        clientId: null,
      })
    );

    Toast.show({
      type: 'success',
      position: 'bottom',
      text1: 'Success!',
      text2: `Batch has been edited!`,
      bottomOffset: 60,
    });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={screenStyles.safeAreaView}>
      <ScrollView style={screenStyles.mainView}>
        {/** Heading and button */}
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: 10,
          }}
        >
          {/** Heading text */}
          <Text style={textStyles.heading}>Edit Batch</Text>
          {/** Add/Edit */}
          <TouchableOpacity
            testID='editBatchButton'
            style={buttonStyles.buttonContainer}
            onPress={() => UpdateExistingBatch()}
          >
            <Text style={buttonStyles.buttonText}>Edit</Text>
          </TouchableOpacity>
        </View>
        {/** Form view */}
        <View>
          {/** Curriculum  */}
          <Text style={inputStyles.inputLabelText}>Curriculum</Text>
          {/** Picker Container */}
          <View style={inputStyles.pickerContainer}>
            <Picker
              selectedValue={curriculumValue}
              mode='dropdown'
              onValueChange={(itemValue: any, itemIndex: any) =>
                setCurriculumValue(itemValue)
              }
              style={{ width: '100%', height: 50 }}
            >
              {curricula.map(
                (curr: { curriculumname: string; curriculumid: number }) => {
                  return (
                    <Picker.Item
                      label={curr.curriculumname}
                      value={curr.curriculumid}
                      key={curr.curriculumname}
                    />
                  );
                }
              )}
            </Picker>
          </View>
          {/** Trainer */}
          <Text style={inputStyles.inputLabelText}>Trainer</Text>
          <View style={inputStyles.pickerContainer}>
            <Picker
              selectedValue={trainerValue}
              mode='dropdown'
              onValueChange={(itemValue: any, itemIndex: any) =>
                setTrainerValue(itemValue)
              }
              style={{ width: '100%', height: 50 }}
            >
              {trainers.map(
                (trainer: {
                  trainerfirst: string;
                  trainerlast: string;
                  trainerid: number;
                }) => {
                  return (
                    <Picker.Item
                      label={trainer.trainerfirst + ' ' + trainer.trainerlast}
                      value={trainer.trainerid}
                      key={trainer.trainerfirst + ' ' + trainer.trainerlast}
                    />
                  );
                }
              )}
            </Picker>
          </View>
          {/** Batch Size */}
          <View style={{ flexDirection: 'column' }}>
            <Text style={inputStyles.inputLabelText}>Size</Text>
            <TextInput
              defaultValue={batchSizeValue.toString()}
              style={inputStyles.textInput}
              keyboardType='numeric'
              onChangeText={(value) => setBatchSizeValue(Number(value))}
            />
          </View>
          {/** Bottom Inputs Container */}
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-between',
            }}
          >
            {/** Start Date */}
            <View style={{ flexDirection: 'column' }}>
              <Text style={inputStyles.inputLabelText}>Start Date</Text>
              <TouchableOpacity
                testID='startDateButton'
                style={styles.dateView}
                onPress={() => setIsStartPickerShow(true)}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <MaterialCommunityIcons
                    name='calendar-import'
                    size={20}
                    color={colors.darkGray}
                  />
                  <Text style={styles.dateText}>
                    {startDate.toDateString()}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            {/* The date picker */}
            {isStartPickerShow && (
              <DateTimePicker
                testID='startDateTest'
                value={startDate}
                mode={'date'}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onStartChange}
                style={styles.datePicker}
              />
            )}

            <View style={{ flexDirection: 'column' }}>
              <Text style={inputStyles.inputLabelText}>End Date</Text>
              <TouchableOpacity
                testID='endDateButton'
                style={styles.dateView}
                onPress={() => setIsEndPickerShow(true)}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <MaterialCommunityIcons
                    name='calendar-export'
                    size={20}
                    color={colors.darkGray}
                  />
                  <Text style={styles.dateText}>{endDate.toDateString()}</Text>
                </View>
              </TouchableOpacity>
            </View>
            {/* The date picker */}
            {isEndPickerShow && (
              <DateTimePicker
                testID='endDateTest'
                value={endDate}
                mode={'date'}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onEndChange}
                style={styles.datePicker}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/** Local StyleSheet */
const styles = StyleSheet.create({
  datePicker: {
    width: 320,
    height: 260,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  dateView: {
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 15,
    height: 45,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 15,
    backgroundColor: colors.white,
    margin: 5,
  },

  dateText: {
    color: colors.darkGray,
    paddingLeft: 5,
  },
});

export default EditBatch;
