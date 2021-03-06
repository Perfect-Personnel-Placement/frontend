import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import TrainerListHeader from '../../components/trainers/trainer-list-header';
import { screenStyles } from '../../styles';
import TrainersListItem from '../../components/trainers/trainers-list-item';
import ITrainer from '../../Entities/Trainer';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from '../../redux/state';
import { useNavigation } from '@react-navigation/native';
import { getAllTrainers } from '../../redux/actions/trainers-actions';

/**
 * Main Trainer Screen - displays the trainer screen with all the trainers
 * @returns {React.FC} - React Component for the Trainer Screen
 * @param {ITrainer} interface - entity that lists properties of a trainer
 * @author Joab Smith and Imran Ilyas
 */

const MainTrainer: React.FC = () => {
  const trainers: ITrainer[] = useSelector(
    (state: IAppState) => state.trainers
  );
  const [isFetching, setIsFetching] = React.useState(false);
  const [sortedTrainer, setSortedTrainer] = useState<ITrainer[]>(trainers);
  const dispatch = useDispatch();

  /** fetch updated data for refresh function */
  const fetchData = () => {
    dispatch(getAllTrainers());
    setIsFetching(false);
  };

  /** refresh function for flatlist */
  const onRefresh = () => {
    setIsFetching(true);
    fetchData();
  };

  useEffect(() => {
    setSortedTrainer(trainers);
  }, [trainers]);

  // Returns the header which consists of the Search Bar and the Add Trainer Button
  const header = () => {
    return <TrainerListHeader setTrainerArr={setSortedTrainer} />;
  };

  // Returns the Flatlist that consists of a trainer's information
  const renderItem = ({ item }: { item: ITrainer }) => {
    return <TrainersListItem trainer={item} />;
  };

  return (
    <SafeAreaView style={screenStyles.safeAreaView}>
      <FlatList
        onRefresh={onRefresh}
        refreshing={isFetching}
        data={sortedTrainer}
        renderItem={renderItem}
        keyExtractor={(item) => item.email}
        ListHeaderComponent={header}
      ></FlatList>
    </SafeAreaView>
  );
};

export default MainTrainer;
