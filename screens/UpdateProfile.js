import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Alert, Dimensions } from 'react-native';
import { Card, TextInput} from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome';
import Constant from 'expo-constants'

const MyPost = (props, { route }) => {

    const localhost = ((Platform.OS == 'android') ? 'http://10.0.2.2:3000/' : 'http://localhost:3000/')
    // const { data } = props.route.params
    const phoneWidth = Dimensions.get('window').width
    const { userData, login } = useSelector(state => ({
        userData: state.login.userData,
        login: state.login.login
    }))
    const dispatch = useDispatch()
    const [updateName,setUpdateName] = useState('')
    console.log(userData)
    const submitData = () => {
        fetch(localhost + "user-update", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: updateName,
                id: userData[0]._id
            })
        })
            .then(res => res.json())
            .then(data => {
                dispatch({ type: "USER_DATA", payload: data })
                Alert.alert("수정되었습니다.")
                props.navigation.push("HomeScreen")
            }).catch(err => {
                Alert.alert("프로필수정에러!")
            })
    }
    return (

        <View style={{ flex:1,marginTop: Constant.statusBarHeight }}>
            <View>
                <View style={{
                    height: 50,
                    alignItems: 'center',
                    backgroundColor: "white",
                    marginBottom: 1,
                    flexDirection: "row",
                    justifyContent:'space-between'

                }}>
                    <Icon name="arrow-left" size={28} color="black" style={{marginLeft:10}} onPress={() => props.navigation.goBack()}></Icon>
                    <View>
                        <Text style={{ marginLeft: 10, fontSize: 18, fontWeight: 'bold' }}>프로필 편집</Text>
                    </View>
                    <View>
                        <Text style={{marginRight: 20, fontSize: 18, fontWeight:'bold' }} onPress={() => submitData()}>완료</Text>
                    </View>
                </View>
            </View>
            <Card style={[styles.mycard, { alignItems: 'center' }]}>
                    <Image
                        style={{ width: 100, height: 100, borderRadius: 50, borderWidth: 1, borderColor: 'gray', margin: 15, marginTop: 40 }}
                        source={{ uri: userData[0].profile_img }}
                    />
                    <View>
                    <TextInput style={{marginBottom: 30, fontSize:18, fontWeight:'bold', height: 26}} defaultValue={userData[0].name} onChange={()=>setUpdateName()}/>
                    {/* <Text style={{ textAlign: 'center', marginBottom: 30, fontSize: 14, fontWeight: 'bold' }}>{userData[0].name}</Text> */}
                    </View>
                </Card>
        </View>
    )

}

const styles = StyleSheet.create({
    mycard: {
        flex: 1,
        margin: 1,

    },
    cardview: {
        flex: 1,
        flexDirection: "row",
        padding: 10,
    },
    text: {
        fontSize: 20,
    }
})

export default MyPost