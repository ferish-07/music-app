import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { assets } from '../utils';
import LinearGradient from 'react-native-linear-gradient';
import Genre from './genre/Genre';
import LisentAgain from './lisentAgain.js/LisentAgain';
// import 

export default function Dashboard() {
    return (
        <SafeAreaView style={{ backgroundColor: '#082635', height: '100%' }}>
            <LinearGradient colors={['#082635', '#111537', "#0e1f2e", "#111b1f", '#030303']} style={{
                flex: 1,
            }}>
                <ScrollView>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', margin: "2%" }}>

                            <View style={{}}>
                                <Image source={assets.ytMusicIcon} style={{ width: 30, height: 30 }} />
                            </View>
                            <View style={{ justifyContent: 'center', marginLeft: '3%' }}>
                                <Text style={{ color: 'white', fontSize: 24, fontWeight: '700' }}>Music</Text>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', width: "35%" }}>
                            <View style={{ justifyContent: 'center', }}>
                                <Image source={assets.castOutline} />
                            </View>
                            <View style={{ justifyContent: 'center', }}>
                                <Icon name="search" size={24} color="white" />
                            </View>
                            <View style={{ justifyContent: 'center', marginRight: "5%" }}>
                                <Image source={assets.profile} style={{ width: 30, height: 30, borderRadius: 50 }} />
                            </View>
                        </View>
                    </View>

                    <Genre />
                    <LisentAgain />

                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})