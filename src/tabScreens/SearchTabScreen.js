import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ImageBackground, SafeAreaView } from 'react-native'
import { firebase } from '../firebase/config';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { LinearGradient} from 'expo-linear-gradient';
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

const Item = ({ item, onPress, style, bacground, borderTopEndRadius, borderBottomEndRadius, myBottomBackground }) => (
    <View style={styles.myContainList}>
        <TouchableOpacity onPress={onPress} style={[styles.myItem, style]}>
            <View style={[styles.myTopStyleList, {backgroundColor: myBottomBackground, borderBottomEndRadius: borderBottomEndRadius}]}></View>
            <View style={[styles.myTopStyleList2, {backgroundColor: bacground}]}></View>
            <Text >{item.title}</Text>
            {
                item.picturePost.slice(0,1).map((e,id) => (
                    <Image
                        key={id}
                    style={styles.myImagePost}
                        source={{ uri: e }}
                    />
                ))
            }
            <View style={[styles.myStyleList, {backgroundColor: myBottomBackground, borderTopEndRadius: borderTopEndRadius}]}></View>
            <View style={[styles.myStyleList2, {backgroundColor: bacground}]}></View>
        </TouchableOpacity>
    </View>
);


export default function SearchTabScreen({ navigation }) {
    const [mySearch, setMySearch] = useState("")
    const [selectedId, setSelectedId] = useState(null)
    const [resultPost, setResultPost] = useState({ mySearchPost1: [] })
    const [state, setState] = useState({ mySearchPost: post });
    const [allPosts, setAllPosts] = useState({ myAllPosts: [] });
    const [showResults, setShowResults] = useState(false)

    const [showNoResults, setShowNoResults] = useState(false)
    const scroll = useRef();


    useEffect(() => {
            const fiterResult = post.filter(e => e.id == selectedId);
    
            setResultPost({ mySearchPost1: fiterResult })
    
            //console.log(fiterResult)
            setShowResults(true)
        
    }, [selectedId])
 

    function mySearchHandler(e) {

        const mySearchItem = e.trim();
        setMySearch(mySearchItem);
        //setSelectedId(null)

        if (mySearchItem) {
            const filteredEnter = post.filter((element) => {
                return element.title.toLowerCase().indexOf(mySearchItem.toLowerCase()) >= 0
            });   
            
            if (filteredEnter.length === 0) {
                setShowResults(false);
                setShowNoResults(true);
                setState({ mySearchPost: filteredEnter })
            } else {
                setShowResults(true);
                setShowNoResults(false);
                setState({ mySearchPost: filteredEnter })
            }
            
        } else {
            //setSelectedId(selectedId);
            setShowResults(true);
            setShowNoResults(false);
            setState({mySearchPost: post})
        }

    }



    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "rgba(245,245,245,0.7)" : "transparent";
        const borderTopEndRadius = item.id === selectedId ? 15 : 0;
        const borderBottomEndRadius = item.id === selectedId ? 15 : 0;
        const myStyleList = item.id === selectedId ? "rgba(245,245,245,0.7)" : "transparent"
        const myBottomBackground = item.id === selectedId ? "rgba(29, 84, 84, 0.8)" : "transparent"
  
      return (
          
        <Item
          item={item}
              onPress={() => setSelectedId(item.id)}
          style={{ backgroundColor}}
              bacground={myStyleList}
              borderTopEndRadius={borderTopEndRadius}
              borderBottomEndRadius={borderBottomEndRadius}
              myBottomBackground ={myBottomBackground}
        />
      );
    };

    const ScrollEndView = () => {
        scroll.current.scrollToEnd({animated:true})      
    }

    const ScrollStartView = () => {
        scroll.current.scrollToIndex({index:0,animated:true}) 
    }


    return (
        <ImageBackground source={require('../images/fondBody.jpg')} style={styles.container} blurRadius={0.7}>
            <SafeAreaView style={styles.header}>
                <View style={styles.myheader}>
                    <View style={styles.profil}>
                        <Image
                            style={styles.img}
                            source={require('../images/image.jpeg')}
                        />
                        <Text style={{ "color": "rgb(29, 84, 84)", "fontSize": 25, "fontStyle": "italic"  }}>{ firebase.auth().currentUser.displayName}</Text>
                    </View>
                    <View style={styles.profilIcon}>
                        <Ionicons name="log-out-outline" style={styles.myIcon} size={30} onPress={() => firebase.auth().signOut().then(() => navigation.navigate('Login', { user: null }))} />
                    </View>
                </View>
            </SafeAreaView>
            <SafeAreaView style={styles.mySearch}>
                <SearchBar
                    placeholder="Je recherche..."
                    onChangeText={mySearchHandler}
                    value={mySearch}
                    searchIcon={{
                        color: "whitesmoke",
                        size: 30
                    }}
                    containerStyle={{
                        paddingTop: -15,
                        paddingBottom: 15,
                        paddingLeft: 30,
                        //backgroundColor: "rgba(245,245,245,0.9)",
                        backgroundColor: "transparent",
                        opacity:0.8,
                        borderBottomColor: "transparent",
                        borderTopColor: "transparent",
                        width: 260,
                        alignSelf: 'center'
                    }}
                    inputContainerStyle={{
                        backgroundColor: "transparent",
                        borderBottomWidth:2,
                        borderColor: 'transparent',
                        borderBottomColor: 'whitesmoke',
                        height: 30,
                        
                    }}
                    inputStyle={{
                        fontStyle: "italic"
                    }}                       
                />                 
            </SafeAreaView>
            <SafeAreaView style={styles.body}>
                <LinearGradient
                    style={styles.myScroll}
                    colors={["transparent","rgba(245,245,245,0.8)", "rgba(245,245,245,0.8)", "rgba(245,245,245,0.8)", "rgba(245,245,245,0.6)", "rgba(245,245,245,0.6)"]}
                    start={{ x: 0.8, y: 0.001 }}
                    end={{ x: 0.8, y: 1 }}
                    
                >
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        style={styles.myFlatList}
                        
                    >
                        <TouchableOpacity onPress={ScrollStartView}>
                            <Ionicons style={{alignSelf: "center", marginVertical: 4}} name="chevron-up-outline" size={30} color="rgba(245,245,245,0.8)" />                          
                        </TouchableOpacity>
                        <View style={styles.myContain}>
                            <FlatList
                                data={state.mySearchPost}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.id}
                                extraData={selectedId}
                                ref={scroll}
                            />
                        </View>
                        <TouchableOpacity onPress={ScrollEndView}>
                            <Ionicons style={{alignSelf: "center"}} name="chevron-down-outline" size={30} color="rgba(245,245,245,0.8)" />                          
                        </TouchableOpacity>
                    </ScrollView>
                    <View style={styles.myResult}>
                        {
                            showResults &&
                            <ScrollView>

                                {
                                    resultPost.mySearchPost1.map((element, index) => (
                                        <View key={index}>
                                            <View style={styles.myStylePost}>
                                                <Text style={styles.myCardSubtitle}>{element.title}</Text>
                                                {
                                                    element.picturePost.map(e => (
                                                        <Image
                                                            style={styles.myImPost}
                                                            source={{ uri: e }}
                                                        />
                                                    ))
                                                }                                               
                                            </View>
                                            <View style={styles.myTextOverview}>
                                                <Text style={styles.myIonText}>{element.overview}</Text>
                                            </View>
                                        </View>
                                    ))
                                }
                            </ScrollView>
                        }
                        {
                            showNoResults && 
                            <Text style={{justifyContent:"center", textAlign:"center"}}>Aucun résultat trouvé...</Text>
                        }
                        
                    </View>
                </LinearGradient>

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
        opacity:0.8,
    },
    mySearch: {
        backgroundColor: "rgb(108, 97, 83)",
        opacity:0.8,
    },
    myheader: {
        height: "100%",
        //backgroundColor: "rgba(245,245,245,0.9)",
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
        opacity: 0.8,
    },
    myCardSubtitle:{
        fontSize: 20,
        color: "rgb(29, 84, 84)",
        fontWeight:"bold",
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
        borderTopRightRadius: 15,
        //borderBottomRightRadius: 15,
        //marginBottom: 50
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
        //backgroundColor: "rgba(245,245,245,0.9)",
        paddingTop: 8
    },
    myContain: {
        //backgroundColor: "rgb(29, 84, 84)",
        borderTopRightRadius: 15,
        height: 450
    },
    myList: {
        backgroundColor: "red",
        
    },
    myResult: {
        //backgroundColor: "rgba(245,245,245,0.9)",
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
        bottom: -15,
        right:0,
        height: 15,
        width: 15,
        //borderBottomEndRadius: 15,
        //backgroundColor: "rgba(29, 84, 84, 0.8)",
        zIndex: 2,
    },
    myStyleList2: {
        position: "absolute",
        bottom: -15,
        right:0,
        height: 15,
        width: 15,
        //borderBottomEndRadius: 15,
        //backgroundColor: "rgba(245,245,245,0.8)"
        //backgroundColor: "transparent",  
        zIndex: 1,
        
    },
    myTopStyleList: {
        position: "absolute",
        top: -15,
        right:0,
        height: 15,
        width: 15,
        //borderBottomEndRadius: 15,
        //backgroundColor: "rgba(29, 84, 84, 0.8)",
        zIndex: 2,
    },
    myTopStyleList2: {
        position: "absolute",
        top: -15,
        right:0,
        height: 15,
        width: 15,
        //borderBottomEndRadius: 15,
        //backgroundColor: "rgba(245,245,245,0.8)"
        backgroundColor: "transparent",
    }
})