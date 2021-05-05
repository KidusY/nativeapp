import React,{useState} from 'react'
import { View, Text, ScrollView, StyleSheet, TextInput,Button,Dimensions,TouchableOpacity, Touchable } from 'react-native';
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
                <Text style={styles.label}> Write Something </Text>
                    <TextInput style={styles.textInput} value={textInput} onChangeText={(input) => setTextInput(input) }/>
                    <TouchableOpacity onPress={speak}  style={styles.talkBtn}>
                        <Text style={{color:"white", textAlign:"center"}}> Talk </Text>
                    </TouchableOpacity>
                   
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
    talkBtn:{
        width: 100,
        height: 40,
        backgroundColor: "#4D1F81",
        alignSelf: 'center',
        justifyContent: "center",
        borderRadius: 10
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
  

})

export default page2
