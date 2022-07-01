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
          fontSize: theme.fontSizes["2xl"],
          color: theme.colors.darkBlue[700]
        }}
        dateNameStyle={{color: theme.colors.darkBlue[800]}}
        dateNumberStyle={{
          fontSize: theme.fontSizes.xl,
          color: theme.colors.darkBlue[700]
        }}
        style={{
          height: 150,
          paddingTop: 20
        }}
        highlightDateContainerStyle={{
          backgroundColor: theme.colors.primary[600],
          height: 55, 
          width: 55,
          borderRadius: 27.5,
        }}
        highlightDateNumberStyle={{
          color: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: theme.fontSizes.xl,
          //adds shadow around calendar number highlight
          // shadowColor: "black",
          // shadowOffset: { width: 0, height: 0 },
          // shadowRadius: 10,
          // elevation: 5
        }}
        highlightDateNameStyle={{color: '#fff'}}
        iconContainer={{ flex: 0.1 }}
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
              borderColor: '#154c79',
              marginVertical: 10
            }}>
            <View style={{marginLeft: 12, marginVertical: 10}}>
              <Text 
                color={theme.colors.trueGray[600]}
                style={{marginLeft: 20}}
                fontSize={theme.fontSizes.xs}  
              >
                12:00 PM - 12:45 PM
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View 
                  style={{height: 12, width: 12, borderRadius: 6, marginRight: 8}} 
                  backgroundColor={theme.colors.primary[600]}
                />
                <Text
                  fontWeight={theme.fontWeights.bold} 
                  fontSize={theme.fontSizes.lg} 
                  color={theme.colors.secondary[600]}
                >
                  Test Event
                </Text>
              </View>
              <Text 
                color={theme.colors.trueGray[500]}
                style={{marginLeft: 20}}  
              >
                Test text
              </Text>
            </View>
          </Box>
        </ScrollView>
      </View>
    </Box>
  );
}

export default CalendarScreen;
