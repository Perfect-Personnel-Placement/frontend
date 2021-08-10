import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import Header from '../../components/Header/Header';

// mock data for flatlist
export const data = [
  {
    associate: 25,
    batchId: 0,
    curriculum: 'Java/Angular',
    trainer: 'Robert Connell',
    startDate: 'Thu, 1 April 2021',
    endDate: 'Mon, 30 August 2021',
  },
  {
    associate: 25,
    batchId: 0,
    curriculum: 'Among Us',
    trainer: 'Matthew Otto',
    startDate: 'Thu, 1 April 2021',
    endDate: 'Mon, 30 August 2021',
  },
  {
    associate: 25,
    batchId: 0,
    curriculum: 'Potatoes',
    trainer: 'Red Oral',
    startDate: 'Thu, 1 April 2021',
    endDate: 'Mon, 30 August 2021',
  },
];

const Batches: React.FC = () => {

  const plannedBatchesTable = () => {
    return (
      <>
        {/** Screen title */}
        <View style={styles.titleContainer}>
          <Text style={styles.screenTitle}>Planned batches</Text>
          {/** Add batch button */}
          <TouchableOpacity style={styles.addBatchButton} onPress={jest.fn}>
            <Text style={styles.addBatchText}>Add batch</Text>
          </TouchableOpacity>
        </View>
        {/** Gantt Chart */}
        <View style={styles.plannedBatchesTable}></View>
      </>
    );
  };

  // renderItem
  const renderItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity style={styles.batchListItem}>
        <Text style={styles.curriculumText}>{item.curriculum}</Text>
        <Text style={styles.trainerText}>{item.trainer}</Text>
        <Text style={styles.dateText}>
          {item.startDate + '\n to ' + item.endDate}
        </Text>
      </TouchableOpacity>
    );
  };

  // Main return
  return (
    <SafeAreaView style={{ backgroundColor: '#fafafa', flex: 1 }}>
      {/** Header */}
      <Header />
      {/** List of batches */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.curriculum}
        ListHeaderComponent={plannedBatchesTable}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#474c55',
  },

  plannedBatchesTable: {
    alignSelf: 'center',
    height: 400,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 35,
    marginBottom: 10,
    backgroundColor: '#ffffff',
  },

  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 40,
    paddingRight: 40,
  },

  addBatchButton: {
    justifyContent: 'center',
    height: 40,
    width: 100,
    backgroundColor: '#f26925',
    borderRadius: 50,
    marginLeft: 10,
  },

  addBatchText: {
    fontWeight: '700',
    color: '#ffffff',
    alignSelf: 'center',
  },

  batchListItem: {
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingLeft: 30,
    marginBottom: 10,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 35,
    backgroundColor: '#ffffff',
  },

  curriculumText: {
    fontWeight: '700',
    fontSize: 16,
    color: '#474C55',
  },

  trainerText: {
    fontWeight: '700',
    fontSize: 12,
    color: '#474C55',
  },

  dateText: {
    fontSize: 12,
    color: '#474C55',
  },
});

export default Batches;