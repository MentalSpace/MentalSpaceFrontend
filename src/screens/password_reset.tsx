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
import { validateEmail } from '../signup_logic';

type PasswordResetProps = NativeStackScreenProps<LoginStackList, 'Reset'>;

const ResetScreen = ({ navigation }: PasswordResetProps) => {
  const [email, setEmail] = useState('');

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
          Reset Your Password
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
          Please enter your email
        </Heading>
        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input value={email} onChangeText={setEmail} />
            <FormControl.HelperText>
              {validateEmail(email) ? '' : 'Please enter a valid email'}
            </FormControl.HelperText>
          </FormControl>
          <Button
            mt="2"
            disabled={!validateEmail(email)}
            onPress={() => navigation.navigate('Login')}
          >
            Reset
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

export default ResetScreen;
