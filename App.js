import React from 'react';
import { createAppContainer} from 'react-navigation'
import { createStackNavigator } from "react-navigation-stack";
import { StyleSheet, Text, View } from 'react-native';
import Page1 from './src/screens/page1'
import Page2 from './src/screens/page2'
import Page3 from './src/screens/page3'
const navigator = createStackNavigator(
  {
    Page1,
    Page2,
    Page3,
    
   
  },
  {
    initialRouteName: "Page1",
    headerMode: "none",
  }
);
const App = createAppContainer(navigator);

export default () => {
  return ( 
      <App />  
  );
};

