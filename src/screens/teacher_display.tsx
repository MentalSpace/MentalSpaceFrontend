import React, {useEffect, useState} from 'react';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Button, Center, Heading, VStack, Text, Select, CheckIcon, Checkbox, DeleteIcon, View } from "native-base";
import { SideBarList } from "../components/student_stack";
import { useQuery } from "react-query";
import { apiUrl } from "../constants";
import { useCSRFToken } from '../hooks/useCSRFToken';
import { useAccessToken } from "../hooks/useAccessToken";


type ClassDisplayProps = NativeStackScreenProps<SideBarList, "MyClasses">

//stores data of students in a list when fetched using a classId
type GetStudents = {
  students: {"studentId": number, "canonicalId": string, "firstName":string, "lastName":string, "phone":number, "grade":number}[]
};

//stores the data of teacher's classes when fetched using teacher information
type GetTeacherClasses = {
  classIds: {"classId": number, "teacherId": number, "subjectId": number, "period": string, "classCode": string, "archived": boolean}[]
};

type GetTeacherDetails = {
  teacher: {"teacherId":number, "canonicalId": string, "firstName": string, "lastName": string},
  status: string,
};

//stores status message when using a post method
type KickStudent = {
  status: string
};


  function MyClassesScreen({navigation}: ClassDisplayProps) {
    //Hook. Controls the current period number (initially set as 0) and updates whenever setPeriod is called
    const [period, setPeriod] = useState("0");
    const [checked] = useState<number[]>([])

    const [teacherId, setTeacherId] = useState(0);
    const [canonicalId, setCanonicalId] = useState("");
    
    //Initialization of CSRF Token and Access Token for use in getRequest and postRequest
    const csrfToken = useCSRFToken();
    const accessToken = useAccessToken();

    //getRequest which will later be utilized in fetch() call for get methods. Contains a method and header
    const getRequest = {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Prefer': 'code=200',
        'X-CSRF-TOKEN': csrfToken.data!.csrfToken, //'123',
        Authorization: 'Bearer ' + accessToken.data!.accessToken,
      },
    };

    //Make a postRequest variable to call later when fetching with method, headers, and body
    const postRequest = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Prefer': 'code=200',
        'X-CSRF-TOKEN': csrfToken.data!.csrfToken, //'123'
        Authorization: 'Bearer ' + accessToken.data!.accessToken,
      },
      body: JSON.stringify({
        classId: 0,
        studentId: checked
     })
    };
    
    //var currentTeacherId;
    
    const teacherDetails = useQuery<GetTeacherDetails>('returnTeacher', async() => await
    (await fetch(apiUrl + '/teacher', getRequest)).json(), {enabled: true});
    useEffect(() => {
      if (teacherDetails.isSuccess) {
        console.log(teacherDetails);
        setTeacherId(teacherDetails.data?.teacher.teacherId)
      }
    }, []);
    console.log(teacherId)
    // console.log(teacherId)
    // currentTeacherId = teacherDetails.data?.teacher.teacherId;
    // //console.log(teacherId)
    // // console.log(teacherId);

    // // var currentCanonicalId = teacherDetails.data?.teacher.canonicalId;
    // //console.log(teacherDetails)
    // // console.log(teacherDetails.data?.status)
    // // console.log(teacherDetails.data?.teacher.teacherId)
    // // console.log(currentCanonicalId!);
    // console.log(currentTeacherId);
    // setTeacherId(teacherDetails.data?.teacher.teacherId);
    // setTeacherId(teacherDetails.data?.teacher.teacherId);
    // console.log(teacherId)


    //Query Parameters for /class/students
    //?classId=0   --> later concatenated when fetching url
    const GetStudentsParams = new URLSearchParams(
      {classId: period}
    );

    //Query Parameters for /teachers/classes
    //?archived=true&canonicalId=asdf&teacherId=123  --> later concatenated when fetching url
    //Using placeholders for now
    const GetTeacherClassesParams = new URLSearchParams(
      {archived: "false", canonicalId: canonicalId, teacherId: String(teacherId)}
    );



    //brings together url and fetches data from backend for a list of students based on a classId
    const studentList = useQuery<GetStudents>('displayStudents', async () => await 
    (await fetch(apiUrl + '/class/students?' + GetStudentsParams.toString(), getRequest)).json(), {enabled: true});

    //brings togther url and fetches data from backend for a list of classes that a teacher has based on their id. 
    const teacherClasses = useQuery<GetTeacherClasses>('displayClasses', async () => await 
    (await fetch(apiUrl + '/teacher/classes?' + GetTeacherClassesParams.toString(), getRequest)).json(), {enabled: true});


    //kick variable with useQuery 
    //After rendering, shows status message in console if successful, then re-navigates to original screen
    const kick = useQuery<KickStudent>('registerUser', async () => await 
    (await fetch(apiUrl + '/class/kick', postRequest)).json(), {enabled: false});
    useEffect(() => {
      if (kick.isSuccess) {
        console.log(kick.data.status);
        if (kick.data.status === "success") navigation.navigate('MyClasses');
      }
    }, [kick.isSuccess]);

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
              paddingBottom = "30"> LOL
            </Heading>
            {console.log(teacherDetails.data?.teacher.canonicalId)}
            <Text>Select Period</Text>
            {/* DROPDOWN MENU */}
           <Select selectedValue={period} minWidth="200" accessibilityLabel="Choose Period" placeholder="Choose Period" _selectedItem={{
              bg: "teal.600", 
              endIcon: <CheckIcon size="5" />}} 
              mt={1} onValueChange={period => setPeriod(period)}>
              {/*Incorporates dropdown menu with the label set as the name of the period */}
              {teacherClasses.data?.classIds.map(c => (
              <Select.Item label={c.period} value={String(c.classId)} key={c.classId}></Select.Item>
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