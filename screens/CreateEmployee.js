import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Modal, Alert, KeyboardAvoidingView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';




const CreateEmployee = ({ navigation, route }) => {

    const getDetails = (type) => {
        if (route.params) {
            switch (type) {
                case "name":
                    return route.params.name
                case "phone":
                    return route.params.phone
                case "email":
                    return route.params.email
                case "salary":
                    return route.params.salary
                case "picture":
                    return route.params.picture
                case "position":
                    return route.params.position
            }
        }
        return ""
    }

    const [name, setName] = useState(getDetails("name"))
    const [phone, setPhone] = useState(getDetails("phone"))
    const [email, setEmail] = useState(getDetails("email"))
    const [salary, setSalary] = useState(getDetails("salary"))
    const [picture, setPicture] = useState(getDetails("picture"))
    const [position, setPosition] = useState(getDetails("position"))
    const [modal, setModal] = useState(false)
    const [enableshift, setenableShift] = useState(false)

    const submitData = () => {
        fetch("http://10.0.2.2:3000/send-data", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                salary,
                picture,
                position
            })
        })
            .then(res => res.json())
            .then(data => {
                Alert.alert(`${data.name} is save success`)
                navigation.navigate("Home")
            })
            .catch(err => {
                Alert.alert("something wend wrong")
            })
    }

    const updateDetails = () => {
        fetch("http://10.0.2.2:3000/update", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: route.params._id,
                name,
                email,
                phone,
                salary,
                picture,
                position
            })
        })
            .then(res => res.json())
            .then(data => {
                Alert.alert(`${data.name} is updated success`)
                navigation.navigate("Home")
            })
            .catch(err => {
                Alert.alert("something wend wrong")
            })
    }

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

    const pickFromCamera = async () => {
        const { granted } = await Permissions.askAsync(Permissions.CAMERA)
        if (granted) {
            let data = await ImagePicker.launchCameraAsync({
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
        data.append('upload_preset', 'employeeApp')
        data.append("cloud_name", "dhvpehxpm")

        fetch("https://api.cloudinary.com/v1_1/dhvpehxpm/image/upload", {
            method: "post",
            body: data
        }).then(res => res.json()).
            then(data => {

                setPicture(data.url)
                setModal(false)
            }).catch(err => {
                Alert.alert("error while uploading")
            })
    }

    return (
        <KeyboardAvoidingView behavior="position" style={styles.root} enabled={enableshift}>
            <View >

                <TextInput
                    label='Name'
                    style={styles.inputStyle}
                    value={name}
                    theme={theme}
                    onFocus={() => setenableShift(false)}
                    mode="outlined"
                    onChangeText={text => setName(text)}
                />
                <TextInput
                    label='Email'
                    style={styles.inputStyle}
                    value={email}
                    theme={theme}
                    onFocus={() => setenableShift(false)}
                    mode="outlined"
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    label='phone'
                    style={styles.inputStyle}
                    value={phone}
                    theme={theme}
                    onFocus={() => setenableShift(false)}
                    keyboardType="number-pad"
                    mode="outlined"
                    onChangeText={text => setPhone(text)}
                />
                <TextInput
                    label='salary'
                    style={styles.inputStyle}
                    value={salary}
                    theme={theme}
                    onFocus={() => setenableShift(true)}
                    mode="outlined"
                    onChangeText={text => setSalary(text)}
                />
                <TextInput
                    label='position'
                    style={styles.inputStyle}
                    value={position}
                    theme={theme}
                    onFocus={() => setenableShift(true)}
                    mode="outlined"
                    onChangeText={text => setPosition(text)}
                />
                <Button
                    style={styles.inputStyle}
                    theme={theme}
                    icon={picture == "" ? "upload" : "check"}
                    mode="contained"
                    onPress={() => setModal(true)}>
                    upload image
                </Button>
                {route.params ?
                    <Button
                        style={styles.inputStyle}
                        theme={theme}
                        icon="content-save"
                        mode="contained"
                        onPress={() => updateDetails()}>
                        Update Details
                    </Button>
                    :
                    <Button
                        style={styles.inputStyle}
                        theme={theme}
                        icon="content-save"
                        mode="contained"
                        onPress={() => submitData()}>
                        Save
                    </Button>
                }


                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modal}
                    onRequestClose={() => {
                        setModal(false)
                    }}
                >
                    <View style={styles.modalView}>
                        <View style={styles.modalButtonView}>
                            <Button icon="camera"
                                theme={theme}
                                mode="contained"
                                onPress={() => pickFromCamera()}>
                                camera
                            </Button>
                            <Button icon="image-area"
                                theme={theme}
                                mode="contained"
                                onPress={() => pickFromGallery()}>
                                gallery
                            </Button>
                        </View>
                        <Button
                            theme={theme}
                            onPress={() => setModal(false)}>
                            cancel
                        </Button>
                    </View>
                </Modal>

            </View>
        </KeyboardAvoidingView>
    )

}

const theme = {
    colors: {
        primary: "#006aff"
    }
}


const styles = StyleSheet.create({
    root: {
        flex: 10
    },
    inputStyle: {
        margin: 5
    },
    modalView: {
        position: "absolute",
        bottom: 2,
        width: "100%",
        backgroundColor: "white"

    },
    modalButtonView: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10

    }
})

export default CreateEmployee