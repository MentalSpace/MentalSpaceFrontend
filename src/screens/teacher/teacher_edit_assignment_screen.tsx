import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Container, useTheme, View } from "native-base";
import React from "react";
import { SideBarList } from "../../components/student_stack";
import {useState} from 'react';
import { Box, Center, Heading, VStack, FormControl, Input, Link, TextArea, Slide, HStack, CheckIcon, Select, AlertDialog } from "native-base";
import TextDivider from "../../components/text_divider";
import { xorBy } from 'lodash';
import SelectBox from 'react-native-multi-selectbox';
import { ScrollView, SafeAreaView, StatusBar, FlatList, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { ScreenContainer } from "react-native-screens";
import FlashMessage from "react-native-flash-message";
import { showMessage} from "react-native-flash-message";
import TimeInput from '@tighten/react-native-time-input';


type AssignmentsScreenProps = NativeStackScreenProps<SideBarList, 'Assignments'>

const EditAssignmentsScreen = ({ navigation }: AssignmentsScreenProps) => {
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
    var pastDescription = '';
    var pastPoints = '';
    var pastTimeEstimate = '';
    var pastDueDate = '';

    const [time, setTime] = useState('');
    const handleTimeChange = (time: any, validTime: any) => {
        if (!validTime) return;
        setTime(time);
    }
    const [selectedTeams, setSelectedTeams] = useState([]);
    const [type, setType] = useState("");
        
    // if () {
    //     pastTitle = 
    //     pastSubject = 
    //     setSelectedTeams( ? )
    //     pastDescription =
    //     pastPoints = 
    //     pastTimeEstimate =
    //     pastDueDate = 
    //     setType( ? )
    //     setTime( ? )
    
    // }

    //TODO: BACKEND pass the assignment information to here if the user is editing an assignment

    var title = pastTitle;
    var subject = pastSubject;
    var description = pastDescription;
    var points = pastPoints;
    var timeEstimate = pastTimeEstimate;
    var dueDate = pastDueDate;

    const [shouldOverlapWithTrigger] = React.useState(false);

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
    
    const demoValueControlledTextArea = (e: any) => {setTextAreaValue(e.currentTarget.value)};

    const cancelRef = React.useRef(null);
    const [textAreaValue, setTextAreaValue] = useState("");


    function onMultiChange() {
        console.log(selectedTeams);
        return (item: any) => setSelectedTeams(xorBy(selectedTeams, [item], 'id'))
    }

    function onFormSubmit (newTitle: any, newSubject: any, newPeriods: any, newDescription: any, newPoints: any, newEstimatedTime: any, newCategory: any, newTimeDue: any, newDueDate: any) {
        return [
            newTitle, 
            newSubject, 
            newPeriods, 
            newDescription, 
            newPoints, 
            newEstimatedTime, 
            newCategory, 
            newTimeDue, 
            newDueDate
        ];
    }

    function editSubject (text: any) {
        subject = text;
    }

    function editTitle (text: any) {
        title = text;
    }

    function editDescription (text: any) {
        description = text;
    }

    function editPoints (text: any) {
        points = text;
    }

    function editTimeEstimate (text: any) {
        timeEstimate = text
    }

    function editDueDate (text: any) {
        dueDate = text
    }

    return (
        <ScrollView>
            <Center w="100%">
              <Heading paddingTop="30" size="lg" fontWeight="600" color="coolGray.800" _dark={{color: "warmGray.50"}}>
                Edit Assignment
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
                            <Input backgroundColor="white" placeholder = "Enter Title" defaultValue={title} onChangeText={(newText) => {editTitle(newText)}}
                            />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Subject</FormControl.Label>
                            <Input backgroundColor="white" placeholder = "Enter Subject " defaultValue={subject} onChangeText={(newText) => {editSubject(newText)}}
                            />
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
                            <TextArea backgroundColor="white" placeholder = "Enter Description" defaultValue={description}
                              onChangeText={(newText) => {editDescription(newText)}} autoCompleteType={undefined} 
                             />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Points</FormControl.Label>
                            <Input backgroundColor="white" placeholder="Enter max points" keyboardType="numeric" 
                             defaultValue={points} onChangeText={(newText) => {editPoints(newText)}} 
                            />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Estimated Time</FormControl.Label>
                            <Input backgroundColor="white" placeholder="Enter estimated time to complete" defaultValue={timeEstimate} onChangeText={(newText) => {editTimeEstimate(newText)}} />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Category</FormControl.Label>
                            <Select backgroundColor="white" selectedValue={type} minWidth={200} accessibilityLabel="Please enter the type of assignment (e.g. homework, quiz)" placeholder="Please enter the type of assignment (e.g. homework, quiz)" onValueChange={itemValue => setType(itemValue)} _selectedItem={{
                                bg: "cyan.600",
                                endIcon: <CheckIcon size={4}/>
                                }}>
                                <Select.Item label="Homework" value="homeWork"/>
                                <Select.Item label="Class Work" value="classWork"/>
                                <Select.Item label="Quiz" value="quiz"/>
                                <Select.Item label="Test" value="test"/>
                                <Select.Item label="Other" value="other"/>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Due Date and Time Due</FormControl.Label>
                            <HStack>
                                <TimeInput
                                setCurrentTime 
                                onTimeChange={handleTimeChange}
                                />
                                <Box paddingLeft="12">
                                    <Input height="10" width="228"
                                        backgroundColor="white"
                                        placeholder="mm/dd/yyyy"
                                        defaultValue={dueDate}
                                        onChangeText={(newText) => {editDueDate(newText)}}
                                    />
                                </Box>
                            </HStack>
                            <Text>Current time entered is: {time}</Text>
                        </FormControl>
                        <TextDivider msg={""}/>
                        <Center>
                            <View style={{ flex: 1, padding:10}}>
                                <HStack>
                                    <Button mr="10" onPress={() => {
                                          onFormSubmit(title, subject, selectedTeams, description, points, timeEstimate, type, time, dueDate);
                                         showMessage({
                                            message: "Success!",
                                            description: "This assignment has now been saved.",
                                            type: "success",
                                            backgroundColor: "#16a34a",
                                            duration: 3000,
                                            icon:"success",
                                            });}}>
                                        Save Assignment
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

export default EditAssignmentsScreen;