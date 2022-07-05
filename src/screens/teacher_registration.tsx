import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Button, Center, FormControl, Heading, Input, VStack } from "native-base";
import React from "react";
import { LoginStackList } from "../components/login_stack";

type TeacherRegistrationProps = NativeStackScreenProps<LoginStackList, 'TeacherRegistration'>;

const TeacherRegistration = ({navigation}: TeacherRegistrationProps) => {
  return <Center w="100%">
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading size="lg" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }} fontWeight="semibold">
          Teacher Sign Up
        </Heading>
        <Heading mt="1" color="coolGray.600" _dark={{
        color: "warmGray.200"
      }} fontWeight="medium" size="xs">
          Sign up to continue!
        </Heading>
        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" />
          </FormControl>
          <FormControl>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input type="password" />
          </FormControl>
          <Button mt="2" onPress={() => navigation.navigate('TeacherSignup')}>
          Continue
          </Button>
          <Button variant="outline" onPress={() => navigation.navigate('Login')}>
            Back
          </Button>
        </VStack>
      </Box>
    </Center>;
}

export default TeacherRegistration;