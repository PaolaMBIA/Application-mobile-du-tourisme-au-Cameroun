import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { firebase } from '../firebase/config';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ImagePicker from 'react-native-image-picker';

export default function UserTabScreen() {

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
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    style={styles.img}
                    source={require('../images/default.png')}
                />
                <Text>bienvenue <Text style={{"color":"rgb(255,140,0)", "fontSize":20}}>toto</Text></Text>
                <Ionicons name="log-out-outline" size={30} color="black" onPress={()=>{}} />
            </View>
            <View style={styles.body}>
                <View>
                    {image !== null ?
                        (
                            <Image source={{ uri: image.uri }} style={styles.img} />
                        )
                        : <Image
                            style={styles.img}                            
                            source={require('../images/default.png')}
                            
                        />
                    }
                     
                    <Ionicons name="camera-outline" size={30} color="black" onPress={selectImage} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        textAlign: "center"
    },
    header: {   
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: "center",
        height: 80,
        marginTop: 20
    },
    body: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: "white"
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
        width: 50,
        height: 50,
        borderRadius: 50
    }
})