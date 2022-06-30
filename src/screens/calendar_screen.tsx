import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SideBarList } from "../components/main_stack";
import { Box, HamburgerIcon, Menu, Pressable, ScrollView, useTheme, View, Text } from "native-base";
import CalendarStrip from 'react-native-calendar-strip';

type CalendarScreenProps = NativeStackScreenProps<SideBarList, 'Calendar'>;

function CalendarScreen({ navigation }: CalendarScreenProps) {
  const [schedule, setSchedule] = useState([]);
  const theme = useTheme();

  return (
    <Box flex={1}>
      <CalendarStrip
        calendarHeaderStyle={{
          fontFamily: theme.fonts.heading, 
          fontSize: theme.fontSizes.lg
        }}
        dateNumberStyle={{fontSize: theme.fontSizes.xl}}
        style={{
          height: 150,
          paddingTop: 20
        }}
        highlightDateNumberStyle={{
          color: '#fff',
          backgroundColor: theme.colors.primary[500],
          height: 40, 
          width: 40,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          // hacks to make the circle and text consistent on both mobile and web
          fontSize: theme.fontSizes.xl,
          paddingTop: 5,
          //adds shadow around calendar number highlight
          shadowColor: "black",
          shadowOffset: { width: 0, height: 0 },
          shadowRadius: 10,
          elevation: 5
        }}
        highlightDateNameStyle={{color: theme.colors.primary[700]}}
        iconContainer={{ flex: 0.15 }}
      />
      <Menu trigger={triggerProps => {
        return (
          <Pressable 
            position='absolute' 
            height='60' 
            width='60' 
            borderRadius='30'
            bottom='30'
            right='30'
            justifyContent='center'
            alignItems='center'
            backgroundColor={theme.colors.primary[600]} 
            accessibilityLabel='More options menu' {...triggerProps}
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
      <View alignItems='center'>
        <ScrollView>
          <Box height='100' width='350' style={{
              // Shadow is really broken and inconsistent on mobile
              // elevation: 10,
              // shadowRadius: 2, 
              // shadowOpacity: 0.25,
              shadowColor: theme.colors.secondary[800],
              borderRadius: 10,
              borderWidth: 3,
              borderColor: theme.colors.secondary[300],
              marginVertical: 10
            }}>
            <View style={{marginLeft: 12, marginVertical: 10}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{height: 12, width: 12, borderRadius: 6, marginRight: 8}} backgroundColor={theme.colors.primary[500]}/>
                <Text fontWeight={theme.fontWeights.bold} fontSize={theme.fontSizes.lg} color={theme.colors.secondary[600]}>Test Event</Text>
              </View>
            </View>
          </Box>
        </ScrollView>
      </View>
    </Box>
  );
}

export default CalendarScreen;
