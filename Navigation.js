import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Contants from 'expo-constants'

import Home from './screens/Home'
import CreateEmployee from './screens/CreateEmployee'
import Profile from './screens/Profile'
import SignUp from './screens/SignUp'
import Login from './screens/Login'
import TestHome from './screens/TestHome'
import Chat from './screens/Chat'
import Set from './screens/Set'
import MyInformation from './screens/MyInformation'
import HomeScreen from './screens/HomeScreen'
import Content from './screens/Content'
import Header from './screens/Header'
import Search from './screens/Search'
import MyEdit from './screens/MyEdit'
import SalesHistory from './screens/SalesHistory'
import MyPost from './screens/MyPost'
import Favorite from './screens/Favorite'
import SignUpagree from './screens/SignUpagree'
import SignUplast from './screens/SignUplast'
import Test from './screens/Test'
import SearchTest from './screens/SearchTest'
import Location from './screens/Location'
import Kategorie from './screens/Kategorie'
import PosterInformation from './screens/PosterInformation'
import UpdateProfile from './screens/UpdateProfile'
import Pushbell from './screens/Pushbell'
import realtest from './screens/realtest'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Stack = createStackNavigator();

export default function Navigation() {
    return(
        <NavigationContainer>
            <View style={styles.container}>
      <Stack.Navigator 
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen
          name="Login"
          component={Login}
          // options={{ myOptions, title: "로그인" }}
        />
        <Stack.Screen
          component={HomeScreen}
          name="HomeScreen"
          // options={myOptions}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          // options={myOptions}
          
        />
        
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          // options={{ myOptions, title: "회원가입" }}
        />
        <Stack.Screen
          name="Create"
          component={CreateEmployee}
          // options={{ ...myOptions, title: "Create Employee" }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          // options={{ ...myOptions, title: "Profile" }}
        />
        <Stack.Screen
          name="Content"
          component={Content}
          // options={myOptions}
        />

        <Stack.Screen
          name="Search"
          component={Search}
          // options={myOptions}
        />
        <Stack.Screen
          name="MyEdit"
          component={MyEdit}
          // options={myOptions}
        />
        <Stack.Screen
          name="SalesHistory"
          component={SalesHistory}
          // options={myOptions}
        />
        <Stack.Screen
          name="MyPost"
          component={MyPost}
          // options={myOptions}
        />
        <Stack.Screen
          name="Favorite"
          component={Favorite}
          // options={myOptions}
        />
        <Stack.Screen
          name="MyInformation"
          component={MyInformation}
          // options={myOptions}
        />
        <Stack.Screen
          name="SignUpagree"
          component={SignUpagree}
          // options={myOptions}
        />
        <Stack.Screen
          name="SignUplast"
          component={SignUplast}
          // options={myOptions}
        />
        <Stack.Screen
          name="Test"
          component={Test}
          // options={myOptions}
        />
        <Stack.Screen
          name="SearchTest"
          component={SearchTest}
          // options={myOptions}
        />
        <Stack.Screen
          name="Location"
          component={Location}
          // options={myOptions}
        />
        <Stack.Screen
          name="Kategorie"
          component={Kategorie}
          // options={myOptions}
        />
        <Stack.Screen
          name="PosterInformation"
          component={PosterInformation}
          // options={myOptions}
        />
        <Stack.Screen
          name="UpdateProfile"
          component={UpdateProfile}
          // options={myOptions}
        />
        
      </Stack.Navigator>
    </View>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#e0e0e0',
  
    }
  });