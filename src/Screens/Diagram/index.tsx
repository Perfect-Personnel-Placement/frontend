import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity, Dimensions
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#ffffff',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43, 49, 89, 100, 20, 30, 40],
      color: (opacity = 1) => `rgba(242, 105, 38, ${opacity})`, // optional
      strokeWidth: 2 // optional
    },
    {
      data: [19, 45, 28, 60, 80, 25, 20, 69, 90, 20, 25, 30],
      color: (opacity = 1) => `rgba(115, 165, 194, ${opacity})`, // optional
      strokeWidth: 2 // optional
    }
  ],
  legend: ["Client Demand","Revature Supply"] // optional
};

  const negOrPost = () => {
    // if(clientDemand - supply > 0){
    //   return "Missing"
    // } else {
    //   return "Overflow by"
    // }
  }

  const Diagram: React.FC = () => {
    return (
      <View style={{flex:1}}>
        
        <View> 
          <Text>DROP DOWN PLACEHOLDER</Text>
        </View>

        <View style={styles.progressRingView}>
          <LineChart
            data={data}
            width={screenWidth}
            height={300}
            chartConfig={chartConfig}
          />
        </View>

        <View style={styles.infoContainer}>

          <View style={styles.clientNameContainer}><Text>ClientName Here</Text></View>

          <View style={styles.numbersContainer}>

            <View style={styles.numbers}>
              <Text>Number of Demanded</Text>
              <Text>20</Text>
            </View>
              
            <View style={styles.numbers}>
              <Text>Number of Associates</Text>
              <Text>15</Text>
            </View>
              
            <View style={styles.numbers}>
              <Text>MISSING</Text>
              <Text>5</Text>
            </View>
          </View>
        </View>

      </View>
    )
  }

  export default Diagram;

const styles = StyleSheet.create({
  infoContainer: {
    flex:1, 
    flexDirection:"column",
  }, 
  clientNameContainer:{
    alignItems: 'center'
  }, 
  numbersContainer:{
    flexDirection:"column",
  },
  numbers:{
    flexDirection:"row",
    justifyContent:'space-around'
  },
  progressRingView: {
    flexDirection: 'row',
    marginTop: 50,
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
})