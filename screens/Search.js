import React ,{useState} from'react'
import { StyleSheet, Text, View, Image, FlatList, Alert ,TextInput ,ScrollView,TouchableOpacity} from 'react-native';
import { Button, Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/Entypo'
import Icon4 from 'react-native-vector-icons/FontAwesome5';
import Icon5 from 'react-native-vector-icons/MaterialIcons';
import Icon6 from 'react-native-vector-icons/SimpleLineIcons';
import Icon7 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon8 from 'react-native-vector-icons/AntDesign';
import Icon9 from 'react-native-vector-icons/Octicons';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Constant from 'expo-constants'
import {useSelector} from 'react-redux'


const Search = (props,{navigation}) =>{

    const localhost = ((Platform.OS == 'android') ? 'http://10.0.2.2:3000/' : 'http://localhost:3000/')

    const {data,loading} = useSelector((state)=>{
        return state
    })
    const [value,setValue] = useState('')
    const [searchvalue,setSearchvalue] = useState('')
    // const Tab = createMaterialTopTabNavigator();
    const All ='전체에서'
    
    function check(){
        if(searchvalue.length === 0){
            return(
            <TextInput 
            style={{
                width:"80%",
                
                backgroundColor:"#e6e6e6"
            }}
            value={value}
            onChangeText={(text)=>setValue(text)}
            placeholder={'전체에서'}
            />
            )
        }
        else {
            return(
            <TextInput 
            style={{
                width:"80%",
                
                backgroundColor:"#e6e6e6"
            }}
            value={value}
            onChangeText={(text)=>setValue(text)}
            placeholder={searchvalue+'에서'}
            />
            )
        }
    }

    const fetchtitle = () => {
        if(searchvalue.length === 0){
            fetch(localhost + "find-title", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                title:value
                })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setValue('')         
                    props.navigation.navigate("SearchTest",{data,searchvalue})
                    
                }).catch(err => {
                    Alert.alert("에러!123213")
                })
        }
        else {
            fetch(localhost + "find-kategorie", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  title:value,
                  kategorie:searchvalue
                })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)   
                    setValue('') 
                    setSearchvalue('')     
                    props.navigation.navigate("SearchTest",{data,searchvalue})
                }).catch(err => {
                    Alert.alert("없는자료 입니다")
                })
        
        }
    }



    const renderList = ((item) => {
        return (
            
            <Card style={styles.mycard}

                onPress={() => props.navigation.navigate("Content", { item })}
            >
                <View style={styles.cardview}>
                    <Image
                        style={{ width: 60, height: 60,borderRadius:30}}
                        source={{ uri: item.picture }}
                    />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={styles.text} >{item.title}</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text style={[styles.text,{fontSize: 10, marginTop: 10}]} >{item.poster}</Text>
                            <Text style={[styles.text,{fontSize: 10, marginTop: 10, marginLeft:30}]} >{item.createAt}</Text>
                        </View>
                    </View>
                </View>
            </Card>
        )
    })

    return (

        <View style={{flex:1,marginTop:Constant.statusBarHeight,}}>

  

            <View style={{
                padding:5,
                flexDirection:"row",
                justifyContent:"space-around",
                elevation:5,
                backgroundColor:"white",
                
            }}>
                <Icon name="arrow-left" size={30} color={'#6b6c6e'} style={{}} 
                onPress = {() => props.navigation.goBack()}>
                </Icon>
                
                {check()}
                <Icon3 name="magnifying-glass" size={30} color={'#6b6c6e'}
                onPress={()=> fetchtitle()}
                />
            </View>
            
        <View style={{flex:1,flexDirection:'column',marginTop:20}}>
            <Text style={{marginLeft:20,marginBottom:10,fontSize:20}}>카테고리</Text>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginLeft:20,marginRight:20}}>
                    <TouchableOpacity style={{ width: 80, justifyContent: 'center', alignItems: 'center', }}  onPress={()=> setSearchvalue('')}>
                        <View style={{width: 80, height: 80, backgroundColor: 'rgb(242,242,242)', justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                    style={{ width: '100%', height: '100%',  }}
                                    source={require('../assets/mnuu.png')}
                                />
                        </View>
                            <Text style={{ }}>전체</Text>
                    </TouchableOpacity>   
                    
                    <TouchableOpacity style={{ width: 80, justifyContent: 'center', alignItems: 'center', }}  onPress={()=> setSearchvalue('장난감')}>
                        <View style={{width: 80, height: 80, backgroundColor: 'rgb(242,242,242)', justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                    style={{ width: '100%', height: '100%',  }}
                                    source={require('../assets/car.png')}
                                />
                        </View>
                            <Text style={{ }}>장난감</Text>
                    </TouchableOpacity>                     
                    <TouchableOpacity style={{ width: 80, justifyContent: 'center', alignItems: 'center', }}  onPress={()=> setSearchvalue('인형')}>
                        <View style={{width: 80, height: 80, backgroundColor: 'rgb(242,242,242)', justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                    style={{ width: '100%', height: '100%',  }}
                                    source={require('../assets/toy.png')}
                                />
                        </View>
                            <Text style={{ }}>인형</Text>
                    </TouchableOpacity> 
                    {/* <Card onPress={()=> setSearchvalue('토이')}>
                        <View style={{borderRadius:70,width:48,justifyContent:'center',alignItems:'center'}}>
                            <Icon9 name="rocket" size={40} />
                        </View>
                        <Text style={{fontSize:13,textAlign:'center'}}>토이</Text>
                    </Card> */}
                </View>

                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:20,marginLeft:20,marginRight:20}}>
                <TouchableOpacity style={{ width: 80, justifyContent: 'center', alignItems: 'center', }}  onPress={()=> setSearchvalue('도서')}>
                        <View style={{width: 80, height: 80, backgroundColor: 'rgb(242,242,242)', justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                    style={{ width: '100%', height: '100%',  }}
                                    source={require('../assets/booo.png')}
                                />
                        </View>
                            <Text style={{ }}>도서</Text>
                    </TouchableOpacity> 
                    <TouchableOpacity style={{ width: 80, justifyContent: 'center', alignItems: 'center', }}  onPress={()=> setSearchvalue('소품')}>
                        <View style={{width: 80, height: 80, backgroundColor: 'rgb(242,242,242)', justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                    style={{ width: '100%', height: '100%',  }}
                                    source={require('../assets/milk.png')}
                                />
                        </View>
                            <Text style={{ }}>소품</Text>
                    </TouchableOpacity> 
                    <TouchableOpacity style={{ width: 80, justifyContent: 'center', alignItems: 'center', }}  onPress={()=> setSearchvalue('의류')}>
                        <View style={{width: 80, height: 80, backgroundColor: 'rgb(242,242,242)', justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                    style={{ width: '100%', height: '100%',  }}
                                    source={require('../assets/dresss.png')}
                                />
                        </View>
                            <Text style={{ }}>의류</Text>
                    </TouchableOpacity> 
                </View>

            
        </View>  
            <View style={{flex:2,marginTop:50,justifyContent:'center',alignItems:'center'}}>
                
                <Image 
                style={{width:'100%',height:'75%'}}
                source={require('../assets/town.png')}/>
               
            </View>
            
        </View>

    )
    
    function PostSearch() {
        return (
            <View>
            <FlatList
                data={data}
                renderItem={({ item }) => {
                    return renderList(item)
                }}
                keyExtractor={item => item._id}
              
                refreshing={loading}
            />
            </View>
        )
    }
    function UserSearch() {
        return (
            <View>
                <Text>gdgd</Text>
            </View>
        )
    }
}

const theme = {
    colors: {
        primary: "#ffffff"
    }
}
const style = StyleSheet.create({
	container: {
		paddingTop: Platform.OS === `ios` ? 0 : Expo.Constants.statusBarHeight,
	}
});
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


export default Search