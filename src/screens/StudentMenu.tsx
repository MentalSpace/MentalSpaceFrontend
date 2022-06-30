import React from 'react';
import { Box, Button, Center, FormControl, Heading, VStack } from "native-base";

function StudentMenu() {
  return <Center w ='100%'>
    <Box safeArea p="2" w="90%" maxW="290" py="8">
      <VStack space={3} mt="5">
        <Button mt="2">
          Subscribe to Classes
        </Button>
        <Button mt="2">
          See Assignments
        </Button>
        <Button mt="2">
          See and Edit Scheduele
        </Button>
        <Button mt ="2">
          Edit Homework Priorities
        </Button>
        <Button mt = "2">
          Edit non-homework activities
        </Button>
      </VStack>
    </Box>
  </Center>
    

}



export default StudentMenu;