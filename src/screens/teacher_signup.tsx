import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Button, Center, FormControl, Heading, Input, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { LoginStackList } from "../components/login_stack";
import { apiUrl } from "../constants";
 
type TeacherSignupProps = NativeStackScreenProps<LoginStackList, 'TeacherSignup'>;
 
type RegisterTeacherResponse = {
  status: string,
};
 
const TeacherSignup = ({navigation}: TeacherSignupProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [school, setSchool] = useState("");
  const [department, setDepartment] = useState("");
 
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Prefer': 'code=200',
      'X-CSRF-TOKEN': '123',
      'Authorization': 'Bearer SOMETOKENVALUE'
    },
    body: JSON.stringify({
       type: 'Teacher',
       firstName: firstName,
       lastName: lastName,
       school: school,
       department: department
 
    })
  };
 
  const request = useQuery<RegisterTeacherResponse>('registerTeacher', async () => await (await fetch(apiUrl + '/teacher', requestOptions)).json(), {enabled: false});
  useEffect(() => {
    if (request.isSuccess) {
      console.log(request.data.status);
      if (request.data.status === "success") navigation.navigate('Login');
    }
  }, [request.isSuccess]);
 
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
            <FormControl.Label>First name</FormControl.Label>
            <Input value={firstName} onChangeText={setFirstName}/>
          </FormControl>
          <FormControl>
            <FormControl.Label>Last name</FormControl.Label>
            <Input value={lastName} onChangeText={setLastName}/>
          </FormControl>
          <FormControl>
            <FormControl.Label>School</FormControl.Label>
            <Input value={school} onChangeText={setSchool}/>
          </FormControl>
          <FormControl>
            <FormControl.Label>Department</FormControl.Label>
            <Input value={department} onChangeText={setDepartment}/>
          </FormControl>
          <Button mt="2" onPress={() => request.refetch()}>
           Sign up
          </Button>
          <Button variant="outline" onPress={() => navigation.navigate('TeacherRegistration')}>
            Back
          </Button>
        </VStack>
      </Box>
    </Center>;
}
 
export default TeacherSignup;

