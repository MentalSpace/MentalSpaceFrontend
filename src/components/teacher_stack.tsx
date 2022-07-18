import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import CalendarScreen from '../screens/calendar_screen';
// import AssignmentsScreen from '../screens/teacher/teacher_assignment_screen';
//import TeacherClassScreen from '../screens/teacher/teacher_class';
//import EditAssignmentsScreen from '../screens/teacher/teacher_edit_assignment_screen';

export type SideBarList = {
  Calendar: undefined;
  //Assignments: undefined;
  //EditAssignments: undefined;
  //TeacherClass: undefined;
};

const Drawer = createDrawerNavigator<SideBarList>();

function StudentStack() {
  return (
    <NavigationContainer independent>
      <Drawer.Navigator initialRouteName="Calendar">
        <Drawer.Screen name="Calendar" component={CalendarScreen} />
        {/* <Drawer.Screen name="Assignments" component={AssignmentsScreen} />
        <Drawer.Screen
          name="EditAssignments"
          component={EditAssignmentsScreen}
        /> */}
        {/* <Drawer.Screen name="TeacherClass" component={TeacherClassScreen} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default StudentStack;
