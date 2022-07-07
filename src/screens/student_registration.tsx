import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Button, Center, FormControl, Heading, Input, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { LoginStackList } from "../components/login_stack";
import { apiUrl } from "../constants";

type StudentRegistrationProps = NativeStackScreenProps<LoginStackList, 'StudentRegistration'>;

type RegisterUserResponse = {
  status: string
};

const StudentRegistration = ({navigation}: StudentRegistrationProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirmPass] = useState("");

  const requestOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Prefer': 'code=200',
      'X-CSRF-TOKEN': '123',
    },
    body: JSON.stringify({
       type: 'Student',
       email: email.trim(),
       password: password 
    })
  };
  const request = useQuery<RegisterUserResponse>('registerUser', async () => await (await fetch(apiUrl + '/user/register', requestOptions)).json(), {enabled: false});
  useEffect(() => {
    if (request.isSuccess) {
      console.log(request.data.status);
      if (request.data.status === "success") navigation.navigate('StudentSignup');
    }
  }, [request.isSuccess]);

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

  return (
    <Center w="100%">
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
            <FormControl.Label>Email</FormControl.Label>
            <Input value={email} onChangeText={setEmail}/>
            <FormControl.HelperText>{validateEmail() ? "" : "Please enter a valid email"}</FormControl.HelperText>
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" value={password} onChangeText={setPassword}/>
            <FormControl.HelperText>{validatePassword() ? "" : "Password must be 8 or more characters in length"}</FormControl.HelperText>
          </FormControl>
          <FormControl>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input type="password" value={confirm} onChangeText={setConfirmPass}/>
            <FormControl.HelperText>{validateSame() ? "" : "Passwords must match"}</FormControl.HelperText>
          </FormControl>
          <Button mt="2" onPress={() => request.refetch()} disabled = {!canContinue()}>
           Continue
          </Button>
          <Button variant="outline" onPress={() => navigation.navigate('Login')}>
            Back
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}

export default StudentRegistration;
