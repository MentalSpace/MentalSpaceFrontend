import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SideBarList } from "../components/main_stack";
import { useTheme } from "native-base";

import CalendarStrip from 'react-native-calendar-strip';

type CalendarScreenProps = NativeStackScreenProps<SideBarList, 'Calendar'>;

function CalendarScreen({ navigation }: CalendarScreenProps) {
  const theme = useTheme();

  return (
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
        display: "flex"
      }}
      highlightDateNameStyle={{color: theme.colors.primary[700]}}
    />
  );
}

export default CalendarScreen;
