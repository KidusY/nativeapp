import React,{useState} from 'react'
import { View, Text, ScrollView, StyleSheet, TextInput,Button,Dimensions } from 'react-native';
import BottomNav from '../component/bottomNavigationBar';
import * as Speech from 'expo-speech';
const { width } = Dimensions.get('screen');
const page2 = (props) => {
const [textInput,setTextInput] = useState('');


    const speak = () => {
        const thingToSay = textInput;
        Speech.speak(thingToSay);
    };
    return (
        <View style={{
            flex: 1, backgroundColor: "#111111"
        }}>
        <ScrollView>
            
                <View style={{margin:100}}>
                    <TextInput style={styles.textInput} value={textInput} onChangeText={(input) => setTextInput(input) }/>
                    <Button title="Press to hear some words" onPress={speak} />
                </View>

                <Text style={styles.textHeader}>{textInput}</Text>

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
    textHeader:{
        color:"white",
        fontSize:25,
        textAlign:"center",
    

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

export default page2
