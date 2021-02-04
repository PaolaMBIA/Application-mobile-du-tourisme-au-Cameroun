import React, {useState, useEffect} from 'react';
import { View, ActivityIndicator, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Avatar} from 'react-native-elements';

export default function Card({item, index}) {

    const [showComments, setShowComments] = useState(false);
    //const [showToast, setShowToast] = useState(false);

    function commentHandler() {
        setShowComments(showComments =>!showComments);
    };

  return (
        <View style={styles.myTool} key={index}>
          <View style={styles.myCardHeader}>
              <View style={styles.myStyleAvatar}>
                <Avatar
                    //style={styles.myTitleImage}
                    rounded
                    source={require('../images/image.jpeg')}
                />
                <Text style={styles.myStylePseudo}>{item.pseudo}</Text>
              </View>
                <Text style={styles.myTimeStamp}>{item.timeStamp}</Text>
            </View>
          <View style={styles.myStylePost}>
                <Text style={styles.myCardSubtitle}>{item.title}</Text>
                <Image
                    style={styles.myImPost}
                    source={{ uri: item.picturePost }}
                />
            </View>
            <View style={styles.myTextOverview}>
                <Text style={styles.myIonText}>{item.overview}</Text>
            </View>
            <View style={styles.myBottomTool}>
                <View style={styles.myBottomIcon}>
                    <TouchableOpacity onPress={commentHandler} style={styles.myBottomComments}>
                        <Ionicons
                            name="chatbubble-ellipses-outline"
                            size={20}
                            color="rgb(29, 84, 84)"                                              
                        />
                        <Text>{item.numberComments }</Text>
                    </TouchableOpacity>
                    <View style={styles.myBottomLike}>
                        <Ionicons
                            name="heart-outline"
                            size={20}
                            color="tomato"
                        />
                        <Text>{item.numberComments }</Text>
                    </View>
                </View>
                <View>
                    {
                        showComments && 
                        item.comments.map(element => (
                            <View style={styles.myComments}>
                                <Avatar
                                    //style={styles.myCommentImage}
                                    rounded
                                    source={require('../images/image.jpeg')}
                                />        
                                <View style={styles.myCommentsRow}>
                                    <View style={styles.myRowTitle}>
                                        <Text style={{fontWeight: "bold", marginLeft: 5}}>{element.pseudoComment}</Text>
                                        <Text style={styles.styleText}>{element.timeStamp}</Text>
                                    </View>
                                    <View>
                                        <Text style={{marginLeft: 5}}>{element.text}</Text>
                                    </View>
                                </View>    
                            </View>
                        ))
                    }
                </View>
            </View>
        </View>
  );
}

const styles = StyleSheet.create({
    myTool: {
        backgroundColor: "rgba(245,245,245,0.9)",
       // margin: 20,
        borderRadius: 10,
        borderColor: "transparent",
        marginBottom:10
    },

    myStyleAvatar:{
        flexDirection: "row",
        margin: 10,
    },

    myStylePseudo: {
        textAlign: "center",
        margin: 10,
        fontSize: 15
    },
    myBottomComments: {
        flexDirection: "row",
        marginRight: 20
    },
    myBottomLike: {
        flexDirection: "row"
    },

    myTitleImage:{
        width: 50,
        marginRight: 30
    },

    myTextIcon:{
        color: "rgb(29, 84, 84)"
    },

    myTextOverview:{
        marginHorizontal: 20
    },

    myCardSubtitle:{
        fontSize: 21,
        color: "black",
        textAlign: "center",
        marginBottom: 15,
        fontFamily: "sans-serif-condensed"
    },

    myBottomIcon:{
        marginBottom: 20,
        flexDirection: "row",
    },

    myBottomTool:{
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 18
    },

    myIonText:{
        fontSize: 15,
        color: "black",
        textAlign: "justify",
    },

    myIcons:{
        fontSize: 20
    },

    myCommentsRow:{
        borderWidth: 1,
        borderColor: "transparent",
        backgroundColor:" rgba(29, 84, 84, 0.6)",
        margin: 10,
        width: 280
    },
    myComments: {
        flexDirection: "row"
    },

    myCommentImage:{
        height:20,
        width: 20
        //border-radius: 100%;
    },

    myRowTitle:{
        justifyContent: "space-between"
    },

    styleText: {
        position: "absolute",
        top: 3,
        right: 2,
        fontSize: 10,
        fontStyle: "italic",
    },

    myTimeStamp:{
        position: "absolute",
        top:5,
        right: 10,
        fontStyle: "italic",
    },
    myImPost: {
        width: 310,
        height: 250,
        borderRadius: 5,
        alignSelf: "center",
        marginBottom: 20
    },
});
