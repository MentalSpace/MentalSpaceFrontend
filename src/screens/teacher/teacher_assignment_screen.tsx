import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { xorBy } from 'lodash';
import {
  Button,
  View,
  AlertDialog,
  Box,
  Center,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  TextArea,
  Slide,
  HStack,
  CheckIcon,
  Select,
  AddIcon,
  ArrowBackIcon
} from 'native-base';
import React, { useState, Component, useRef, useEffect } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView
} from 'react-native';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import TimeInput from '@tighten/react-native-time-input';
import SelectBox from 'react-native-multi-selectbox';
import { useScrollToTop } from '@react-navigation/native';

import { SideBarList } from '../../components/student_stack';
import TextDivider from '../../components/text_divider';
import { apiUrl } from '../../constants';
import { useQuery } from 'react-query';

import {validateString} from '../../signup_logic'
import RNPickerSelect from "react-native-picker-select";

type AssignmentsScreenProps = NativeStackScreenProps<
  SideBarList,
  'Assignments'
>;
type RegisterTeacherResponse = {
    status: string;
}

const AssignmentsScreen = ({ navigation }: AssignmentsScreenProps) => {
  const periods = [
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
  ];

  const [shouldOverlapWithTrigger] = React.useState(false);
  const [position, setPosition] = React.useState('auto');


  const [isOpen, setIsOpen] = React.useState(false);
  const [alertIsOpen, alertSetIsOpen] = React.useState(false);

  const onClose = () => setIsOpen(false);
  const alertOnClose = () => alertSetIsOpen(false);

  const cancelRef = React.useRef(null);
  const [classIDs, setclassIDs] = useState([]);
  
  const [time, setTime] = useState('');
  const handleTimeChange = (time: React.SetStateAction<string>, validTime: any) => {
    if (!validTime) return;
      setTime(time);
  }

  function onMultiChange() {
    console.log(classIDs);
    return (item: never) => setclassIDs(xorBy(classIDs, [item], 'id'));
  }

  function onFormSubmit(
    su: any,
    pe: any,
    de: any,
    ti: any,
    po: any,
    te: any,
    re: any,
    et: any,
    er: any,
    we: any
  ) {
    setTitle('');
    setSubject('');
    setclassIDs([]);
    setDescription('');
    setTimeEstimate('');
    setCategory('');
    setPoints('');
    setPercentage('');
    setDueDate('');
    setDateAssigned(0)
    
  }

  

  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [timeEstimate, setTimeEstimate] = useState('');
  const [category, setCategory] = useState ('');
  const [points, setPoints] = useState('');
  const[percentage,setPercentage] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dateAssigned, setDateAssigned] = useState(new Date().getDate());
  
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Prefer: 'code=200',
      'X-CSRF-TOKEN': '123',
      Authorization: 'Bearer SOMETOKENVALUE',
    },
    body: JSON.stringify({
      type: 'Teacher',
      classIDs,
      dateAssigned,
      dueDate,
      category,
      timeEstimate,
      title,
      description
    }),
  };
  const request = useQuery<RegisterTeacherResponse>(
    'addAssignment',
    async () => await (await fetch(apiUrl + '/assignment', requestOptions)).json(),
    { enabled: false }
  );
  useEffect(() => {
    if (request.isSuccess) {
      console.log(request.data.status);
    }
  }, [request.isSuccess]);

  return (
    <KeyboardAvoidingView style={{flex:1}} behavior='padding'>
        <ScrollView>
        <Center w="100%">
            <Heading
            paddingTop="30"
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{ color: 'warmGray.50' }}
            >
            Add New Assignment
            </Heading>
            <Box
            safeArea
            w="90%"
            maxW="500"
            style={{
                marginTop: 10,
                paddingLeft: 15,
                paddingRight: 15,
                paddingTop: 15,
            }}
            >
            <VStack space={3}>
                <FormControl>
                <FormControl.Label>Title</FormControl.Label>
                <Input
                    backgroundColor="white"
                    placeholder="Enter Title"
                    value={title}
                    onChangeText={setTitle}
                />
                </FormControl>
                <FormControl>
                <FormControl.Label>Subject</FormControl.Label>
                <Input
                    backgroundColor="white"
                    placeholder="Enter Subject "
                    value={subject}
                    onChangeText={setSubject}
                />
                </FormControl>
                <SafeAreaView>
                <FormControl>
                    <FormControl.Label>Period(s)</FormControl.Label>
                    <Box backgroundColor="white">
                    <SelectBox
                        label=""
                        placeholder="Select your periods"
                        options={periods}
                        selectedValues={classIDs}
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
                <TextArea
                    backgroundColor="white"
                    placeholder="Enter Description"
                    value={description}
                    onChangeText={setDescription}
                    autoCompleteType={undefined}
                />
                </FormControl>
                <FormControl>
                <FormControl.Label>Time Estimate (minutes)</FormControl.Label>
                <Input
                    backgroundColor="white"
                    placeholder="Enter time estimate"
                    value={timeEstimate}
                    onChangeText={setTimeEstimate}
                />
                </FormControl>
                <FormControl backgroundColor="white">
                  <FormControl.Label>Category</FormControl.Label>
                    <RNPickerSelect
                    onValueChange={(value) => console.log(value)}
                    items={[
                        { label: "Homework", value: "Homework" },
                        { label: "Classwork", value: "Classwork" },
                        { label: "Quiz", value: "Quiz" },
                        { label: "Test", value: "Test" },
                        { label: "Other", value: "Other" }
                    ]}
                    />
                  </FormControl>
            <HStack>
                <FormControl width="46%">
                <FormControl.Label>Points</FormControl.Label>
                <Input 
                    backgroundColor="white"
                    placeholder="Enter max points"
                    keyboardType="numeric"
                    value={points}
                    onChangeText={setPoints}
                />
                </FormControl>
                <FormControl ml="10" width="45.5%">
                <FormControl.Label>Percentage</FormControl.Label>
                <Input 
                    backgroundColor="white"
                    placeholder="%"
                    keyboardType='numeric'
                    value={percentage}
                    onChangeText={setPercentage}
                    />
                </FormControl>
            </HStack>
                <FormControl>
                <FormControl.Label>Due Date and Time Due</FormControl.Label>
                <HStack>
                    <Input 
                    height="10"
                    mr="5" 
                    w="30%" 
                    maxW="250"
                    backgroundColor="white"
                    placeholder="mm/dd/yyyy"
                    value={dueDate}
                    onChangeText={setDueDate}
                    />
                    <TimeInput
                    onTimeChange={handleTimeChange}
                    />
                    
                </HStack>
                
                
                </FormControl>
                <FormControl>
                  <FormControl.Label>Date Assigned</FormControl.Label>
                  <Input
                      backgroundColor="white"
                      keyboardType="numeric"
                      // value={dateAssigned}
                      // onChangeText={setTimeEstimate}
                  />
                </FormControl>

                
                <TextDivider msg="" />
                <Center>
                <View style={{ flex: 1, padding: 10 }}>
                    <HStack>
                    <Button style = {{borderRadius: 45}} mr="10" ml="10" onPress={() => navigation.navigate('Calendar')}>
                        <ArrowBackIcon size="7" mt="0.5" color="white"/>
                    </Button>
                    <Button style = {{borderRadius: 45}}
                        mr="10"
                        ml="10"
                        onPress={() => {
                        request.refetch();

                        onFormSubmit(
                            title,
                            subject,
                            classIDs,
                            description,
                            timeEstimate,
                            category,
                            points,
                            percentage,
                            dueDate,
                            time,
                        );
                        showMessage({
                            message: 'Success!',
                            description:
                            'This assignment has now been added to your calendar.',
                            type: 'success',
                            backgroundColor: '#16a34a',
                            duration: 3000,
                            icon: 'success',
                        });
                        }}
                        disabled={
                          !validateString(title)
                        }
                    >
                        <AddIcon size="7" mt="0.5" color="white"/>
                    </Button>
                    </HStack>
                </View>
                </Center>
            </VStack>
            </Box>
        </Center>
        <FlashMessage position="top" />
        </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AssignmentsScreen;