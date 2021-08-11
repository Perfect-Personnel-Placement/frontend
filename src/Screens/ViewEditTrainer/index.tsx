import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import EditTrainer from '../../Components/trainers/EditTrainer';
import ViewTrainer from '../../Components/trainers/ViewTrainer';

/**
 * Authors: Joab Smith and Imran Ilyas
 **/
const fillertrainer = {
  FirstName: 'John',
  LastName: 'Doe',
  Email: 'johndoe@hotmail.com',
  ID: '0987654',
};
interface ITrainer {
  name: string;
  ID: string;
}
interface IProps {
  default?: boolean;
}

const ViewEditTrainer: React.FC<IProps> = (props: IProps) => {
  const initial = props.default || false;
  const [edit, setEdit] = useState(initial);
  const [trainer, setTrainer] = useState(fillertrainer);
  const route = useRoute();
  const params = route.params as ITrainer;
  console.log(params, trainer);
  const getTrainerInfo = () => {
    //axios to get trainer info
    //params should have name and id
  };
  return (
    <View style={styles.container}>
      {edit ? (
        <EditTrainer trainer={fillertrainer} setEdit={setEdit} />
      ) : (
        <ViewTrainer trainer={fillertrainer} setEdit={setEdit} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //width:'100%'
  },
});

export default ViewEditTrainer;