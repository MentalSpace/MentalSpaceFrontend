import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import LoginScreen from '../screens/login_screen';
import ResetScreen from '../screens/password_reset';
import StudentSignup from '../screens/student/student_signup';
import TeacherSignup from '../screens/teacher/teacher_signup';
import UserRegistration from '../screens/user_registration';
import StudentStack from './student_stack';

const Stack = createNativeStackNavigator();

export type LoginStackList = {
  Login: undefined;
  TeacherSignup: undefined;
  StudentSignup: undefined;
  UserRegistration: undefined;
  Home: undefined;
  Reset: undefined;
};

function LoginStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="TeacherSignup" component={TeacherSignup} />
        <Stack.Screen name="StudentSignup" component={StudentSignup} />
        <Stack.Screen name="UserRegistration" component={UserRegistration} />
        <Stack.Screen name="Home" component={StudentStack} />
        <Stack.Screen name="Reset" component={ResetScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default LoginStack;
