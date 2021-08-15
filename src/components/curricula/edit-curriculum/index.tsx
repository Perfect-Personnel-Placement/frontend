import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ScrollView, TextInput, View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { inputStyles, screenStyles, buttonStyles, textStyles } from '../../../styles';

const curriculumData = {
    batches: [7, 9, 3],
    createdBy: 'First Creator',
    createdOn: '2021-08-03',
    id: 0,
    lastModified: '2021-08-03',
    lastModifiedBy: 'First Creator',
    name: 'Curriculum 1',
    skills: ['JS', 'TS', 'React', 'React-Native'],
}

interface ICurriculum {
    batches: [];
    createdBy: string;
    createdOn: string;
    id: number;
    lastModified: string;
    lastModifiedBy: string;
    name: string;
    skills: [];
}

const EditCurriculum: React.FC = () => {
    const route = useRoute();
    const params = route.params as ICurriculum;
    const navigation = useNavigation();
    const [name, setName] = useState(curriculumData.name); 
    const [createdBy, setCreatedBy] = useState(curriculumData.createdBy);
    const [modifiedBy, setModifiedBy] = useState(curriculumData.lastModifiedBy);
    const [batches, setBatches] = useState(curriculumData.batches.join(', '));
    const [skills, setSkills] = useState(curriculumData.skills.join(', '));
    const [isPickerShow, setIsPickerShow] = useState(false);
    const [createdDate, setCreatedDate] = useState(new Date(Date.now()));
    const [modifiedDate, setModifiedDate] = useState(new Date(Date.now()));
  
    const showPicker = () => {
      setIsPickerShow(true);
    };
  
    const onCreatedChange = (e: any, val: any) => {
      if (val) {
        setCreatedDate(val);
        setIsPickerShow(false);
      } else {
        setCreatedDate(new Date(Date.now()));
        setIsPickerShow(false);
      }
    };
  
    const onModifiedChange = (e: any, val: any) => {
      if (val) {
        setModifiedDate(val);
        setIsPickerShow(false);
      } else {
        setModifiedDate(new Date(Date.now()));
        setIsPickerShow(false);
      }
    };

    return (
    <ScrollView style={screenStyles.mainView}>
        <View
        style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: 10,
        }}
        >
        <Text style={textStyles.heading}>Edit Curriculum</Text>
        <TouchableOpacity
            style={buttonStyles.buttonContainer}
            onPress={() => navigation.goBack()}
        >
            <Text style={buttonStyles.buttonText}>Save</Text>
        </TouchableOpacity>
        </View>

        {/**Form View */}
        <View style={styles.form}>
            <Text style={inputStyles.inputLabelText}>Name:</Text>
            <TextInput
            testID='Name'
            onChangeText={setName}
            style={inputStyles.textInput}
            />
        </View>

        <View style={styles.form}>
            <Text style={inputStyles.inputLabelText}>Created On:</Text>
            {!isPickerShow && (
            <TouchableOpacity onPress={showPicker}>
                <Text style={inputStyles.textInput}>
                    <MaterialCommunityIcons
                    name='calendar-edit'
                    size={20}
                    color='#474C55'
                    />{'     '}
                    {createdDate.toDateString()}</Text>
                
            </TouchableOpacity>
            )}

            {isPickerShow && (
            <DateTimePicker
                value={createdDate}
                mode={'date'}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onCreatedChange}
                style={styles.datePicker}
            />
            )}
        </View>

        <View style={styles.form}>
            <Text style={inputStyles.inputLabelText}>Created By:</Text>
            <TextInput
            value={createdBy}
            onChangeText={(createdByText) => setCreatedBy(createdByText)}
            style={inputStyles.textInput}
            />
        </View>

        <View style={styles.form}>
            <Text style={inputStyles.inputLabelText}>Last Modified On:</Text>
            
            {!isPickerShow && (
            <TouchableOpacity
                onPress={showPicker}
            >
                <Text style={inputStyles.textInput}><MaterialCommunityIcons
                    name='calendar-edit'
                    size={20}
                    color='#474C55'
                />{'     '}
                {modifiedDate.toDateString()}
                </Text>
            </TouchableOpacity>
            )}

            {isPickerShow && (
            <DateTimePicker
                value={modifiedDate}
                mode={'date'}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onModifiedChange}
                style={styles.datePicker}
            />
            )}
        </View>

        <View style={styles.form}>
            <Text style={inputStyles.inputLabelText}>Last Modified By:</Text>
            <TextInput
            value={modifiedBy}
            onChangeText={(createdByText) => setModifiedBy(createdByText)}
            style={inputStyles.textInput}
            />
        </View>

        <View style={styles.form}>
            <Text style={inputStyles.inputLabelText}>Batches:</Text>
            <TextInput
            value={batches}
            onChangeText={(createdByText) => setBatches(createdByText)}
            style={inputStyles.textInput}
            />
        </View>

        <View style={styles.form}>
            <Text style={inputStyles.inputLabelText}>Skills:</Text>
            <TextInput
            value={skills}
            onChangeText={(createdByText) => setSkills(createdByText)}
            style={inputStyles.textInput}
            />
        </View>

    </ScrollView>
    )
};

const styles = StyleSheet.create({
// This only works on iOS
  datePicker: {
    width: 320,
    height: 260,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  form: {
    flex: 1,
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center',
  }
})

export default EditCurriculum;
