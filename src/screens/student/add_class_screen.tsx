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
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

import { SideBarList } from '../../components/student_stack';
import { apiUrl } from '../../constants';
import { validateString } from '../../signup_logic';

type AddClassScreenProps = NativeStackScreenProps<SideBarList, 'AddClass'>;

type RegisterUserResponse = {
  status: string;
};

function AddClassScreen({ navigation }: AddClassScreenProps) {
  const [classCode, setClassCode] = useState('');

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Prefer: 'code=200',
      'X-CSRF-TOKEN': '123',
    },
    body: JSON.stringify({
      type: 'Student',
      classCode,
    }),
  };
  const request = useQuery<RegisterUserResponse>(
    'registerUser',
    async () =>
      await (await fetch(apiUrl + '/class/join', requestOptions)).json(),
    { enabled: false }
  );
  useEffect(() => {
    if (request.isSuccess) {
      console.log(request.data.status);
      if (request.data.status === 'success') {
        navigation.navigate('Menu');
      }
    }
  }, [request.isSuccess]);

  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <VStack space={3} mt="5">
          <Heading
            size="lg"
            color="coolGray.800"
            _dark={{
              color: 'warmGray.50',
            }}
            fontWeight="semibold"
          >
            Enter a Class Code
          </Heading>
          <FormControl>
            <Input
              placeholder="Class Code"
              value={classCode}
              onChangeText={setClassCode}
            />
            <FormControl.HelperText>
              {validateString(classCode) ? '' : 'Please enter a class code'}
            </FormControl.HelperText>
          </FormControl>
          <Button
            disabled={!validateString(classCode)}
            onPress={() => {
              request.refetch();
            }}
          >
            Enter Code
          </Button>
          <Button onPress={() => navigation.navigate('Menu')}>
            Go back to the main menu
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}

export default AddClassScreen;
