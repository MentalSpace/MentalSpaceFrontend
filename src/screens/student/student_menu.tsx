import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Button, Center, FormControl, Heading, VStack } from 'native-base';
import React from 'react';

import { SideBarList } from '../../components/student_stack';

type StudentMenuProps = NativeStackScreenProps<SideBarList, 'Menu'>;

const StudentMenu = ({ navigation }: StudentMenuProps) => {
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
          Main Menu
        </Heading>
        <VStack space={3} mt="5">
          <Button onPress={() => navigation.navigate('AddClass')}>
            Enroll in a class
          </Button>
          <Button onPress={() => navigation.navigate('Calendar')}>
            See events
          </Button>
          <Button onPress={() => navigation.navigate('Calendar')}>
            See and edit your subject preferences
          </Button>
          <Button onPress={() => navigation.navigate('Calendar')}>
            See and edit your scheduele preferences
          </Button>
          <Button onPress={() => navigation.navigate('Task')}>
            Homework adjustments
          </Button>
          <Button onPress={() => navigation.navigate('Calendar')}>
            Homework scheduele
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default StudentMenu;
