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
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { LoginStackList } from '../components/login_stack';
import { apiUrl } from '../constants';
import { validateString, canContinueStudent } from '../signup_logic';

type StudentSignupProps = NativeStackScreenProps<
  LoginStackList,
  'StudentSignup'
>;

type RegisterStudentResponse = {
  status: string;
  studentId: number;
};

const StudentSignup = ({ navigation }: StudentSignupProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [canonicalID, setCanonicalID] = useState('');
  const [school, setSchool] = useState('');

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Prefer: 'code=200',
      'X-CSRF-TOKEN': '123',
      Authorization: 'Bearer SOMETOKENVALUE',
    },
    body: JSON.stringify({
      type: 'Student',
      firstName,
      lastName,
      canonicalID,
      school,
    }),
  };

  const request = useQuery<RegisterStudentResponse>(
    'registerStudent',
    async () => await (await fetch(apiUrl + '/student', requestOptions)).json(),
    { enabled: false }
  );
  useEffect(() => {
    if (request.isSuccess) {
      console.log(request.data.status);
      if (request.data.status === 'success') navigation.navigate('Login');
    }
  }, [request.isSuccess]);

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
          Student Sign Up
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
            <FormControl.Label>Student ID</FormControl.Label>
            <Input value={canonicalID} onChangeText={setCanonicalID} />
            <FormControl.HelperText>
              {validateString(canonicalID)
                ? ''
                : 'Please enter your Student ID'}
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
            onPress={() => request.refetch()}
            disabled={
              !canContinueStudent(firstName, lastName, canonicalID, school)
            }
          >
            Sign up
          </Button>
          <Button
            variant="outline"
            onPress={() => navigation.navigate('StudentRegistration')}
          >
            Back
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default StudentSignup;
