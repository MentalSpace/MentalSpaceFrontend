import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Box, Button, Heading } from 'native-base';
import React from 'react';

import CalendarScreen from '../screens/calendar_screen';
import AddClassScreen from '../screens/student/add_class_screen';
import AddNonHWScreen from '../screens/student/add_non_hw_screen';
import ScheduleOptionsScreen from '../screens/student/schedule_options';

export type SideBarList = {
  HomeworkSchedule: undefined;
  AddClass: undefined;
  Task: undefined;
  SchedulingPreferences: undefined;
  SubjectPreferences: undefined;
  Events: undefined;
  HomeworkAdjustments: undefined;
  Extracurricular: undefined;
};

const Drawer = createDrawerNavigator<SideBarList>();

function StudentStack() {
  return (
    <NavigationContainer independent>
      <Drawer.Navigator initialRouteName="HomeworkSchedule" drawerContent = {props => 
        {return (
        <>
        <Heading
          size="md"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}
          fontWeight="semibold"
          paddingTop="5"
          paddingBottom="30"
          alignSelf="center">
          Anderson Marlo
        </Heading>
        <DrawerItemList {...props} />
        <Box safeArea p="2" py="8" w="100%" maxW="290">
            <Button mt="10" backgroundColor = "#154c79">Sign Out</Button>
        </Box>
        </>
        );
        }
      }>
        <Drawer.Screen name = "HomeworkSchedule" component = {CalendarScreen}/>
        <Drawer.Screen name = "HomeworkAdjustments" component = {ScheduleOptionsScreen /*should be the homework adjustments screen*/}/>
        <Drawer.Screen name = "AddClass" component = {AddClassScreen}/>
        <Drawer.Screen name = "SchedulingPreferences" component = {ScheduleOptionsScreen}/>
        <Drawer.Screen name = "SubjectPreferences" component = {ScheduleOptionsScreen /*should be the subject preferences screen*/}/>
        <Drawer.Screen name = "Events" component = {AddNonHWScreen}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default StudentStack;
