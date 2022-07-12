import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import CalendarScreen from '../screens/calendar_screen';
import AddClassScreen from '../screens/student/add_class_screen';
import AddNonHWScreen from '../screens/student/add_non_hw_screen';
import ScheduleOptionsScreen from '../screens/student/schedule_options';
import TaskListScreen from '../screens/student/student_tasklist';

export type SideBarList = {
  Calendar: undefined;
  AddClass: undefined;
  Task: undefined;
  AddNonHW: undefined;
  Assignments: undefined;
  ScheduleOptions: undefined;
  Extracurricular: undefined;
};

const Drawer = createDrawerNavigator<SideBarList>();

function StudentStack() {
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

export default StudentStack;
