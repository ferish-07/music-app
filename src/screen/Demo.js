import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import TrackPlayer, { useProgress, Capability } from 'react-native-track-player';

export default function Demo() {
    const progress = useProgress()
    const track1 = {
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Load media from the network
        title: 'Avaritia',
        artist: 'deadmau5',
        album: 'while(1<2)',
        genre: 'Progressive House, Electro House',
        date: '2014-05-20T07:00:00+00:00', // RFC 3339
        artwork: 'http://example.com/cover.png', // Load artwork from the network
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
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})