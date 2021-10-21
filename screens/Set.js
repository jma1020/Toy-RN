import React, { useState,useEffect } from 'react'
import { StyleSheet, Text, View, Image, FlatList, Alert ,ImageBackground,ScrollView,} from 'react-native';
import {Picker} from '@react-native-picker/picker'
import { TextInput, Button,RadioButton,Card } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import Constant from 'expo-constants'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const Set = (props) => {
    const localhost = ((Platform.OS == 'android') ? 'http://10.0.2.2:3000/' : 'http://localhost:3000/')

    const {userData, login} = useSelector(state => ({
        userData: state.login.userData,
        login: state.login.login
    }))

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [picture, setPicture] = useState("")
    const [checked,setChecked] = useState('미개봉')
    const [kategorie, setKategorie] = useState("도서")
    
    const [number, setNumber] = useState("")

    // useEffect(() => {
    //     confirm()
    // }, [login])

    const pickFromGallery = async () => {
        const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if (granted) {
            let data = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5
            })
            if (!data.cancelled) {
                let newfile = {
                    uri: data.uri,
                    type: `test/${data.uri.split(".")[1]}`,
                    name: `test.${data.uri.split(".")[1]}`

                }
                handleUpload(newfile)
            }
        } else {
            Alert.alert("you need to give up permission to work")
        }
    }

    const handleUpload = (image) => {
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', 'ToyShareApp')
        data.append("cloud_name", "toyshare")

        fetch("https://api.cloudinary.com/v1_1/toyshare/image/upload", {
            method: "post",
            body: data
        }).then(res => res.json()).
            then(data => {
                setPicture(data.url)
            }).catch(err => {
                Alert.alert("error while uploading")
            })
    }

    

    function appandImage(){
        if(picture){
            return(
                <Image
                    style={{ width: 60, height: 60, borderRadius: 30 }}
                    source={{ uri: picture }}
                />
            )
        }
    }

    function confirm() {
        if (login == false) {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ImageBackground source={require('../assets/loginimg.png')}  style={{width:'100%',height:'75%'}} />
                    <Text style={{ textAlign: 'center', fontSize: 30 }}>로그인이필요합니다.</Text>
                </View>
            )
        }
        else {
            const [phone, setPhone] = useState(userData[0].phone)
            const submitData = () => {
                fetch(localhost + "post-data", {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title,
                        content,
                        picture,
                        poster: userData[0].name,
                        poster_img: userData[0].profile_img,
                        // poster_favorite,
                        kategorie,
                        checked,
                        phone,
                        number
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        setTitle("")
                        setContent("")
                        setPicture("")
                        setKategorie("도서"),
                        setNumber("")
                        setChecked('미개봉')
                        Alert.alert("등록되었습니다.")
                        props.navigation.navigate("Home")
                    }).catch(err => {
                        Alert.alert("에러!")
                    })
            }
            
            return (
                <View style={[styles.root,{marginTop:Constant.statusBarHeight}]}>
                    {/* <View>
                        <View style={{
                            marginTop: Constant.statusBarHeight,
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
                                <Text style={{ marginTop: 10, marginLeft: 15, fontSize: 18 }}>게시글 작성</Text>
                            </View>
                            <View>
                                <Text style={{ marginTop: 10, marginRight: 15, fontSize: 18 }} onPress={() => submitData()}>완료</Text>
                            </View>
                        </View>
                    </View> */}
                    <View>
                        <View style={{
                            height: 50,
                            alignItems:'center',
                            justifyContent:'space-between',
                            backgroundColor: "white",
                            marginBottom:1,
                            flexDirection: "row"

                        }}>
                            <View style={{}}>
                                <Text style={{marginLeft: 20, fontSize: 18, fontWeight:'bold' }}>게시글 작성</Text>
                            </View>
                            <View>
                                <Text style={{marginRight: 20, fontSize: 18, fontWeight:'bold' }} onPress={() => submitData()}>완료</Text>
                            </View>
                        </View>
                    </View>
                    <ScrollView>
                        <Card>
                            <View style={{flexDirection:"row",margin:10}}>
                            <Icon2
                                name="camera-plus-outline"
                                size={50}
                                color={'#919191'}
                                style={{marginRight:10}}
                                onPress={() => pickFromGallery()}
                            />
                                
                            
                            {appandImage()}
                            </View>
                        </Card>
                        <Card>
                            <TextInput
                                label='제목'
                                style={styles.inputStyle}
                                value={title}
                                theme={theme}
                                mode="outlined"
                                onChangeText={text => setTitle(text)}
                            />
                        </Card>
                        <Card>
                    <View style={{justifyContent:'center', marginBottom: 100}}>
                        <Picker
                            selectedValue={kategorie}
                            style={{height:50, width:'100%', marginBottom:50}}
                            onValueChange={(itemValue, itemIndex) => 
                            setKategorie(itemValue)}
                        >
                            <Picker.Item label='장난감' value='장난감'/>
                            <Picker.Item label='인형' value='인형'/>
                            <Picker.Item label='도서' value='도서'/>
                            <Picker.Item label='의류' value='의류'/>
                            <Picker.Item label='소품' value='소품'/>
                    </Picker>
                    </View>
                    </Card>
                    <Card>
                    <View style={{justifyContent:'space-around',alignItems:'center',flexDirection:'row',marginRight:10}}>
                    <View style={{flexDirection:'row',margin:10}}>
                    <RadioButton
                        value="미개봉"
                        status={ checked === '미개봉'? 'checked':'unchecked'}
                        color={'#7eff61'}
                        onPress={()=>setChecked('미개봉')}
                    /> 
                    <Text style={{marginTop:8}} onPress={()=>setChecked('미개봉')}>
                        미개봉
                    </Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                    <RadioButton
                        value="거의 새것"
                        status={ checked === '거의 새것'? 'checked':'unckecked'}
                        color={'#7eff61'}
                        onPress={()=> setChecked('거의 새것')}
                    />
                    <Text style={{marginTop:8}} onPress={()=> setChecked('거의 새것')}>
                        거의 새것
                    </Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                    <RadioButton
                        value="중고"
                        status={ checked === '중고'? 'checked':'unckecked'}
                        color={'#7eff61'}
                        onPress={()=> setChecked('중고')}
                    />
                    <Text style={{marginTop:8}} onPress={()=> setChecked('중고')}>
                        중고
                    </Text>
                    </View>
                    </View>
                    </Card>
                    <Card>
                    <TextInput style={styles.inputStyle}
                        label='연락처'
                        value={phone}
                        theme={theme}
                        mode="outlined"
                        onChangeText={text => setPhone(text)}
                    />    
                    </Card>
                    <Card>
                    <TextInput style={styles.inputStyle}
                        label='수량'
                        placeholder='숫자만 입력해주세요.'
                        value={number}
                        theme={theme}
                        mode="outlined"
                        onChangeText={text => setNumber(text)}
                    />    
                    </Card>
                    <Card>
                    <TextInput
                        label='내용'
                        style={[styles.inputStyle, styles.inputContent]}
                        multiline={true}
                        numberOfLines={10}
                        value={content}
                        theme={theme}
                        mode="outlined"
                        onChangeText={text => setContent(text)}
                    />
                    </Card>
                    </ScrollView>
                </View>
            )
        }
    }

    return (
        confirm()
    )
}

const mycolor = "#fcc792"
const theme = {
    colors: {
        primary: "#5397c9"
    }
}
const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    inputStyle: {
        margin: 10,
        fontSize: 18,
        
    },
    inputContent: {
        maxHeight: 600
    }
})

export default Set