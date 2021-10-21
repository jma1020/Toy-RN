import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, Alert, Platform, KeyboardAvoidingView } from 'react-native';
import { TextInput, Button,Card } from 'react-native-paper';
import Constant from 'expo-constants'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import Icon4 from  'react-native-vector-icons/Entypo';

function SignUplast(props) {

    const fire ='asdasd'
    return (
        <View style={{flex:1,marginTop:Constant.statusBarHeight}}>
            <View style={{flex:4,borderWidth:2,justifyContent:'center',alignItems:'center'}}>
                <View style={{flexDirection:'row'}}>
                    <Icon2 name="checkcircle" size={30} style={styles.icon} />
                    <Icon2 name="checkcircle" size={30} style={styles.icon}  color={'black'}/>
                    <Icon2 name="checkcircle" size={30} style={styles.icon}  color={'black'}/>
                </View>
                <View style={styles.agreetext}>
                    <Text style={{fontSize:20, fontWeight:'bold'}}>회원가입 완료</Text>
                </View>
            </View>
            <View style={{flex:2,borderWidth:2,justifyContent:'space-around',alignItems:'center',flexDirection:'row' }}>
                
                <View style={{justifyContent:'center',alignItems:'center'}}>
                <Icon4 name="login" size={30}
                onPress={()=>props.navigation.navigate('Login')} />
                <Text>
                    로그인 화면 
                </Text>
                </View>
            </View>

        </View>
    )
}
const styles=StyleSheet.create({
    agreetext:{
        margin:10,
    },
    icon:{
        margin:7
    },
    checkText:{
        flexDirection:'column',
        marginBottom:8
    },
    checkTitle:{
        fontWeight:'bold',
        fontSize:20  ,
        marginTop:3
    }
})
export default SignUplast