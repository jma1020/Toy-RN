import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, FlatList, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'

const Chat = (props) => {

    const dispatch = useDispatch()
    const localhost = ((Platform.OS == 'android') ? 'http://10.0.2.2:3000/' : 'http://localhost:3000/')


    const {userData, login} = useSelector(state => ({
        userData: state.login.userData,
        login: state.login.login
    })) 
    

    function confirm() {
        if (login == false) {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', fontSize: 30 }}>로그인이필요합니다.</Text>
                </View>
            )
        }
        else {
            
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems:'center' }}>
                    <Text style={{fontSize:24, fontWeight:'bold'}}>
                        개발중입니다.
                    </Text>
                </View>
            )
        }
    }

    return (
        confirm()
    )
}

export default Chat

                {/* <Image source={require('../assets/cutegirl2.jpg')} 
                style={{width:300,height:300}}/> */}
            //  <Modal transparent={true}
            //         visible={md}
            // >
            //     <View style={{backgroundColor:'#000000aa',flex:1}}>
            //     <View style={{ backgroundColor:"white",flex:1, marginLeft:50,marginBottom:250,marginRight:50,marginTop:250}} >
               
            //     <Text style={{margin:8}}>회원가입 또는 로그인후 이용할 수 있습니다. 
            //     <Button  color={'#fac941'} onPress={()=>{setMd(false)}} >취소</Button>
            //     <Button style={{}}  color={'#fac941'}   onPress={() => props.navigation.navigate("Login")} ><Text>로그인/가입</Text></Button>
                
            //     </Text>
            //     </View>
                
            //     </View>
            // </Modal> 