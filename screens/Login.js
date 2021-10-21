import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, Alert, Platform, KeyboardAvoidingView,ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux'
import Constant from 'expo-constants'
import Icon from 'react-native-vector-icons/FontAwesome';

const Login = (props) => {

    const [user_id, setUser_id] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [id, setId] = useState("")
    const [enableshift, setEnableshift] = useState(false)

    const dispatch = useDispatch()
    const [iconchange,setIconchange]=useState(false)
    
    const localhost = ((Platform.OS == 'android') ? 'http://10.0.2.2:3000/' : 'http://localhost:3000/')

    const loginData = () => { 
        fetch(localhost + "login", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id,
                password
            })
        })
            .then(res => res.json())
            .then(data => {
                if(user_id == data[0].user_id && password == data[0].password){
                    Alert.alert("로그인 되었습니다.")
                    setName(data[0].name)
                    setId(data[0]._id)
                    dispatch({ type: "USER_DATA", payload: data })
                    dispatch({ type: "LOGIN_DATA", payload: true })
                    props.navigation.navigate("HomeScreen")
                }
            }).catch(err => {
                Alert.alert("아이디 또는 비밀번호를 확인하세요.")
            })

    }

    const noneLogin = () => {
        dispatch({ type: "USER_DATA", payload: [] })
        dispatch({ type: "LOGIN_DATA", payload: false })
        props.navigation.navigate("HomeScreen")
    }

    return(
        
        <View style={[styles.root,{marginTop:Constant.statusBarHeight}]}>
            <ScrollView enabled={enableshift}>
                <View style={{height:120}}></View>
            <View style={[styles.logoView,{flex:1, alignItems:'center'}]}>
                <Text style={{fontSize: 20, fontWeight:'bold'}}>로그인</Text>
            </View>
            <View style={{flex:3}}>
            <TextInput
                label="아이디"
                style={[styles.inputStyle,{height:45}]}
                value={user_id}
                theme={theme}
                mode="outlined"
                onChangeText={text => setUser_id(text)}
            />
            <TextInput
                label="비밀번호"
                style={[styles.inputStyle,{marginTop:10,height:45}]}
                value={password}
                theme={theme}
                mode="outlined"
                onChangeText={text => setPassword(text)}
            />
            
            </View>
            <View style={{flex:1,flexDirection:'row',marginLeft:30, marginTop:10, marginBottom:10}}>
                {iconchange ?<Icon name="check-circle" size={20}
                 onPress={()=> setIconchange(false)}
                />: <Icon name="check-circle-o" size={20}
                onPress={()=> setIconchange(true)}
               />}
               <Text style={{marginLeft:6}}>자동 로그인</Text>
            </View>
            <View style={{flex:5}}>
            <Button 
                style={styles.loginButton}
                icon="login"
                mode="contained"
                theme={theme}
                onPress={() => loginData()}
            >
                로그인
            </Button>
            <Button 
                style={[styles.loginButton, {marginTop: 15}]}
                icon="login"
                mode="contained"
                theme={theme}
                onPress={() => noneLogin()}
            >
                비회원 로그인
            </Button>
            <View style={styles.signupbutton}>
                <Text 
                style={{fontSize:12}} 
               
                >  아이디찾기</Text>
            
               <Text 
               style={{fontSize:12}} 
               
               >  비밀번호찾기</Text>
           

                <Text 
                style={{fontSize:12}} 
                onPress={() => props.navigation.navigate('SignUpagree')}
                >  회원가입</Text>  
            </View>
            </View>  
            </ScrollView>
        </View>
        
    )
}


const theme = {
    colors: {
        primary: "#737373"
    }
}

const signuptheme = {
    colors: {
        primary: "white"
    }
}
const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    logoView:{
        flex:1,
        margin:10,
        justifyContent:'center'  
    },
    inputStyle: {
        margin:2,
        marginLeft:30,
        marginRight:30
        
    },
    loginButton:{
        marginRight:30,
        marginLeft:30
    },
    signupbutton:{
        margin:10,
       marginTop:40,
        
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    }
})

export default Login;