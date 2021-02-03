import React, {useState, useEffect} from 'react'
import { Text, View, StyleSheet, Button, Image } from 'react-native'
import { Card } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { firebase } from '../firebase/config';

const post = [
    {
        pictureProfil: '../images/image.jpeg',
        pseudo: "Kimy",
        picturePost: "https://i.pinimg.com/originals/22/61/09/2261090ee055b3abe9658228f5a535c7.jpg",
        title: "Centre touristique de Nkolandom",
        overview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        comments: [{
            pseudoComment: "Bea",
            text: "super endroit",
            timeStamp: "20/06/2020"
        }],
        numberComments: 1,
        likes: 6,
        timeStamp: "20/05/2020"
    },
    {
        pictureProfil: '../images/image.jpeg',
        pseudo: "Bea",
        picturePost: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Les_Gorges_de_Kola2.jpg/1200px-Les_Gorges_de_Kola2.jpg',
        title: "Les gorges de Kola",
        overview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        comments: [{
            pseudoComment: "Kimy",
            text: "facile d'accès?",
            timeStamp: "20/06/2020"
        }, {
            pseudoComment: "Bea",
            text: "oui",
            timeStamp: "20/06/2020"
        }],
        numberComments: 2,
        likes: 3,
        timeStamp: "20/06/2020"
    },
    {
        pictureProfil: '../images/image.jpeg',
        pseudo: "Christy",
        picturePost: 'https://i.pinimg.com/originals/22/61/09/2261090ee055b3abe9658228f5a535c7.jpg',
        title: "Limbe",
        overview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        comments: [{
            pseudoComment: "Evrard",
            text: "comment tu as découvert?",
            timeStamp: "20/06/2020"
        }],
        numberComments: 1,
        likes: 5,
        timeStamp: "20/06/2020"
    },
    {
        pictureProfil: '../images/image.jpeg',
        pseudo: "Evrard",
        picturePost: 'https://cf.bstatic.com/images/hotel/max1024x768/237/237412687.jpg',
        title: "Kribi",
        overview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        comments: [],
        numberComments: 0,
        likes: 0,
        timeStamp: "20/06/2020"
    }
]

export default function HomeTabScreen({navigation}) {
    const [state, setState] = useState({ myPost: [] });

    function open() {
        firebase.auth().signOut().then(()=>navigation.navigate('Login'))
    }

    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.profil}>
                    <Image
                        style={styles.img}
                        source={require('../images/image.jpeg')}
                    />
                    <Text style={{ "color": "white", "fontSize": 25, "fontStyle": "italic" }}>{ firebase.auth().currentUser.displayName}</Text>
                </View>
                <View style={styles.profilIcon}>
                    <Ionicons name="log-out-outline" style={styles.myIcon} size={30} onPress={()=>firebase.auth().signOut().then(()=>navigation.navigate('Login'))} />
                </View>
            </View>
            <View style={styles.body}>
                <ScrollView>
                    {
                        post.map(item => (
                            <Card style={{borderRadius: 50}}>
                                <Card.Title>
                                <Image
                        style={styles.img}
                        source={require('../images/image.jpeg')}
                    />
                                    <Text>{item.pseudo}</Text>
                                </Card.Title>
                            <Card.Divider/>
                            <Card.Image style={styles.myImPost}  source={{uri : item.picturePost }}>

                                </Card.Image>
                                <Text style={{marginBottom: 10}}>
                                The idea with React Native Elements is more about component structure than actual design.
                              </Text>
                          </Card>
                        ))
                    }
                    </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        textAlign: "center",
    },
    header: {   
        height: 100,
        marginTop: 20,
        backgroundColor: "rgb(29, 84, 84)",
        justifyContent:'space-between',
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
        color: "grey",
        alignContent: "flex-end"
    },
    body: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: "rgb(29, 84, 84)",
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
    },
    myImPost: {
        width: 150,
        height: 150,
        borderRadius: 20
    }
})