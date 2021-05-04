import React, { useState, useEffect, useRef } from 'react'
import { View, Text, ScrollView, StyleSheet, TextInput, Dimensions, Button, TouchableOpacity } from 'react-native';
import BottomNav from '../component/bottomNavigationBar';

import Polyline from '@mapbox/polyline'
import axios from 'axios';


import Map from '../component/map';

import * as Location from 'expo-location';
//AIzaSyCcvdislrno2kTBUQoYr2nEaSJic7V0HAw
const { width } = Dimensions.get('screen');
const page1 = (props) => {
    const [sourceInput, setSourceInput] = useState('')
    const [DestinationInput, setDestinationInput] = useState('')
    const [showInput, setShowInput] = useState(true);

    const [sourceLocation, setSourceLocation] = useState([])
    const [destinationLocation, setDestinationLocation] = useState([]);

    const [coords, setCoords] = useState(null);
    const [time, setTime] = useState(null);
    const [distance, setDistance] = useState(null);

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const mapRef = useRef(null);
    useEffect(() => {

        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    //  const { latitude, longitude} = location;



    searchForLocation = async (source, destination) => {
        let searchedSource = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?key=AIzaSyCcvdislrno2kTBUQoYr2nEaSJic7V0HAw&input=${source}`)


        let searchedDestination = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?key=AIzaSyCcvdislrno2kTBUQoYr2nEaSJic7V0HAw&input=${destination}`);

        setSourceLocation(searchedSource.data.results);
        setDestinationLocation(searchedDestination.data.results);
        getDirections(source, destination)
    }

    getDirections = async (startLoc, desLoc) => {
        try {
            const resp = await axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${desLoc}&key=AIzaSyCcvdislrno2kTBUQoYr2nEaSJic7V0HAw`)


            const response = resp.data.routes[0]
            const distanceTime = response.legs[0]
            const distance = distanceTime.distance.text
            const time = distanceTime.duration.text
            const points = Polyline.decode(response.overview_polyline.points);
            const coords = points.map(point => {
                return {
                    latitude: point[0],
                    longitude: point[1]
                }
            })
            setCoords(coords)
            setDistance(distance)
            setTime(time)
        } catch (error) {
            console.log('Error: ', error)
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#111111" }}>
            <ScrollView>
                <View style={styles.container}>

                    {showInput ?
                        <View>
                            <Text style={styles.label}>Source</Text>
                            <TextInput style={styles.textInput} value={sourceInput} onChangeText={(input) => setSourceInput(input)} />
                            <Text style={styles.label}>Destination</Text>
                            <TextInput style={styles.textInput} value={DestinationInput} onChangeText={(input) => setDestinationInput(input)} />
                            <TouchableOpacity style={styles.button} onPress={() => {
                                searchForLocation(sourceInput, DestinationInput);
                                setShowInput(false);
                            }} >
                                <Text style={{textAlign:"center",padding:5,color:"white",fontWeight:"800"}}> Go </Text>
                            </TouchableOpacity>
                        </View> :
                        <TouchableOpacity title="Back" onPress={() => setShowInput(true)} />
                    }


                    {
                        location &&
                        <Map initialLocation={location} sourceLocation={sourceLocation} destinationLocation={destinationLocation} time={time} distance={distance} showInput={showInput} />


                    }



                </View>
            </ScrollView>

            <BottomNav navigation={props.navigation.navigate} />
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        color: "white",
        marginLeft: 50,
        fontSize: 20

    },
    button: {
        width: 100,
        height: 40,
        backgroundColor: "#4D1F81",
        alignSelf:'center',
        justifyContent:"center",
        borderRadius:10
        
        
    },
    textInput: {
        borderColor: "#4D1F81",
        borderWidth: 2,
        width: width - 100,
        height: 60,
        justifyContent: "center",
        alignItems: 'center',
        alignSelf: "center",
        borderRadius: 10,
        color: "white",
        fontSize: 20,
        marginBottom: 10
    },
    container: {
        width: width - 10,
        margin: 70,
        alignSelf: "center",
    },
    map: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },

})

export default page1
