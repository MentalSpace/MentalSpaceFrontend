import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  VStack,
} from 'native-base';
import React, { useState } from 'react';

import { LoginStackList } from '../components/login_stack';
import { validateString, canContinueTeacher } from '../signup_logic';

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
        <Heading
          mt="1"
          color="coolGray.600"
          _dark={{
            color: 'warmGray.200',
          }}
          fontWeight="medium"
          size="xs"
        >
          Sign up to continue!
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
            <Input value={school} onChangeText={setSchool} />
            <FormControl.HelperText>
              {validateString(school)
                ? ''
                : 'Please enter the name of your school'}
            </FormControl.HelperText>
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
