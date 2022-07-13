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
import CalendarScreen from '../calendar_screen';
import AddClassScreen from './add_class_screen';

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
        <HStack>
          <Button
            mt="0"
            style={{ marginRight: 7, backgroundColor: '#154c79' }}
            onPress={() => navigation.navigate('AddClass')}
          >
            Add Assignment / Activity
          </Button>
          {/* Should switch to screen F where they can add an assignment / activity */}

          <Button
            mt="0"
            style={{ marginRight: 7, backgroundColor: '#154c79' }}
            onPress={() => navigation.navigate('AddClass')}
          >
            Modify Priority Options
          </Button>
          {/* Should swithc to screen G2 where they can change how assignments are prioritized*/}

          <input
            type="date"
            className="Date"
            style={{
              borderColor: '#154c79',
              backgroundColor: '#F2F2F2',
              borderRadius: 6,
              textAlign: 'center',
            }}
          />
          {/* When the date is adjusted on the date thing the table should then be filled with the items from that day */}

          <Button
            mt="0"
            style={{ backgroundColor: '#154c79', marginLeft: 7 }}
            onPress={() => navigation.navigate('AddClass')}
          >
            ✔
          </Button>
        </HStack>
        <Text fontSize="lg" textAlign="center">
          <br />
          <table
            style={{ justifyContent: 'center', display: 'flex', width: '100%' }}
          >
            <tr>
              <th>Assignment / Activity </th>
              {/* Students should be able to click on the assignent and from there choose to either edit the assignment (moves to screen F, but with information already filled out) or to delete the assignment (removes it from here as well as the calendar) - Also, each subject should be a different color */}

              <th>Time Estimate </th>
              {/*The unit of time measurement (hrs,min,etc) should be listed in the column and info taken from calendar listing*/}

              <th>Priority </th>
              {/* Items should receive priority based on the pre-selected option - items in list could be ordered by priority, but this somewhat defeats the purpose of having a priority column - other ordering options ? */}
            </tr>
            {/* This table should auto fill with the assignments from the date shown on the date thing */}
          </table>
          <Divider my="2" />
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
