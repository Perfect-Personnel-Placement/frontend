import React from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import BatchListItem from '../../Components/batches/BatchListItem';
import { screenStyles } from '../../styles';
import BatchesListHeader from '../../Components/batches/BatchesListHeader';

/** Mock Data - PreRedux */
export const data = [
  {
    associate: 25,
    batchId: 2106,
    curriculum: 'Cloud Native',
    trainer: 'Robert Connell',
    startDate: 1622505600000,
    endDate: 1627776000000,
  },
  {
    associate: 25,
    batchId: 2172,
    curriculum: 'React Native',
    trainer: 'Matthew Otto',
    startDate: 1627862400000,
    endDate: 1633046400000,
  },
  {
    associate: 25,
    batchId: 2132,
    curriculum: 'React',
    trainer: 'Red Oral',
    startDate: 1633132800000,
    endDate: 1638316800000,
  },
];

/** Basis for Entire Batch Screen */
const Batches: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = React.useState('all');

  /** Main item to render for the FlatList */
  const renderItem = ({ item }: { item: any }) => {
    return (
      <BatchListItem
        associate={item.associate}
        batchId={item.batchId}
        curriculum={item.curriculum}
        trainer={item.trainer}
        startDate={item.startDate}
        endDate={item.endDate}
      />
    );
  };

  /** Main return statement */
  return (
    <SafeAreaView style={screenStyles.safeAreaView}>
      {/** List of batches
       * Takes in the picker filter value and updates accordingly
       */}

      <FlatList
        data={
          selectedFilter === 'active'
            ? data.filter(
                (date) =>
                  date.startDate < Date.now() && date.endDate > Date.now()
              )
            : selectedFilter === 'upcoming'
            ? data.filter((date) => date.startDate > Date.now())
            : selectedFilter === 'completed'
            ? data.filter((date) => date.endDate < Date.now())
            : data
        }
        renderItem={renderItem}
        keyExtractor={(item) => item.curriculum}
        ListHeaderComponent={() => (
          <BatchesListHeader
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Batches;
