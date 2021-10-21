import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Alert, Dimensions } from 'react-native';
import { Card, FAB, Button } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import Icon9 from 'react-native-vector-icons/Octicons';
import Constant from 'expo-constants'


const Home = ({ navigation, route }) => {

    const toy = '장난감'
    const doll = '인형'
    const book = '도서'
    const clothing = '의류'
    const prop = '소품'

    const phoneWidth = Dimensions.get('window').width

    const dispatch = useDispatch()
    const localhost = ((Platform.OS == 'android') ? 'http://10.0.2.2:3000/' : 'http://localhost:3000/')

    const mycolor = "#5397c9"


    const { data, loading, userData } = useSelector(state => ({
        data: state.postList.data,
        loading: state.postList.loading,
        userData: state.login.userData
    }))
    console.log(data)

    const fetchMylovehome = () => {
        fetch(localhost + "find-mylove", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                lovename: userData[0].name
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                navigation.navigate("Favorite", { data })
            }).catch(err => {
                Alert.alert("로그인 필요합니다!")
            })
    }

    const fetchData = () => {
        fetch(localhost)
            .then(res => res.json())
            .then(results => {
                dispatch({ type: "ADD_DATA", payload: results.reverse() })
                dispatch({ type: "SET_LOADING", payload: false })

            }).catch(err => {
                Alert.alert("something wend wrong")
            })
    }

    const submitToy = () => {
        fetch(localhost + "kategorie", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                kategorie: toy
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                const title = toy
                navigation.navigate("Kategorie", { data, title })
            }).catch(err => {
                Alert.alert("카테고리 에러")
            })
    }
    const submitDoll = () => {
        fetch(localhost + "kategorie", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                kategorie: doll
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                const title = doll
                navigation.navigate("Kategorie", { data, title })
            }).catch(err => {
                Alert.alert("카테고리 에러")
            })
    }
    const submitBook = () => {
        fetch(localhost + "kategorie", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                kategorie: book
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                const title = book
                navigation.navigate("Kategorie", { data, title })
            }).catch(err => {
                Alert.alert("카테고리 에러")
            })
    }
    const submitClothing = () => {
        fetch(localhost + "kategorie", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                kategorie: clothing
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                const title = clothing
                navigation.navigate("Kategorie", { data, title })
            }).catch(err => {
                Alert.alert("카테고리 에러")
            })
    }
    const submitProp = () => {
        fetch(localhost + "kategorie", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                kategorie: prop
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                const title = prop
                navigation.navigate("Kategorie", { data, title })
            }).catch(err => {
                Alert.alert("카테고리 에러")
            })
    }

    const kategorieSelector = () => {
        return(
            <Card>
                <View style={{flexDirection: 'row', justifyContent:'space-evenly'}}>
                    <Card style={styles.kategorieStyle} onPress={()=>submitToy()}>
                        <Text>장난감</Text>
                    </Card>
                    <Card style={styles.kategorieStyle} onPress={()=>submitDoll()}>
                        <Text>인형</Text>
                    </Card>
                    <Card style={styles.kategorieStyle} onPress={()=>submitBook()}>
                        <Text>도서</Text>
                    </Card>
                    <Card style={styles.kategorieStyle} onPress={()=>submitClothing()}>
                        <Text>의류</Text>
                    </Card>
                    <Card style={styles.kategorieStyle} onPress={()=>submitProp()}>
                        <Text>소품</Text>
                    </Card>
                </View>
            </Card>
        )
    }

    // useEffect(() => {
    //     if(route.params?.name){
    //     }
    // }, [route.params?.name])

    useEffect(() => {
        fetchData()
    }, [])

    const renderList = ((item) => {
        return (
            <Card style={styles.mycard}

                onPress={() => navigation.navigate("Content", { item })}
            >
                <View style={styles.cardview}>
                    <Image
                        style={{ width: 100, height: 100, borderRadius:10 }}
                        source={{ uri: item.picture }}
                    />
                    <View style={{marginLeft:10,justifyContent:'center'}}>
                        <Text style={[styles.text,{width: phoneWidth - 130}]} >{item.title}</Text>
                        <View style={{ flexDirection: 'row', justifyContent:'space-between', marginTop:10  }}>
                            <Text style={[styles.text, { fontSize: 12}]} >{item.poster}</Text>
                            <Text style={[styles.text, { fontSize: 12}]} >{item.createAt}</Text>
                        </View>
                    </View>
                </View>
            </Card>
        )
    })
    return (
        <View style={{ flex: 1, marginTop:Constant.statusBarHeight }}>
            {/* <View>
                <View style={{
                    height: 50,
                    alignItems: 'center',
                    backgroundColor: "white",
                    marginBottom: 1,
                    flexDirection: "row"

                }}>
                    <Icon name="arrow-left" size={28} color="black" style={{marginLeft:10}} onPress={() => props.navigation.goBack()}></Icon>
                    <View>
                        <Text style={{ marginLeft: 10, fontSize: 18, fontWeight: 'bold' }}>내 게시물</Text>
                    </View>
                </View>
            </View> */}
            <View style={{
                height: 50,
                backgroundColor: "white",
                alignItems:'center',
                justifyContent: "space-between",
                flexDirection: "row",
                marginBottom:1
            }}>
                <View style={{
                    flexDirection: "row",
                    marginLeft: 10,
                    alignItems:'center'
                }}>
                    <Icon9 name="rocket" size={35} color={mycolor} style={{ }}></Icon9>
                    <Text style={{ marginLeft: 5, fontWeight:'bold', fontSize:18 }}>토이쉐어</Text>
                </View>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    width: 150,
                    height: '100%',
                    alignItems:'center'
                }}>
                    <Icon name="search" size={24} color={mycolor}
                        onPress={() => navigation.navigate("Search")}
                    />
                    <Icon name="star-o" size={24} color={mycolor}
                        onPress={() => fetchMylovehome()}
                    />
                    <Icon2 name="account-circle" size={24} color={mycolor} />
                </View>
            </View>
            <FlatList
                data={data}
                renderItem={({ item }) => {
                    return renderList(item)
                }}
                keyExtractor={item => item._id}
                ListHeaderComponent={kategorieSelector()}
                onRefresh={() => fetchData()}
                refreshing={loading}
            />
            {/* <FAB onPress={() => navigation.navigate("Create")}
                style={styles.fab}
                small={false}
                icon="plus"
                theme={{ colors: { accent: "#006aff" } }}
            /> */}
        </View>
    )
}


const styles = StyleSheet.create({
    mycard: {
        flex:1,
        margin: 1,

    },
    cardview: {
        flex:1,
        flexDirection: "row",
        padding: 10,
    },
    text: {
        fontSize: 20,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0
    },
    maincolor: {
        color: '#86bce3'
    },
    kategorieStyle:{
        padding:20
    }
})

export default Home