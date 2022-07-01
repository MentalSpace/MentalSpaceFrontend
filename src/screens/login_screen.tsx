import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Center, Heading, VStack, Button, FormControl, Input, Link } from "native-base";
import { LoginStackList } from "../components/login_stack";
import TextDivider from "../components/text_divider";

type LoginScreenProps = NativeStackScreenProps<LoginStackList, 'Login'>;

const LoginScreen = ({navigation}: LoginScreenProps) => {
  return <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }}>
          Welcome
        </Heading>
        <Heading mt="1" _dark={{
        color: "warmGray.200"
      }} color="coolGray.600" fontWeight="medium" size="xs">
          Sign in to continue!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email ID</FormControl.Label>
            <Input />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" />
            <Link _text={{
            fontSize: "xs",
            fontWeight: "500",
            color: "indigo.500"
          }} alignSelf="flex-end" mt="1" onPress={() => navigation.navigate('Reset')}>
              Forget Password?
            </Link>
          </FormControl>
          <Button mt="2" onPress={() => navigation.navigate('Home')}>
            Sign in
          </Button>
          <TextDivider msg={"or"}/>
          <Heading mt="1" _dark={{
        color: "warmGray.200"
      }} color="coolGray.600" fontWeight="medium" size="xs">
          Sign up to create an account!
        </Heading>

          <Button variant="outline" onPress={() => navigation.navigate('Teacher')}>
            Teacher 
          </Button>
          <Button variant="outline" onPress={() => navigation.navigate('Student')}>
            Student 
          </Button>
        </VStack>
      </Box>
    </Center>;
};

export default LoginScreen;
