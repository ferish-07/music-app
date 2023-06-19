import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function ButtonComponent({title,isGray,isBlue, onPress}) {
  return (
    <View >
        <TouchableOpacity style={{
        width: 72,
        height: 72,
        borderRadius: 24,
        backgroundColor: isBlue? "#4B5EFC": isGray ?"#4E505F":"white",
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
    }}
    onPress={()=>onPress()}
    >

      <Text style={{
        fontSize: 32,
        color:isBlue || isGray ?"#FFFFFF":"black",
      }}>{title}</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({})