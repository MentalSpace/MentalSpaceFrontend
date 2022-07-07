import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Button, Center, FormControl, Heading, Input, VStack } from "native-base";
import React, { useState } from "react";
import { LoginStackList } from "../components/login_stack";

type TeacherRegistrationProps = NativeStackScreenProps<LoginStackList, 'TeacherRegistration'>;

const TeacherRegistration = ({navigation}: TeacherRegistrationProps) => {
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");
  var [confirm, setConfirm] = useState("");
  
  const validateEmail = () => { //logic to validate if Email is valid. Returns true if valid, returns false otherwise
    if(email.indexOf("@") == -1){
        return false;
    } else {
        return true;
    }
  }

  const validatePassword = () => { //logic to validate if password is valid. Returns true if valid, returns false otherwise
    if (password.length < 8){
      return false;
    } else {
      return true;
    }
  }

  const validateSame = () => { //logic to validate if the two passwords match each other. Returns true if they match, returns false otherwise
    if(password === ""|| !(password === confirm)){
      return false;
    } else {
      return true;
    }
  }

  const canContinue = () => { //logic to validate if the user can continue. Returns if the user has filled all 3 fields correctly, returns false otherwise
    if (validateEmail() && validatePassword() && validateSame()){
      return true;
    } else {
      return false;
    }
  }

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
            <Input value={email} onChangeText={setEmail}/>
            <FormControl.HelperText>{validateEmail() ? "" : "Please enter a valid email"}</FormControl.HelperText>
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input value = {password} onChangeText={setPassword} type = "password"/>
            <FormControl.HelperText>{validatePassword() ? "" : "Password must be 8 or more characters in length"}</FormControl.HelperText>
          </FormControl>
          <FormControl>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input value = {confirm} onChangeText={setConfirm} type = "password"/>
            <FormControl.HelperText>{validateSame() ? "" : "Passwords must match"}</FormControl.HelperText>
          </FormControl>
          <Button mt="2" onPress={() => navigation.navigate('TeacherSignup')} disabled = {!canContinue()}>
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
