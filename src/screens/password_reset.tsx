import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Button, Center, FormControl, Heading, Input, VStack } from "native-base";
import React from "react";
import { LoginStackList } from "../components/login_stack";

type PasswordResetProps = NativeStackScreenProps<LoginStackList, 'Reset'>;

const ResetScreen = ({navigation}: PasswordResetProps) => {
    return <Center w="100%">
        <Box safeArea p="2" w="90%" maxW="290" py="8">
            <Heading size = "lg" color = "coolGray.800" _dark = {{
                color: "warmGray.50"
            }} fontWeight = "semibold">
                Reset Your Password
            </Heading>
            <Heading mt="1" color="coolGray.600" _dark={{
            color: "warmGray.200"
        }} fontWeight="medium" size="xs">
             Please enter your email
            </Heading>
            <VStack space = {3} mt = '5'>
                <FormControl>
                <FormControl.Label>Email</FormControl.Label>
                <Input />
                </FormControl>
                <Button mt="2">
                Reset
                </Button>
                <Button variant="outline" onPress={() => navigation.navigate('Login')}>
                Back
                 </Button>
            </VStack>
        </Box>
    </Center>;
};

export default ResetScreen;
