import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from "react";
import CalendarScreen from "../screens/calendar_screen";
import AddClassScreen from "../screens/add_class_screen";

export type SideBarList = {
    Calendar: undefined;
    AddClass: undefined;
    SubscribeMenu: undefined;
};

const Drawer = createDrawerNavigator<SideBarList>();

function MainStack() {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator initialRouteName="Calendar">
        <Drawer.Screen name="Calendar" component={CalendarScreen} />
        <Drawer.Screen name="AddClass" component={AddClassScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default MainStack;
