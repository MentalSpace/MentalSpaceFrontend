import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  ScrollView,
  VStack,
  Text,
  Divider,
  Radio,
  Stack,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import validator from 'validator';

import { LoginStackList } from '../components/login_stack';
import { AccountType, apiUrl } from '../constants';
import { AccessTokenResponse } from '../hooks/useAccessToken';
import { useCSRFToken } from '../hooks/useCSRFToken';
import { useLogin } from '../hooks/useLogin';

type UserRegistrationProps = NativeStackScreenProps<
  LoginStackList,
  'UserRegistration'
>;

type RegisterUserResponse = {
  status: string;
};

type RegisterParameters = {
  accountType: AccountType;
  email: string;
  password: string;
};

const UserRegistration = ({ navigation }: UserRegistrationProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [accountType, setAccountType] = useState<AccountType>(AccountType.Student);

  const csrfToken = useCSRFToken();
  const login = useLogin();
  const queryClient = useQueryClient();

  const register = useMutation((parameters: RegisterParameters) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken.data!.csrfToken,
      },
      body: JSON.stringify({
        type: parameters.accountType as string,
        email: parameters.email.trim(),
        password: parameters.password,
      }),
    };

    const registerRequest = async (): Promise<RegisterUserResponse> =>
      await (await fetch(apiUrl + '/user/register', requestOptions)).json();

    return registerRequest();
  });

  useEffect(() => {
    if (register.isSuccess) {
      console.log(register.data.status);
      if (register.data.status === 'success') login.mutate({ email, password });
    }
  }, [register.isSuccess]);
  useEffect(() => {
    if (login.isSuccess) {
      console.log(login.data.status);
      if (login.data.status === 'success') {
        queryClient.setQueryData(
          'accessTokenResponse',
          login.data as AccessTokenResponse
        );
        if (accountType === AccountType.Student) {
          navigation.navigate('StudentSignup');
        } else {
          navigation.navigate('TeacherSignup');
        }
      }
    }
  }, [login.isSuccess]);

  const emailValidated = validator.isEmail(email);
  const passwordValidated = validator.isLength(password, { min: 8 });
  const passwordsMatch = validator.equals(password, confirmPass);

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
            Sign Up
          </Heading>
          <Divider />
          <VStack space={3} mt={6}>
            <Text fontSize="sm" color="text.500">
              Account Type
            </Text>
            <Radio.Group
              name="accountTypeGroup"
              accessibilityLabel="User account type"
              size="sm"
              value={accountType as string}
              onChange={(value) => setAccountType(value as AccountType)}
            >
              <Stack direction="row" space="4">
                <Radio value="Student" _text={{ color: 'text.500' }}>
                  Student
                </Radio>
                <Radio value="Teacher" _text={{ color: 'text.500' }}>
                  Teacher
                </Radio>
              </Stack>
            </Radio.Group>
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input value={email} onChangeText={setEmail} />
              <FormControl.HelperText>
                {emailValidated ? '' : 'Please enter a valid email'}
              </FormControl.HelperText>
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                value={password}
                type="password"
                onChangeText={setPassword}
              />
              <FormControl.HelperText>
                {passwordValidated
                  ? ''
                  : 'Password must be 8 or more characters in length'}
              </FormControl.HelperText>
            </FormControl>
            <FormControl>
              <FormControl.Label>Confirm Password</FormControl.Label>
              <Input
                value={confirmPass}
                type="password"
                onChangeText={setConfirmPass}
              />
              <FormControl.HelperText>
                {passwordsMatch ? '' : 'Passwords must match'}
              </FormControl.HelperText>
            </FormControl>
            <Button
              mt="2"
              onPress={() => register.mutate({ accountType, email, password })}
              disabled={
                !(emailValidated && passwordValidated && passwordsMatch)
              }
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
    </ScrollView>
  );
};

export default UserRegistration;
