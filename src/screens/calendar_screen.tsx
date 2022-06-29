import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SideBarList } from "../components/main_stack";
import { Box, HamburgerIcon, Menu, Pressable, useTheme, View } from "native-base";
import CalendarStrip from 'react-native-calendar-strip';

type CalendarScreenProps = NativeStackScreenProps<SideBarList, 'Calendar'>;

function CalendarScreen({ navigation }: CalendarScreenProps) {
  const theme = useTheme();

  return (
    <Box flex={1}>
      <CalendarStrip
        calendarHeaderStyle={{
          fontFamily: theme.fonts.heading, 
          fontWeight: "400",
        }}
        style={{
          height: 150,
          paddingTop: 20,
        }}
        highlightDateNumberStyle={{
          color: '#fff',
          backgroundColor: theme.colors.primary[500],
          height: 45, 
          width: 45,
          borderRadius: 22.5,
          justifyContent: 'center',
          alignItems: 'center',
          // hacks to make the circle and text consistent on both mobile and web
          fontSize: theme.fontSizes.xl,
          padding: 8,
        }}
        highlightDateNameStyle={{color: theme.colors.primary[700]}}
      />
      <Menu trigger={triggerProps => {
        return (
          <Pressable 
            position="absolute" 
            height="60" 
            width="60" 
            borderRadius="30" 
            bottom='30'
            right='30'
            justifyContent="center"
            alignItems="center"
            backgroundColor={theme.colors.primary[600]} 
            accessibilityLabel="More options menu" {...triggerProps}
          >
              <HamburgerIcon color='#fff'/>
          </Pressable>);
      }}>
        <Menu.Item>Subscribe to Classes</Menu.Item>
        <Menu.Item>See Assignments</Menu.Item>
        <Menu.Item>See and Edit Schedule</Menu.Item>
        <Menu.Item>Edit Homework Priorities</Menu.Item>
        <Menu.Item>Edit non-homework activities</Menu.Item>
      </Menu>
    </Box>
  );
}

export default CalendarScreen;
