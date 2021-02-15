import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet, SafeAreaView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RegisterScreen } from '.';

import { firebase } from '../firebase/config';

export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [showError, setShowError] = useState(false)
    const [showLoginScreen, setShowLoginScreen] = useState(true)

    const onFooterLinkPress = () => {
        setShowLoginScreen(false)
    }

    const onLoginPress = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .get()
                    .then(firestoreDocument => {
                        if (!firestoreDocument.exists) {
                            alert("User does not exist anymore.")
                            return;
                        }
                        const user = firestoreDocument.data()
                        navigation.navigate('Home', {user})
                    })
                    .catch(error => {
                        //alert(error)
                        setError(error.message)
                        setShowError(true)
                    });
            })
            .catch(error => {
                //alert(error)
                setError(error.message)
                setShowError(true)
            })
    }

    return (
        <SafeAreaView style={styles.container}>
            { showLoginScreen ?
                <KeyboardAwareScrollView
                    style={{ flex: 1, width: '100%' }}
                    keyboardShouldPersistTaps="always">
                    <Image
                        style={styles.logo}
                        source={require('../images/fond_co.png')}
                        blurRadius={0.34}
                    />
                    <View style={styles.containerInput}>
                        <Image
                            style={styles.logo2}
                            source={require('../images/logo.png')}
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
                        {
                            showError &&
                            <Text style={{ "color": "red" }}>{error}</Text>
                        }
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => onLoginPress()}>
                            <Text style={styles.buttonTitle}>Se connecter</Text>
                        </TouchableOpacity>
                        <View style={styles.footerView}>
                            <Text style={styles.footerText}>Vous n'avez pas de compte? <Text onPress={onFooterLinkPress} style={styles.footerLink}>S'inscrire</Text></Text>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
                : <RegisterScreen setShowLoginScreen={setShowLoginScreen}/>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'whitesmoke'
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
    title: {

    },
    logo: {
        flex:1,
        height: 250,
        width: "100%",
        alignSelf: "center",
        zIndex: 1
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
        backgroundColor: 'rgba(29, 84, 84, 0.6)',
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
        fontSize: 14,
        color: '#2e2e2d'
    },
    footerLink: {
        color: "rgb(29, 84, 84)",
        fontWeight: "bold",
        fontSize: 16
    }
})