import { ActivityIndicator, Animated, Dimensions, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import TrackPlayer, { useProgress, Capability, usePlaybackState, State } from 'react-native-track-player';
import Icon from 'react-native-vector-icons/Ionicons';

import Slider from '@react-native-community/slider';
import Data from '../data/Data';


const {width, height} = Dimensions.get('window');

export default function MusicPlayer({ route }) {
    const { index, data } = route.params
    const playBackState = usePlaybackState();
  const songSlider = useRef(null);

    // console.log("INDEXXBGDBHDHD", index)
  const [songIndex, setsongIndex] = useState(0);

    const [isLoading, setIsLoading] = useState(true)
    const [imageLoading, setImageLoading] = useState(0)
    const [currentIndex,setCurrentIndex]= useState(index)
  const scrollX = useRef(new Animated.Value(0)).current;

    const progress = useProgress()


    const start = async () => {
        // Set up the player
        try {
            await TrackPlayer.setupPlayer();
            await TrackPlayer.updateOptions({
              capabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
                Capability.Stop,
              ],
            });
            await TrackPlayer.add(Data);
          } catch (error) {
            console.log(error);
          }
    };
    useEffect(()=>{
        setTimeout(()=>{

            songSlider.current.scrollToIndex({
                animated: true,
                index: currentIndex
            })
        },500)

    },[])
    const skipTo = async trackId => {
        await TrackPlayer.skip(trackId);
      };
    
    useEffect(() => {
        console.log("hjdgsfhsvdjsfgvdhjsbfv")
    }, [imageLoading])
    useEffect(() => {
        start()
        scrollX.addListener(({value}) => {
            //   console.log(`ScrollX : ${value} | Device Width : ${width} `);
      console.log("CHANGEDDDDDDD__+_+_+_+_+_+_+_+__+_+-")
            const index = Math.round(value / width);
            skipTo(index);
            setsongIndex(index);
            TrackPlayer.play()
      
            //   console.log(`Index : ${index}`);
          });

          return () => {
            scrollX.removeAllListeners();
            // TrackPlayer.destroy();
          };
            
   
    }, [])
    // console.log("DATAATAA FROM DATA FILER", Data)
    const playMusic = async (playBackState) => {
        const currentTrack = await TrackPlayer.getCurrentTrack();
        console.log("HERE IT COMESSS",currentTrack, playBackState, State.Paused);
        await TrackPlayer.play();
        if (currentTrack != null) {
            if (playBackState == State.Playing) {
                await TrackPlayer.pause();
            } else {
                await TrackPlayer.play();
            }
        }


    }

    const renderSongs=({item,index})=>{
        // console.log("ITEMMMDMNDM", item)
        return(
            <>
            <Animated.View style={styles.mainWrapper}>


            <View style={[styles.imageWrapper, styles.elevation]}>
            
                                    <Image  source={{ uri: item.artwork }} style={styles.musicImage} onLoadEnd={()=>{ item.loaded = false, setImageLoading(imageLoading+1)}}/>
                                    <ActivityIndicator animating={item.loaded} size="large" color="white"
                                    style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', width: '100%', height: "100%", }} />
                                </View>
                               
                                </Animated.View>
                                 
            </>
                  
        )

    }

    return (
        <SafeAreaView>
            {/* <TouchableOpacity onPress={() => TrackPlayer.play()}>

                <Text>SATRT</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => TrackPlayer.pause()}>
                <Text>PAUSE</Text>
            </TouchableOpacity> */}
<Animated.FlatList
          ref={songSlider}
          data={Data}
          
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
              [
                  {
                      nativeEvent: {
                          contentOffset: {x: scrollX},
                        },
                    },
                ],
                {useNativeDriver: true},
                )}
                renderItem={(item,index)=> renderSongs(item, index)}
        />
         <Slider
                                  style={{ width: "80%", }}
                                  value={progress.position}
                                  minimumValue={0}
                                  maximumValue={progress.duration}
                                  thumbTintColor="white"
                                  minimumTrackTintColor="white"
                                  maximumTrackTintColor="grey"
                                  onSlidingComplete={async value => {
                                      await TrackPlayer.seekTo(value);
                                  }}
                  
                              />
                              <View style={{flexDirection:'row', justifyContent:"space-around", width:"60%"}}>
                              <TouchableOpacity onPress={() => TrackPlayer.skipToPrevious()} style={{justifyContent:'center'}}>
                                  <Icon  name="play-skip-back" size={30} color="white"/>
                              </TouchableOpacity> 
                  
                              <TouchableOpacity onPress={() => playMusic(playBackState)}>
                                  <Icon name={playBackState === State.Playing
                                      ? 'ios-pause-circle'
                                      : 'ios-play-circle'} size={70} color="white" />
                              </TouchableOpacity>
                              <TouchableOpacity onPress={() => TrackPlayer.skipToNext()} style={{justifyContent:'center'}}>
                              <Icon  name="play-skip-forward" size={30} color="white"/>
                              </TouchableOpacity>
                              </View>
            {/* <Image source={{ uri: data.artwork }} style={{ height: 250, width: 250, borderRadius: 10 }} onLoadEnd={() => { setIsLoading(false), setImageLoading(imageLoading + 1) }} /> */}
            {/* <View>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: "bold" }}>{data.title}</Text>
            </View> */}
          
           
            
            {/* <FlatList
                data={Data}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.title}</Text>
                    </View>
                )}
            /> */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainWrapper: {
        width: width,
        // heightL:"20%",
        // flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 25,
        backgroundColor:"red"
      },
    
      imageWrapper: {
        // width: 300,
        // height: 340,
        // marginBottom: 25,
      },
      musicImage: {
        width: 250,
        height: 250,
        borderRadius: 15,
      },
      elevation: {
        elevation: 5,
    
        shadowColor: '#ccc',
        shadowOffset: {
          width: 5,
          height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
      },
})