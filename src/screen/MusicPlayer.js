import { ActivityIndicator, Animated, Dimensions, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import TrackPlayer, { useProgress, Capability, usePlaybackState, State } from 'react-native-track-player';
import Icon from 'react-native-vector-icons/Ionicons';
import IconEn from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Share from 'react-native-share';


import Modal from "react-native-modal";


import Slider from '@react-native-community/slider';
import Data from '../data/Data';


const { width, height } = Dimensions.get('window');

export default function MusicPlayer({ route }) {
    const { index, data } = route.params
    const playBackState = usePlaybackState();
    const songSlider = useRef(null);
    const [songName, setSongName] = useState({})

    // console.log("INDEXXBGDBHDHD", index)
    const [songIndex, setsongIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false)

    const [isLoading, setIsLoading] = useState(true)
    const [imageLoading, setImageLoading] = useState(0)
    const [currentIndex, setCurrentIndex] = useState(index)
    const scrollX = useRef(new Animated.Value(0)).current;

    const progress = useProgress()




    const start = async () => {
        // Set up the player
        try {
            await TrackPlayer.setupPlayer();
            await TrackPlayer.updateOptions({
                stopWithApp: true,
                capabilities: [
                    Capability.Play,
                    Capability.Pause,
                    Capability.SkipToNext,
                    Capability.SkipToPrevious,
                    Capability.Stop,
                ],
                compactCapabilities: [
                    Capability.Play,
                    Capability.Pause,
                    Capability.SkipToNext,
                    Capability.SkipToPrevious,
                ],
                notificationCapabilities: [
                    Capability.Play,
                    Capability.Pause,
                    Capability.SkipToNext,
                    Capability.SkipToPrevious,
                ],
            });
            await TrackPlayer.add(Data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        setTimeout(() => {

            songSlider.current.scrollToIndex({
                animated: true,
                index: currentIndex
            })
        }, 500)

    }, [])
    const skipTo = async trackId => {
        await TrackPlayer.skip(trackId);
    };

    useEffect(() => {
        console.log("hjdgsfhsvdjsfgvdhjsbfv")
    }, [imageLoading])
    useEffect(() => {
        start()
        scrollX.addListener(({ value }) => {
            //   console.log(`ScrollX : ${value} | Device Width : ${width} `);
            console.log("CHANGEDDDDDDD__+_+_+_+_+_+_+_+__+_+-", value)
            const index = Math.round(value / width);
            skipTo(index);
            setsongIndex(index);
            setSongName(Data[index])
            TrackPlayer.play()

            //   console.log(`Index : ${index}`);
        });

        return () => {
            scrollX.removeAllListeners();
            // TrackPlayer.destroy();
        };


    }, [])
    const skipToNext = () => {
        songSlider.current.scrollToOffset({
            offset: (songIndex + 1) * width,
        });
        // TrackPlayer.skipToNext()
    };

    const skipToPrevious = () => {
        songSlider.current.scrollToOffset({
            offset: (songIndex - 1) * width,
        });
        // TrackPlayer.skipToPrevious()
        // TrackPlayer.reset()

    };
    const shareSong = (item) => {
        Share.open({ urls: [item.artwork, item.url] })

    }
    // console.log("DATAATAA FROM DATA FILER", Data)
    const playMusic = async (playBackState) => {
        const currentTrack = await TrackPlayer.getCurrentTrack();
        console.log("HERE IT COMESSS", currentTrack, playBackState, State.Paused);
        await TrackPlayer.play();
        if (currentTrack != null) {
            if (playBackState == State.Playing) {
                await TrackPlayer.pause();
            } else {
                await TrackPlayer.play();
            }


        }



    }

    const renderSongs = ({ item, index }) => {
        // console.log("ITEMMMDMNDM", item)
        // console.log(first)
        return (
            <>
                <Animated.View style={styles.mainWrapper}>
                    <View style={[styles.imageWrapper, styles.elevation]}>
                        <Image source={{ uri: item.artwork }} style={styles.musicImage} onLoadEnd={() => { item.loaded = false, setImageLoading(imageLoading + 1) }} />
                        <ActivityIndicator animating={item.loaded} size="large" color="white"
                            style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', width: '100%', height: "100%", }} />
                    </View>
                    <View style={{ marginTop: '3%', width: "100%", justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 30, fontWeight: '700' }}>{item.title}</Text>
                        <Text style={{ color: 'white', fontSize: 24, }}>{item.artist}</Text>
                    </View>
                    <Modal isVisible={isVisible} animationIn={"slideInUp"} style={{ margin: 0, flex: 1, }}>
                        <View style={{ backgroundColor: '#202021', flex: 0.8, top: 90, borderTopLeftRadius: 25, borderTopRightRadius: 25 }}>
                            <View style={{ padding: 5, flexDirection: "row", backgroundColor: '#282828', justifyContent: 'space-between', height: 100, borderTopLeftRadius: 25, borderTopRightRadius: 25, borderBottomColor: "#383938", borderBottomWidth: 1 }}>
                                <View style={{ flexDirection: 'row' }}>

                                    <View style={{ justifyContent: "center", padding: 8 }}>
                                        <Image source={{ uri: songName.artwork }} style={{ width: 25, height: 25 }} />
                                    </View>
                                    <View style={{ justifyContent: "center", padding: 8 }}>

                                        <Text style={{ color: "#fefffe", fontSize: 24 }}>
                                            {songName.title}
                                        </Text>
                                        <Text style={{ color: "#bababa", }}>
                                            {songName.artist}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={() => setIsVisible(false)}>

                                        <IconEn name="cross" color="white" size={24} fontWeight="100" />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{ padding: 8, }}>
                                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => shareSong(songName)}>
                                    <View style={{ justifyContent: 'center', marginLeft: '2%' }}>

                                        <MaterialCommunityIcons name="share-outline" color="#fefffe" size={24} />
                                    </View>
                                    <View style={{ justifyContent: 'center', marginLeft: '2%' }}>

                                        <Text style={{ color: '#fefffe', fontSize: 18 }}> Share</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </Modal>
                </Animated.View>

            </>

        )

    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(62,31,21,255)" }}>
            {/* <TouchableOpacity onPress={() => TrackPlayer.play()}>

                <Text>SATRT</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => TrackPlayer.pause()}>
                <Text>PAUSE</Text> chevron-thin-down
            </TouchableOpacity> */}
            <View style={{ flexDirection: 'row', justifyContent: "space-between", margin: '2%' }}>
                <View>
                    <IconEn name="chevron-thin-down" color="white" size={24} />
                </View>
                <View>
                    <TouchableOpacity onPress={() => setIsVisible(true)}>

                        <IconEn name="dots-three-vertical" color="white" size={24} />
                    </TouchableOpacity>
                </View>

            </View>
            <Animated.FlatList
                ref={songSlider}
                data={Data}
                style={{ flex: 0.8, }}
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
                                contentOffset: { x: scrollX },
                            },
                        },
                    ],
                    { useNativeDriver: true },
                )}
                renderItem={(item, index) => renderSongs(item, index)}
            />

            <View style={{ flex: 0.6, alignItems: 'center' }}>

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
                <View style={{ flexDirection: 'row', justifyContent: "space-around", width: "60%" }}>
                    <TouchableOpacity onPress={() => skipToPrevious()} style={{ justifyContent: 'center' }}>
                        <Icon name="play-skip-back" size={30} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => playMusic(playBackState)}>
                        <Icon name={playBackState === State.Playing
                            ? 'ios-pause-circle'
                            : 'ios-play-circle'} size={70} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => skipToNext()} style={{ justifyContent: 'center' }}>
                        <Icon name="play-skip-forward" size={30} color="white" />
                    </TouchableOpacity>
                </View>
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
        justifyContent: 'flex-end',
        alignItems: 'center',
        // marginTop: 25,
        // backgroundColor:"red"
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