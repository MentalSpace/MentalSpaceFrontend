import React, { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Box,
  Button,
  Center,
  Heading,
  VStack,
  Text,
  Select,
  CheckIcon,
  Checkbox,
  DeleteIcon,
  View,
} from 'native-base';
import { SideBarList } from '../../components/teacher_stack';
import { useQuery } from 'react-query';
import { apiUrl } from '../../constants';
import { useCSRFToken } from '../../hooks/useCSRFToken';
import { useAccessToken } from '../../hooks/useAccessToken';

type ClassDisplayProps = NativeStackScreenProps<SideBarList, 'Students'>;

// //stores data of students in a list when fetched using a classId
// type GetStudents = {
//   students: {"studentId": number, "canonicalId": string, "firstName":string, "lastName":string, "phone":number, "grade":number}[]
// };

function ClassStudentsScreen({ navigation }: ClassDisplayProps) {
  //Hook. Controls the current period number (initially set as 0) and updates whenever setPeriod is called
  const [period, setPeriod] = useState('0');
  const [checked] = useState<number[]>([]);

  return (
    <>
      <Center width="100%" textAlign={'center'}>
        <Box safeArea p="2" py="8" w="100%" maxW="218">
          <VStack space={3} mt="5">
            <Heading
              size="lg"
              color="coolGray.800"
              _dark={{ color: 'warmGray.50' }}
              fontWeight="semibold"
              paddingTop="5"
              paddingBottom="30"
              textAlign={'center'}
            >
              Claire Chan
            </Heading>
            <Heading
              size="md"
              color="coolGray.800"
              _dark={{ color: 'warmGray.50' }}
              fontWeight="semibold"
            >
              Select Period
            </Heading>
            {/* DROPDOWN MENU */}
            <Select
              selectedValue={period}
              minWidth="200"
              accessibilityLabel="Choose Period"
              placeholder="Choose Period"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={(period) => setPeriod(period)}
              alignSelf="center"
            >
              {/*Incorporates dropdown menu with the label set as the name of the period */}
              <Select.Item label="Period 1" value="0"></Select.Item>
              <Select.Item label="Period 2" value="1"></Select.Item>
              <Select.Item label="Period 3" value="2"></Select.Item>
              <Select.Item label="Period 4" value="3"></Select.Item>
              <Select.Item label="Period 5" value="4"></Select.Item>
              <Select.Item label="Period 6" value="5"></Select.Item>
              <Select.Item label="Period 7" value="6"></Select.Item>
            </Select>
          </VStack>
        </Box>
      </Center>
      <Center width="100%" textAlign={'center'}>
        <Box safeArea p="2" pb="8" w="90%" maxW="218">
          {/*Group of checkboxes representing students from a period based on class picked by dropdown menu.
               Displays the student's first name, last name*/}
          <Checkbox.Group>
            {/*Create a list of checkboxes with the names of students*/}
            <Checkbox value="Clare Bauer" ml="0">
              Clare Bauer
            </Checkbox>
            <Checkbox value="Keely Richard" ml="0">
              Keely Richard
            </Checkbox>
            <Checkbox value="Kyan Andersen" ml="0">
              Kyan Andersen
            </Checkbox>
            <Checkbox value="Raelynn Ware" ml="0">
              Raelynn Ware
            </Checkbox>
            <Checkbox value="Damarion Todd" ml="0">
              Damarion Todd
            </Checkbox>
            <Checkbox value="Orlando Soto" ml="0">
              Orlando Soto
            </Checkbox>
            <Checkbox value="Javier Fernandez" ml="0">
              Javier Fernandez
            </Checkbox>
            <Checkbox value="Aracely Little" ml="0">
              Aracely Little
            </Checkbox>
            <Checkbox value="Leanna Mahoney" ml="0">
              Leanna Mahoney
            </Checkbox>
            <Checkbox value="Kailyn Dickson" ml="0">
              Kailyn Dickson
            </Checkbox>
            <Checkbox value="Yoselin Wolfe" ml="0">
              Yoselin Wolfe
            </Checkbox>
            <Checkbox value="Amiyah Adams" ml="0">
              Amiyah Adams
            </Checkbox>
          </Checkbox.Group>
          {/*Delete Icon*/}
          <View
            style={{
              alignSelf: 'stretch',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Button
              mt="8"
              ml="78"
              style={{
                borderRadius: 30,
              }}
            >
              <DeleteIcon size="5" mt="0.5" color="white" />
            </Button>
          </View>
        </Box>
      </Center>
    </>
  );
}
export default ClassStudentsScreen;
