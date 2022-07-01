import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/login_screen';
import TeacherSignup from '../screens/teacher_signup';
import StudentSignup from '../screens/student_signup';
import MainStack from './main_stack';
import ResetScreen from '../screens/password_reset';

const Stack = createNativeStackNavigator();

export type LoginStackList = {
    Login: undefined;
    Teacher: undefined;
    Student: undefined;
    Home: undefined;
    Reset: undefined;
};

function LoginStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Login" component={LoginScreen}/>
                <Stack.Screen name="Teacher" component={TeacherSignup}/>
                <Stack.Screen name="Student" component={StudentSignup}/>
                <Stack.Screen name="Home" component={MainStack}/>
                <Stack.Screen name="Reset" component={ResetScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default LoginStack;
