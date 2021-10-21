import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, Alert, Platform, KeyboardAvoidingView ,Dimensions,Image} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import MapView, {Marker} from "react-native-maps";
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/FontAwesome';



const Location2 = (props) => {
  const [region,setRegion] = useState(null)  
  const [errorMsg, setErrorMsg] = useState(null);

 
  useEffect((props) => {
    (async () => {

      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      
      setRegion({
        longitude:location.coords.longitude,
        latitude:location.coords.latitude,
        longitudeDelta:0.005,
        latitudeDelta:0.005
      })
 
    })();
  }, []);


    return(
        <View style={styles.container}>
        <MapView style={styles.map}
          initialRegion={region}
        >
          


        </MapView>
        <View style={{top:'50%',left:'50%',marginLeft:-24,marginTop:-48,position:'absolute'}}>

         <Image style={{height:40,width:40}} source={require('../assets/111111.png')}/>
        </View>
        <Icon name="arrow-left" size={28} color="black" style={{ width: 30, height: 30, position: 'absolute', top: 40, left: 10 }} onPress={() => props.navigation.goBack()}></Icon>
        <Text style={{marginRight: 20, fontSize: 18, fontWeight:'bold', position: 'absolute', top: 40, right: 10 }} onPress={() => props.navigation.goBack()}>완료</Text>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });
export default Location2





// import React, {useState, useEffect} from 'react';
// import Styled from 'styled-components/native';
// import MapView, {Marker} from 'react-native-maps';
// import Geolocation from 'react-native-geolocation-service';

// const Container = Styled.View`
//     flex: 1;
// `;

// interface ILocation {
//   latitude: number;
//   longitude: number;
// }

// const TrackUserLocation = () => {
//   const [locations, setLocations] = useState<Array<ILocation>>([]);
//   let _watchId: number;

//   useEffect(() => {
//     _watchId = Geolocation.watchPosition(
//       position => {
//         const {latitude, longitude} = position.coords;
//         setLocations([...locations, {latitude, longitude}]);
//       },
//       error => {
//         console.log(error);
//       },
//       {
//         enableHighAccuracy: true,
//         distanceFilter: 100,
//         interval: 5000,
//         fastestInterval: 2000,
//       },
//     );
//   }, [locations]);

//   useEffect(() => {
//     return () => {
//       if (_watchId !== null) {
//         Geolocation.clearWatch(_watchId);
//       }
//     };
//   }, []);

//   return (
//     <Container>
//       {locations.length > 0 && (
//         <MapView
//           style={{flex: 1}}
//           initialRegion={{
//             latitude: locations[0].latitude,
//             longitude: locations[0].longitude,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           }}>
//           {locations.map((location: ILocation, index: number) => (
//             <Marker
//               key={`location-${index}`}
//               coordinate={{
//                 latitude: location.latitude,
//                 longitude: location.longitude,
//               }}
//             />
//           ))}
//         </MapView>
//       )}
//     </Container>
//   );
// };

// export default TrackUserLocation;