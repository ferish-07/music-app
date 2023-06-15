import { ActivityIndicator, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import TrackPlayer, { useProgress, Capability, usePlaybackState, State } from 'react-native-track-player';
import Icon from 'react-native-vector-icons/Ionicons';

import Slider from '@react-native-community/slider';
import Data from '../data/Data';

export default function MusicPlayer({ route }) {
    const { index, data } = route.params
    const playBackState = usePlaybackState();
    console.log("INDEXXBGDBHDHD", index)
    const [isLoading, setIsLoading] = useState(true)
    const [imageLoading, setImageLoading] = useState(0)
    const progress = useProgress()


    const start = async () => {
        // Set up the player
        await TrackPlayer.setupPlayer();

        // Add a track to the queue
        await TrackPlayer.add(data);
        await TrackPlayer.updateOptions({
            stopWithApp: true,
            capabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
                Capability.Stop,
                // Capability.JumpForward
            ],
            compactCapabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
                // Capability.JumpForward

            ],
            notificationCapabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
                // Capability.JumpForward

            ],
        });

        // TrackPlayer.skip(index)
        // Start playing it

    };
    useEffect(() => {
        console.log("hjdgsfhsvdjsfgvdhjsbfv")
    }, [imageLoading])
    useEffect(() => {
        start()
    }, [])
    console.log("DATAATAA FROM DATA FILER", Data)
    const playMusic = async (playBackState) => {
        const currentTrack = await TrackPlayer.getCurrentTrack();
        console.log(currentTrack, playBackState, State.Playing);
        if (currentTrack != null) {
            if (playBackState == State.Paused) {
                await TrackPlayer.play();
            } else {
                await TrackPlayer.pause();
            }
        }


    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#3f1e15', justifyContent: 'center', alignItems: "center" }}>
            {/* <TouchableOpacity onPress={() => TrackPlayer.play()}>

                <Text>SATRT</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => TrackPlayer.pause()}>
                <Text>PAUSE</Text>
            </TouchableOpacity> */}

            <Image source={{ uri: data.artwork }} style={{ height: 250, width: 250, borderRadius: 10 }} onLoadEnd={() => { setIsLoading(false), setImageLoading(imageLoading + 1) }} />
            <View>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: "bold" }}>{data.title}</Text>
            </View>
            <ActivityIndicator animating={isLoading} size="large" color="white"
                style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', width: '100%', height: "100%", }} />
            <Slider
                style={{ width: "80%", }}
                value={progress.position}
                minimumValue={0}
                maximumValue={progress.duration}
                thumbTintColor="white"
                minimumTrackTintColor="#FFD369"
                maximumTrackTintColor="grey"
                onSlidingComplete={async value => {
                    await TrackPlayer.seekTo(value);
                }}

            />

            <TouchableOpacity onPress={() => playMusic(playBackState)}>
                <Icon name={playBackState === State.Playing
                    ? 'ios-pause-circle'
                    : 'ios-play-circle'} size={70} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => TrackPlayer.skipToNext()}>
                <Text>
                    NEXT
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => TrackPlayer.skipToPrevious()}>
                <Text>
                    NEXT
                </Text>
            </TouchableOpacity>
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

const styles = StyleSheet.create({})