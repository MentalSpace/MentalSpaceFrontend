import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Button,
  Center,
  Checkbox,
  View,
  Heading,
  AddIcon,
  DeleteIcon,
  Select,
  CheckIcon,
  Box,
  HStack,
  Text,
  Input,
  VStack
} from 'native-base';
import React, { ClassType, Component, useEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { SideBarList } from '../../components/teacher_stack';

// const styles = StyleSheet.create({
//   text: { textAlign: 'center' },
//   btnText: { textAlign: 'center' },
//   container: {
//     flex: 1,
//     padding: 16,
//     paddingTop: 30,
//     backgroundColor: 'gray.800',
//   },
//   head: { height: 40, backgroundColor: 'amber.200' },
//   row: { flexDirection: 'row', backgroundColor: 'gray.800' },
//   btn: { width: 28, height: 18, backgroundColor: 'gray.800', borderRadius: 2 },
// });


// const SubjectSelect = () => {
//   let [service, setService] = React.useState('');
//   return (
//     <Box maxW="200">
//       <Select
//         selectedValue={service}
//         minWidth="20"
//         maxWidth="1000"
//         accessibilityLabel="Select"
//         placeholder="Select"
//         _selectedItem={{
//           bg: 'orange',
//           paddingRight: '10',
//           endIcon: <CheckIcon size="2" />,
//         }}
//         mt={1}
//         onValueChange={(itemValue: any) => setService(itemValue)}
//       >
//         <Select.Item label="APCSA" value="APCSA" />
//         <Select.Item label="Calc" value="Calc" />
//       </Select>
//     </Box>
//   );
// };

// const PeriodSelect = () => {
//   let [service, setService] = React.useState('');
//   return (
//     <Box maxW="200">
//       <Select
//         selectedValue={service}
//         minWidth="20"
//         maxWidth="1000"
//         accessibilityLabel="Select"
//         placeholder="Select"
//         _selectedItem={{
//           bg: 'orange',
//           endIcon: <CheckIcon size="7" />,
//         }}
//         mt={1}
//         onValueChange={(itemValue: any) => setService(itemValue)}
//       >
//         <Select.Item label="1" value="1" />
//         <Select.Item label="2" value="2" />
//         <Select.Item label="3" value="3" />
//         <Select.Item label="4" value="4" />
//         <Select.Item label="5" value="5" />
//         <Select.Item label="6" value="6" />
//         <Select.Item label="7" value="7" />
//       </Select>
//     </Box>
//   );
// };

// export default class ClassPeriods extends React.Component<any, any> {
//   constructor(props: any) {
//     super(props);
//     this.state = {
//       tableHead: ['', 'Period', '', 'Subject', '', 'Class Code'],
//       tableData: [
//         ['', <PeriodSelect />, '', <SubjectSelect />, '', '4'],
//         ['', <PeriodSelect />, '', <SubjectSelect />, '', 'd'],
//         ['', <PeriodSelect />, '', <SubjectSelect />, '', '4'],
//         ['', <PeriodSelect />, '', <SubjectSelect />, '', '3'],
//       ],
//     };
//   }

//   _alertIndex(index: any) {
//     Alert.alert(`This is row ${index + 1}`);
//   }
//   render() {
//     const state = this.state;
//     const element = (data: any, index: any) => (
//       <Checkbox
//         value="true"
//         onChange={() => this._alertIndex(index)}
//       ></Checkbox>
//     );
//     return (
//       <View style={styles.container}>
//         <Center>
//           <Heading
//             size="xl"
//             color="coolGray.800"
//             _dark={{
//               color: 'warmGray.50',
//             }}
//             fontWeight="semibold"
//             paddingBottom="30"
//             paddingTop="2%"
//           >
//             Classes
//           </Heading>
//         </Center>
//         <Center>
//           <Table borderStyle={{ borderColor: 'transparent' }}>
//             <Row
//               data={state.tableHead}
//               style={styles.head}
//               textStyle={styles.text}
//             />
//             {state.tableData.map((rowData: any, index: any) => (
//               <TableWrapper key={index} style={styles.row}>
//                 {rowData.map((cellData: any, cellIndex: any) => (
//                   <Cell
//                     key={cellIndex}
//                     data={cellIndex === 0 ? element(cellData, index) : cellData}
//                     textStyle={styles.text}
//                   />
//                 ))}
//               </TableWrapper>
//             ))}
//           </Table>

//           <Center>
//             <View
//               style={{
//                 alignSelf: 'stretch',
//                 flexDirection: 'row',
//                 alignItems: 'center',
//               }}
//             >
//               <Button
//                 style={{ marginTop: 30, marginRight: 21, borderRadius: 30 }}
//               >
//                 <AddIcon size="5" mt="0.5" color="white" />
//               </Button>
//               <Button style={{ marginTop: 30, borderRadius: 30 }}>
//                 <DeleteIcon size="5" mt="0.5" color="white" />
//               </Button>
//             </View>
//           </Center>
//         </Center>
//       </View>
//     );
//  }
//}
type TeacherClassesProps = NativeStackScreenProps<SideBarList,'ClassPeriods'>;
function ClassPeriodsScreen ({navigation}: TeacherClassesProps){
  //Hooks for storing User Input
  const [period, updatePeriod] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [newPeriod, inputPeriod] = useState("");
  
  //storage of textbox input
  const [newSubject, inputSubject] = useState("");
  
  //Hooks that render new additions
  const [periods, displayPeriods] = useState(["1", "2"]);
  const [subject, updateSubject] = useState(["English 3", "English 1"]);
  const [code, updateCode] = useState(["WSXCVV", "ERRSSS", "SDFXCV"]);
  const [row, updateRow] = useState([1, 2]);

  const[checked, updateChecked] = useState([]);
    return (
        <>
          <View>
            <Center>
              <Heading
                size="xl"
                color="coolGray.800"
                _dark={{
                  color: 'warmGray.50',
                }}
                fontWeight="semibold"
                paddingBottom="30"
                paddingTop="2%"
              >
                Classes
              </Heading>
            </Center>
            <Center>
              <HStack>
                  <Heading size="md" fontWeight="semibold" mx={10}>Period</Heading>
                  <Heading size="md" fontWeight="semibold" mx={10}>Subject</Heading>
                  <Heading size="md" fontWeight="semibold" mx={10}>Class Code</Heading>
              </HStack>
              <VStack>
              <Checkbox.Group onChange={updateChecked}>
              {row.map((val, index) => (
                <Checkbox mx="10" value={"Row " + index}>
                  <HStack  my={1}>
                    <Center>
                    <Text mx={10}>
                      {periods[index]}
                    </Text>
                    </Center>
                    <Text mx={10}>
                      {subject[index]}
                    </Text>
                    <Text mx={10}>
                      {code[index]}
                    </Text>
                  </HStack>
                </Checkbox>
              ))}
              </Checkbox.Group>
              <Center>
                <Heading
                  size="md"
                  color="coolGray.800"
                  _dark = {{ color: "warmGray.50" }}
                  fontWeight="semibold"
                  my="5"
                  >Input New Class
                </Heading>
              </Center>
              <Center>
                <HStack>
                  <Select 
                  selectedValue={String(newPeriod)}
                  placeholder="Select Period Number"
                  onValueChange={newPeriod => inputPeriod(newPeriod)}>
                    {period.map(p => (
                        <Select.Item 
                        label={String(p)} 
                        value={String(p)}
                        />
                      ))}
                  </Select>
                  <Input 
                  onChangeText={inputSubject}
                  placeholder="Input a New Subject">
                      
                  </Input>
                </HStack>
                </Center>
              </VStack>
              <Center>
                <View
                  style={{
                    alignSelf: 'stretch',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Button
                    style={{ marginTop: 30, marginRight: 21, borderRadius: 30 }}
                    onPress={() => {
                      updateRow(row.concat([row.length]));
                      updateSubject(subject.concat([newSubject]));
                      displayPeriods(periods.concat([newPeriod]));
                      //updateCode();
                      console.log("Clicked");
                      console.log(newPeriod);
                      console.log(row);
                      console.log(subject);
                      console.log(periods);
                    }}
                  >
                    <AddIcon size="5" mt="0.5" color="white" />
                  </Button>
                  <Button style={{ marginTop: 30, borderRadius: 30 }}>
                    <DeleteIcon size="5" mt="0.5" color="white" />
                  </Button>
                </View>
              </Center>
            </Center>
          </View>
          </>
        );
     }
export default ClassPeriodsScreen;