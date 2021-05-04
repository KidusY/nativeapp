import React,{useState,useEffect} from 'react'
import { View, Text, Button,StyleSheet,Dimensions } from 'react-native';
import { Audio } from 'expo-av';
import { Asset, useAssets } from 'expo-asset';
const { width } = Dimensions.get('screen');
const page3 = () => {

    const [sound, setSound] = useState(new Audio.Sound());
    
   
    
    async function playSound() {
        console.log('Loading Sound');
        try{
            await sound.loadAsync(require('../assets/audioFile/A#major.wav'));
            await sound.playAsync();

            
            

           
        }
        catch(err){
            console.log(err)
        }
       
    }

    React.useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);


    return (
        <View style={styles.container}>
            <Text>Page3</Text>
            <Button title="Play Sound" onPress={playSound} />
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
        alignSelf: 'center',
        justifyContent: "center",
        borderRadius: 10


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

export default page3
