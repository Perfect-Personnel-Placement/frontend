import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { ProgressChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import { StackNavigationProp } from '@react-navigation/stack';
import Header from '../../Components/batches/Header';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  badgesStyles,
  screenStyles,
  textStyles,
  buttonStyles,
  colors,
} from '../../styles';

interface PropsI {
  route: {
    params: {
      associate: number;
      batchId: number;
      curriculum: string;
      trainer: string;
      startDate: number;
      endDate: number;
    };
  };
}

const ViewBatch: React.FC<PropsI> = ({ route }) => {
  /** Navigation stuff */
  type mainScreenProp = StackNavigationProp<RootStackParamList, 'Main'>;
  const navigation = useNavigation<mainScreenProp>();

  /** Date variables for the calendar component */
  const currentDate = new Date(Date.now()).toISOString().slice(0, 10);
  const startDate = new Date(route.params.startDate).toISOString().slice(0, 10);
  const endDate = new Date(route.params.endDate).toISOString().slice(0, 10);
  const progress =
    (Date.now() - route.params.startDate) /
    (route.params.endDate - route.params.startDate);

  /** Data for progress ring */
  const data = {
    labels: ['Progress'], // optional
    data: [progress < 1 && progress > 0 ? progress : progress < 0 ? 0 : 1],
  };

  /** ChartConfig  */
  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#ffffff',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(242, 110, 38, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  return (
    <SafeAreaView style={screenStyles.safeAreaView}>
      <Header />
      <ScrollView style={screenStyles.mainView}>
        {/**Title: Curriculum */}
        <View style={screenStyles.titleContainer}>
          {/** Touchable that takes us to the edit batch screen when clicking on the title */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('AddEditBatch', {
                batchId: route.params.batchId,
                curriculum: route.params.curriculum,
                trainer: route.params.trainer,
                associates: route.params.associate,
                startDate: route.params.startDate,
                endDate: route.params.endDate,
              })
            }
            style={{ flexDirection: 'row', alignItems: 'center', flex: 0.75 }}
          >
            <Text style={textStyles.heading}>
              {route.params.batchId + ' ' + route.params.curriculum + ' '}
              <MaterialCommunityIcons
                name='pencil'
                size={20}
                color={colors.darkGray}
                style={{ paddingLeft: 5 }}
              />
            </Text>
          </TouchableOpacity>

          {/** Confirm Button */}
          <TouchableOpacity style={buttonStyles.buttonContainer}>
            <Text style={buttonStyles.buttonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
        {route.params.startDate < Date.now() &&
        route.params.endDate > Date.now() ? (
          <View style={[badgesStyles.badge, { backgroundColor: '#f26925' }]}>
            <Text style={badgesStyles.badgeText}>Active</Text>
          </View>
        ) : route.params.endDate < Date.now() ? (
          <View style={[badgesStyles.badge, { backgroundColor: '#25F269' }]}>
            <Text style={badgesStyles.badgeText}>Completed</Text>
          </View>
        ) : route.params.startDate > Date.now() ? (
          <View style={[badgesStyles.badge, { backgroundColor: '#474C55' }]}>
            <Text style={badgesStyles.badgeText}>Upcoming</Text>
          </View>
        ) : null}
        {/**Subtitle: Trainer */}
        <View style={{ flexDirection: 'row' }}>
          <MaterialCommunityIcons
            name='account-outline'
            size={16}
            color='#222'
            style={{ marginRight: 5 }}
          />
          <Text style={textStyles.regular}>{route.params.trainer}</Text>
        </View>

        {/**Body: Batch information */}
        <View>
          {/**SubBody: Number of Associates */}
          <View style={{ flexDirection: 'row' }}>
            <MaterialCommunityIcons
              name='account-group-outline'
              size={16}
              color='#222'
              style={{ marginRight: 5 }}
            />
            <Text style={textStyles.regular}>
              {route.params.associate} Associates
            </Text>
          </View>
          {/**SubBody: Start and End Date */}
          <View style={{ flexDirection: 'row' }}>
            <MaterialCommunityIcons
              name='calendar'
              size={16}
              color='#222'
              style={{ marginRight: 5 }}
            />
            <Text style={textStyles.regular}>
              {new Date(route.params.startDate).toDateString() +
                '\nto ' +
                new Date(route.params.endDate).toDateString()}
            </Text>
          </View>
        </View>

        {/**Calendar: Marked Start and End Dates */}
        <View style={styles.calendarView}>
          <Calendar
            current={currentDate}
            minDate={startDate}
            maxDate={endDate}
            markedDates={{
              [startDate]: {
                selected: true,
                marked: true,
                selectedColor: '#F26925',
              },
              [endDate]: {
                selected: true,
                marked: true,
                selectedColor: '#F26925',
              },
            }}
          />
        </View>
        {/** Progress Ring */}
        <View style={styles.progressRingView}>
          <ProgressChart
            data={data}
            width={50}
            height={40}
            strokeWidth={10}
            radius={12}
            chartConfig={chartConfig}
            hideLegend={true}
          />
          <Text style={styles.progressText}>
            {progress < 1 ? (data.data[0] * 100).toFixed(0) : 100}% Complete
          </Text>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.deleteButtonText}>
            Delete {route.params.batchId + ' ' + route.params.curriculum}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  calendarView: {
    marginTop: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    width: '99%',
    padding: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 25,
    backgroundColor: '#ffffff',
  },

  progressRingView: {
    flexDirection: 'row',
    marginTop: 10,
    alignSelf: 'center',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    width: '98%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 25,
    backgroundColor: '#ffffff',
  },

  progressText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#474c55',
  },

  deleteButton: {
    marginTop: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: 15,
    borderColor: colors.orange,
  },

  deleteButtonText: {
    fontWeight: '700',
    color: colors.orange,
  },
});

export default ViewBatch;
