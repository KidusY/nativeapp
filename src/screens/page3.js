import React, { useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet, Dimensions, TouchableOpacity, Image,ScrollView } from 'react-native';
import BottomNav from '../component/bottomNavigationBar'
import { Audio } from 'expo-av';
//import { Asset, useAssets } from 'expo-asset';
//import Sound from 'react-native-sound'
const { width, height } = Dimensions.get('screen');
const page3 = (props) => {

    // const [sound, setSound] = useState(new );
    const [playLeft, setPlayLeft] = useState(false);


    async function playSound() {
        setPlayLeft(true)
        const soundObject = new Audio.Sound()

        try {
            const source = require('../../assets/audioFile/A#major.wav')
            console.log(source);

            await soundObject.loadAsync(source)
            await soundObject
                .playAsync()
                .then(async playbackStatus => {
                    setTimeout(() => {
                        soundObject.unloadAsync()
                    }, playbackStatus.playableDurationMillis)
                })
                .catch(error => {
                    console.log(error)
                })
        } catch (error) {
            console.log(error)
        }

    }



    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
         <ScrollView>
            <View style={{ marginTop: 70 }}>


                <View>
                    <View style={styles.head}>
                        <Image source={require('../../assets/8Txo9zaTp.jpg')} style={{

                            width: 100,
                            height: 100,

                            justifyContent: "center",





                        }} />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: "center" }}>
                        <View style={styles.body}>

                        </View>
                        <View style={{ ...styles.hand, transform: playLeft ? [{ skewX: '30deg' }, { skewY: '30deg' }] : [{ skewX: '0deg' }, { skewY: '0deg' }] }}>

                        </View>
                        <View style={styles.instrument}>

                        </View>
                    </View>

                </View>

                <TouchableOpacity style={styles.playBtn} onPressIn={() => playSound()} onPressOut={() => setPlayLeft(false)}>
                    <Text style={{ textAlign: 'center' }}>Play</Text>

                </TouchableOpacity>

            </View>
             </ScrollView>
            <BottomNav navigation={props.navigation.navigate} />
        </View>
    )
}

const styles = StyleSheet.create({
    head: {
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundColor: "black",
        marginLeft: 60

    },
    body: {
        width: 100,
        height: 300,
        backgroundColor: "black",
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 60,
        marginTop: 10
    },

    hand: {
        width: 100,
        height: 50,
        backgroundColor: "black",
        marginTop: 100,
        borderRadius: 20,

    },
    instrument: {
        width: 100,
        height: 100,
        marginTop: 170,
        backgroundColor: "black",
    },
    playBtn: {
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: "center",
        borderRadius: 100,
        backgroundColor: "grey"
    }
    ,


    container: {
        width: width - 10,
        minHeight: height,

        alignSelf: "center",
        backgroundColor: "white",
        flex: 1,
        justifyContent: 'center',
        alignContent: "center"

    },


})

export default page3
