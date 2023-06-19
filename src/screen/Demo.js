import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomFlatlist from './CustomFlatlist'

export default function Demo() {
    const [data,setData]= useState([
        {
            name: "Ferish",
            device_details:[{
                device: "IPHONE 6",

            },
            {
                device: "IPHONE 7",
                
            },
            {
                device: "IPHONE 8",
                
            },
            {
                device: "IPHONE X",
                
            },
            {
                device: "IPHONE 11",
                
            }]

        },
        {
            name: "Harsh Tadha",
            device_details:[{
                device: "IPHONE 6",

            },
            {
                device: "IPHONE 7",
                
            },
            ]
        },
        {
            name: "Dhruv Padsala",
            device_details:[{
                device: "IPHONE 5",

            },
            {
                device: "IPHONE 7",
                
            },
            {
                device: "IPHONE 8",
                
            },
            {
                device: "IPHONE X",
                
            },
            {
                device: "IPHONE 11",
                
            },
            {
                device: "IPHONE 12",
                
            },
            {
                device: "IPHONE 13",
                
            },
        ]
        },
        {
            name: "Rajesh",
            device_details:[{
                device: "IPHONE 5",

            },
           
            {
                device: "IPHONE 11",
                
            },
            {
                device: "IPHONE 12",
                
            },
            {
                device: "IPHONE 13",
                
            },]
        },
        {
            name: "Tadha",
            device_details:[{
                device: "IPHONE 5",

            },
           
            {
                device: "IPHONE 11",
                
            },
            {
                device: "IPHONE 12",
                
            },
            {
                device: "IPHONE 11",
                
            },
            {
                device: "IPHONE 12",
                
            },
            {
                device: "IPHONE 11",
                
            },
            {
                device: "IPHONE 12",
                
            },
            {
                device: "IPHONE 13",
                
            },]
        },
        {
            name: "Ferish 2",
            device_details:[{
                device: "IPHONE 5",

            },
           
            {
                device: "IPHONE 11",
                
            },
            {
                device: "IPHONE 12",
                
            },
            {
                device: "IPHONE 11",
                
            },
            {
                device: "IPHONE 12",
                
            },
            {
                device: "IPHONE 11",
                
            },
            {
                device: "IPHONE 12",
                
            },
            {
                device: "IPHONE 13",
                
            },]
        }
    ])

    const renderItem=(item,index)=>{
        return(
            <View style={{backgroundColor:'red', borderWidth:1, margin:10, borderRadius:10, padding:10}}>
                <View style={{height:25, borderBottomColor:'black',borderBottomWidth:1}}>

                <Text>
                    {item.name}
                </Text>
                </View>

                <View  style={{marginTop:2, }}>
                    <FlatList data={item.device_details?item.device_details: []}
                        renderItem={({item, index})=>(
                            <View style={{margin:2, borderWidth:1}}>
                                <Text>
                                    {item.device}
                                </Text>
                                </View>
                        )}
                    />
                </View>
            </View>
        )
    }
  return (
    <View style={{flex:1}}>
        <View style={{flex:1, }}>

     <CustomFlatlist data={data} renderItem={(item,index)=>renderItem(item,index)}/>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({})