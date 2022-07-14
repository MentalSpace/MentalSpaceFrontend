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

import { LoginStackList } from '../../components/login_stack';
import { apiUrl } from '../../constants';
import { useCSRFToken } from '../../hooks/useCSRFToken';
import {
  validateEmail,
  validatePassword,
  validateSame,
  canContinue,
} from '../../signup_logic';

type StudentRegistrationProps = NativeStackScreenProps<
  LoginStackList,
  'StudentRegistration'
>;

type RegisterUserResponse = {
  status: string;
};

const StudentRegistration = ({ navigation }: StudentRegistrationProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirmPass] = useState('');

  const csrfToken = useCSRFToken();

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrfToken.data!.csrfToken,
    },
    body: JSON.stringify({
      type: 'Student',
      email: email.trim(),
      password,
    }),
  };
  const request = useQuery<RegisterUserResponse>(
    'registerUser',
    async () =>
      await (await fetch(apiUrl + '/user/register', requestOptions)).json(),
    { enabled: false }
  );
  useEffect(() => {
    if (request.isSuccess) {
      console.log(request.data.status);
      if (request.data.status === 'success')
        navigation.navigate('StudentSignup');
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
            <FormControl.Label>Email</FormControl.Label>
            <Input value={email} onChangeText={setEmail} />
            <FormControl.HelperText>
              {validateEmail(email) ? '' : 'Please enter a valid email'}
            </FormControl.HelperText>
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              type="password"
              value={password}
              onChangeText={setPassword}
            />
            <FormControl.HelperText>
              {validatePassword(password)
                ? ''
                : 'Password must be 8 or more characters in length'}
            </FormControl.HelperText>
          </FormControl>
          <FormControl>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input
              type="password"
              value={confirm}
              onChangeText={setConfirmPass}
            />
            <FormControl.HelperText>
              {validateSame(password, confirm) ? '' : 'Passwords must match'}
            </FormControl.HelperText>
          </FormControl>
          <Button
            mt="2"
            onPress={() => request.refetch()}
            disabled={!canContinue(email, password, confirm)}
          >
            Continue
          </Button>
          <Button
            variant="outline"
            onPress={() => navigation.navigate('Login')}
          >
            Back
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default StudentRegistration;
