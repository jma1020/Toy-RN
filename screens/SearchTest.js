import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Alert, Dimensions } from 'react-native';
import { Card, FAB } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import Constant from 'expo-constants'
import Icon from 'react-native-vector-icons/FontAwesome';



const SearchTest = (props) => {

    const { data,searchvalue} = props.route.params
    const phoneWidth = Dimensions.get('window').width
    const renderList = ((item) => {
        return (
            <Card style={styles.mycard}

                onPress={() => props.navigation.navigate("Content", { item })}
            >
                <View style={styles.cardview}>
                    <Image
                        style={{ width: 100, height: 100,borderRadius:10}}
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
    function All() {
        if(searchvalue.length === 0){
            return(
                <Text style={{ marginLeft: 10, fontSize: 18 }}>전체에서 검색</Text>
            )
        }
        else {
            return(
                <Text style={{marginLeft: 10, fontSize: 18 }}>{searchvalue}에서 검색</Text>
            )
        }
    }
    
    return(
            
    
    <View style={{marginTop:Constant.statusBarHeight}}>
        <View style={{
                    height: 50,
                    alignItems: 'center',
                    backgroundColor: "white",
                    marginBottom: 1,
                    flexDirection: "row"
                }}>
            <Icon name="arrow-left" size={28} color="black" style={{marginLeft:10}} onPress={() => props.navigation.goBack()}></Icon>
            {All()}
        </View>
    <FlatList
    data={data.reverse()}
    renderItem={({ item }) => {
        return renderList(item)
    }}
    keyExtractor={item => item._id}
    
    
/>

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
})
export default SearchTest