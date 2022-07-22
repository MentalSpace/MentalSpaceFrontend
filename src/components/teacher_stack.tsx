import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Box, Button, Heading } from 'native-base';
import React from 'react';

import CalendarScreen from '../screens/calendar_screen';
import AddAssignmentsScreen from '../screens/teacher/teacher_add_assignment_screen';
// import EditAssignmentsScreen from '../screens/teacher/teacher_edit_assignment_screen';
// import TeacherClassScreen from '../screens/teacher/teacher_class';

export type SideBarList = {
  Assignments: undefined;
  Subjects: undefined;
  ClassPeriods: undefined;
  Students: undefined;
  AddAssignments: undefined;
  // EditAssignments: undefined;
  // TeacherClass: undefined;
};

const Drawer = createDrawerNavigator<SideBarList>();

function TeacherStack() {
  return (
    <NavigationContainer independent>
      <Drawer.Navigator
        initialRouteName="Assignments"
        drawerContent={(props) => {
          return (
            <DrawerContentScrollView {...props}>
              <Heading
                size="md"
                color="coolGray.800"
                _dark={{
                  color: 'warmGray.50',
                }}
                fontWeight="semibold"
                paddingTop="5"
                paddingBottom="30"
                alignSelf="center"
              >
                Chan Claire
              </Heading>
              <DrawerItemList {...props} />
              <Box safeArea p="2" py="8" w="100%" maxW="290">
                <Button mt="10">Sign Out</Button>
              </Box>
            </DrawerContentScrollView>
          );
        }}
      >
        <Drawer.Screen name="Assignments" component={CalendarScreen} />
        <Drawer.Screen name="Subjects" component={CalendarScreen} />
        <Drawer.Screen name="ClassPeriods" component={CalendarScreen} />
        <Drawer.Screen name="Students" component={CalendarScreen} />
        <Drawer.Screen name="AddAssignments" component={AddAssignmentsScreen} />
        {/* <Drawer.Screen name="EditAssignments" component={EditAssignmentsScreen} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default TeacherStack;
