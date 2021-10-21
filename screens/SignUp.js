import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, Alert, Platform, KeyboardAvoidingView,ScrollView, } from 'react-native';
import { TextInput, Button, RadioButton } from 'react-native-paper';
import Constant from 'expo-constants'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/AntDesign';
import {CheckBox} from 'react-native-elements'

const SignUp = (props) => {
    const [user_id, setUser_id] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [birthday, setBirthday] = useState("")
    const [enableshift, setEnableshift] = useState(false)
    const [gender, setGender] = useState("man")
    const [checked,setChecked] = useState('first')
    const [checkbox,setCheckbox] = useState(false)
    const [checkbox2,setCheckbox2] = useState(false)
    const [checkbox3,setCheckbox3] = useState(false)

    const localhost = ((Platform.OS == 'android') ? 'http://10.0.2.2:3000/' : 'http://localhost:3000/')

    const submitData = () => { //등록할떄
        if(password.length < 8){
            Alert.alert('비밀번호는 8자 이상이여야 합니다.')
        }else{
            fetch(localhost + "send-data", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id,
                    password,
                    name,
                    phone,
                    birthday,
                    gender
                })
            })
            .then(res => res.json())
            .then(data => {
                Alert.alert("등록되었습니다.")
                props.navigation.navigate("SignUplast")
            }).catch(err => {
                Alert.alert("에러!")
            })
        }     
    }

    return (
        
        <View style={[styles.root,{marginTop:Constant.statusBarHeight}]}>          
            <ScrollView enabled={enableshift}>
            <View style={{flex:6,borderWidth:2,justifyContent:'center',alignItems:'center',height:150}}>
                <Icon2 name="close" size={20} 
                    style={{position:'absolute' ,top:10,right:15}}
                    onPress={() => props.navigation.navigate("Login")}
                />
                <View style={{flexDirection:'row'}}>
                    <Icon2 name="checkcircle" size={30} style={styles.icon} />
                    <Icon2 name="checkcircle" size={30} style={styles.icon} color={'black'}/>
                    <Icon2 name="lock1" size={30} style={styles.icon} color={'#8c8c8c'}/>
                </View>
                <View style={styles.agreetext}>
                    <Text style={{fontSize:20, fontWeight:'bold'}}>회원가입</Text>
                </View>
            </View>
            <View style={{flex:5,borderWidth:2}}>
                
            <View>
                <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                <TextInput
                    label="아이디 (이메일 주소)"
                    style={{width:'65%',marginLeft:10,marginTop:10,marginBottom:10}}
                    value={user_id}
                    theme={theme}
                    onFocus={()=>setEnableshift(false)}
                    mode="outlined"
                    onChangeText={text => setUser_id(text)}
                />
                <Button style={{backgroundColor:'black',width:'30%',height:59,marginTop:15, justifyContent:'center'}} onPress={()=>Alert.alert('사용가능한 아이디입니다.')}>
                    <Text style={{color:'white'}}>중복확인</Text>
                </Button>
                </View>
                <TextInput
                    label="비밀번호"
                    style={styles.inputStyle}
                    value={password}
                    theme={theme}
                    onFocus={()=>setEnableshift(false)}
                    mode="outlined"
                    onChangeText={text => setPassword(text)}
                />
                <TextInput
                label="비밀번호 확인"
                style={styles.inputStyle}
                value={password}
                theme={theme}
                onFocus={()=>setEnableshift(false)}
                mode="outlined"
                onChangeText={text => setPassword(text)}
                />
                <TextInput
                    label="닉네임"
                    style={styles.inputStyle}
                    value={name}
                    theme={theme}
                    onFocus={()=>setEnableshift(false)}
                    mode="outlined"
                    onChangeText={text => setName(text)}
                />

                <TextInput
                    label="핸드폰 번호"
                    placeholder= "'-'제외하고 입력해주세요."
                    style={styles.inputStyle}
                    value={phone}
                    theme={theme}
                    onFocus={()=>setEnableshift(false)}
                    mode="outlined"
                    onChangeText={text => setPhone(text)}
                />
                <View style={{flexDirection:'row'}}>
                <TextInput
                    label="생년월일 (8자리 입력)"
                    style={[styles.inputStyle,{width:'50%'}]}
                    value={birthday}
                    theme={theme}
                    onFocus={()=>setEnableshift(false)}
                    mode="outlined"
                    onChangeText={text => setBirthday(text)}
                />
                <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                <View style={{flexDirection:'row',margin:10}}>
                    
                    <RadioButton
                        value="man"
                        status={ gender === 'man'? 'checked':'unchecked'}
                        color={'#1fdaff'}
                        onPress={()=>setGender('man')}
                    /> 
                    <Text style={{marginTop:8}}>
                        남성
                    </Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <RadioButton
                        value="woman"
                        status={ gender === 'woman'? 'checked':'unckecked'}
                        color={'#ff8787'}
                        onPress={()=> setGender('woman')}
                    />
                    <Text style={{marginTop:8}}>
                        여성
                    </Text>
                </View>
                </View>
                </View>
                <View>
                <CheckBox
                    left
                    size={15}
                    title='이용약관 동의'
                    checkedColor={'black'}
                    checked={checkbox}
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    onPress={() => setCheckbox(checkbox? false:true)}
                />
                <CheckBox
                    left
                    size={15}
                    title='개인정보 취급방침 동의 '
                    checkedColor={'black'}
                    checked={checkbox2}
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    onPress={() => setCheckbox2(checkbox2? false:true)}
                />
                <CheckBox
                    left
                    size={15}
                    title='마케팅 정보 수신 동의'
                    
                    checkedColor={'black'}
                    checked={checkbox3}
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    onPress={() => setCheckbox3(checkbox3? false:true)}
                />
                </View>
               
                <Button 
                    style={styles.inputStyle,{backgroundColor:"black",margin:20,height:40,}}
                 
                    mode="contained"
                    color={'#ffffff'}
                    theme={buttonTheme}
                    onPress={() => submitData()}
                >
                  
                    <Text style={{color:'white',marginRight:10}}>회원가입</Text>
                    
                </Button>
                </View>
            
                
            </View>
            </ScrollView>
        </View>

    )
}


const theme = {
    colors: {
        primary: "#696866"
    }
}

const buttonTheme = {
    colors: {
        primary: "white"
    }
}
const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    agreetext:{
        margin:10,
    },
    icon:{
        margin:7
    },
    inputStyle: {
        margin: 10,
       
    },
    modalView: {
        position: "absolute",
        bottom: 2,
        width: "100%",
        backgroundColor: 'white'
    },
    modalButtonView: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
})

export default SignUp;




        // <KeyboardAvoidingView behavior="position" style={styles.root} enabled={enableshift}>
        // <View style={{
        //     marginTop:Constant.statusBarHeight,
        //     height:45,
        //     backgroundColor:"white",
        //     elevation:4,
        //     justifyContent:"space-between",
        //     flexDirection:"row",
           
            
        // }}><Text style={{marginTop:10,marginLeft:4}}>회원가입</Text></View>
        // <View style={{ backgroundColor: "#ffac30",borderBottomRightRadius:55}}>
            // <View>
            // <TextInput
            //     label="아이디"
            //     style={[styles.inputStyle,{}]}
            //     value={user_id}
            //     theme={theme}
            //     onFocus={()=>setEnableshift(false)}
            //     mode="outlined"
            //     onChangeText={text => setUser_id(text)}
            // />
            // <TextInput
               
            //     label="비밀번호"
            //     style={styles.inputStyle}
            //     value={password}
            //     theme={theme}
            //     onFocus={()=>setEnableshift(false)}
            //     mode="outlined"
            //     onChangeText={text => setPassword(text)}
            // />
            
            // <TextInput
            //     label="닉네임"
            //     style={styles.inputStyle}
            //     value={name}
            //     theme={theme}
            //     onFocus={()=>setEnableshift(false)}
            //     mode="outlined"
            //     onChangeText={text => setName(text)}
            // />
            // <Button 
            //     style={styles.inputStyle,{marginBottom:70,marginRight:70,marginLeft:70,marginTop:40}}
            //     icon="content-save"
            //     mode="contained"
            //     theme={buttonTheme}
            //     onPress={() => submitData()}
            // >
            //     회원등록
            // </Button>
            // </View>
      
        // </View>
        // <View style={{marginTop:30,justifyContent:'center',flexDirection:'row',backgroundColor:'white',borderTopLeftRadius:60}}>
        //     <Icon name="google" size={30} style={{marginRight:10}}/>
        //     <Icon name="facebook" size={30} style={{marginLeft:10,marginRight:10}} />
        //     <Icon name="instagram" size={32} style={{marginLeft:10}} />
        // </View>
        // </KeyboardAvoidingView>