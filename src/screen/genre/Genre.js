import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

export default function Genre() {
    const [dataGenre, setDataGenre] = useState([
        "Relax", "Energise", "Commute", "Workout", "Focus"
    ])
    return (
        <View style={{ marginTop: "5%" }}>
            <FlatList
                data={dataGenre}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{}}
                renderItem={({ item, index }) => (
                    <View style={{ margin: 10 }}>
                        <View style={{
                            justifyContent: 'center', borderRadius: 8, padding: 10, backgroundColor: 'rgba(255, 255, 255,0.2)',
                        }}>
                            <Text style={{ color: 'white', fontSize: 16 }
                            } >
                                {item}
                            </Text>
                        </View>
                    </View >
                )
                } />
        </View >
    )
}

const styles = StyleSheet.create({})