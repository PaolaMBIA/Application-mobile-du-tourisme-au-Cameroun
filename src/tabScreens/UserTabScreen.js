import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native'
import { firebase } from '../firebase/config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Avatar, Input } from 'react-native-elements';

import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import ImagePicker from 'react-native-image-picker';
import OwnPost from '../components/OwnPost';
import { post } from '../Table/Post'

export default function UserTabScreen({navigation}) {

    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);

    const selectImage = () => {
        const options = {
            title: 'Select Avatar',
            maxWidth: 2000,
            maxHeight: 2000,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        ImagePicker.showImagePicker(options, response => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            const source = { uri: response.uri };
            console.log(source);
            setImage(source);
          }
        });
    };
    
    return (
        <ImageBackground source={require('../images/fondBody.jpg')} style={styles.container} blurRadius={0.7}>
            <View style={styles.body}>
                <View style={styles.header}>
                    <Avatar
                        rounded
                        size={100}
                        source={require('../images/image.jpeg')}
                        >
                        <Avatar.Accessory  />
                    </Avatar>
                    <View>
                        <Text style={{fontSize: 26, color:"whitesmoke" }}>{ firebase.auth().currentUser.displayName}</Text>
                    </View>
                </View>
                <View>
                    <TouchableOpacity style={styles.ButtonAddPosts} onPress={()=>navigation.navigate('post')}>
                        <Ionicons name="add-circle" size={38} color="whitesmoke" />
                        {/* <Text style={{fontSize: 21, color:"white", fontStyle: "italic"}}>Ajouter une nouvelle pubication</Text> */}
                    </TouchableOpacity>
                    <ScrollView>
                        {
                            post.map((item,index) => (
                                <OwnPost item={item} index={index} />
                            ))
                        }
                    </ScrollView>
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        textAlign: "center"
    },
    header: {   
        flexDirection: "column",
        justifyContent: 'space-evenly',
        alignItems: "center",
        alignSelf: "center",
        height: 120,
        width: 330,
        marginTop: 40,
        borderRadius: 10,
        
    },
    ButtonAddPosts: {
        flexDirection: "row",
        marginTop: 20,
        marginBottom:10,
        alignSelf: "center"
    },
    body: {
        flex: 1,
        backgroundColor: "rgb(108, 97, 83)",
        opacity:0.8,
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
    img : {
        width: 100,
        height: 100,
        borderRadius: 100
    }
})