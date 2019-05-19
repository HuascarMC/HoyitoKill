import React from 'react';
import { ScrollView, StyleSheet,   View,
  Text, Dimensions
 } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import firebase from '../firebase';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

export default class LinksScreen extends React.Component {
  state = {
    cantidad: 0
  };
  static navigationOptions = {
    title: 'Datos',
  };

  componentDidMount(){
    var db = firebase.firestore();
    var docRef = db.collection("hoyitos");

    docRef.limit(50)
		.get()
		.then(querySnapshot => {
			querySnapshot.docs.map(function (documentSnapshot) {
				return (output[documentSnapshot.id] = documentSnapshot.data());
			});
      this.setState({dataSource: Object.entries(output)}) ;
      console.log("datasource:", this.state.dataSource );
		});
  }


  render() {
    return (
      <ScrollView style={styles.container}>
      <View>
<Text>
  Bezier Line Chart
</Text>
<LineChart
  data={{
    labels: ['January', 'February', 'March', 'April', 'May', 'Hoy'],
    datasets: [{
      data: [
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,

      ]
    }]
  }}
  width={Dimensions.get('window').width} // from react-native
  height={220}
  yAxisLabel={''}
  chartConfig={{
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16
    }
  }}
  bezier
  style={{
    marginVertical: 8,
    borderRadius: 16
  }}
/>
</View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
