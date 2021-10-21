import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';



import Navigation from './Navigation'
import TestNav from './TestNav'


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers/index'
import {persistStore, persistReducer} from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage' 
import {createLogger} from 'redux-logger'
import {PersistGate} from 'redux-persist/es/integration/react'

import Login from './screens/Login'
import Home from './screens/Home'
const persistConfig = {
  key:'root',
  storage: AsyncStorage,
  whitelist: ['login','postList']
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
console.disableYellowBox = true

const store = createStore(
  persistedReducer
)

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const persistedStore = persistStore(store)


export default function App(props) {
  return (
    <Provider store={store} >
      <PersistGate persistor={persistedStore} loading={null}>
      <Navigation />
      </PersistGate>
    </Provider>
  );
}