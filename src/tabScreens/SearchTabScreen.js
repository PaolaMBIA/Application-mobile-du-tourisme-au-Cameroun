import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ImageBackground } from 'react-native'
import { firebase } from '../firebase/config';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { SearchBar } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

import {post} from '../Table/Post'

const test = [
    {
        id: 1,
        title: "kribi",
        picturePost: "https://cf.bstatic.com/images/hotel/max1024x768/237/237412687.jpg"
    },
    {
        id: 2,
        title: "Limbe",
        picturePost: "https://i.pinimg.com/originals/22/61/09/2261090ee055b3abe9658228f5a535c7.jpg"
    },
    {
        id: 3,
        title: "Les gorges de Kola",
        picturePost: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Les_Gorges_de_Kola2.jpg/1200px-Les_Gorges_de_Kola2.jpg"
    },
    {
        id: 5,
        title: "Luxembourg de la galette",
        picturePost: "https://www.editions2015.com/cameroun/wp-content/uploads/2015/05/centre-touristique-nkolandom.jpg"
    },
]

const Item = ({ item, onPress, style, bacground }) => (
    <View style={styles.myContainList}>
        <TouchableOpacity onPress={onPress} style={[styles.myItem, style]}>
            {/* <View style={[styles.myTopStyleList, {backgroundColor: bacground}]}></View>
            <View style={[styles.myTopStyleList2]}></View> */}
            <Text >{item.title}</Text>
            <Image 
                style={styles.myImagePost}
                source={{ uri: item.picturePost }}
            />
            {/* <View style={[styles.myStyleList, {backgroundColor: bacground}]}></View>
            <View style={[styles.myStyleList2]}></View> */}
        </TouchableOpacity>
    </View>
);


export default function SearchTabScreen({ navigation }) {
    const [mySearch, setMySearch] = useState("")
    const [selectedId, setSelectedId] = useState(null)
    const [resultPost, setResultPost] = useState({ mySearchPost: [] })
    const [showResults, setShowResults] = useState(false)

    const mySearchHandler = (e) => {
        setMySearch(e);
        console.log(mySearch)
    }  

    const Result = ( id ) => {
        const fiterResult = post.filter(e =>  e.id == id );

        setResultPost({ mySearchPost: fiterResult })

        console.log(fiterResult)
        setShowResults(true)      
    }



    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "rgba(245,245,245,0.8)" : "transparent";
        //const borderTopEndRadius = item.id === selectedId ? 0 : 15;
        const myStyleList = item.id === selectedId ? "transparent" : "rgba(245,245,245,0.9)"
  
      return (
          
        <Item
          item={item}
              onPress={() => { setSelectedId(item.id), Result(item.id) }}
          style={{ backgroundColor }}
          bacground= {myStyleList}
        />
      );
    };


    return (
        <ImageBackground source={require('../images/fondBody.jpg')} style={styles.container} blurRadius={0.7}>
            <View style={styles.header}>
                <View style={styles.profil}>
                    <Image
                        style={styles.img}
                        source={require('../images/image.jpeg')}
                    />
                    <Text style={{ "color": "rgb(29, 84, 84)", "fontSize": 25, "fontStyle": "italic"  }}>{ firebase.auth().currentUser.displayName}</Text>
                </View>
                <View style={styles.profilIcon}>
                    <Ionicons name="log-out-outline" style={styles.myIcon} size={30} onPress={()=>firebase.auth().signOut().then(()=>navigation.navigate('Login'))} />
                </View>
            </View>
            <View style={styles.body}>
                <View>
                    <SearchBar
                        placeholder="Je recherche..."
                        onChangeText={mySearchHandler}
                        value={mySearch}
                        containerStyle={{
                            paddingBottom: 30,
                            backgroundColor: "rgba(245,245,245,0.9)",
                            borderBottomColor: "transparent",
                            borderTopColor: "transparent"
                        }}
                        inputContainerStyle={{
                            backgroundColor: "rgb(29, 84, 84)",
                            borderWidth:2,
                            borderColor: 'rgb(29, 84, 84)',
                            height:20
                        }}
                        inputStyle={{
                            fontStyle: "italic"
                        }}                       
                    />                 
                </View>
                <View style={styles.myScroll}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={styles.myFlatList}
                    >
                        <View style={styles.myContain}>
                            <FlatList
                                data={post}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.id}
                                extraData={selectedId}
                                
                            />
                        </View>
                    </ScrollView>
                    <View style={styles.myResult}>
                        {
                            showResults &&
                            <View>

                                {
                                    resultPost.mySearchPost.map((element, index) => (
                                        <View key={index}>
                                            <View style={styles.myStylePost}>
                                                <Text style={styles.myCardSubtitle}>{element.title}</Text>
                                                <Image
                                                    style={styles.myImPost}
                                                    source={{ uri: element.picturePost }}
                                                />
                                            </View>
                                            <View style={styles.myTextOverview}>
                                                <Text style={styles.myIonText}>{element.overview}</Text>
                                            </View>
                                        </View>
                                    ))
                                }
                            </View>
                        }
                        
                    </View>
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
        height: 100,
        paddingTop: 20,
        backgroundColor: "rgb(108, 97, 83)",
        opacity:0.87,
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
        color: "whitesmoke",
        alignContent: "flex-end"
    },
    body: {
        flex: 1,
        backgroundColor: "rgb(108, 97, 83)",
        opacity:0.8,
    },
    myCardSubtitle:{
        fontSize: 20,
        color: "rgb(29, 84, 84)",
        textAlign: "center",
        marginBottom: 15,
        fontFamily: "sans-serif-condensed"
    },
    myImPost: {
        width: 210,
        height: 180,
        borderRadius: 5,
        alignSelf: "center",
        marginBottom: 20
    },
    myTextOverview:{
        marginHorizontal: 20
    },
    myFlatList: {
        backgroundColor: "rgba(29, 84, 84, 0.8)",
        //borderTopRightRadius: 15,
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
    myImagePost: {
        width: 80,
        height: 80,
        borderRadius: 10
    },
    myIonText:{
        fontSize: 15,
        color: "black",
        textAlign: "justify",
    },
    myScroll: {
        flex:1,
        flexDirection: "row",
    },
    myContain: {
        //backgroundColor: "rgb(29, 84, 84)",
        borderTopRightRadius: 15,
    },
    myList: {
        backgroundColor: "red",
        
    },
    myResult: {
        backgroundColor: "rgba(245,245,245,0.9)",
        width: 240,
        paddingLeft:10
    },
    myItem: {
        marginLeft: 5,
        paddingLeft: 8,
        paddingBottom: 20,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15
    },
    myContainList: {
        //backgroundColor: "rgb(29, 84, 84)",
        borderTopRightRadius: 15
    },
    myStyleList: {
        position: "absolute",
        bottom: 0,
        right:0,
        height: 15,
        width: 15,
        borderBottomEndRadius: 15,
        //backgroundColor: "rgba(245,245,245,0.9)",
    },
    myStyleList2: {
        position: "absolute",
        bottom: 0,
        right:0,
        height: 15,
        width: 15,
        //borderBottomEndRadius: 15,
        backgroundColor: "rgba(245,245,245,0.9)"
        //backgroundColor: "transparent",     
        
    },
    myTopStyleList: {
        position: "absolute",
        top: 0,
        right:0,
        height: 15,
        width: 15,
       // borderTopRightRadius: 15,
        //backgroundColor: "rgba(29, 84, 84,0.2)",
    },
    myTopStyleList2: {
        position: "absolute",
        top: 0,
        right:0,
        height: 15,
        width: 15,     
        //backgroundColor: "rgba(245,245,245,0.9)",
    }
})