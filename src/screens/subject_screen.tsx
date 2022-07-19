import React, {useEffect, useState} from 'react';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Button, Center, Heading, VStack, Text, Select, CheckIcon, Checkbox, AddIcon, View, Input } from "native-base";
import { SideBarList } from "../components/student_stack";
import { useQuery } from "react-query";
import { apiUrl } from "../constants";
import { useCSRFToken } from '../hooks/useCSRFToken';
import { useAccessToken } from "../hooks/useAccessToken";

type ClassDisplayProps = NativeStackScreenProps<SideBarList, "Subject">



//stores status message when using a post method
type AddSubject = {
  status: string,
  subjectId: number,
};

//stores data of students in a list when fetched using a classId
type GetSubjects = {
    subject: {"subjectId": number, "department": string, "name":string, "description":string}
  };


  function SubjectScreen({navigation}: ClassDisplayProps) {
    const [department, setDepartment] = useState("");
    const [name, setName] = useState("");

    //Initialization of CSRF Token and Access Token for use in getRequest and postRequest
    const csrfToken = useCSRFToken();
    const accessToken = useAccessToken();

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
        department: department,
        name: name,
     })
    };

    const getRequest = {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Prefer': 'code=200',
          'X-CSRF-TOKEN': csrfToken.data!.csrfToken, //'123',
          Authorization: 'Bearer ' + accessToken.data!.accessToken,
        },
      };

    const GetSubjectParams = new URLSearchParams(
        {subjectId: '2'}
    );
    

    //After rendering, shows status message in console if successful, then re-navigates to original screen
    const addSubject = useQuery<AddSubject>('addSubject', async () => await 
    (await fetch(apiUrl + '/subject', postRequest)).json(), {enabled: false});
    useEffect(() => {
      if (addSubject.isSuccess) {
        console.log(addSubject.data.status);
        console.log(addSubject.data.subjectId);
        console.log(addSubject);
        if (addSubject.data.status === "success") navigation.navigate('Subject');
      }
    }, [addSubject.isSuccess]);

    //brings together url and fetches data from backend for a list of students based on a classId
    const getSubject = useQuery<GetSubjects>('displayStudents', async () => await 
    (await fetch(apiUrl + '/class/students?' + GetSubjectParams.toString(), getRequest)).json(), {enabled: true});

    
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
            <Text>Input Department</Text>
            <Input onChangeText={setDepartment}></Input>
            <Text>Input Name of Subject</Text>
            <Input onChangeText={setName}></Input>
            <Text>{getSubject.data?.subject.name}</Text>
            {/*Delete Icon*/}
            <View style={{ alignSelf: 'stretch', flexDirection: 'row', alignItems: 'center' }}>
            <Button style = {{ marginLeft: 0, borderRadius: 30}}><AddIcon size="5" mt="0.5" color="white" onClick={() => addSubject.refetch()}/></Button>
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
export default SubjectScreen;