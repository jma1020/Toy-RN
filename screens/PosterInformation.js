import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Alert, Dimensions, Linking } from 'react-native';
import { Card, Button } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome';
import Constant from 'expo-constants'

const PosterInformation = (props, { route }) => {

    const { data, poster, poster_img, phone } = props.route.params
    const phoneWidth = Dimensions.get('window').width
    console.log(data)

    const openDial = () => {
        if (Platform.OS === "android") {
            Linking.openURL(`tel:${phone}`)
        } else {
            Linking.openURL(`telprompt:${phone}`)
        }
    }

    const PosterProfile = () => {
        return (
            <View>
                <Card style={[styles.mycard, { alignItems: 'center' }]}>
                    <Image
                        style={{ width: 100, height: 100, borderRadius: 50, borderWidth: 1, borderColor: 'gray', margin: 15, marginTop: 40 }}
                        source={{ uri: poster_img }}
                    />
                    <Text style={{ textAlign: 'center', marginBottom: 30, fontSize: 14, fontWeight: 'bold' }}>{poster}</Text>
                </Card>
                <Card>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', margin: 20 }}>게시글({data.length})</Text>
                </Card>
            </View>
        )
    }

    const renderList = ((item) => {
        return (
            <Card style={styles.mycard}

                onPress={() => props.navigation.push("Content", { item })}
            >
                <View style={styles.cardview}>
                    <Image
                        style={{ width: 100, height: 100, borderRadius: 10 }}
                        source={{ uri: item.picture }}
                    />
                    <View style={{ marginLeft: 10, justifyContent: 'center' }}>
                        <Text style={[styles.text, { width: phoneWidth - 130 }]} >{item.title}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                            <Text style={[styles.text, { fontSize: 12 }]} >{item.poster}</Text>
                            <Text style={[styles.text, { fontSize: 12 }]} >{item.createAt}</Text>
                        </View>
                    </View>
                </View>
            </Card>
        )
    })
    return (

        <View style={{ marginTop: Constant.statusBarHeight, flex:1 }}>
            <View>
                <View style={{
                    height: 45,
                    backgroundColor: "white",
                    elevation: 4,
                    justifyContent: "space-between",
                    flexDirection: "row"

                }}>
                    <View style={{
                        flexDirection: "row",
                        marginLeft: 4
                    }}>
                        <Icon name="arrow-left" size={28} color="black" style={{ marginTop: 6 }} onPress={() => props.navigation.goBack()}></Icon>
                        <Text style={{ marginTop: 10, marginLeft: 15, fontSize: 18 }}>{poster}님의 프로필</Text>
                    </View>
                </View>
            </View>
            <FlatList
                data={data.reverse()}
                renderItem={({ item }) => {
                    return renderList(item)
                }}
                ListHeaderComponent={PosterProfile()}
                keyExtractor={item => item._id}


            />
            <View style={{ flexDirection: 'row' }}>
                <Button style={[styles.footerStyle, { backgroundColor: 'white', padding: 5 }]} onPress={() => props.navigation.navigate('Chat')}>
                    <Text style={[styles.footerText, { color: 'black' }]}>채팅하기</Text>
                </Button>
                <Button style={[styles.footerStyle, { backgroundColor: '#5397c9', padding: 5 }]} onPress={() => openDial()}>
                    <Text style={[styles.footerText, { color: 'white' }]}>전화걸기</Text>
                </Button>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    mycard: {
        flex: 1,
        marginBottom: 1,

    },
    cardview: {
        flex: 1,
        flexDirection: "row",
        padding: 10,
    },
    text: {
        fontSize: 20,
    },
    maincolor: {
        color: '#86bce3'
    },
    phoneText: {
        fontSize: 18,
        marginTop: 3,
        marginLeft: 5
    },
    footerStyle: {
        flex: 1,
        // height: 50,
        borderRadius: 0,
    },
    footerText: {
        fontSize: 18,
        width: '100%',
        height: '100%'
    }
})

export default PosterInformation