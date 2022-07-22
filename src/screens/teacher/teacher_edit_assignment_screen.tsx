// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import TimeInput from '@tighten/react-native-time-input';
// import { xorBy } from 'lodash';
// import {
//   Button,
//   Container,
//   useTheme,
//   View,
//   Box,
//   Center,
//   Heading,
//   VStack,
//   FormControl,
//   Input,
//   Link,
//   TextArea,
//   Slide,
//   HStack,
//   CheckIcon,
//   Select,
//   AlertDialog,
//   AddIcon,
//   ArrowBackIcon,
// } from 'native-base';
// import React, { useState } from 'react';
// import {
//   ScrollView,
//   SafeAreaView,
//   StatusBar,
//   FlatList,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
// } from 'react-native';
// import SelectBox from 'react-native-multi-selectbox';
// import { ScreenContainer } from 'react-native-screens';
// import { SideBarList } from '../../components/teacher_stack';
// import TextDivider from '../../components/text_divider';

// type AssignmentsScreenProps = NativeStackScreenProps<
// SideBarList,
//   'EditAssignments'
// >;

// const EditAssignmentsScreen = ({ navigation }: AssignmentsScreenProps) => {
//   const K_OPTIONS = [
//     {
//       item: 'Period 1',
//       id: '1',
//     },
//     {
//       item: 'Period 2',
//       id: '2',
//     },
//     {
//       item: 'Period 3',
//       id: '3',
//     },
//     {
//       item: 'Period 4',
//       id: '4',
//     },
//     {
//       item: 'Period 5',
//       id: '5',
//     },
//     {
//       item: 'Period 6',
//       id: '6',
//     },
//     {
//       item: 'Period 7',
//       id: '7',
//     },
//     {
//       item: 'Period 8',
//       id: '8',
//     },
//   ];

//   const [shouldOverlapWithTrigger] = React.useState(false);
//   const [position, setPosition] = React.useState('auto');
//   const [selectedTeam, setSelectedTeam] = useState({});

//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
//   const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

//   const showDatePicker = () => {
//     setDatePickerVisibility(true);
//   };
//   const hideDatePicker = () => {
//     setDatePickerVisibility(false);
//   };
//   const handleConfirm = (date: any) => {
//     console.warn('A date has been picked: ', date);
//     hideDatePicker();
//   };

//   const theme = useTheme();

//   const demoValueControlledTextArea = (e: any) => {
//     setTextAreaValue(e.currentTarget.value);
//   };

//   const [isOpen, setIsOpen] = React.useState(false);
//   const [alertIsOpen, alertSetIsOpen] = React.useState(false);
//   const onClose = () => setIsOpen(false);
//   const alertOnClose = () => alertSetIsOpen(false);

//   const cancelRef = React.useRef(null);
//   const [textAreaValue, setTextAreaValue] = useState('');

//   function delay(ms: number) {
//     return new Promise((resolve) => setTimeout(resolve, ms));
//   }

//   // When multiple periods are selected, this function handles the changes and updates the array of periods
//   function onMultiChange() {
//     return (item: never) => setSelectedTeams(xorBy(selectedTeams, [item], 'id'));
//   }

//   // Used to update the values of the TextInput boxes as well as clear the data when called
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [type, setType] = useState('');
//   const [selectedTeams, setSelectedTeams] = useState([]);
//   const [points, setPoints] = useState('');
//   const [timeEstimate, setTimeEstimate] = useState('');
//   const [dateAssigned, setDateAssigned] = useState('');
//   const [dueDate, setDueDate] = useState('');
//   const [time, setTime] = useState('');
//   const handleTimeChange = (time: any, validTime: any) => {
//     if (!validTime) return;
//     setTime(time);
//   };

//   // This function is called when assignment is added, the function clears all of the previously inputted data (it clears all the text boxes),
//   // so that the user can immediately add another assignment if they want to. This function also stores all of the data and sends it to the backend.
//   function onFormSubmit(
//     newTitle: any,
//     newDescription: any,
//     newType: any,
//     newPeriods: any,
//     newPoints: any,
//     newEstimatedTime: any,
//     newDateAssigned: any,
//     newTimeDue: any,
//     newDueDate: any
//   ) {
//     setTitle('');
//     setDescription('');
//     setType('');
//     setSelectedTeams([]);
//     setPoints('');
//     setTimeEstimate('');
//     setDateAssigned('');
//     setTime('');
//     setDueDate('');

//     return [
//       newTitle,
//       newDescription,
//       newType,
//       newPeriods,
//       newPoints,
//       newEstimatedTime,
//       newDateAssigned,
//       newTimeDue,
//       newDueDate,
//     ];
//   }

//   return (
//     <ScrollView>
//       <Center w="100%">
//         <Heading
//           paddingTop="30"
//           size="lg"
//           fontWeight="600"
//           color="coolGray.800"
//           _dark={{ color: 'warmGray.50' }}
//         >
//           Edit Assignment
//         </Heading>
//         <Box
//           safeArea
//           w="90%"
//           maxW="500"
//           style={{
//             marginTop: 10,
//             paddingLeft: 15,
//             paddingRight: 15,
//             paddingTop: 15,
//           }}
//         >
//           <VStack space={3}>
//             <FormControl>
//               <FormControl.Label>Title</FormControl.Label>
//               <Input
//                 backgroundColor="white"
//                 placeholder="Enter Title"
//                 defaultValue={title}
//                 value={title}
//                 onChangeText={setTitle}
//               />
//             </FormControl>
//             <FormControl>
//               <FormControl.Label>Description</FormControl.Label>
//               <TextArea
//                 backgroundColor="white"
//                 placeholder="Enter Description"
//                 defaultValue={description}
//                 value={description}
//                 onChangeText={setDescription}
//                 autoCompleteType={undefined}
//               />
//             </FormControl>
//             <FormControl>
//               <FormControl.Label>Type</FormControl.Label>
//               <Select
//                 backgroundColor="white"
//                 selectedValue={type}
//                 minWidth={200}
//                 accessibilityLabel="Please select the type of assignment"
//                 placeholder="Please select the type of assignment"
//                 onValueChange={(itemValue) => setType(itemValue)}
//                 _selectedItem={{
//                   bg: 'cyan.600',
//                   endIcon: <CheckIcon size={4} />,
//                 }}
//               >
//                 <Select.Item label="Homework" value="homeWork" />
//                 <Select.Item label="Class Work" value="classWork" />
//                 <Select.Item label="Essay" value="essay" />
//                 <Select.Item label="Project" value="project" />
//                 <Select.Item label="Quiz" value="quiz" />
//                 <Select.Item label="Test" value="test" />
//                 <Select.Item label="Final" value="final" />
//               </Select>
//             </FormControl>
//             <SafeAreaView>
//               <FormControl>
//                 <FormControl.Label>Period(s)</FormControl.Label>
//                 <Box backgroundColor="white">
//                   <SelectBox
//                     label=""
//                     placeholder="Select your periods"
//                     options={K_OPTIONS}
//                     selectedValues={selectedTeams}
//                     onMultiSelect={onMultiChange()}
//                     onTapClose={onMultiChange()}
//                     isMulti
//                     toggleIconColor="orange"
//                     searchIconColor="orange"
//                     arrowIconColor="orange"
//                     listOptionProps={{ nestedScrollEnabled: true }}
//                   />
//                 </Box>
//               </FormControl>
//             </SafeAreaView>
//             <FormControl>
//               <FormControl.Label>Points</FormControl.Label>
//               <Input
//                 backgroundColor="white"
//                 placeholder="Enter max points"
//                 keyboardType="numeric"
//                 defaultValue={points}
//                 value={points}
//                 onChangeText={setPoints}
//               />
//             </FormControl>
//             <FormControl>
//               <FormControl.Label>Estimated Time</FormControl.Label>
//               <Input
//                 backgroundColor="white"
//                 placeholder="Enter estimated time to complete"
//                 defaultValue={timeEstimate}
//                 value={timeEstimate}
//                 onChangeText={setTimeEstimate}
//               />
//             </FormControl>
//             <FormControl>
//               <FormControl.Label>Date Assigned</FormControl.Label>
//               <Input
//                 backgroundColor="white"
//                 placeholder="mm/dd/yyyy"
//                 defaultValue={dateAssigned}
//                 value={dateAssigned}
//                 onChangeText={setDateAssigned}
//               />
//             </FormControl>
//             <FormControl>
//               <FormControl.Label>Due Date and Time Due</FormControl.Label>
//               <HStack>
//                 <TimeInput onTimeChange={handleTimeChange} />
//                 <Box paddingLeft="12">
//                   <Input
//                     height="10"
//                     width="228"
//                     backgroundColor="white"
//                     placeholder="mm/dd/yyyy"
//                     defaultValue={dueDate}
//                     value={dueDate}
//                     onChangeText={setDueDate}
//                   />
//                 </Box>
//               </HStack>
//             </FormControl>
//             <TextDivider msg="" />
//             <Center>
//               <View style={{ flex: 1, padding: 10 }}>
//                 <HStack>
//                   <Button
//                     style={{ borderRadius: 30 }}
//                     ml="10"
//                     mr="10"
//                     onPress={() => navigation.navigate('Assignments')}
//                   >
//                     <ArrowBackIcon size="5" mt="0.5" color="white" />
//                   </Button>
//                   <Button
//                     style={{ borderRadius: 30 }}
//                     ml="10"
//                     mr="10"
//                     onPress={() => {
//                       onFormSubmit(
//                         title,
//                         description,
//                         type,
//                         selectedTeams,
//                         points,
//                         timeEstimate,
//                         dateAssigned,
//                         time,
//                         dueDate
//                       );
//                       navigation.navigate('Assignments')
//                     }}
//                   >
//                     <CheckIcon size="5" mt="0.5" color="white" />
//                   </Button>
//                 </HStack>
//               </View>
//             </Center>
//           </VStack>
//         </Box>
//       </Center>
//     </ScrollView>
//   );
// };

// export default EditAssignmentsScreen;
