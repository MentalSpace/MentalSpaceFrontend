import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from 'native-base';
import React, { useState } from 'react';

import CalendarScreen from '../screens/calendar_screen';
import LoginScreen from '../screens/login_screen';
import AddClassScreen from '../screens/student/add_class_screen';
import AddExtracurricular from '../screens/student/add_non_hw_screen';
import AddNonHWScreen from '../screens/student/add_non_hw_screen';
import ScheduleOptionsScreen from '../screens/student/schedule_options';
import StudentMenu from '../screens/student/student_menu';
import TaskListScreen from '../screens/student/student_tasklist';
import Sidebar from './customDrawer';
import LoginStack, { LoginStackList } from './login_stack';

export type SideBarList = {
  Calendar: undefined;
  Enroll: undefined;
  SchedueleHomework: undefined;
  HomeworkAdjustments: undefined;
  Extracurriculars: undefined;
  ScheduleOptions: undefined;
  Events: undefined;
  SignOut: undefined;
};

const Drawer = createDrawerNavigator<SideBarList>();

function StudentStack(){

  return (
    <NavigationContainer independent>
      <Drawer.Navigator initialRouteName="Calendar">
        <Drawer.Screen name="Calendar" component={CalendarScreen} />
        <Drawer.Screen name="Enroll" component={AddClassScreen} />
        <Drawer.Screen name = "SchedueleHomework" component={TaskListScreen}/>
        <Drawer.Screen name="HomeworkAdjustments" component={TaskListScreen} />
        <Drawer.Screen name="Events" component= {CalendarScreen}/>
        <Drawer.Screen name="Extracurriculars" component={AddExtracurricular} />
        <Drawer.Screen
          name="ScheduleOptions"
          component={ScheduleOptionsScreen}
        />
        <Drawer.Screen name = "SignOut" component ={LoginScreen}/>
        {/* TODO: find a way to properly implement sign out.*/}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default StudentStack;
