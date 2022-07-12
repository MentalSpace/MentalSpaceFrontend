import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  VStack,
  Select,
  CheckIcon,
} from 'native-base';
import React, { useState } from 'react';

import { LoginStackList } from '../../components/login_stack';
import { validateString, canContinueTeacher } from '../../signup_logic';

type TeacherSignupProps = NativeStackScreenProps<
  LoginStackList,
  'TeacherSignup'
>;

const TeacherSignup = ({ navigation }: TeacherSignupProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [school, setSchool] = useState('');

  return (
    <Center w="100%">
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading
          size="lg"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}
          fontWeight="semibold"
        >
          Teacher Sign Up
        </Heading>
        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>First name</FormControl.Label>
            <Input value={firstName} onChangeText={setFirstName} />
            <FormControl.HelperText>
              {validateString(firstName) ? '' : 'Please enter your first name'}
            </FormControl.HelperText>
          </FormControl>
          <FormControl>
            <FormControl.Label>Last name</FormControl.Label>
            <Input value={lastName} onChangeText={setLastName} />
            <FormControl.HelperText>
              {validateString(lastName) ? '' : 'Please enter your last name'}
            </FormControl.HelperText>
          </FormControl>
          <FormControl>
            <FormControl.Label>School</FormControl.Label>
            <Select
              selectedValue={school}
              minWidth="200"
              accessibilityLabel="Choose school"
              placeholder="Choose school"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={(itemValue) => {
                setSchool(itemValue);
                console.log(school);
              }}
            >
              <Select.Item label="Santa Teresa" value="Santa Teresa" />
              <Select.Item label="Oak Grove" value="Oak Grove" />
            </Select>
          </FormControl>
          <Button
            mt="2"
            onPress={() => navigation.navigate('Home')}
            disabled={!canContinueTeacher(firstName, lastName, school)}
          >
            Sign up
          </Button>
          <Button
            variant="outline"
            onPress={() => navigation.navigate('TeacherRegistration')}
          >
            Back
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default TeacherSignup;
