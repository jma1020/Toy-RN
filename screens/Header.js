import React from 'react';
import { Alert, StyleSheet, Text, View} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import Constant from 'expo-constants'
// import { useNavigation } from '@react-navigation/native'






const Header = ()  => {
    const mycolor="#fcc792"
    
    return (
        <View style={{
            marginTop:Constant.statusBarHeight,
            height:45,
            backgroundColor:"white",
            elevation:4,
            justifyContent:"space-between",
            flexDirection:"row"
            
        }}>
            <View style={{
                flexDirection:"row",
                marginLeft:4
            }}>
                <Icon3 name="carrot" size={32} color="#ffac30"></Icon3>
                <Text style={{marginTop:10,marginLeft:4}}>당근</Text>
            </View>
            <View style={{
                flexDirection:"row",
                justifyContent:"space-around",
                width:150,
                marginTop:8
            }}>
                <Icon name="search" size={24} color={mycolor} 
                onPress={()=> navigation.navigate("Login")}
                />
                

                
                <Icon name="star-o" size={24} color={mycolor} />

                <Icon2 name="account-circle" size={24} color={mycolor} />
            </View>
        </View>
    )
}

export default Header