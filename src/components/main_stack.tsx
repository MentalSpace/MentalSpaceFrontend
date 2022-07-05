import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from "react";
import CalendarScreen from "../screens/calendar_screen";
import AddClassScreen from "../screens/add_class_screen";
import TaskListScreen from "../screens/g1";

export type SideBarList = {
    Calendar: undefined;
    AddClass: undefined;
    Task: undefined;
};

const Drawer = createDrawerNavigator<SideBarList>();

function MainStack() {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator initialRouteName="Calendar">
        <Drawer.Screen name="Calendar" component={CalendarScreen} />
        <Drawer.Screen name="AddClass" component={AddClassScreen} />
        <Drawer.Screen name="Task" component={TaskListScreen} />

      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default MainStack;
