import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Box,
  Button,
  Center,
  Heading,
  Input,
  VStack,
  HStack,
  CheckIcon,
} from 'native-base';
import React from 'react';
import FlashMessage, { showMessage } from 'react-native-flash-message';

import { SideBarList } from '../../components/student_stack';

type AddClassScreenProps = NativeStackScreenProps<SideBarList, 'AddClass'>;

function AddClassScreen({ navigation }: AddClassScreenProps) {
  return (
    <>
      <Center w="100%">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
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
          <HStack space={3} mt="5">
            <Input
              placeholder="Class Code"
              bgColor="white"
              variant="unstyled"
              style={{
                borderWidth: 2,
                borderColor: '#a6a6a6',
                borderRadius: 5,
                fontSize: 14,
              }}
            />
            <Button
              bg="#154c79"
              colorScheme="secondary"
              style={{ borderRadius: 30 }}
              onPress={() => {
                showMessage({
                  message: 'Success!',
                  description: 'Successfully joined class!',
                  type: 'success',
                  backgroundColor: '#16a34a',
                  duration: 3000,
                  icon: 'success',
                });
              }}
            >
              <CheckIcon size="5" mt="0.5" color="white" />
            </Button>
          </HStack>
        </Box>
      </Center>
      <FlashMessage position={'top'} />
    </>
  );
}

export default AddClassScreen;
