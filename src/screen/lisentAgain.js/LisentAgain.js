import { ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { assets } from '../../utils'
import Data from '../../data/Data'
import { useNavigation } from '@react-navigation/native'

export default function LisentAgain() {
    const navigation = useNavigation()
    const [imageLoading, setImageLoading] = useState(0)
    useEffect(() => {
        console.log("LOADINGGGG=====")
    }, [imageLoading])
    return (
        <View>
            <View style={{ flexDirection: 'row', marginLeft: '3%', marginTop: '8%', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' }}>

                    <View style={{ justifyContent: 'center', marginRight: "5%" }}>
                        <Image source={assets.profile} style={{ width: 50, height: 50, borderRadius: 50 }} />
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 16 }}>Ferish Modi</Text>
                        <Text style={{ color: 'white', fontWeight: '900', fontSize: 20 }}>Listen Again</Text>

                    </View>
                </View>
                <View style={{ justifyContent: 'flex-end', marginRight: '2%' }}>

                    <TouchableOpacity style={{ borderRadius: 15, backgroundColor: "black", padding: 5, borderWidth: 0.5, borderColor: "white" }}>
                        <View style={{}}>
                            <Text style={{ color: 'white', fontSize: 14 }}>More</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ marginLeft: '2%' }}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}

                >
                    <FlatList
                        data={Data}
                        // horizontal={true}
                        numColumns={Math.ceil(Data.length / 2)}
                        style={{ marginTop: '8%' }}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity style={{ marginLeft: 10, }} onPress={() => navigation.navigate("MusicPlayer", { data: item, index: index })}>

                                <Image source={{ uri: item.artwork }} style={{ width: 150, height: 150, borderRadius: 5 }} onLoadEnd={() => { item.loaded = false, setImageLoading(imageLoading + 1) }} />
                                <Text style={{ color: 'white', fontSize: 18 }}>{item.title}</Text>

                                <ActivityIndicator animating={item.loaded} size="large" color="white"
                                    style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', width: '100%', height: "100%", }} />

                            </TouchableOpacity>
                        )}
                    />
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})