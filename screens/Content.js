import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, FlatList, Alert ,ScrollView, Linking, TextInput, TouchableOpacity, Dimensions, Keyboard, TouchableWithoutFeedback} from 'react-native';
import { Card, Button } from 'react-native-paper'
import { useSelector } from 'react-redux'
import Constant from 'expo-constants'
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

const Content = (props) => {
    
    const [comment_content, setComment_content] = useState("")
    const [comment_list, setComment_list] = useState([])
    const { title, content, poster, poster_img, picture, createAt, _id, kategorie, checked, phone, number } = props.route.params.item
    const localhost = ((Platform.OS == 'android') ? 'http://10.0.2.2:3000/' : 'http://localhost:3000/')
    const {userData, login} = useSelector(state => ({
        userData: state.login.userData,
        login: state.login.login,
        trade: state.login.trade

    }))
    const phoneWidth = Dimensions.get('window').width

    const [tradestate,setTradestate] = useState(false)


    const [lovecolor,setLovecolor] = useState(false)
    
    const love ="#ed2415"
    const nonlove ="#000000"





    


    const submitData = () => {
        fetch(localhost + "comment", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: _id, //post_id
                comment_content,
                name: userData[0].name,
                comment_profile: userData[0].profile_img
            })
        })
            .then(res => res.json())
            .then(data => {
                Alert.alert('등록되었습니다.')
                setComment_content("")
                commentRender()
            })
            .catch(err => {
                Alert.alert("로그인이 필요합니다.")
            })

    }

    const loginAlert = () => {
        Alert.alert('로그인해주세요')
    }

    const lovefetch = () =>{
        fetch(localhost+"love-data", {
            method:"post",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name:userData[0].name,
                lovepost_name:poster,
                lovepost_title:title,
                lovepost_img:picture
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            Alert.alert('찜목록에 추가되었습니다.')
            setLovecolor(true)

        })
        .catch(err =>{
            Alert.alert("찜하기오류")
        })
    }
    
    const tradefetch = () =>{
        fetch(localhost + "trade-data", {
                method:"post",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name:userData[0].name,
                    post_name:poster,
                    post_title:title,
                    post_img:picture
                    
                })
            })
                .then(res => res.json())
                .then(data => {
                    
                    console.log(data)
                    Alert.alert('거래가 신청되었습니다.')
                    setTradestate(true)
                    
                    
                })
                .catch(err => {
                    Alert.alert("거래 오류")
                })
    }

    //goback 시에 값이 초기화가 다시되어버린다 searchvalue 초기화 안되도록 만들어야해


    const loveremove = () =>{
        fetch(localhost + "remove-love", {
            method:"post",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({                
                lovepost_title:title,
                
                
            })
        })
        .then(res => res.json())
        .then(data => {
            
            console.log(data)
            Alert.alert('좋아요가 취소 되었습니다')
            setLovecolor(false)
            
        })
        .catch(err => {
            Alert.alert("좋아요 취소오류")
        })
    }
    


    const traderemove = () =>{
        fetch(localhost + "remove-trade", {
            method:"post",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({                
                post_title:title,
                
                
            })
        })
        .then(res => res.json())
        .then(data => {
            
            console.log(data)
            Alert.alert('거래가 취소 되었습니다')
            setTradestate(false)
            
        })
        .catch(err => {
            Alert.alert("거래 취소오류")
        })
    }
    

    const openDial = () => {
        if (Platform.OS === "android") {
            Linking.openURL(`tel:${phone}`)
        } else {
            Linking.openURL(`telprompt:${phone}`)
        }
    }



    const commentRender = () => {
        fetch(localhost + "comment-data", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: _id,
            })
        })
            .then(res => res.json())
            .then(data => {
                setComment_list(data)
                console.log(data)
            })
            .catch(err => {
                Alert.alert("댓글 랜더링 오류")
            })
    }
    // useEffect(() => {
    //     setUser(userData[0].name)
    // },[user])
    useEffect(() => {
        commentRender()
    }, [])

    function lovelogin() {
        if(login == false) {
            return(<View>
            </View>)
        }else if(lovecolor == true) { 
            return(
                <Card style={{borderWidth:0.7, width:45, height:45, alignItems:'center', marginRight:20}}>
                <Icon name="heart" color={love} size={32}
                style={{padding:5}}
                onPress={()=>loveremove()}
               
                >
                
                </Icon>
                </Card>
            )
        }
        else return(
                <Card style={{borderWidth:0.7, width:45, height:45, alignItems:'center', marginRight:20}}>
                <Icon name="heart-o" color={nonlove} size={32} 
                style={{padding:5}}
                onPress={()=>lovefetch()}
                >
                    
                </Icon>
                </Card>
        )
    }
   
    function tradelogin() {
        if(login == false){
            return(<View/>)
        }else if(tradestate == true) {
        return(
                <Button 
                theme={tradetheme}
                style={{borderColor:'red', borderWidth:0.7,width:45, height:45, alignItems:'center', justifyContent:'center'}}
                onPress={()=>traderemove()}
                
                >
                    <Text>취소</Text>
                </Button>
        )
        }
        else return(       
                <Button 
                theme={tradetheme}
                style={{borderColor:'black', borderWidth:0.7, width:45, height:45, alignItems:'center', justifyContent:'center'}}
                onPress={()=>tradefetch()}
                // onPress={async () => {
                //     await schedulePushNotification();
                //   }}
                >
                    <Text>교환</Text>
                </Button>
        )
        }


    const posterInformation = () => {
        fetch(localhost + "find-mylist", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                poster: poster,
            })
        })
            .then(res => res.json())
            .then(data => {
                props.navigation.navigate('PosterInformation', {data, poster, poster_img, phone})
            })
            .catch(err => {
                Alert.alert("포스터 정보 오류")
            })  
    }

    const commenterInformation = () => {
        fetch(localhost + "find-mylist", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                poster: comment_list[0].name,
            })
        })
            .then(res => res.json())
            .then(data => {
                const poster = data[0].poster
                const poster_img = data[0].poster_img
                const phone =  data[0].phone
                props.navigation.navigate('PosterInformation', {data, poster, poster_img, phone})
            })
            .catch(err => {
                Alert.alert("포스터 정보 오류")
            })  
    }

    const contentInformation = () =>{
        return(
            <View style={{flex:1}}>
            <Image
                source={{ uri: picture }}
                style={{
                    width: "100%",
                    height: 400
                }}
            />
            <Card style={[styles.mycard,{width:phoneWidth}]} onPress={()=>posterInformation()}>
                <View style={styles.cardview}>
                    <Image
                        style={{ width: 60, height: 60, borderRadius: 30, borderWidth:1, borderColor:'gray' }}
                        source={{ uri: poster_img }}
                    />
                    <View style={{ flexDirection:'row' }}>
                        <View style={{marginLeft: 10, justifyContent: 'center', width:(phoneWidth-100)/2}}>
                            <Text style={[styles.text, { fontWeight: 'bold' }]} >{poster}</Text>
                        </View>
                        
                        <View style={{flexDirection:'row', alignItems:'center',justifyContent:'center', width:(phoneWidth-100)/2}}>
                            {lovelogin()}
                            {tradelogin()}
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                        </View>
                    </View>
                </View>
            </Card>
            <Card style={styles.mycard}>
                <Text style={styles.posterTitle}>{title}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Text style={styles.posterCreateAt}>{kategorie}</Text>
                    <Text style={styles.posterCreateAt}>{checked}</Text>
                    <Text style={styles.posterCreateAt}>수량: {number}</Text>
                    <Text style={styles.posterCreateAt}>{createAt}</Text>
                </View>
                <Text style={styles.posterContent}>{content}</Text>
            </Card>
            <Card>
                <View style={styles.cardview}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>댓글({comment_list.length})</Text>
                </View>
            </Card>
        </View>
        )
    }

    const footerComment = () => {
        return(

            <Card style={styles.mycard}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TextInput
                        style={styles.inputStyle}
                        value={comment_content}
                        onChangeText={text => setComment_content(text)}
                    />
                    <Button
                        style={{backgroundColor: '#5397c9', borderRadius: 30, margin: 10}}
                        theme={commenttheme}
                        onPress={() => login == true ? submitData() : loginAlert()}
                    >
                        작성
                </Button>
                </View>
            </Card>
        )
    }

    const renderList = ((item) => {
        return (
            <Card style={styles.mycard} >
                <View style={styles.cardview}>
                    <View style={{ flexDirection:'row' }}>
                        <View>
                            <TouchableOpacity onPress={()=>commenterInformation()}>
                                <Image source={{uri: item.comment_profile}} style={{width:50, height:50, borderRadius:25, borderWidth:1, borderColor:'gray'}}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginLeft:10, width:phoneWidth -90}}>
                            <Text style={{ fontSize:14, fontWeight:'bold'}} onPress={()=>commenterInformation()}>{item.name}</Text>
                            <Text style={{ fontSize: 12, marginTop: 5 }} >{item.comment_content}</Text>
                            <Text style={{ fontSize: 12, marginTop: 5, color: 'gray'}} >{item.createAt}</Text>
                        </View>
                    </View>
                </View>
            </Card>
        )
    })

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <FlatList
                    data={comment_list}
                    renderItem={({ item }) => {
                        return renderList(item)
                    }}
                    keyExtractor={item => item._id}
                    ListHeaderComponent={contentInformation()}
                    ListFooterComponent={footerComment()}
                />
                </ScrollView>
                <View style={{ flexDirection: 'row' }}>
                    <Button style={[styles.footerStyle, { backgroundColor: 'white', padding: 5 }]} onPress={() => props.navigation.navigate('Chat')}>
                        <Text style={[styles.footerText, { color: 'black' }]}>채팅하기</Text>
                    </Button>
                    <Button style={[styles.footerStyle, { backgroundColor: '#5397c9', padding: 5 }]} onPress={() => openDial()}>
                        <Text style={[styles.footerText, { color: 'white' }]}>전화걸기</Text>
                    </Button>
                </View>
            
            <Icon name="arrow-left" size={28} color="black" style={{ width: 30, height: 30, position: 'absolute', top: 40, left: 10 }} onPress={() => props.navigation.goBack()}></Icon>
        </View>

    )
}
const tradetheme = {
    colors: {
        primary: "black"
    }
}
const commenttheme = {
    colors: {
        primary: "white"
    }
}

const theme = {
    colors: {
        primary: "#006aff"
    }
}

const styles = StyleSheet.create({
    mycard: {
        marginBottom: 1,

    },
    cardview: {
        flexDirection: "row",
        padding: 10
    },
    text: {
        fontSize: 14,

    },
    inputStyle: {
        width: '75%',
        marginLeft: 10,
        borderWidth:1,
        margin: 10,
        borderRadius: 10,
        borderColor: '#5397c9'
    },
    posterTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 10,
        marginTop: 25

    },
    posterCreateAt: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#919191',
        marginLeft: 10
    },
    posterContent: {
        fontSize: 18,
        margin: 15,
    },
    // commentBtn: {
    //     backgroundColor: '#006aff',
    //     width: 50,
    //     height: 60
    // },
    cardContent: {
        flexDirection: "row",
        padding: 8
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
export default Content




// //게시글만들때 유저네임을 스트링으로 저장되게 해야함 그 버튼을 또 해당 유저볼수있게


// //저장이 되어버린단 말이지…boardData[0]번지에 처음 눌린게..

// //교유 url을 게시물마다 줘야하나..

// //컴포넌트 줜 ㅗ나 주자



// //게시글만들때 유저네임을 스트링으로 저장되게 해야함 그 버튼을 또 해당 유저볼수있게


// //저장이 되어버린단 말이지…boardData[0]번지에 처음 눌린게..

// //교유 url을 게시물마다 줘야하나..

// //컴포넌트 줜 ㅗ나 주자