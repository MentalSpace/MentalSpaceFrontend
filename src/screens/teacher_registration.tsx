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
import {
  validateEmail,
  validatePassword,
  validateSame,
  canContinue,
} from '../signup_logic';

type TeacherRegistrationProps = NativeStackScreenProps<
  LoginStackList,
  'TeacherRegistration'
>;

const TeacherRegistration = ({ navigation }: TeacherRegistrationProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

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
            <FormControl.Label>Email</FormControl.Label>
            <Input value={email} onChangeText={setEmail} />
            <FormControl.HelperText>
              {validateEmail(email) ? '' : 'Please enter a valid email'}
            </FormControl.HelperText>
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              value={password}
              onChangeText={setPassword}
              type="password"
            />
            <FormControl.HelperText>
              {validatePassword(password)
                ? ''
                : 'Password must be 8 or more characters in length'}
            </FormControl.HelperText>
          </FormControl>
          <FormControl>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input value={confirm} onChangeText={setConfirm} type="password" />
            <FormControl.HelperText>
              {validateSame(password, confirm) ? '' : 'Passwords must match'}
            </FormControl.HelperText>
          </FormControl>
          <Button
            mt="2"
            onPress={() => navigation.navigate('TeacherSignup')}
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

export default TeacherRegistration;
