import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from "react";
import CalendarScreen from "../screens/calendar_screen";
import AddClassScreen from "../screens/add_class_screen";
import AssignmentsScreen from "../screens/teacher_assignments_screen";
import TaskListScreen from "../screens/student_tasklist";
import AddNonHWScreen from "../screens/add_non_hw_screen";

export type SideBarList = {
    Calendar: undefined;
    AddClass: undefined;
    Assignments: undefined;
    Task: undefined;
    AddNonHW: undefined
};

const Drawer = createDrawerNavigator<SideBarList>();

function MainStack() {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator initialRouteName="Calendar">
        <Drawer.Screen name="Calendar" component={CalendarScreen} />
        <Drawer.Screen name="AddClass" component={AddClassScreen} />
        <Drawer.Screen name ="Assignments" component={AssignmentsScreen}/>
        <Drawer.Screen name="Task" component={TaskListScreen} />
        <Drawer.Screen name="AddNonHW" component={AddNonHWScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default MainStack;
