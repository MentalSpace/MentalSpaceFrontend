import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import LoginScreen from '../screens/login_screen';
import ResetScreen from '../screens/password_reset';
import StudentRegistration from '../screens/student_registration';
import StudentSignup from '../screens/student_signup';
import TeacherRegistration from '../screens/teacher_registration';
import TeacherSignup from '../screens/teacher_signup';
import MainStack from './main_stack';

const Stack = createNativeStackNavigator();

export type LoginStackList = {
  Login: undefined;
  TeacherSignup: undefined;
  StudentSignup: undefined;
  TeacherRegistration: undefined;
  StudentRegistration: undefined;
  Home: undefined;
  Reset: undefined;
  SignOut: undefined;

};

function LoginStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="TeacherSignup" component={TeacherSignup} />
        <Stack.Screen name="StudentSignup" component={StudentSignup} />
        <Stack.Screen
          name="TeacherRegistration"
          component={TeacherRegistration}
        />
        <Stack.Screen
          name="StudentRegistration"
          component={StudentRegistration}
        />
        <Stack.Screen name="Home" component={MainStack} />
        <Stack.Screen name="Reset" component={ResetScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default LoginStack;
