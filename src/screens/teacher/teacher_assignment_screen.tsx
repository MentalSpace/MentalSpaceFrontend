import { NativeStackScreenProps } from '@react-navigation/native-stack';
import TimeInput from '@tighten/react-native-time-input';
import { xorBy } from 'lodash';
import {
  Button,
  Container,
  useTheme,
  View,
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
  AlertDialog,
  AddIcon,
  ArrowBackIcon,
} from 'native-base';
import React, { useState } from 'react';
import {
  ScrollView,
  SafeAreaView,
  StatusBar,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import SelectBox from 'react-native-multi-selectbox';
import { ScreenContainer } from 'react-native-screens';

import { SideBarList } from '../../components/student_stack';
import TextDivider from '../../components/text_divider';

type AssignmentsScreenProps = NativeStackScreenProps<
  SideBarList,
  'Assignments'
>;

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
  ];

  const [shouldOverlapWithTrigger] = React.useState(false);
  const [position, setPosition] = React.useState('auto');
  const [selectedTeam, setSelectedTeam] = useState({});

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date: any) => {
    console.warn('A date has been picked: ', date);
    hideDatePicker();
  };

  // const showTimePicker = () => {
  //     setTimePickerVisibility(true);
  // };
  // const hideTimePicker = () => {
  //     setTimePickerVisibility(false);
  // };
  // const handleConfirmt = (time: any) => {
  //     console.warn("A time has been picked: ", time);
  //     hideTimePicker();
  // };

  const theme = useTheme();

  const demoValueControlledTextArea = (e: any) => {
    setTextAreaValue(e.currentTarget.value);
  };

  const [isOpen, setIsOpen] = React.useState(false);
  const [alertIsOpen, alertSetIsOpen] = React.useState(false);

  const onClose = () => setIsOpen(false);
  const alertOnClose = () => alertSetIsOpen(false);

  const cancelRef = React.useRef(null);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [textAreaValue, setTextAreaValue] = useState('');
  //const [text, setText] = useState('');

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const [time, setTime] = useState('');
  const [dueDate, setDueDate] = useState('');
  const handleTimeChange = (time: any, validTime: any) => {
    if (!validTime) return;
    setTime(time);
  };

  function onMultiChange() {
    return (item: any) => setSelectedTeams(xorBy(selectedTeams, [item], 'id'));
  }

  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState('');
  const [timeEstimate, setTimeEstimate] = useState('');

  function onFormSubmit(
    newTitle: any,
    newSubject: any,
    newPeriods: any,
    newDescription: any,
    newPoints: any,
    newEstimatedTime: any,
    newCategory: any,
    newTimeDue: any,
    newDueDate: any
  ) {
    setTitle('');
    setSelectedTeams([]);
    setSubject('');
    setDescription('');
    setPoints('');
    setTimeEstimate('');
    setType('');
    setDueDate('');

    return [
      newTitle,
      newSubject,
      newPeriods,
      newDescription,
      newPoints,
      newEstimatedTime,
      newCategory,
      newTimeDue,
      newDueDate,
    ];
  }

  return (
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
                defaultValue={title}
                value={title}
                onChangeText={setTitle}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Subject</FormControl.Label>
              <Input
                backgroundColor="white"
                placeholder="Enter Subject "
                defaultValue={subject}
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
              <TextArea
                backgroundColor="white"
                placeholder="Enter Description"
                defaultValue={description}
                value={description}
                onChangeText={setDescription}
                autoCompleteType={undefined}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Points</FormControl.Label>
              <Input
                backgroundColor="white"
                placeholder="Enter max points"
                keyboardType="numeric"
                defaultValue={points}
                value={points}
                onChangeText={setPoints}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Estimated Time</FormControl.Label>
              <Input
                backgroundColor="white"
                placeholder="Enter estimated time to complete"
                defaultValue={timeEstimate}
                value={timeEstimate}
                onChangeText={setTimeEstimate}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Category</FormControl.Label>
              <Select
                backgroundColor="white"
                selectedValue={type}
                minWidth={200}
                accessibilityLabel="Please enter the type of assignment (e.g. homework, quiz)"
                placeholder="Please enter the type of assignment (e.g. homework, quiz)"
                onValueChange={(itemValue) => setType(itemValue)}
                _selectedItem={{
                  bg: 'cyan.600',
                  endIcon: <CheckIcon size={4} />,
                }}
              >
                <Select.Item label="Homework" value="homeWork" />
                <Select.Item label="Class Work" value="classWork" />
                <Select.Item label="Quiz" value="quiz" />
                <Select.Item label="Test" value="test" />
                <Select.Item label="Other" value="other" />
              </Select>
            </FormControl>
            <FormControl>
              <FormControl.Label>Due Date and Time Due</FormControl.Label>
              <HStack>
                <TimeInput onTimeChange={handleTimeChange} />
                <Box paddingLeft="12">
                  <Input
                    height="10"
                    width="228"
                    backgroundColor="white"
                    placeholder="mm/dd/yyyy"
                    defaultValue={dueDate}
                    value={dueDate}
                    onChangeText={setDueDate}
                  />
                </Box>
              </HStack>
            </FormControl>
            <TextDivider msg="" />
            <Center>
              <View style={{ flex: 1, padding: 10 }}>
                <HStack>
                  <Button
                    style={{ borderRadius: 30 }}
                    ml="10"
                    mr="10"
                    onPress={() => navigation.navigate('Calendar')}
                  >
                    <ArrowBackIcon size="5" mt="0.5" color="white" />
                  </Button>
                  <Button
                    style={{ borderRadius: 30 }}
                    ml="10"
                    mr="10"
                    onPress={() => {
                      onFormSubmit(
                        title,
                        subject,
                        selectedTeams,
                        description,
                        points,
                        timeEstimate,
                        type,
                        time,
                        dueDate
                      );
                      showMessage({
                        message: 'Success!',
                        description: 'This assignment has now been saved.',
                        type: 'success',
                        backgroundColor: '#16a34a',
                        duration: 3000,
                        icon: 'success',
                      });
                    }}
                  >
                    <AddIcon size="5" mt="0.5" color="white" />
                  </Button>
                </HStack>
              </View>
            </Center>
          </VStack>
        </Box>
      </Center>
      <FlashMessage position="top" />
    </ScrollView>
  );
};

export default AssignmentsScreen;

{
  /* <Button onPress={() => setIsOpen(true)}>Delete</Button>
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
        </AlertDialog> */
}
