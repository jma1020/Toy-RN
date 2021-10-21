import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, Alert, Platform, KeyboardAvoidingView } from 'react-native';
import { TextInput, Button,Card } from 'react-native-paper';
import Constant from 'expo-constants'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/FontAwesome5';



function SignUpagree(props) {


    const [check1,setCheck1] = useState(false)
    const [check2,setCheck2] = useState(false)
    const [check3,setCheck3] = useState(false)
    const [check4,setCheck4] = useState(false)

    return (
        <View style={{marginTop:Constant.statusBarHeight,flex:1}}>
                
            <View style={{flex:2,borderWidth:2,justifyContent:'center',alignItems:'center'}}>
            <Icon2 name="close" size={20} 
                style={{position:'absolute' ,top:10,right:15}}
                onPress={() => props.navigation.navigate("Login")}
            />
                <View style={{flexDirection:'row'}}>
                <Icon2 name="checkcircle" size={30} style={styles.icon} />
                <Icon2 name="lock1" size={30} style={styles.icon} color={'#8c8c8c'}/>
                <Icon2 name="lock1" size={30} style={styles.icon} color={'#8c8c8c'}/>
                </View>
                <View style={styles.agreetext}>
                    <Text style={{fontSize:20, fontWeight:'bold'}}>약관동의</Text>
                </View>
            </View>
            <View style={{flex:1,borderWidth:2,justifyContent:'center',alignItems:'center'}}>
                <Button style={{backgroundColor:'black'}}
                onPress={()=>props.navigation.navigate("SignUp")}
                 >
                    
                        <Icon name="check" size={20} color={'#ffffff'} style={{}}/>
                        <Text style={{color:'white'}}>
                            동의합니다
                        </Text>
                    
                </Button>
            </View>
            <View style={{flex:4,borderWidth:2,marginTop:20}}>
                <View style={{margin:10}}>
                <View style={{flexDirection:"row"}}> 
                    {check1 ? 
                    <Icon2 name="checkcircle" size={30} color={'#ff592b'} style={styles.icon} 
                    onPress={() => setCheck1(false)} />
                    :
                    <Icon2 name="checkcircle" size={30} color={'#bababa'} style={styles.icon}
                    onPress={() => setCheck1(true)} />
                    }
                    <View style={styles.checkText}>
                        <Text style={styles.checkTitle}>
                            약관에 동의해라
                        </Text>
                        <Text>
                            몬내용이냐면 이건야매야
                        </Text>
                    </View>
                </View>
                <View style={{flexDirection:"row"}}> 
                    {check2 ? 
                    <Icon2 name="checkcircle" size={30} color={'#ff592b'} style={styles.icon} 
                    onPress={() => setCheck2(false)} />
                    :
                    <Icon2 name="checkcircle" size={30} color={'#bababa'} style={styles.icon}
                    onPress={() => setCheck2(true)} />
                    }
                    <View style={styles.checkText}>
                        <Text style={styles.checkTitle}>
                            약관에 동의해라
                        </Text>
                        <Text>
                            몬내용이냐면 이건야매야
                        </Text>
                    </View>
                </View>
                <View style={{flexDirection:"row"}}> 
                    {check3 ? 
                    <Icon2 name="checkcircle" size={30} color={'#ff592b'} style={styles.icon} 
                    onPress={() => setCheck3(false)} />
                    :
                    <Icon2 name="checkcircle" size={30} color={'#bababa'} style={styles.icon}
                    onPress={() => setCheck3(true)} />
                    }
                    <View style={styles.checkText}>
                        <Text style={styles.checkTitle}>
                            약관에 동의해라
                        </Text>
                        <Text>
                            몬내용이냐면 이건야매야
                        </Text>
                    </View>
                </View>
                <View style={{flexDirection:"row"}}> 
                    {check4 ? 
                    <Icon2 name="checkcircle" size={30} color={'#ff592b'} style={styles.icon} 
                    onPress={() => setCheck4(false)} />
                    :
                    <Icon2 name="checkcircle" size={30} color={'#bababa'} style={styles.icon}
                    onPress={() => setCheck4(true)} />
                    }
                    <View style={styles.checkText}>
                        <Text style={styles.checkTitle}>
                            약관에 동의해라
                        </Text>
                        <Text>
                            몬내용이냐면 이건야매야
                        </Text>
                    </View>
                </View>
                </View>
            </View>
        </View>
    )
    
}
const styles=StyleSheet.create({
    agreetext:{
        margin:10,
    },
    icon:{
        margin:7
    },
    checkText:{
        flexDirection:'column',
        marginBottom:8
    },
    checkTitle:{
        fontWeight:'bold',
        fontSize:20  ,
        marginTop:3
    }
})

export default SignUpagree