import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, SafeAreaView } from 'react-native'
import { firebase } from '../firebase/config';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function NotifTabScreen() {
    
    return (
        <ImageBackground source={require('../images/fondBody.jpg')} style={styles.container} blurRadius={0.7}>
            <SafeAreaView style={styles.header}>
                <View style={styles.profil}>
                    <Image
                        style={styles.img}
                        source={require('../images/image.jpeg')}
                    />
                    <Text style={{ "color": "rgb(29, 84, 84)", "fontSize": 25, "fontStyle": "italic" }}>{ firebase.auth().currentUser.displayName}</Text>
                </View>
                <View style={styles.profilIcon}>
                    <Ionicons name="log-out-outline" style={styles.myIcon} size={30} onPress={() => firebase.auth().signOut().then(() => navigation.navigate('Login', { user: null }))}/>
                </View>
            </SafeAreaView>
            <SafeAreaView style={styles.body}>

            </SafeAreaView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        textAlign: "center"
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
    img: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    myIcon: {
        color: "whitesmoke",
        alignContent: "flex-end"
    },
    body: {
        flex: 1,
        backgroundColor: "rgb(108, 97, 83)",
        opacity: 0.8,
        paddingTop: 50,
        flexDirection: "row"
    },
    box1: {
        backgroundColor: "green",
        borderTopRightRadius: 15,
        width: 50
    },
    box2: {
        backgroundColor: "blue",

    }
})