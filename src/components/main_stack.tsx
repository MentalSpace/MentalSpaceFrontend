import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import AddClassScreen from '../screens/add_class_screen';
import AddNonHWScreen from '../screens/add_non_hw_screen';
import CalendarScreen from '../screens/calendar_screen';
import TaskListScreen from '../screens/student_tasklist';
import AssignmentsScreen from '../screens/teacher_assignment_screen';

import {Menu, Pressable, Avatar, Switch } from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LoginStackList } from "../components/login_stack";

export type SideBarList = {
  Calendar: undefined;
  AddClass: undefined;
  Task: undefined;
  AddNonHW: undefined;
  Assignments: undefined;
};

type ProfileProps = NativeStackScreenProps<LoginStackList, 'SignOut'>;
const Drawer = createDrawerNavigator<SideBarList>();

function MainStack({navigation}:ProfileProps) {
  return (
    <NavigationContainer independent>
      <Drawer.Navigator initialRouteName="Calendar">
        <Drawer.Screen name="Calendar" component={CalendarScreen} />
        <Drawer.Screen name="AddClass" component={AddClassScreen} />
        <Drawer.Screen name="Task" component={TaskListScreen} />
        <Drawer.Screen name="AddNonHW" component={AddNonHWScreen} />
        <Drawer.Screen name="Assignments" component={AssignmentsScreen} />
      </Drawer.Navigator>
      
      <Menu trigger={triggerProps => {
    return (
      <Pressable 
        position='absolute' 
        height='60' 
        width='60' 
        top='0.5 '
        right= '2'
        bottom='5'
        justifyContent='center'
        alignItems='center'
        accessibilityLabel='More options menu' {...triggerProps}
      >
          <Avatar bg="#1697b7" source={{uri: "https://bit.ly/broken-link"}}>
          RM
          </Avatar>
      </Pressable>);
  }}>
    <Menu.Item onPress={() => navigation.navigate('Login')}>
      Sign Out
    </Menu.Item>
    <Menu.Item><Switch offTrackColor="orange.100" onTrackColor="light.800" onThumbColor="light.900" offThumbColor="orange.50" /></Menu.Item>
  </Menu>
    </NavigationContainer>
  );
}

export default MainStack;
