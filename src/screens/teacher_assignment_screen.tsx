import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, useTheme, View } from "native-base";
import React from "react";
import { SideBarList } from "../components/main_stack";
import {AlertDialog} from "native-base";
import {useState} from 'react';
import {Text,TextInput,TouchableOpacity, StyleSheet,Alert } from 'react-native';
import { Box, Center, Heading, VStack, FormControl, Input, Link, TextArea, Slide, HStack, CheckIcon,   } from "native-base";
import TextDivider from "../components/text_divider";
import { xorBy } from 'lodash';
import SelectBox from 'react-native-multi-selectbox';
import { ScrollView, SafeAreaView, } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import FlashMessage from "react-native-flash-message";
import { showMessage} from "react-native-flash-message";

type AssignmentsScreenProps = NativeStackScreenProps<SideBarList, 'Assignments'>

const AssignmentsScreen = ({ navigation }: AssignmentsScreenProps) => {
    const K_OPTIONS = [
        {
            item: 'Period 1',
            id: '1',
        },
        {
            item: 'Period 2',
            id: '2',
        },
        {
            item: 'Period 3',
            id: '3',
        },
        {
            item: 'Period 4',
            id: '4',
        },
        {
            item: 'Period 5',
            id: '5',
        },
        {
            item: 'Period 6',
            id: '6',
        },
        {
            item: 'Period 7',
            id: '7',
        },
        {
            item: 'Period 8',
            id: '8',
        },
    ]

    var pastTitle = '';
    var pastSubject = '';
    var pastPeriods: never[] = [];
    var pastDescription = '';
    var pastDueDate = '';
    var pastTimeEstimate = '';
    var pastTimeDue = '';
    var pastPoints = '';

        
    // if () {
    //     pastTitle = 
    //     pastSubject = 
    //     pastPeriods = 
    //     pastDescription =
    //     pastDueDate = 
    //     pastTimeEstimate = 
    //     pastTimeDue =  
    //     pastPoints = 
    // }

    //TODO: BACKEND pass the assignment information to here if the user is editing an assignment
        
    var title = pastTitle;
    var subject = pastSubject;
    var periods = pastPeriods;
    var description = pastDescription;
    var dueDate = pastDueDate;
    var timeEstimate = pastTimeEstimate;
    var timeDue = pastTimeDue;
    var points = pastPoints;

    // const [shouldOverlapWithTrigger] = React.useState(false);
    // const [position, setPosition] = React.useState("auto");
    // const [selectedTeam, setSelectedTeam] = useState({});

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleConfirm = (date: any) => {
        console.warn("A date has been picked: ", date);
        hideDatePicker();
    };

    const theme = useTheme();
    
    // const demoValueControlledTextArea = (e: any) => {setTextAreaValue(e.currentTarget.value)};

    // const [isOpen, setIsOpen] = React.useState(false);
    // const [alertIsOpen, alertSetIsOpen] = React.useState(false);

    // const onClose = () => setIsOpen(false);
    // const alertOnClose = () => alertSetIsOpen(false);

    const cancelRef = React.useRef(null);
    const [selectedTeams, setSelectedTeams] = useState([])
    const [textAreaValue, setTextAreaValue] = useState("");
    //const [text, setText] = useState('');
    
    function onMultiChange() {
        console.log(selectedTeams);
        return (item: any) => setSelectedTeams(xorBy(selectedTeams, [item], 'id'))
    }

    function onFormSubmit (su: any, pe: any, de: any, ti: any, po: any, te: any, dd: any, td: any) {
      title = '';
      subject = '';
      periods = [];
      description = '';
      dueDate = '';
      timeEstimate = '';
      timeDue = '';
      points = '';
    }

    function editSubject (text: any) {
        subject = text;
        console.log(subject)
    }

    function editTitle (text: any) {
        title = text;
        console.log(title)
    }

    function editDescription (text: any) {
        description = text;
        console.log(description)
    }

    function editPoints (text: any) {
        points = text;
        console.log(points)
    }

    // // State to store value from the input field
    // const [inputValue, setInputValue] = useState("");

    // // Input Field handler
    // const handleUserInput = (e: any) => {
    //     setInputValue(e.target.value);
    // };

    // // Reset Input Field handler
    // const resetInputField = () => {
    //     setInputValue("");
    // };

    return (
        <ScrollView>
            <Center w="100%">
              <Heading paddingTop="30" size="lg" fontWeight="600" color="coolGray.800" _dark={{color: "warmGray.50"}}>
                Add New Assignment
              </Heading>
                <Box safeArea w="90%"  maxW="500" style={{
                    marginTop: 10,
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingTop: 15,
                    }} 
                >
                    <VStack space={3} >
                        <FormControl>
                            <FormControl.Label>Title</FormControl.Label>
                            <Input backgroundColor="white" placeholder = "Enter Title" defaultValue={title} onChangeText={(newText) => {editTitle(newText)}}/>
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Subject</FormControl.Label>
                            <Input backgroundColor="white" placeholder = "Enter Subject " defaultValue={subject} onChangeText={(newText) => {editSubject(newText)}}/>
                        </FormControl>
                        <SafeAreaView>
                            <FormControl>
                              <FormControl.Label>Period(s)</FormControl.Label>
                              <Box backgroundColor="white">
                                <SelectBox
                                  label=""
                                  placeholder="Select your periods"
                                  options={K_OPTIONS}
                                  selectedValues={selectedTeams}
                                  onMultiSelect={onMultiChange()}
                                  onTapClose={onMultiChange()}
                                  isMulti
                                  toggleIconColor="orange"
                                  searchIconColor="orange"
                                  arrowIconColor="orange"
                                  listOptionProps={{ nestedScrollEnabled: true }}
                                />
                              </Box>
                            </FormControl>
                          
                        </SafeAreaView>
                        <FormControl>
                            <FormControl.Label>Description</FormControl.Label>
                            <TextArea backgroundColor="white" placeholder = "Enter Description" defaultValue={description} onChangeText={(newText) => {editDescription(newText)}} autoCompleteType={undefined} />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Points</FormControl.Label>
                            <Input backgroundColor="white" placeholder="Enter max points" keyboardType="numeric" defaultValue={points} onChangeText={(newText) => {editPoints(newText)}} />
                        </FormControl>
                        <FormControl>
                            <Button backgroundColor="text.500" onPress={showDatePicker}>Due Date</Button>
                            <DateTimePickerModal
                                themeVariant="light"
                                isVisible={isDatePickerVisible}
                                mode="datetime"
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                            />
                        </FormControl>
                        <TextDivider msg={""}/>
                        <Center>
                            <View style={{ flex: 1, padding:10}}>
                                <HStack>
                                    <Button mr="10" onPress={() => {showMessage({
                                        message: "Success!",
                                        description: "Assignment added to calendar.",
                                        type: "success",
                                        backgroundColor: "#16a34a",
                                        duration: 3000,
                                        icon:"success",
                                        
                        }); onFormSubmit(subject, periods, description, title, points, timeEstimate, dueDate, timeDue)
                                        }}>
                                        Add Assignment
                                    </Button>
                                    <Button onPress={() => navigation.navigate('Calendar')}>
                                        Back to Calendar
                                    </Button>
                                </HStack>
                            </View>
                        </Center>
                    </VStack>
                </Box>
            </Center>
        <FlashMessage position="top"/>
    </ScrollView>
  );
};

export default AssignmentsScreen;

{/* <Button onPress={() => setIsOpen(true)}>Delete</Button>
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