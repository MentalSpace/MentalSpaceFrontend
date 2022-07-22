import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Button,
  Input,
  View,
  Box,
  Text,
  HStack,
  Center,
  Divider,
  Container,
  Heading,
  Icon,
  useTheme,
} from 'native-base';
import { propsFlattener } from 'native-base/lib/typescript/hooks/useThemeProps/propsFlattener';
import React, { useState, Component, useEffect } from 'react';

import { LoginStackList } from '../../components/login_stack';
import { SideBarList } from '../../components/student_stack';
import AddClassScreen from './add_class_screen';

var stuff = "0";

{
  /*const Please = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker selected={startDate} onChange={(date:Date) => setStartDate(date)} />
  );
};*/
}

type TaskListScreenProps = NativeStackScreenProps<SideBarList, 'Task'>;

function TaskListScreen({ navigation }: TaskListScreenProps) {
  return (
    <View>
      <Box safeArea p="9" w="90%" maxW="290" py="8" />
      <Center>
        
        <Text fontSize="lg" textAlign="center">
          <br />
          <table
            style={{ justifyContent: 'center',/* display: 'flex',*/ width: '100%' }}
          >
            <tr>
              <th>Assignment / Activity</th>
              {/* Students should be able to click on the assignent and from there choose to either edit the assignment (moves to screen F, but with information already filled out) or to delete the assignment (removes it from here as well as the calendar) - Also, each subject should be a different color */}

              <th>Original Time  </th>
              {/*The unit of time measurement (hrs,min,etc) should be listed in the column and info taken from calendar listing*/}
              <th>Remaining Time  </th>
              {/*The unit of time measurement (hrs,min,etc) should be listed in the column and info taken from calendar listing*/}
              <th>Planned Time  </th>
              {/*The unit of time measurement (hrs,min,etc) should be listed in the column and info taken from calendar listing*/}

              <th>Priority</th>
              {/* Items should receive priority based on the pre-selected option - items in list could be ordered by priority, but this somewhat defeats the purpose of having a priority column - other ordering options ? */}
            </tr>
            
            {/* This table should auto fill with the assignments from the date shown on the date thing */
            
            }
            <tr><td><Divider my="2" /></td><td><Divider my="2" /></td><td><Divider my="2" /></td><td><Divider my="2" /></td><td><Divider my="2" /></td></tr>
            <tr>
            <td>Math 1: graphing lines</td>
            <td>20</td>
            <td>0</td>
            <td><textarea style = {{textAlign : 'center', width : 35, height : 20, fontSize : 18, borderRadius : 5, resize : 'none', overflow : 'hidden'}} maxLength = "3" >20</textarea></td>
            <td><textarea style = {{textAlign : 'center', width : 35, height : 20, fontSize : 18, borderRadius : 5, resize : 'none', overflow : 'hidden'}} maxLength = "1" >1</textarea></td>
            </tr>
            <tr>
            <td>Spanish 1: A#2 grammar practice</td>
            <td>15</td>
            <td>0</td>
            <td><textarea style = {{textAlign : 'center', width : 35, height : 20, fontSize : 18, borderRadius : 5, resize : 'none', overflow : 'hidden'}} maxLength = "3" >15</textarea></td>
            <td><textarea style = {{textAlign : 'center', width : 35, height : 20, fontSize : 18, borderRadius : 5, resize : 'none', overflow : 'hidden'}} maxLength = "1" >2</textarea></td>
            </tr>
            <tr>
            <td>English 1: Odyssey Essay</td>
            <td>100</td>
            <td id = "thisgoesto70">0</td>
            <td><textarea style = {{textAlign : 'center', width : 35, height : 20, fontSize : 18, borderRadius : 5, resize : 'none', overflow : 'hidden'}} maxLength = "3" onKeyPress={() => {if(window.event.keyCode == 13){document.getElementById("thisgoesto70").textContent = "70"}} }>100</textarea></td>
            <td><textarea style = {{textAlign : 'center', width : 35, height : 20, fontSize : 18, borderRadius : 5, resize : 'none', overflow : 'hidden'}} maxLength = "1" ></textarea></td>
            </tr>
          </table>
          
        </Text>
      </Center>
    </View>
    /*<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button onPress={() => navigation.navigate('Calendar')}>
            Go back to the calendar
          </Button>
        </View>*/
  );
}

export default TaskListScreen;
