import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../Dashboard';
import Explore from '../Explore';
import Library from '../Library';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { assets } from '../../utils';
import MusicPlayer from '../MusicPlayer';


export default function BottomTabNavigation() {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: '#212121', borderTopWidth: 0, } }}
        >
            <Tab.Screen name="Home" component={Dashboard} options={{
                tabBarIcon: ({ focused }) => {
                    if (focused) {
                        return (

                            <Icon name="home" size={24} color='white' />
                        )
                    } else {
                        return (
                            <Image source={assets.homeOutline} color='white' />

                        )
                    }
                },

                tabBarIconStyle: {},
            }} />
            <Tab.Screen name="Explore" component={MusicPlayer} options={{
                tabBarIcon: ({ focused }) => {
                    console.log("FOCUSEDDDD", focused)
                    if (focused) {
                        return (<Icon name="explore" size={24} color='white' />)
                    } else {
                        return (

                            <Image source={assets.exploreOutline} color='white' />
                        )
                    }
                }
                ,
                tabBarIconStyle: {},
            }} />
            <Tab.Screen name="Library" component={Library} options={{
                tabBarIcon: ({ focused }) => (
                    <Image source={focused ? assets.musicLibraryWhite : assets.musicLibraryWhiteOutline} color='white' />
                ),
                tabBarIconStyle: {},
            }} />

        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({})