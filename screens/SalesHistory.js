import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Alert } from 'react-native';
import { Card, FAB } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import Constant from 'expo-constants'
const SalesHistory = (props,{navigation}) => {

    const { data } = props.route.params
    const localhost = ((Platform.OS == 'android') ? 'http://10.0.2.2:3000/' : 'http://localhost:3000/')
    const [exchange, setExchange] = useState(data)
    const [loading, setLoading] = useState(true)

    const styles = StyleSheet.create({
        mycard: {
            margin: 10,
    
        },
        cardview: {
            flexDirection: "row",
            padding: 6
        },
        text: {
            fontSize: 18,
    
        },
        fab: {
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: 0
        }
    })
    
    // const fetchData = () => {
    //     fetch(localhost+"find-mytrade")
    //         .then(res => res.json())
    //         .then(results => {
                
    //             setExchange(results)
    //             setLoading(false)
    //         }).catch(err => {
    //             Alert.alert("이게머야")
    //         })
    // }

    // // useEffect(() => {
    // //     if(route.params?.name){
    // //     }
    // // }, [route.params?.name])

    // useEffect(() => {
    //     fetchData()
    // }, [exchange])


    const renderList = ((item) => {
        return (
            <Card style={styles.mycard}

                onPress={() => props.navigation.navigate("Content", { item })}
            >
                <View style={styles.cardview}>
                    <Image
                        style={{ width: 60, height: 60,borderRadius:30}}
                        source={{ uri: item.post_img }}
                    />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={styles.text} >{item.name}</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text style={[styles.text,{fontSize: 10, marginTop: 10}]} >{item.post_title}</Text>
                            <Text style={[styles.text,{fontSize: 10, marginTop: 10, marginLeft:30}]} >{item.createAt}</Text>
                            <Text>{item.post_name}</Text>
                        </View>
                    </View>
                </View>
            </Card>
        )
    })

    return(

        <View style={{marginTop:Constant.statusBarHeight}}>


        <FlatList
            data={data}
            renderItem={({ item }) => {
                return renderList(item)
            }}
            
            keyExtractor={item => item._id}
        
        
        />  

             {/* <View style={{   
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
               <Icon name="arrow-left" size={30} color={'#6b6c6e'} style={{}} 
                onPress = {() => props.navigation.goBack()}/>
                <Text style={{marginTop:10,marginLeft:4}}>교환내역</Text>
            </View>
   
        </View>
        <View>
            <Card >

            </Card>
        <Text>판매내역</Text>
        </View> */}
        </View>
    
    )
}

export default SalesHistory