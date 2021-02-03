import React, {useState, useEffect} from 'react'
import { Text, View, StyleSheet, Button, Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import  HomeTabScreen  from '../tabScreens/HomeTabScreen.js'
import  SearchTabScreen  from '../tabScreens/SearchTabScreen'
import  UserTabScreen  from '../tabScreens/UserTabScreen'


import Ionicons from 'react-native-vector-icons/Ionicons';
import { HeaderBackground } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();

export default function HomeScreen(props) {
  return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Accueil') {
                    iconName = focused
                    ? 'home-outline'
                    : 'home-outline';
                } else if (route.name === 'Recherche') {
                    iconName = focused ? 'search-circle-outline' : 'search-outline';
                } else if (route.name === 'Mon compte') {
                    iconName = focused ? 'person-circle-outline' : 'person-outline'
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
               // showLabel: false,
                activeTintColor: 'rgb(29, 84, 84)',
                inactiveTintColor: 'grey',
                style: {
                  //backgroundColor: "rgb(29, 84, 84)",
                  borderTopColor: "rgb(29, 84, 84)"
                }
            }}
              
        >
            <Tab.Screen name="Accueil" component={HomeTabScreen} />
            <Tab.Screen name="Recherche" component={SearchTabScreen} />
            <Tab.Screen name="Mon compte" component={UserTabScreen} />
      </Tab.Navigator>
  );
}

