import React, {useEffect, useState} from 'react';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Button, Center, Heading, VStack, Text, Select, CheckIcon, Checkbox, DeleteIcon, View } from "native-base";
import { SideBarList } from "../components/main_stack";
import { useQuery } from "react-query";
import { apiUrl } from "../constants";
//import {useCSRFToken } from "./useCSRFToken";

type ClassDisplayProps = NativeStackScreenProps<SideBarList, "MyClasses">

//stores data of students in a list when fetched using a classId
type GetStudents = {
  students: {"studentId": number, "canonicalId": string, "firstName":string, "lastName":string, "phone":number, "grade":number}[]
};

//stores the data of teacher's classes when fetched using teacher information
type GetTeacherClasses = {
  classIds: {"classId": number, "teacherId": number, "subjectId": number, "period": string, "classCode": string, "archived": boolean}[]
};

//stores status message when using a post method
type KickStudent = {
  status: string
};


  function MyClassesScreen({navigation}: ClassDisplayProps) {
    //Hook. Controls the current period number (initially set as 0) and updates whenever setPeriod is called
    const [period, setPeriod] = useState("0");
    const [checked] = useState<number[]>([])
    
    //later utilized in fetch() call for get methods
    const getRequest = {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Prefer': 'code=200, dynamic=true',
        'X-CSRF-TOKEN': '123',
      },
    };

    //Make a postRequest variable to call later when fetching with method, headers, and body
    const postRequest = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Prefer': 'code=200',
        'X-CSRF-TOKEN': '123',
      },
      body: JSON.stringify({
        classId: 0,
        studentId: checked
     })
    };

    //?classId=0   --> later concatenated when fetching url
    const GetStudentsParams = new URLSearchParams(
      {classId: period}
    );

    //?archived=true&canonicalId=asdf&teacherId=123  --> later concatenated when fetching url
    const GetTeacherClassesParams = new URLSearchParams(
      {archived: "true", canonicalId: "asdf", teacherId: "123"}
    );

    //kick variable with useQuery 
    const kick = useQuery<KickStudent>('registerUser', async () => await 
    (await fetch(apiUrl + '/class/kick', postRequest)).json(), {enabled: false});
    useEffect(() => {
      if (kick.isSuccess) {
        console.log(kick.data.status);
        if (kick.data.status === "success") navigation.navigate('MyClasses');
      }
    }, [kick.isSuccess]);

    //brings together url and fetches data from backend for a list of students based on a classId
    const studentList = useQuery<GetStudents>('displayResponse', async () => await 
    (await fetch(apiUrl + '/class/students?' + GetStudentsParams.toString(), getRequest)).json(), {enabled: true});

    //brings togther url and fetches data from backend for a list of classes that a teacher has based on their id. 
    const teacherClasses = useQuery<GetTeacherClasses>('display', async () => await 
    (await fetch(apiUrl + '/teacher/classes?' + GetTeacherClassesParams.toString(), getRequest)).json(), {enabled: true});

    return(
      <Center width = "100%">
        <Box safeArea p="2" py="8" w="90%" maxW="850">
          <VStack space = {3} mt = '5'>
           <Heading 
              size = "lg" 
              color = "coolGray.800" 
              _dark = {{ color: "warmGray.50" }} 
              fontWeight = "semibold" 
              paddingTop = "5" 
              paddingBottom = "30"> Teacher Name
            </Heading>
            <Text>Select Period</Text>
           <Select selectedValue={period} minWidth="200" accessibilityLabel="Choose Period" placeholder="Choose Period" _selectedItem={{
              bg: "teal.600", 
              endIcon: <CheckIcon size="5" />}} 
              mt={1} onValueChange={period => setPeriod(period)}>
              {/*Incorporates dropdown menu with the label set as the name of the period */}
              {teacherClasses.data?.classIds.map(c => (
              <Select.Item label={c.period} value={c.period} key={c.classId}></Select.Item>
              ))}
            </Select>
            {/*Group of checkboxes representing students from a period based on class picked by dropdown menu.
               Displays the student's first name, last name, and student Id. The value of the checkbox is also a student Id*/}
            <Checkbox.Group onChange={checked => checked.map(Number)}>
              {/*Create a list of checkboxes with the names of students, as well as their student id based on database fetched*/}
              {studentList.data?.students.map(student => (
                <Checkbox value={String(student.studentId)}>{student.lastName + ', ' + student.firstName + '\t ID: ' + student.studentId}</Checkbox>
              ))}
            </Checkbox.Group>
            {/*Checks the list of student ids based on checkboxes called "checked" in console*/}
            {console.log(checked)}
            {/*Delete Icon*/}
            <View style={{ alignSelf: 'stretch', flexDirection: 'row', alignItems: 'center' }}>
            <Button style = {{ marginLeft: 0, borderRadius: 30}}><DeleteIcon size="5" mt="0.5" color="white" onClick={() => kick.refetch()}/></Button>
            </View>
            {/*Button to go back to calendar screen*/}
           <Button onPress={() => navigation.navigate('Calendar')}>
              Go back to the calendar
           </Button>
          </VStack>
        </Box>
       </Center>
    );
  } 
export default MyClassesScreen;