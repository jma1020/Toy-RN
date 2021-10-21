import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, FlatList, Alert, ScrollView, Modal, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import { Card, Button } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import Constant from 'expo-constants'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import Icon4 from 'react-native-vector-icons/AntDesign';
import Icon5 from 'react-native-vector-icons/EvilIcons';
import Icon6 from 'react-native-vector-icons/Ionicons';
import Icon7 from 'react-native-vector-icons/Feather';
import Icon8 from 'react-native-vector-icons/Entypo';




function MyInformation(props, { navigation }) {
    const localhost = ((Platform.OS == 'android') ? 'http://10.0.2.2:3000/' : 'http://localhost:3000/')
    const dispatch = useDispatch()

    const [md, setMd] = useState(false)
    const [editName, setEditName] = useState('')

    const phoneWidth = Dimensions.get('window').width


    // const userData = useSelector(state => state.login.userData)
    const { userData, login } = useSelector(state => ({
        userData: state.login.userData,
        login: state.login.login
    }))

    // useEffect(() => {
    //     confirm()
    // }, [login])

    function confirm() {
        if (login == true) {
            const fetchMylist = () => {
                fetch(localhost + "find-mylist", {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        poster: userData[0].name
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        console.log(userData[0].name)
                        props.navigation.navigate("MyPost", { data })
                    }).catch(err => {
                        Alert.alert("에러!")
                    })
            }

            const fetchMytrade = () => {
                fetch(localhost + "find-mytrade", {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: userData[0].name
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        console.log(userData[0].name)
                        props.navigation.navigate("SalesHistory", { data })
                    }).catch(err => {
                        Alert.alert("에러!")
                    })
            }

            const fetchMylove = () => {
                fetch(localhost + "find-mylove", {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: userData[0].name
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        props.navigation.navigate("Favorite", { data })
                    }).catch(err => {
                        Alert.alert("에러!")
                    })
            }

            const logout = () => {
                dispatch({ type: "USER_DATA", payload: [] })
                dispatch({ type: "LOGIN_DATA", payload: false })
            }

            return (
                <View style={{ marginTop: Constant.statusBarHeight, flex: 1 }}>
                    <View>
                        <View style={{
                            height: 50,
                            alignItems:'center',
                            backgroundColor: "white",
                            marginBottom:1,
                            flexDirection: "row"

                        }}>
                            <View style={{}}>
                                <Text style={{marginLeft: 20, fontSize: 18, fontWeight:'bold' }}>내 정보</Text>
                            </View>
                        </View>
                    </View>
                    <ScrollView>
                        <View style={{ flex: 1, }}>
                            <Card style={{ marginBottom: 0.5 }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Image source={{ uri: userData[0].profile_img }}
                                        style={{ width: 70, height: 70, borderRadius: 35, borderWidth: 1, borderColor: 'gray', margin: 20 }}
                                    />
                                    <View style={{ justifyContent: 'center', width: (phoneWidth - 130) / 2 }}>
                                        <Text style={{ fontWeight: 'bold', fontSize:15 }}>{userData[0].name}</Text>
                                        <Text style={{marginTop:5, color:'gray'}}>위치정보</Text>
                                    </View>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', width: (phoneWidth - 110) / 2 }}>
                                        <Button style={{ borderWidth: 0.7, borderColor: 'gray', width: 110 }} onPress={() => props.navigation.navigate('UpdateProfile')}>
                                            <Text style={{ color: 'black' }}>프로필 편집</Text>
                                        </Button>
                                    </View>
                                </View>
                            </Card>
                        </View>
                        <Card style={{ marginBottom: 0.5 }}>
                            <View style={{
                                flexDirection: "row",
                                justifyContent: 'space-around',
                                flex: 1,
                                height: 120
                            }}>
                                <TouchableOpacity style={{ width: 100, justifyContent: 'center', alignItems: 'center' }} onPress={() => fetchMylist()}>
                                    <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: '#fcf4eb', justifyContent: 'center', alignItems: 'center' }}>
                                        <Icon2 name="receipt" size={32} color={'#ff8c80'} style={{}} />
                                    </View>
                                    <Text style={{ marginTop: 5 }}>내 게시물</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: 100, justifyContent: 'center', alignItems: 'center' }} onPress={() => fetchMytrade()}>
                                    <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: '#fcf4eb', justifyContent: 'center', alignItems: 'center' }}>
                                        <Icon name="shopping-bag" size={32} color={'#ff8c80'} style={{}} />
                                    </View>
                                    <Text style={{ marginTop: 5 }}>교환내역</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: 100, justifyContent: 'center', alignItems: 'center' }} onPress={() => fetchMylove()}>
                                    <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: '#fcf4eb', justifyContent: 'center', alignItems: 'center' }}>
                                        <Icon name="heart" size={32} color={'#ff8c80'} style={{}} />
                                    </View>
                                    <Text style={{ marginTop: 5 }}>찜목록</Text>
                                </TouchableOpacity>
                            </View>
                        </Card>
                        <View style={{ flex: 3, justifyContent: 'space-around', }}>
                            <Card>
                                <View style={{ flexDirection: 'row', height: 40, margin: 8, marginTop: 15 }}>
                                    <Icon4 name="sound" size={30} color={'black'} style={{ marginLeft: 20, width: '10%', }} />
                                    <Text style={{ margin: 6 }}>공지사항</Text>
                                </View>
                            </Card>
                            <Card>
                                <View style={{ flexDirection: 'row', height: 40, margin: 8 }}>
                                    <Icon8 name="light-bulb" size={30} color={'black'} style={{ marginLeft: 20, width: '10%', }} />
                                    <Text style={{ margin: 6 }}>알림</Text>
                                </View>
                            </Card>
                            <Card>
                                <View style={{ flexDirection: 'row', height: 40, margin: 8 }}>
                                    <Icon4 name="gift" size={30} color={'black'} style={{ marginLeft: 20, width: '10%', }} />
                                    <Text style={{ margin: 6 }}>이벤트</Text>
                                </View>
                            </Card>
                            <Card>
                                <View style={{ flexDirection: 'row', height: 40, margin: 8 }}>
                                    <Icon name="plus-square-o" size={30} color={'black'} style={{ marginLeft: 20, width: '10%', }} />
                                    <Text style={{ margin: 6 }}>모아보기</Text>
                                </View>
                            </Card>
                            <Card>
                                <View style={{ flexDirection: 'row', height: 40, margin: 8 }}>
                                    <Icon4 name="tagso" size={30} color={'black'} style={{ marginLeft: 20, width: '10%', }} />
                                    <Text style={{ margin: 6 }}>키워드</Text>
                                </View>
                            </Card>
                            <Card onPress={()=>props.navigation.navigate('Location')}>
                                <View style={{ flexDirection: 'row', height: 40, margin: 8 }}>
                                    <Icon5 name="location" size={30} color={'black'} style={{ marginLeft: 20, width: '10%', }} />
                                    <Text style={{ margin: 6 }}>내 위치 지정</Text>
                                </View>
                            </Card>
                            <Card>
                                <View style={{ flexDirection: 'row', height: 40, margin: 8 }}>
                                    <Icon4 name="sharealt" size={30} color={'black'} style={{ marginLeft: 20, width: '10%', }} />
                                    <Text style={{ margin: 6 }}>앱 공유 </Text>
                                </View>
                            </Card>
                            <Card>
                                <View style={{ flexDirection: 'row', height: 40, margin: 8 }}>
                                    <Icon4 name="setting" size={30} color={'black'} style={{ marginLeft: 20, width: '10%', }} />
                                    <Text style={{ margin: 6 }}>앱 설정 </Text>
                                </View>
                            </Card>
                            <Card>
                                <View style={{ flexDirection: 'row', height: 40, margin: 8 }}>
                                    <Icon4 name="book" size={30} color={'black'} style={{ marginLeft: 20, width: '10%', }} />
                                    <Text style={{ margin: 6 }}>이용약관 </Text>
                                </View>
                            </Card>
                            <Card onPress={() => logout()}>
                                <View style={{ flexDirection: 'row', height: 40, margin: 8 }}>
                                    <Icon7 name="log-out" size={30} color={'black'} style={{ marginLeft: 20, width: '10%', }} />
                                    <Text style={{ margin: 6 }}>로그아웃 </Text>
                                </View>
                            </Card>
                        </View>
                    </ScrollView>
                    <Modal transparent={true}
                        visible={md}
                    >
                        <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
                            <View style={{ backgroundColor: "white", flex: 1, marginLeft: 50, marginBottom: 250, marginRight: 50, marginTop: 250, alignItems: 'center', justifyContent: 'center' }} >

                                <Text style={{ margin: 8, }}>프로필 편집하세요
                                </Text>
                                <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }}>
                                    <TextInput
                                        onChangeText={text => setEditName(text)}
                                        defaultValue={userData[0].name}
                                    >

                                    </TextInput>
                                    <Button color={'#fac941'} onPress={() => { setMd(false) }} >편집</Button>
                                </View>
                            </View>

                        </View>
                    </Modal>
                </View>
            )
        }
    }




    return (
        confirm()
    )
}

export default MyInformation