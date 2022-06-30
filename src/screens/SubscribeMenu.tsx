import React from 'react';
import { Box, Button, Center, FormControl, Heading, Select, VStack } from "native-base";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {SideBarList} from '../components/main_stack'

type SubscribeMenuProps = NativeStackScreenProps<SideBarList, "SubscribeMenu">

function SubscribeMenu ({navigation}: SubscribeMenuProps){
  return (
    <Center w = "100%">
    <Box safeArea p="2" w="90%" maxW="290" py="8">
      <VStack space={3} mt="5">
      <Heading size="lg" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }} fontWeight="semibold">
          Subscribe To...
      </Heading>
      <Heading size = "md" color = "coolGray.800" _dark={{
        color: "warmGray.50"
      }} fontWeight="semibold">
          Please fill out all 3 fields
      </Heading>
      <FormControl>
            <FormControl.Label>Teacher: </FormControl.Label>
            <Select placeholder = "Please Select"/>
      </FormControl>
      <FormControl>
            <FormControl.Label>Class: </FormControl.Label>
            <Select placeholder = "Please Select"/>
      </FormControl>
      <FormControl>
            <FormControl.Label>Period: </FormControl.Label>
            <Select placeholder = "Please Select"/>
      </FormControl>
      <Button mt="2">
            Sign up
      </Button>
      <Button variant="outline" onPress={() => navigation.navigate('Calendar')}>
        Back
      </Button>
      </VStack>
    </Box>
  </Center>
  );
  // The dropdown menu will allow the user to choose there option for their class, teacher, and Period
  // For the button once the user fills out what they will subscribe to, they have the option press subscribe to sumbit it 
  // still need to figure out how to prevent a user from submitting less than 3 fields
  //to-do: backend
};

export default SubscribeMenu;
