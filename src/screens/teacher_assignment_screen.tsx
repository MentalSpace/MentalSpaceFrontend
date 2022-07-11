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
} from 'native-base';
import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import SelectBox from 'react-native-multi-selectbox';

import { SideBarList } from '../components/main_stack';
import TextDivider from '../components/text_divider';

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

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

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

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function onMultiChange() {
    console.log(selectedTeams);
    return (item: any) => setSelectedTeams(xorBy(selectedTeams, [item], 'id'));
  }

  function onFormSubmit(
    su: any,
    pe: any,
    de: any,
    ti: any,
    po: any,
    te: any,
    dd: any,
    td: any
  ) {
    setTitle('');
    setSubject('');
    setSelectedTeams([]);
    setDescription('');
    //dueDate = '';
    setTimeEstimate('');
    setPoints('');
  }

  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [timeEstimate, setTimeEstimate] = useState('');
  const [points, setPoints] = useState('');

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
            <FormControl>
              <FormControl.Label>Points</FormControl.Label>
              <Input
                backgroundColor="white"
                placeholder="Enter max points"
                keyboardType="numeric"
                value={points}
                onChangeText={setPoints}
              />
            </FormControl>
            <FormControl>
              <Button backgroundColor="text.500" onPress={showDatePicker}>
                Due Date
              </Button>
              <DateTimePickerModal
                themeVariant="light"
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </FormControl>
            <TextDivider msg="" />
            <Center>
              <View style={{ flex: 1, padding: 10 }}>
                <HStack>
                  <Button
                    mr="10"
                    onPress={() => {
                      onFormSubmit(
                        subject,
                        description,
                        title,
                        points,
                        timeEstimate,
                        selectedTeams
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
                  >
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
