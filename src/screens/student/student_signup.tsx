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
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { LoginStackList } from '../../components/login_stack';
import { apiUrl } from '../../constants';
import { useAccessToken } from '../../hooks/useAccessToken';
import { useCSRFToken } from '../../hooks/useCSRFToken';
import { validateString, canContinueStudent } from '../../signup_logic';

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

  const csrfToken = useCSRFToken();
  const accessToken = useAccessToken();

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrfToken.data!.csrfToken,
      Authorization: 'Bearer ' + accessToken.data!.accessToken,
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
