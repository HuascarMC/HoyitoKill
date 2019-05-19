import React, { Component } from "react";
import MapView from 'react-native-maps';
import firebase from '../firebase';

YellowBox.ignoreWarnings([
  "Warning: isMounted(...) is deprecated",
  "Module RCTImageLoader"
]);

import {
  Platform,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  Image,
  Button,
  StatusBar,
 YellowBox
} from "react-native";


export default class App extends Component {
  state = {
    latitude: 0,
    longitude: 0
  };

  static navigationOptions = {
    title: 'Mapa',
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

  findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const location = position;

        this.setState({
           latitude: location.coords.latitude,
           longitude: location.coords.longitude
            });
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  onPressed = () => {
    Alert.alert(
    'Hoyito Reportado',
    'Su maldito hoyito ha sido reportado!',
    [
      {text: 'Ver Coordenadas', onPress: () => Alert.alert(
      'Hoyito Reportado',
      `Latitud: ${this.state.latitude}, Longitud: ${this.state.longitude}`)},
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ],
    {cancelable: false},
  );
  var db = firebase.firestore();
  db.collection("hoyitos").doc().set({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    date: new Date()
})
.then(function() {
    console.log("Document successfully written!");
})
.catch(function(error) {
    console.error("Error writing document: ", error);
});
}

  seeCoordinates = () => {
    Alert.alert(
    'Hoyito Reportado',
    "`Latitud: ${this.state.latitude}, Longitud: ${this.state.longitud}`")
  }



  render() {
    return (
      <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        region={{
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        showsUserLocation={true}
      />
      <Image
            source={require('../assets/images/logo.png')}
            style={{width: 150, height: 100}}
          />
        <TouchableOpacity onPress={this.findCoordinates}>
          <Text style={styles.welcome}>Te has encontrado un hoyito?</Text>
          <Text>Latitud: {this.state.latitude}</Text>
          <Text>Longitud: {this.state.longitude}</Text>
          <Text>Velocidad: {this.state.speed}</Text>
          <Button onPress={this.onPressed} title="Reportar Hoyito" color='#000000' accessibilityLabel="Tap on Me"/>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
