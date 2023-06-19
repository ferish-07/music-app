import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function CustomFlatlist({data, renderItem}) {
  return (
    <View
    style={[
      {
        flex: 1,
        flexDirection: 'row',
      }
    ]}
  >
    {Array.from(Array(2), (_, num) => {
      return (
        <View
          key={`masonry-column-${num}`}
          style={{
            flex: 1 / 2,
            flexDirection: 'column',
          }}
        >
          {data
            .map((el, i) => {
              if (i % 2 === num) {
                return (
                  <View
                    key={
                      `masonry-row-${num}-${i}`
                    }
                  >
                    {renderItem( el, i)}
                  </View>
                );
              }

              return null;
            })
            .filter((e) => !!e)}
        </View>
      );
    })}
  </View>
)}
  

const styles = StyleSheet.create({})