import React, { useRef, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
const { width, height } = Dimensions.get('screen');
const map = ({ sourceLocation, destinationLocation, time, distance, showInput, initialLocation, setShowInput }) => {
    const mapRef = useRef(null);
    const [showDrivingRoute, setShowDrivingRoute] = useState(true)
    const [showBicycleRoute, setShowBicycleRoute] = useState(true)
    const [showTransitRoute, setShowTransitRoute] = useState(true)

    const apiKey = '' // api key
    return (
        <View>
            {
                (sourceLocation && destinationLocation) &&
                <View>
                    {(!showInput && sourceLocation.length > 0 && destinationLocation.length > 0) &&
                        <View>
                        <TouchableOpacity title="Back" onPress={() => setShowInput(true)}> 
                            <Text style={{ color:"#c62828"}}> <AntDesign name="back" size={24} color="#c62828" /> Back</Text>

                         </TouchableOpacity>
                            <Text style={{ color: "white", fontSize: 20 }}>To: {destinationLocation[0].formatted_address}</Text>
                            <Text style={{ color: "white", fontSize: 16 }}>from: {sourceLocation[0].formatted_address}</Text>

                            <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                            <TouchableOpacity style={{ width: (width / 3) - 10, height: 30, backgroundColor: showDrivingRoute ? "#283593" : "white", borderRadius: 10 }}
                                    onPress={() => { setShowDrivingRoute(!showDrivingRoute) }}
                                >
                                <Text style={{...styles.btnLable, color: showDrivingRoute ? "white" : "black"}}>
                                        Driving
                </Text>
                                </TouchableOpacity>
                            <TouchableOpacity style={{ width: (width / 3) - 10, height: 30, backgroundColor: showBicycleRoute ? "#d32f2f" : "white", color: showDrivingRoute ? "white" : "black", borderRadius: 10 }}
                                    onPress={() => setShowBicycleRoute(!showBicycleRoute)}
                                >
                                <Text style={{ ...styles.btnLable, color: showDrivingRoute ? "white" : "black" }}>
                                        Bicycle
               </Text>
                                </TouchableOpacity>
                            <TouchableOpacity style={{ width: (width / 3) - 10, height: 30, backgroundColor: showTransitRoute ? "#2e7d32" : "white", color: showDrivingRoute ? "white" : "black", borderRadius: 10 }} onPress={() => setShowTransitRoute(!showTransitRoute)}>
                                <Text style={{ ...styles.btnLable, color: showDrivingRoute ? "white" : "black" }}>

                                        Transit
                </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                </View>
            }

            {


                <MapView

                    ref={mapRef}
                    showsUserLocation
                    showsTraffic
                    showsScale
                    style={styles.map}
                    focusable
                    initialRegion={
                        {
                            latitude: initialLocation.coords.latitude,
                            longitude: initialLocation.coords.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421
                        }

                    }
                    region={
                        {
                            latitude: sourceLocation[0]?.geometry.location.lat || initialLocation.coords.latitude,
                            longitude: sourceLocation[0]?.geometry.location.lng || initialLocation.coords.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421
                        }
                    }

                >
                   { ( sourceLocation.length > 0 && destinationLocation.length > 0 ) &&
                   <View>
                    <Marker

                        coordinate={{ latitude: sourceLocation[0].geometry.location.lat, longitude: sourceLocation[0].geometry.location.lng, }}

                    />
                    <Marker

                        coordinate={{ latitude: destinationLocation[0].geometry.location.lat, longitude: destinationLocation[0].geometry.location.lng, }}

                    />
                    </View>
                    }

                    {(showDrivingRoute && (sourceLocation.length > 0 && destinationLocation.length > 0 ) ) &&
                        <MapViewDirections
                            mode={"BICYCLING"}
                            origin={{ latitude: sourceLocation[0]?.geometry.location.lat, longitude: sourceLocation[0]?.geometry.location.lng, }}
                            destination={{ latitude: destinationLocation[0]?.geometry.location.lat, longitude: destinationLocation[0]?.geometry.location.lng, }}
                        apikey={apiKey}
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
                    {(showBicycleRoute && (sourceLocation.length > 0 && destinationLocation.length > 0 ) ) &&
                        <MapViewDirections

                            mode={"DRIVING"}
                            origin={{ latitude: sourceLocation[0]?.geometry.location.lat, longitude: sourceLocation[0]?.geometry.location.lng, }}
                            destination={{ latitude: destinationLocation[0]?.geometry.location.lat, longitude: destinationLocation[0]?.geometry.location.lng, }}
                        apikey={apiKey}
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
                       ( showTransitRoute && (sourceLocation.length > 0 && destinationLocation.length > 0 ) ) &&
                        <MapViewDirections
                            mode={"TRANSIT"}
                            origin={{ latitude: sourceLocation[0]?.geometry.location.lat, longitude: sourceLocation[0]?.geometry.location.lng, }}
                            destination={{ latitude: destinationLocation[0]?.geometry.location.lat, longitude: destinationLocation[0]?.geometry.location.lng, }}
                            apikey={apiKey}
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

                </MapView>



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
        textAlign: 'center',
        alignSelf:'center',
        justifyContent:'center'
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
