import React,{useState} from 'react'
import { StyleSheet, Text, View, Image, FlatList, Alert } from 'react-native';
import {Button, Card,TextInput} from 'react-native-paper'
import {useSelector,useDispatch} from 'react-redux'
import Constant from 'expo-constants'

function MyEdit({navigation,route}) {

    const localhost = ((Platform.OS == 'android') ? 'http://10.0.2.2:3000/' : 'http://localhost:3000/')



    const userData = useSelector(state => state.login.userData)

    // const getDetails = (type) => {
    //     if (route.params) {
    //         switch (type) {
    //             case "name":
    //                 return userData[0].name
    //         }
    //     }
    //     return ""
    // }

    const [user_id, setUser_id] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState(userData[0].name)
    const [profile_img, setProfile_img]= useState("")


    const dispatch = useDispatch()


  

    const updateName = () => {
        fetch(localhost + "update", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id: userData[0].user_id,
                password: userData[0].password,
                name: name,
                profile_img: userData[0].profile_img
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        //  dispatch({ type: "USER_DATA", payload: data })
                        console.log(data[0].name)
                       
                        Alert.alert("등록되었습니다.")
                        
                        
                        
                    }).catch(err => {
                        Alert.alert("에러!")
                    })
                    
            }

            return (
                <View style={{ marginTop:Constant.statusBarHeight}}>
                    <Card style={{margin:10}}>
                        <TextInput
                            label='Name'
                            
                            value={name}
                            
                            
                            mode="outlined"
                            onChangeText={text => setName(text)}
                        />
                        <Text>{userData[0].user_id}</Text>
                        <Text>{userData[0].password}</Text>
                        <Text>{userData[0].name}</Text>
                        <Text>{userData[0].profile_img}</Text>
                      
                        <Button style={{backgroundColor:'red'}}onPress={()=>updateName()}>
                        </Button>
                    </Card>
                </View>
        
            )
    }




export default MyEdit