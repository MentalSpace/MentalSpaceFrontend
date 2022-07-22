import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import React from 'react';
import ClassPeriodsScreen from '../screens/teacher/teacher_class';
import AssignmentTypesScreen from '../screens/teacher/types';
import SubjectsScreen from '../screens/teacher/subjects';
import SchoolsScreen from '../screens/teacher/schools';

export type SideBarList = {
  Calendar: undefined;
  ClassPeriods: undefined;
  AssignmentTypes: undefined;
  Subjects: undefined;
  Schools: undefined;
};

const Drawer = createDrawerNavigator<SideBarList>();

function TeacherStack() {
  return (
    <NavigationContainer independent>
      <Drawer.Navigator initialRouteName="ClassPeriods">
        <Drawer.Screen name="ClassPeriods" component={ClassPeriodsScreen} />
        <Drawer.Screen
          name="AssignmentTypes"
          component={AssignmentTypesScreen}
        />
        <Drawer.Screen name="Subjects" component={SubjectsScreen} />
        <Drawer.Screen name="Schools" component={SchoolsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default TeacherStack;
