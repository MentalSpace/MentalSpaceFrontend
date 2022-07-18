import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Button, Center, Heading, Input, VStack } from 'native-base';
import React from 'react';

import { SideBarList } from '../../components/student_stack';

type AddClassScreenProps = NativeStackScreenProps<SideBarList, 'AddClass'>;

function AddClassScreen({ navigation }: AddClassScreenProps) {
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
          <Input placeholder="Class Code" />
          <Button>Enter Code</Button>
          <Button onPress={() => navigation.navigate('Calendar')}>
            Go back to the calendar
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}

export default AddClassScreen;
