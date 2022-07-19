import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  VStack,
  ScrollView,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import validator from 'validator';

import { LoginStackList } from '../../components/login_stack';
import { apiUrl } from '../../constants';
import { useAccessToken } from '../../hooks/useAccessToken';
import { useCSRFToken } from '../../hooks/useCSRFToken';

type TeacherSignupProps = NativeStackScreenProps<
  LoginStackList,
  'TeacherSignup'
>;

type RegisterTeacherResponse = {
  status: string;
  returnedId?: number;
};

const TeacherSignup = ({ navigation }: TeacherSignupProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [department, setDepartment] = useState('');
  // const [school, setSchool] = useState('');

  const csrfToken = useCSRFToken();
  const accessToken = useAccessToken();

  const queryClient = useQueryClient();

  const firstNameValidated = !validator.isEmpty(firstName);
  const lastNameValidated = !validator.isEmpty(lastName);
  const departmentValidated = !validator.isEmpty(department);
  const phoneNumValidated = validator.isMobilePhone(phoneNum);

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrfToken.data!.csrfToken,
      Authorization: 'Bearer ' + accessToken.data!.accessToken,
    },
    body: JSON.stringify({
      firstName,
      lastName,
      phone: phoneNum,
      department,
    }),
  };

  const request = useQuery<RegisterTeacherResponse>(
    'registerTeacher',
    async () => await (await fetch(apiUrl + '/teacher', requestOptions)).json(),
    { enabled: false }
  );
  useEffect(() => {
    if (request.isSuccess) {
      console.log(request.data.status);
      if (request.data.status === 'success') {
        queryClient.removeQueries('accessTokenResponse');
        navigation.navigate('Login');
      }
    }
  }, [request.isSuccess]);

  return (
    <ScrollView>
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
                {firstNameValidated ? '' : 'Please enter your first name'}
              </FormControl.HelperText>
            </FormControl>
            <FormControl>
              <FormControl.Label>Last name</FormControl.Label>
              <Input value={lastName} onChangeText={setLastName} />
              <FormControl.HelperText>
                {lastNameValidated ? '' : 'Please enter your last name'}
              </FormControl.HelperText>
            </FormControl>
            <FormControl>
              <FormControl.Label>Phone Number</FormControl.Label>
              <Input value={phoneNum} onChangeText={setPhoneNum} />
              <FormControl.HelperText>
                {phoneNumValidated ? '' : 'Please enter a valid phone number'}
              </FormControl.HelperText>
            </FormControl>
            <FormControl>
              <FormControl.Label>Department</FormControl.Label>
              <Input value={department} onChangeText={setDepartment} />
              <FormControl.HelperText>
                {departmentValidated
                  ? ''
                  : 'Please enter a valid department name'}
              </FormControl.HelperText>
            </FormControl>
            {/* <FormControl>
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
          </FormControl> */}
            <Button
              mt="2"
              onPress={() => request.refetch()}
              disabled={
                !(
                  firstNameValidated &&
                  lastNameValidated &&
                  phoneNumValidated &&
                  departmentValidated
                )
              }
            >
              Sign up
            </Button>
          </VStack>
        </Box>
      </Center>
    </ScrollView>
  );
};

export default TeacherSignup;
