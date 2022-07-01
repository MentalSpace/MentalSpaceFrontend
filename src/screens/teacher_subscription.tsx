import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SideBarList } from "../components/teacherDirectory/teacher_stack";
import {Select, CheckIcon, Center, View, Box, VStack, Text} from "native-base";

type SubscribeScreenProps = NativeStackScreenProps<SideBarList, 'TeacherSubscription'>

function TeacherSubscription ({navigation}: SubscribeScreenProps) {
  return (
      <View flex={1} px="3" alignItems={'center'}>
        <Box safeArea p="2" py="8" w="90%" maxW="290">            
          <VStack mt="5">
            <Text style = {{width: 500, height: 100, fontSize: 30, fontWeight: "bold"}}>Accept/Decline Student</Text>
            <table style = {{color: "#de6600"}}>
                <tr>
                    <td style = {{textAlign: "center", fontSize: 17, paddingRight: 50}}>
                        Student Name:
                    </td>
                    <td>
                        <StudentSelect/>
                    </td>
                </tr>
            </table>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <br></br>
            </View>
          </VStack>
          </Box>
      </View>  
      );
}

  const StudentSelect = () => {
    let [service, setService] = React.useState("");
    return <Center>
        <Box w="4/4" maxW="300">
          <Select 
          selectedValue={service} 
          minWidth="200" 
          accessibilityLabel="Select" 
          placeholder="Select" 
          _selectedItem={{
          bg: "teal.600",
          endIcon: <CheckIcon size="2" />
        }} mt={1} onValueChange={itemValue => setService(itemValue)}>
            <Select.Item label="✔" value="yes" />
            <Select.Item label="X" value="no" />
          </Select>
        </Box>
      </Center>;
  };

export default TeacherSubscription;
