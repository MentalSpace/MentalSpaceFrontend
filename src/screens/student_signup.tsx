import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Button, Center, FormControl, Heading, Input, VStack } from "native-base";
import React from "react";
import { LoginStackList } from "../components/login_stack";

type StudentSignupProps = NativeStackScreenProps<LoginStackList, 'Student'>;

const StudentSignup = ({navigation}: StudentSignupProps) => {
  return <Center w="100%">
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading size="lg" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }} fontWeight="semibold">
          Student Sign Up
        </Heading>
        <Heading mt="1" color="coolGray.600" _dark={{
        color: "warmGray.200"
      }} fontWeight="medium" size="xs">
          Sign up to continue!
        </Heading>
        <VStack space={3} mt="5">
        <FormControl>
            <FormControl.Label>First name</FormControl.Label>
            <Input />
          </FormControl>
          <FormControl>
            <FormControl.Label>Last name</FormControl.Label>
            <Input />
          </FormControl>
          <FormControl>
            <FormControl.Label>Student ID</FormControl.Label>
            <Input />
          </FormControl>
          <FormControl>
            <FormControl.Label>School</FormControl.Label>
            <Input />
          </FormControl>
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
          <Button mt="2" onPress={() => navigation.navigate('Home')}>
            Sign up
          </Button>
          <Button variant="outline" onPress={() => navigation.navigate('Login')}>
            Back
          </Button>
        </VStack>
      </Box>
    </Center>;
}

export default StudentSignup;