import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SideBarList } from "../components/main_stack";
import {Select, CheckIcon, Center, View, Box, VStack, Text, Heading, FormControl} from "native-base";

type SubscribeScreenProps = NativeStackScreenProps<SideBarList, 'TeachSubscript'>

function TeacherSubscription ({ navigation }: SubscribeScreenProps) {
  return ( 
    <Center minW = '100%'>
        <Box safeArea paddingTop = "8" px="8" py="8" w="90%" maxW="395"> 
        <Heading 
        size = "lg" 
        color = "coolGray.800" 
        _dark = {{
               color: "warmGray.50"
            }} 
            fontWeight = "semibold" 
            paddingTop = "5" 
            paddingBottom = "30"> Accept/Decline Student</Heading>           
                <View flexDirection={'row'} justifyContent = "space-between">
                  <Text color = "amber.600" fontSize="17" fontWeight={'semibold'}>Student Name:</Text> {/*Placeholder for student name (back-end)*/}
                  <StudentSelect /> {/*Calls code for select box*/}
                </View>
          </Box> 
    </Center>
      );
}

// Code for Select box
  const StudentSelect = () => {
    let [service, setService] = React.useState("");
    return ( 
      <Select
      selectedValue={service} 
      width="100"
      accessibilityLabel="Select" 
      placeholder="Select" 
      bgColor={'white'}
      _selectedItem={{
      bg: "orange",
      endIcon: <CheckIcon size="2" />
    }} mt={1} onValueChange={itemValue => setService(itemValue)}>
        <Select.Item label="✔" value="yes" />
        <Select.Item label="X" value="no" />
      </Select>
    )
  };

export default TeacherSubscription;