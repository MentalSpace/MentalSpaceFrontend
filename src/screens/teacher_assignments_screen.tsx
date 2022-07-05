import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, View } from "native-base";
import React from "react";
import { SideBarList } from "../components/main_stack";
import {AlertDialog} from "native-base";
import {useState} from 'react';
import {Text,TextInput,TouchableOpacity, StyleSheet,Alert } from 'react-native';
import { Box, Center, Heading, VStack, FormControl, Input, Link, TextArea, Slide, HStack, CheckIcon  } from "native-base";
import TextDivider from "../components/text_divider";
import { xorBy } from 'lodash';
import SelectBox from 'react-native-multi-selectbox';
import {ScrollView, SafeAreaView, StatusBar} from 'react-native';


//import { Box, Center, Heading, VStack, FormControl, Input, Link } from "native-base";

type AssignmentsScreenProps = NativeStackScreenProps<SideBarList, 'Assignments'>

const AssignmentsScreen = ({ navigation }: AssignmentsScreenProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  const onClose = () => setIsOpen(false);

  const cancelRef = React.useRef(null);

  const [textAreaValue, setTextAreaValue] = useState("");

  const demoValueControlledTextArea = e => {setTextAreaValue(e.currentTarget.value)};

  const K_OPTIONS = [
    {
      item: 'Period 1',
      id: 'P1',
    },
    {
      item: 'Period 2',
      id: 'P2',
    },
    {
      item: 'Period 3',
      id: 'P3',
    },
    {
      item: 'Period 4',
      id: 'P4',
    },
    {
      item: 'Period 5',
      id: 'P5',
    },
    {
      item: 'Period 6',
      id: 'P6',
    },
    {
      item: 'Period 7',
      id: 'P7',
    },
    {
      item: 'Period 8',
      id: 'P8',
    },
  ]
  const [selectedTeams, setSelectedTeams] = useState([])

  const [alertIsOpen, alertSetIsOpen] = React.useState(false);
  
  const alertOnClose = () => alertSetIsOpen(false);

  function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }



    return (
      <ScrollView pa>
        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-start', padding:"10px"}}>
        <Button onPress={() => navigation.navigate('Calendar')}>
            Back to Calendar
          </Button>
        </View>
          
          {/* 
          This is a delete button that pops up an alert to ask if the user is sure. I figured it would be good to keep cause it could be used in mulitple places
          
          <Button onPress={() => setIsOpen(true)}>Delete</Button>
          <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>Delete Assignment</AlertDialog.Header>
            <AlertDialog.Body>
              This will remove -Assignment Name- for -period-. This action cannot be
              reversed. Deleted data can not be recovered.
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                  Cancel
                </Button>
                <Button colorScheme="danger" onPress={onClose}>
                  Delete
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog> */}
        <Center w="100%">
        <Box safeArea py="1" w="90%" maxW="500" maxH="800" paddingBottom="10" >
        <VStack space={3} mt="5">
        <FormControl>
        <FormControl.Label>Title</FormControl.Label>
            <Input placeholder = "Enter assignment title" />
          </FormControl>
          <FormControl>
          <FormControl.Label>Subject</FormControl.Label>
            <Input placeholder = "Enter subject of assignment" />
          </FormControl>
          <FormControl>
          <FormControl.Label>Period(s)</FormControl.Label>
              <SelectBox 
                placeholder = "Period(S)"
                label=""
                options={K_OPTIONS}
                selectedValues={selectedTeams}
                onMultiSelect={onMultiChange()}
                onTapClose={onMultiChange()}
                isMulti
                arrowIconColor = "orange"
                searchIconColor = "orange"
                toggleIconColor = "orange"

              />
          </FormControl>
         
          <FormControl>
          <FormControl.Label>Description</FormControl.Label>
              <TextArea placeholder = "Enter a description for the assignment" value={textAreaValue} onChange={demoValueControlledTextArea} autoCompleteType={undefined} />
          </FormControl>
          <FormControl>
          <FormControl.Label>Points</FormControl.Label>
          </FormControl>
            <Input placeholder="Enter the amount of points the assignment is worth" />
          <FormControl>
          <FormControl.Label>Estimated Time</FormControl.Label>
            <Input placeholder="Enter how long the assignment will take to complete" />
          </FormControl>
          <TextDivider msg={""}/>
          <FormControl>
            <FormControl.Label>Date Due</FormControl.Label>
            <input placeholder= "Date Due" type = "date" className="Date"></input>
          </FormControl>
          <FormControl>
          <FormControl.Label>Time Due</FormControl.Label>
            <input placeholder= "Time Due"  type = "time" className="Time"></input>
          </FormControl>
          <Button mt="2" onPress={() => {navigation.navigate('Calendar') ; alertSetIsOpen(!alertIsOpen) ; delay(1000)}}>
                Add Assignment
              </Button>
              <Slide in={alertIsOpen} placement="top"  >
                <Box w="100%" position="absolute" p="2" borderRadius="xs" bg="emerald.100" alignItems="center" justifyContent="center" _dark={{
                  bg: "emerald.200"
                }}>
                  <HStack space={2}>
                    <CheckIcon size="4" color="emerald.600" mt="1" _dark={{
                      color: "emerald.700"
                    }} />
                    <Text color="emerald.600" textAlign="center" _dark={{
                      color: "emerald.700"
                    }} 
                    fontWeight="medium">
                      Assignment added.
                    </Text>
                    <Text alignContent='right'>
                      <Button colorScheme="coolGray" onPress={alertOnClose} height="5px" width="5px" >
                        &times;
                      </Button>
                    </Text>
                  </HStack>
                </Box>
              </Slide >
            
        </VStack>
        </Box>
        
        </Center>
        
  </ScrollView>
      
        
  );
  function onMultiChange() {
    return (item: any) => setSelectedTeams(xorBy(selectedTeams, [item], 'id'))
  }
};


export default AssignmentsScreen;
