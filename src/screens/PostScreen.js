import React, {useState, useEffect} from 'react'
import { Text, View, StyleSheet, Button, Image, TouchableOpacity, ImageBackground, TextInput } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScrollView } from 'react-native-gesture-handler';

import Card from '../components/Card.js';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { firebase } from '../firebase/config';

import {post} from '../Table/Post'

export default function PostScreen({navigation}) {
    const [state, setState] = useState({ myPost: [] });

    function open() {
        firebase.auth().signOut().then(()=>navigation.navigate('Login'))
    }

    
    return (
        <ImageBackground source={require('../images/fondBody.jpg')} style={styles.container} blurRadius={0.7}>
            <View style={styles.header}>
                <View style={styles.profil}>
                    <Image
                        style={styles.img}
                        source={require('../images/image.jpeg')}
                    />
                    <Text style={{ "color": "rgb(29, 84, 84)", "fontSize": 25, "fontStyle": "italic" }}>{ firebase.auth().currentUser.displayName}</Text>
                </View>
            </View>
            <View style={styles.body}>
                
                <ScrollView>
                   <KeyboardAwareScrollView
                    style={{ flex: 1, width: '100%' }}
                    keyboardShouldPersistTaps="always">

                    <View style={styles.containerInput}>
                        <TextInput
                            style={styles.input}
                            placeholder='E-mail'
                            placeholderTextColor="#aaaaaa"
                            onChangeText={(text) => setEmail(text)}
                            //value={email}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                        <TextInput
                            style={styles.input}
                            placeholderTextColor="#aaaaaa"
                            secureTextEntry
                            placeholder='Mot de passe'
                            onChangeText={(text) => setPassword(text)}
                           // value={password}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                        {/* {
                            showError &&
                            <Text style={{ "color": "red" }}>{error}</Text>
                        } */}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => onLoginPress()}>
                            <Text style={styles.buttonTitle}>Se connecter</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
                

                </ScrollView>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
       // resizeMode: "cover",
        justifyContent: "center"
    },
    header: {
        height: 100,
        paddingTop: 20,
        backgroundColor: "rgb(108, 97, 83)",
        opacity:0.87,
        justifyContent: 'space-between',
        flexDirection: "row",
    },
    profil: {
        width: 170,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    profilIcon: {
        width: 80,
        alignItems: "center",
        justifyContent: "center"
    },
    myIcon: {
        color: "whitesmoke",
        alignContent: "flex-end"
    },
    body: {
        flex: 1,
        backgroundColor: "rgb(108, 97, 83)",
        opacity:0.8,
    },
    body1: {

        
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    img: {
        width: 50,
        height: 50,
        borderRadius: 50
    },

})