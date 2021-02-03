import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { firebase } from '../firebase/config';


export default function RegisterScreen({navigation,setShowLoginScreen}) {
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showError, setShowError] = useState(false)
    const [error, setError] = useState('')

    const onFooterLinkPress = () => {
        setShowLoginScreen(true)
    }

    const onRegisterPress = () => {

        if (password !== confirmPassword) {
            alert("Passwords don't match.")
            return
        }
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid

                const data = {
                    id: uid,
                    email,
                    displayName,
                    password
                };
                response.user.updateProfile({
                    displayName: displayName
                });
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {
                        setShowLoginScreen(true)
                    })
                    .catch((error) => {
                        //alert(error)
                        setError(error.message)
                        setShowError(true)
                    });
            })
            .catch((error) => {
                //alert(error)
                setError(error.message)
                setShowError(true)
        });
    }

    return (
        
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../images/fond1.png')}
                />
                <View style={styles.containerInput}>
                    <Image 
                        style={styles.logo2}
                        source={require('../images/logo.png')}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Pseudo'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setDisplayName(text)}
                        value={displayName}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='E-mail'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        secureTextEntry
                        placeholder='Mot de passe'
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        secureTextEntry
                        placeholder='Confirmez le mot de passe'
                        onChangeText={(text) => setConfirmPassword(text)}
                        value={confirmPassword}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                        {
                            showError &&
                            <Text style={{ "color": "red" }}>{error}</Text>
                        }
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => onRegisterPress()}>
                        <Text style={styles.buttonTitle}>Créer un compte</Text>
                    </TouchableOpacity>
                    <View style={styles.footerView}>
                        <Text style={styles.footerText}>Compte déjà existant? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Se connecter</Text></Text>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    title: {

    },
    containerInput: {
        height: 500,
        width: "100%",
        backgroundColor: 'whitesmoke',
        marginTop: -46,
        borderTopStartRadius: 60,
        borderTopEndRadius: 60,
        zIndex: 2
    },
    logo: {
        flex: 1,
        height: 250,
        width: "100%",
        alignSelf: "center",
    },
    logo2: {
        height: 30,
        width: 100,
        marginTop: 40,
        marginBottom: 30,
        alignSelf: "center"
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
    button: {
        backgroundColor: 'rgba(255,140,0,0.8)',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: "rgb(255,140,0)",
        fontWeight: "bold",
        fontSize: 16
    }
})