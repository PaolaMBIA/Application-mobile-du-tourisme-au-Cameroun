import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native'
import { firebase } from '../firebase/config';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { SearchBar } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

const test = [
    {
        id: 1,
        title: "kribi",
        picturePost: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Les_Gorges_de_Kola2.jpg/1200px-Les_Gorges_de_Kola2.jpg"
    },
    {
        id: 2,
        title: "Limbe",
        picturePost: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Les_Gorges_de_Kola2.jpg/1200px-Les_Gorges_de_Kola2.jpg"
    },
    {
        id: 3,
        title: "Akoa",
        picturePost: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Les_Gorges_de_Kola2.jpg/1200px-Les_Gorges_de_Kola2.jpg"
    },
    {
        id: 4,
        title: "Paris",
        picturePost: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Les_Gorges_de_Kola2.jpg/1200px-Les_Gorges_de_Kola2.jpg"
    },
    {
        id: 5,
        title: "Luxembourg de la galette",
        picturePost: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Les_Gorges_de_Kola2.jpg/1200px-Les_Gorges_de_Kola2.jpg"
    },
]

const Item = ({ item, onPress, style, bacground }) => (
    <View style={styles.myContainList}>
        <TouchableOpacity onPress={onPress} style={[styles.myItem, style]}>
            <View style={[styles.myTopStyleList]}></View>
            <View style={[styles.myTopStyleList2, {backgroundColor: bacground}]}></View>
            <Text >{item.title}</Text>
            <Image 
                style={styles.myImagePost}
                source={{ uri: item.picturePost }}
            />
            <View style={[styles.myStyleList]}></View>
            <View style={[styles.myStyleList2, {backgroundColor: bacground}]}></View>
        </TouchableOpacity>
    </View>
);

const Result = ({ id }) => (
    <Text>{id }</Text>
);

export default function SearchTabScreen({ navigation }) {
    const [mySearch, setMySearch] = useState("")
    const [selectedId, setSelectedId] = useState(null)

    const mySearchHandler = (e) => {
        setMySearch(e);
        console.log(mySearch)
    }  

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "rgb(29, 84, 84)" : "white";
        const borderTopEndRadius = item.id === selectedId ? 0 : 15;
        const myStyleList = item.id === selectedId ? "rgb(29, 84, 84)" : "white"
  
      return (
          
        <Item
          item={item}
          onPress={() => setSelectedId(item.id)}
          style={{ backgroundColor, borderTopEndRadius }}
          bacground= {myStyleList}
        />
      );
    };


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.profil}>
                    <Image
                        style={styles.img}
                        source={require('../images/image.jpeg')}
                    />
                    <Text style={{ "color": "white", "fontSize": 25, "fontStyle": "italic"  }}>{ firebase.auth().currentUser.displayName}</Text>
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
                            marginTop: -20,
                            marginBottom: 60,
                            height: 10,
                            width: 300,
                            alignSelf:"center",
                            backgroundColor: "rgb(29, 84, 84)",
                            borderBottomColor: "rgb(29, 84, 84)",
                            borderTopColor: "rgb(29, 84, 84)"
                        }}
                        inputContainerStyle={{
                            backgroundColor: "white",
                            borderWidth:2,
                            borderColor: 'white'
                        }}
                        inputStyle={{
                            fontStyle: "italic"
                        }}                       
                    />                 
                </View>
                <View style={styles.myScroll}>
                    <ScrollView
                        showsVerticalScrollIndicator= {false}
                    >
                        <View style={styles.myContain}>
                            <FlatList
                                data={test}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.id}
                                extraData={selectedId}
                            />
                        </View>
                    </ScrollView>
                    <View style={styles.myResult}>
                        <Result id={ selectedId}/>
                    </View>
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
        backgroundColor: "rgb(29, 84, 84)"
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
    myScroll: {
        flex:1,
        flexDirection: "row",
    },
    myContain: {

    },
    myList: {
        backgroundColor: "red",
        
    },
    myResult: {
        backgroundColor: "rgb(29, 84, 84)",
        width:240
    },
    myItem: {
        marginLeft: 5,
        paddingLeft: 8,
        paddingBottom: 20,
        borderRadius: 15,
    },
    myContainList: {
        backgroundColor: "white",
    },
    myStyleList: {
        position: "absolute",
        bottom: 0,
        right:0,
        height: 15,
        width: 15,
        backgroundColor: "rgb(29, 84, 84)",
    },
    myStyleList2: {
        position: "absolute",
        bottom: 0,
        right:0,
        height: 15,
        width: 15,
        backgroundColor: "white",
        borderBottomEndRadius: 15,
    },
    myTopStyleList: {
        position: "absolute",
        top: 0,
        right:0,
        height: 15,
        width: 15,
        backgroundColor: "rgb(29, 84, 84)",
    },
    myTopStyleList2: {
        position: "absolute",
        top: 0,
        right:0,
        height: 15,
        width: 15,    
        borderTopRightRadius: 15,
        backgroundColor: "white",
    }
})