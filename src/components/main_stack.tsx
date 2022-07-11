import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import AddClassScreen from '../screens/add_class_screen';
import AddNonHWScreen from '../screens/add_non_hw_screen';
import CalendarScreen from '../screens/calendar_screen';
import TaskListScreen from '../screens/student_tasklist';
import AssignmentsScreen from '../screens/teacher_assignment_screen';
import ScheduleOptionsScreen from "../screens/schedule_options";

export type SideBarList = {
  Calendar: undefined;
  AddClass: undefined;
  Task: undefined;
  AddNonHW: undefined;
  Assignments: undefined;
  ScheduleOptions: undefined;
};

const Drawer = createDrawerNavigator<SideBarList>();

function MainStack() {
  return (
    <NavigationContainer independent>
      <Drawer.Navigator initialRouteName="Calendar">
        <Drawer.Screen name="Calendar" component={CalendarScreen} />
        <Drawer.Screen name="AddClass" component={AddClassScreen} />
        <Drawer.Screen name="Task" component={TaskListScreen} />
        <Drawer.Screen name="AddNonHW" component={AddNonHWScreen} />
        <Drawer.Screen name="Assignments" component={AssignmentsScreen} />
        <Drawer.Screen
          name="ScheduleOptions"
          component={ScheduleOptionsScreen}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default MainStack;
