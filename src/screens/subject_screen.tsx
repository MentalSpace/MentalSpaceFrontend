import React, {useEffect, useState} from 'react';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Button, Center, Heading, VStack, Text, Select, CheckIcon, Checkbox, AddIcon, DeleteIcon, View, Input } from "native-base";
import FlashMessage, {showMessage} from 'react-native-flash-message';
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

//stores data of students in a list when fetched using a subjectId
type GetSubjects = {
  subject: {"subjectId": number, "department": string, "name":string, "description":string}
};

type DeleteSubject = {
  status: string,
};

type PatchSubject = {
  status: string,
}

  function SubjectScreen({navigation}: ClassDisplayProps) {
    const [department, setDepartment] = useState("");
    const [name, setName] = useState("");
    const [subjectId, setSubjectId] = useState("");
    const [description, setDescription] = useState("");

    
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

    //Make a patchRequest variable to call later when fetching with method, headers, and body
    const patchRequest = {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        'Prefer': 'code=200',
        'X-CSRF-TOKEN': csrfToken.data!.csrfToken, //'123'
        Authorization: 'Bearer ' + accessToken.data!.accessToken,
      },
        body: JSON.stringify({
         subjectId: subjectId,
         department: department, 
         name: name,
         description: description,
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

    const deleteRequest = {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
          'Prefer': 'code=200',
          'X-CSRF-TOKEN': csrfToken.data!.csrfToken, //'123',
          Authorization: 'Bearer ' + accessToken.data!.accessToken,
        },
      };

    const GetSubjectParams = new URLSearchParams(
        {subjectId: '4'}
    );
    
    const DeleteSubjectParams = new URLSearchParams(
      {subjectId: subjectId}
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
    (await fetch(apiUrl + '/subject?' + GetSubjectParams.toString(), getRequest)).json(), {enabled: true});

    //After rendering, shows status message in console if successful, then re-navigates to original screen
    const deleteSubject = useQuery<DeleteSubject>('deleteSubject', async () => await 
    (await fetch(apiUrl + '/subject?' + DeleteSubjectParams, deleteRequest)).json(), {enabled: false});
    useEffect(() => {
      if (deleteSubject.isSuccess) {
        console.log(deleteSubject.data.status);
        console.log(deleteSubject);
        if (deleteSubject.data.status === "success") navigation.navigate('Subject');
      }
    }, [deleteSubject.isSuccess]);

    const patchSubject = useQuery<PatchSubject>('patchSubject', async () => await 
    (await fetch(apiUrl + '/subject', patchRequest)).json(), {enabled: false});
    useEffect(() => {
      if (patchSubject.isSuccess) {
        console.log(patchSubject.data.status);
        console.log(patchSubject);
      }
    }, [patchSubject.isSuccess]);
    

    //console.log(getSubject.data?.subject.name);
    return(
      <>
        <Center width = "100%">
          <Box safeArea p="2" py="8" w="90%" maxW="850">
            <VStack space = {3} mt = '5'>
            <Heading 
                size = "lg" 
                color = "coolGray.800" 
                _dark = {{ color: "warmGray.50" }} 
                fontWeight = "semibold" 
                paddingTop = "5" 
                paddingBottom = "30">Subject
              </Heading>
              {/*Input Department*/}
              <Heading
                size="md"
                color="coolGray.800"
                _dark = {{ color: "warmGray.50" }}
                fontWeight="semibold"
                >Department
              </Heading>
              <Input placeholder="Input Department" onChangeText={setDepartment}></Input>

              {/* Inputs Subject Name */}
              <Heading
                size="md"
                color="coolGray.800"
                _dark = {{ color: "warmGray.50" }}
                fontWeight="semibold"
                >Add Subject
              </Heading>
              <Input placeholder="Input Name of Subject" onChangeText={setName}></Input>

              {/*Add Icon for adding subjects*/}
              <View style={{ alignSelf: 'stretch', flexDirection: 'row', alignItems: 'center' }}>
              <Button style = {{ marginLeft: 0, borderRadius: 30}} 
                onPress={() => {
                addSubject.refetch(); 
                showMessage({
                  message: "Success!",
                  description: "This subject has now been added",
                  type: "success",
                  backgroundColor: "#16a34a",
                  duration: 3000,
                  icon: "success",
                })} }>
                <AddIcon size="5" mt="0.5" color="white"/>
              </Button>
              </View>

              {/* Delete Icon for deleting subjects */}
              <Heading
                size="md"
                color="coolGray.800"
                _dark = {{ color: "warmGray.50" }}
                fontWeight="semibold"
                >Delete Subject
                </Heading>
              <Input placeholder="Input Subject ID" onChangeText={setSubjectId}></Input>
              <View style={{ alignSelf: 'stretch', flexDirection: 'row', alignItems: 'center' }}>
              <Button style = {{ marginLeft: 0, borderRadius: 30}}  onPress={() => {
                deleteSubject.refetch();
                showMessage({
                  message: "Success!",
                  description: "This subject has now been deleted",
                  type: "success",
                  backgroundColor: "#16a34a",
                  duration: 3000,
                  icon: "success",
                })} }>
                <DeleteIcon size="5" mt="0.5" color="white"/>
              </Button>
              </View>

              {/* Patch Icon for editing subjects */}
              <Heading
                size="md"
                color="coolGray.800"
                _dark = {{ color: "warmGray.50" }}
                fontWeight="semibold"
                >Edit Subject
              </Heading>
              <Input placeholder="Input Subject ID" onChangeText={setSubjectId}></Input>
              <Input placeholder="Input New Department" onChangeText={setDepartment}></Input>
              <Input placeholder="Input New Name of Subject" onChangeText={setName}></Input>
              <Input placeholder="Input New Description" onChangeText={setDescription}></Input>
              
              <View style={{ alignSelf: 'stretch', flexDirection: 'row', alignItems: 'center' }}>
              <Button style = {{ marginLeft: 0, borderRadius: 30}} onPress={() => {
                patchSubject.refetch();
                showMessage({
                message: "Success!",
                description: "Changes have been saved",
                type: "success",
                backgroundColor: "#16a34a",
                duration: 3000,
                icon: "success",
              })} }>
                <CheckIcon size="5" mt="0.5" color="white" />
              </Button>
              </View>
              
              {/*console.log(getSubject)*/}
              {/* {console.log(getSubject.data?.subject.subjectId + getSubject.data?.subject.department + getSubject.data?.subject.name + getSubject.data?.subject.description)} */}
              {/*Button to go back to calendar screen*/}
              <Button onPress={() => navigation.navigate('Calendar')}>
                  Go back to the calendar
              </Button>
              </VStack>
            </Box>
          </Center>
        <FlashMessage position="top" />
      </>
    );
  } 
export default SubjectScreen;