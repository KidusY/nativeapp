import React, { useRef, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
const { width, height } = Dimensions.get('screen');
const map = ({ sourceLocation, destinationLocation, time, distance, showInput, initalLocation }) => {
    const mapRef = useRef(null);
    const [showDrivingRoute, setShowDrivingRoute] = useState(true)
    const [showBicycleRoute, setShowBicycleRoute] = useState(true)
    const [showTransitRoute, setShowTransitRoute] = useState(true)
    return (
        <View>
            { (!showInput && sourceLocation.length > 0 && destinationLocation.length > 0) &&
                <View>
                    <Text style={{ color: "white", fontSize: 20 }}>To: {destinationLocation[0].formatted_address}</Text>
                    <Text style={{ color: "white", fontSize: 16 }}>from: {sourceLocation[0].formatted_address}</Text>

                    <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                        <TouchableOpacity style={{ width: (width / 3) - 10, height: 30, backgroundColor: showDrivingRoute ? "blue" : "white" }}
                            onPress={() => { setShowDrivingRoute(!showDrivingRoute) }}
                        >
                            <Text style={styles.btnLable}>
                                Driving
                </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: (width / 3) - 10, height: 30, backgroundColor: showBicycleRoute ? "red" : "white" }}
                            onPress={() => setShowBicycleRoute(!showBicycleRoute)}
                        >
                            <Text style={styles.btnLable}>
                                Bicycle
               </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: (width / 3) - 10, height: 30, backgroundColor: showTransitRoute ? "green" : "white" }} onPress={() => setShowTransitRoute(!showTransitRoute)}>
                            <Text style={styles.btnLable}>

                                Transit
                </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
            {
                (sourceLocation.length > 0 && destinationLocation.length > 0) ?

                    <MapView

                        ref={mapRef}
                        showsUserLocation
                        showsTraffic
                        showsScale
                        style={styles.map}
                        focusable
                        initialRegion={
                            {
                                latitude: initalLocation.coords.latitude,
                                longitude:initalLocation.coords.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421
                            }

                        }
                        region={
                            {
                                latitude: sourceLocation[0].geometry.location.lat || initalLocation.coords.latitude,
                                longitude: sourceLocation[0].geometry.location.lng || initalLocation.coords.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421
                            }
                        }

                    >
                        <Marker

                            coordinate={{ latitude: sourceLocation[0].geometry.location.lat, longitude: sourceLocation[0].geometry.location.lng, }}

                        />
                        <Marker

                            coordinate={{ latitude: destinationLocation[0].geometry.location.lat, longitude: destinationLocation[0].geometry.location.lng, }}

                        />
                        {showDrivingRoute &&
                            <MapViewDirections
                                mode={"BICYCLING"}
                                origin={{ latitude: sourceLocation[0].geometry.location.lat, longitude: sourceLocation[0].geometry.location.lng, }}
                                destination={{ latitude: destinationLocation[0].geometry.location.lat, longitude: destinationLocation[0].geometry.location.lng, }}
                                apikey={"AIzaSyCcvdislrno2kTBUQoYr2nEaSJic7V0HAw"}
                                strokeWidth={10}
                                strokeColor={"hotpink"}
                                onReady={result => {


                                    mapRef.current.fitToCoordinates(result.coordinates, {
                                        edgePadding: {
                                            right: width / 20,
                                            bottom: height / 20,
                                            left: width / 20,
                                            top: height / 20
                                        }
                                    });

                                }}
                            />}
                        {showBicycleRoute &&
                            <MapViewDirections

                                mode={"DRIVING"}
                                origin={{ latitude: sourceLocation[0].geometry.location.lat, longitude: sourceLocation[0].geometry.location.lng, }}
                                destination={{ latitude: destinationLocation[0].geometry.location.lat, longitude: destinationLocation[0].geometry.location.lng, }}
                                apikey={"AIzaSyCcvdislrno2kTBUQoYr2nEaSJic7V0HAw"}
                                strokeWidth={10}
                                strokeColor={"blue"}
                                onReady={result => {


                                    mapRef.current.fitToCoordinates(result.coordinates, {
                                        edgePadding: {
                                            right: width / 20,
                                            bottom: height / 20,
                                            left: width / 20,
                                            top: height / 20
                                        }
                                    });

                                }}
                            />}
                        {
                            showTransitRoute &&
                            <MapViewDirections
                                mode={"TRANSIT"}
                                origin={{ latitude: sourceLocation[0].geometry.location.lat, longitude: sourceLocation[0].geometry.location.lng, }}
                                destination={{ latitude: destinationLocation[0].geometry.location.lat, longitude: destinationLocation[0].geometry.location.lng, }}
                                apikey={"AIzaSyCcvdislrno2kTBUQoYr2nEaSJic7V0HAw"}
                                strokeWidth={10}
                                strokeColor={"green"}
                                onReady={result => {


                                    mapRef.current.fitToCoordinates(result.coordinates, {
                                        edgePadding: {
                                            right: width / 20,
                                            bottom: height / 20,
                                            left: width / 20,
                                            top: height / 20
                                        }
                                    });

                                }}
                            />}
                        {/* <MapView.Polyline
                                strokeWidth={2}
                                strokeColor="blue"
                                coordinates={coords}
                            /> */}

                    </MapView>

                    :
                    <View>
                        <Text style={styles.label}>Make sure you put in a correct address</Text>
                    </View>

            }
        </View>
    )
}

const styles = StyleSheet.create({

    label: {
        color: "white",
        marginLeft: 50,
        fontSize: 20

    },
    btnLable: {
        textAlign: 'center'
    },
    textInput: {
        borderColor: "white",
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
        margin: 100,
        alignSelf: "center",
    },
    map: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },

})

export default map
