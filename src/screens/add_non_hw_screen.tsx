import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Button, Center, FormControl, Heading, Input, VStack, TextArea, View} from "native-base";
import React from "react";
import { useState } from "react";
import { SideBarList } from "../components/main_stack";
import { Platform } from "react-native";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Text } from "react-native-svg";

type AddNonHWScreenProps = NativeStackScreenProps<SideBarList, 'AddNonHW'>


function AddNonHWScreen({navigation}:AddNonHWScreenProps) {
  const [selectedDate, setSelectedDate] = useState(new Date('2022-05-31'));
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };
  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const [textAreaValue, setTextAreaValue] = useState("");

  const demoValueControlledTextArea = e => {setTextAreaValue(e.currentTarget.value)};


  return (
    <Center w = "100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <VStack space = {3} mt = '5'>
          <Heading 
            size = "lg" 
            color = "coolGray.800" 
            _dark = {{
              color: "warmGray.50"
            }} 
            fontWeight = "semibold" 
            paddingTop = "5" 
            paddingBottom = "30"> Add Extracurriculars</Heading>
          <Heading>Activity Name</Heading>
          <Input 
            placeholder = "Extracurricular Name"
            type="text"
          />
          <Heading>Description</Heading>
          <TextArea value={textAreaValue} onChange={demoValueControlledTextArea} w="100%" maxW="300" autoCompleteType={undefined} />
          <Heading>Date</Heading>
          <Button onPress={showDatePicker}>When does it Occur? </Button>
          <DateTimePickerModal
            themeVariant="light"
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
            
          <Button>Add to Calendar </Button>
          <Button onPress={() => navigation.navigate('Calendar')}>Back to the calendar </Button>
        </VStack>
      </Box>
    </Center>
  )
}


export default AddNonHWScreen;
