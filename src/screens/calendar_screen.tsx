import React from "react";
import { Button, View } from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SideBarList } from "../components/main_stack";
import AgendaScreen from "./agendaScreen";

type CalendarScreenProps = NativeStackScreenProps<SideBarList, 'Calendar'>;

function CalendarScreen({ navigation }: CalendarScreenProps) {
  return (
    <AgendaScreen />
  );
}

export default CalendarScreen;
