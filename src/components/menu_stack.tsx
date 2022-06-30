import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Calendar from '../screens/calendar_screen';
import SubscribeMenu from '../screens/SubscribeMenu';


const Stack = createNativeStackNavigator();

export type MenuList = {
  Calendar: undefined;
  SubscribetoClasses: undefined;
};

function MenuStack(){
    return (
      <NavigationContainer independent = {true}>
        <Stack.Navigator initialRouteName="Calendar">
          <Stack.Screen name = "Calendar" component = {Calendar}/>
          <Stack.Screen name = "SubscribetoClasses" component = {SubscribeMenu}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
}

export default MenuStack;

