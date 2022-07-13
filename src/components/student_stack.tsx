import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Menu, Pressable, Avatar, Switch } from 'native-base';
import React from 'react';

import { LoginStackList } from '../components/login_stack';
import CalendarScreen from '../screens/calendar_screen';
import AddClassScreen from '../screens/student/add_class_screen';
import AddNonHWScreen from '../screens/student/add_non_hw_screen';
import ScheduleOptionsScreen from '../screens/student/schedule_options';
import StudentMenu from '../screens/student/student_menu';
import TaskListScreen from '../screens/student/student_tasklist';

export type SideBarList = {
  Menu: undefined;
  Calendar: undefined;
  AddClass: undefined;
  Task: undefined;
  AddNonHW: undefined;
  ScheduleOptions: undefined;
  Extracurricular: undefined;
};

type ProfileProps = NativeStackScreenProps<LoginStackList, 'SignOut'>;
const Drawer = createDrawerNavigator<SideBarList>();

function StudentStack({ navigation }: ProfileProps) {
  return (
    <NavigationContainer independent>
      <Drawer.Navigator initialRouteName="Menu">
        <Drawer.Screen name="Menu" component={StudentMenu} />
        <Drawer.Screen name="Calendar" component={CalendarScreen} />
        <Drawer.Screen name="AddClass" component={AddClassScreen} />
        <Drawer.Screen name="Task" component={TaskListScreen} />
        <Drawer.Screen name="AddNonHW" component={AddNonHWScreen} />
        <Drawer.Screen
          name="ScheduleOptions"
          component={ScheduleOptionsScreen}
        />
      </Drawer.Navigator>

      <Menu
        trigger={(triggerProps) => {
          return (
            <Pressable
              position="absolute"
              height="60"
              width="60"
              top="0.5 "
              right="2"
              bottom="5"
              justifyContent="center"
              alignItems="center"
              accessibilityLabel="More options menu"
              {...triggerProps}
            >
              <Avatar
                bg="#1697b7"
                source={{ uri: 'https://bit.ly/broken-link' }}
              >
                RM
              </Avatar>
            </Pressable>
          );
        }}
      >
        <Menu.OptionGroup title="Options" type="radio">
          <Menu.Item onPress={() => navigation.navigate('Login')}>
            Sign Out
          </Menu.Item>
        </Menu.OptionGroup>
        <Menu.OptionGroup title="Change Appearance" type="radio">
          <Menu.Item>
            <Switch
              offTrackColor="orange.100"
              onTrackColor="light.800"
              onThumbColor="light.900"
              offThumbColor="orange.50"
            />
          </Menu.Item>
        </Menu.OptionGroup>
      </Menu>
    </NavigationContainer>
  );
}

export default StudentStack;
