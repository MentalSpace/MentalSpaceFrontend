import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/login_screen';
import SignupScreen from '../screens/signup_screen';
import MainStack from './main_stack';

const Stack = createNativeStackNavigator();

export type LoginStackList = {
    Login: undefined;
    Signup: undefined;
    Home: undefined;
};

function LoginStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Login" component={LoginScreen}/>
                <Stack.Screen name="Signup" component={SignupScreen}/>
                <Stack.Screen name="Home" component={MainStack}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default LoginStack;
