import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import TrackPlayer, { useProgress, Capability } from 'react-native-track-player';
import Slider from '@react-native-community/slider';

export default function Demo() {
    const progress = useProgress()
    const track1 = {
        url: 'https://firebasestorage.googleapis.com/v0/b/newprojecttraining-27f3e.appspot.com/o/tereVaste.mp3?alt=media&token=9e0181cd-a94c-494a-8cd8-786d2fac1eba', // Load media from the network
        title: 'Tere Vaste',
        artist: 'Ferish',
        album: 'while(1<2)',
        genre: 'Progressive House, Electro House',
        date: '2014-05-20T07:00:00+00:00', // RFC 3339
        artwork: 'https://firebasestorage.googleapis.com/v0/b/newprojecttraining-27f3e.appspot.com/o/martin-katler-94lAQc7ipNg-unsplash%20(1).jpg?alt=media&token=e5b2f3bc-5450-4301-8b7d-8d89a33fb0d4', // Load artwork from the network
        duration: 402 // Duration in seconds
    };

    const start = async () => {
        // Set up the player
        await TrackPlayer.setupPlayer();

        // Add a track to the queue
        await TrackPlayer.add(track1);
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
        // Start playing it

    };
    useEffect(() => { start() }, [])


    return (
        <SafeAreaView>
            {console.log("PROGRESS", progress)}
            <TouchableOpacity onPress={() => TrackPlayer.play()}>

                <Text>SATRT</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => TrackPlayer.pause()}>
                <Text>PAUSE</Text>
            </TouchableOpacity>

            <Image  source={{uri: track1.artwork}} style={{height:200, width:200}}/>
            <Slider
            style={{width: 200, height: 40}}
            value={progress.position}
            minimumValue={0}
            maximumValue={progress.duration}
            thumbTintColor="#FFD369"
            minimumTrackTintColor="#FFD369"
            maximumTrackTintColor="#fff"
            onSlidingComplete={async value => {
              await TrackPlayer.seekTo(value);
            }}

/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})