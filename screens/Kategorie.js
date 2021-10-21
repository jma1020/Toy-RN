import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Alert, Dimensions } from 'react-native';
import { Card, FAB } from 'react-native-paper'
import Constant from 'expo-constants'
import Icon from 'react-native-vector-icons/FontAwesome';




const Kategorie = (props) => {

    const { data, title } = props.route.params
    const phoneWidth = Dimensions.get('window').width

    const renderList = ((item) => {
        return (
            <Card style={styles.mycard}

                onPress={() => props.navigation.navigate("Content", { item })}
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
        <View style={{ marginTop: Constant.statusBarHeight }}>
            <View>
                <View style={{
                    height: 50,
                    alignItems: 'center',
                    backgroundColor: "white",
                    marginBottom: 1,
                    flexDirection: "row"

                }}>
                    <Icon name="arrow-left" size={28} color="black" style={{marginLeft:10}} onPress={() => props.navigation.goBack()}></Icon>
                    <View>
                        <Text style={{ marginLeft: 10, fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
                    </View>
                </View>
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
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0
    },
    maincolor: {
        color: '#86bce3'
    },
    kategorieStyle: {
        padding: 20
    }
})

export default Kategorie