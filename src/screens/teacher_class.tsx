import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Button, Center, Modal, Checkbox, FlatList, FormControl, Heading, Content, Icon, Input, VStack, Text, View} from "native-base";
import { propsFlattener } from "native-base/lib/typescript/hooks/useThemeProps/propsFlattener";
import React from "react";
import { LoginStackList } from "../components/login_stack";


type TeacherClassScreenProps = NativeStackScreenProps<LoginStackList, 'TeacherClass'>;

function AddClass () {
  prompt("Add a class.")
}
function ModifyClass () {
  prompt("Edit this class.")
}
function DeleteClass () {
  alert("Class deleted.")
}

function TeacherClassScreen({ navigation }: TeacherClassScreenProps) {
    return (
      <Center>
        <View style = {{alignItems: "center"}}>
        <br />
          <Center> <Text style = {{fontSize: 41, textAlign: 'center', fontWeight: 'bold'}}>My Classes</Text></Center>
            <br />
            <br />
            <Center>
            <View>
                    <Checkbox style = {{height: 25, width: 25}}><Text style = {{fontSize: 24}}>Period 1</Text></Checkbox>
                    <Checkbox style = {{height: 25, width: 25}}><Text style = {{fontSize: 24}}>Period 2</Text></Checkbox>
                    <Checkbox style = {{height: 25, width: 25}}><Text style = {{fontSize: 24}}>Period 3</Text></Checkbox>
                    <Checkbox style = {{height: 25, width: 25}}><Text style = {{fontSize: 24}}>Period 4</Text></Checkbox>
                    <Checkbox style = {{height: 25, width: 25}}><Text style = {{fontSize: 24}}>Period 5</Text></Checkbox>

            </View>
            </Center>
            <br />
            <br />
            <Center>
              <table>
                <tr>
                  <td><Button onPress = {AddClass} style = {{width: 100}}>Add </Button></td>
              <br />
              <td><Button onPress = {ModifyClass} style = {{width: 100}}>Edit</Button></td>
              <br />
              <td><Button onPress = {DeleteClass} style = {{width: 100}}>Delete</Button></td>
              </tr>
              </table>
              </Center>
        </View>
        </Center>
      );
}

export default TeacherClassScreen;