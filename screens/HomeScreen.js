import React,{useEffect} from 'react'
import { StyleSheet, Text, View, Image, FlatList, Alert } from 'react-native';
import Chat from './Chat'
import Set from './Set'
import MyInformation from './MyInformation'
import Home from './/Home'
import CreateEmployee from './CreateEmployee'
import Profile from './Profile'
import SignUp from './SignUp'
import Login from './Login'
import TestHome from './TestHome'
import Location from './Location'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux'

const Tab = createBottomTabNavigator();




function HomeScreen() {

    const mycolor="#5397c9"
    const login = useSelector(state => state.login.login)
    // const { login } = useSelector((state) => {
    //     return state
    // })
    function confirm() {
        if(login == false){
            return(
                <Tab.Screen
                name="Login"
                component={Login}
                options={{
                    tabBarLabel: '로그인',
                    tabBarIcon: () => (
                        <Icon name="user-plus" size={26} color={'black'}/>
                    )
                }}
            />
            )
        }
        else {
            return(
                <Tab.Screen
                name="MyInformation"
                component={MyInformation}
                options={{
                    tabBarLabel: '내 정보',
                    tabBarIcon: () => (
                        <Icon name="user" size={26} color={'black'}/>
                    )
                }}
            />
            )
        }
    }

    
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor:"black",
                activeBackgroundColor:"#5397c9"
                
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
            
                options={{
                    tabBarLabel: '홈',
                    tabBarIcon: () => (
                        <Icon name="home" size={26} color={'black'}/>
                    )
                }}
            />
            <Tab.Screen
                name="Chat"
                component={Chat}
                options={{
                    tabBarLabel: '체팅',
                    tabBarIcon: () => (
                        <Icon name="commenting-o" size={26} color={'black'} />
                    )
                }}
            />
            <Tab.Screen
                name="Set"
                component={Set}
                options={{
                    tabBarLabel: '글쓰기',
                    tabBarIcon: () => (
                        <Icon name="pencil" size={26} color={'black'} />
                    )
                }}
            />
            {confirm()}
            
        </Tab.Navigator>

    )
}


export default HomeScreen

// screenOptions={({route}) => ({
//     tabBarIcon:({focused}) => {
//         let iconName;

//         if (route.name== 'Login') {
//             iconName = focused ? ''
//         }
//     }

// })}
// '#f7d460'
// tabBarOptions={{
//     activeTintColor:"#f7d460"
// }}