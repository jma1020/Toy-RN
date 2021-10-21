import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, Alert, Platform, KeyboardAvoidingView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const TestHome = (props) => {

    const {name} = props.route.params
    return(
        <View>
        <Text>{name}</Text>
        </View>
    )
}

export default TestHome