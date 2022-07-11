import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Box,
  Button,
  Center,
  Checkbox,
  Text,
  View,
  Heading,
} from 'native-base';
import { propsFlattener } from 'native-base/lib/typescript/hooks/useThemeProps/propsFlattener';
import React from 'react';
import { Alert } from 'react-native';

import { LoginStackList } from '../components/login_stack';

function AddClass() {
  Alert.prompt('Add a class.'); //for mobile
}

function ModifyClass() {
  Alert.prompt('Edit this class.');
}
function DeleteClass() {
  alert('Class deleted.');
}

type TeacherClassScreenProps = NativeStackScreenProps<
  LoginStackList,
  'TeacherClass'
>;

function TeacherClassScreen({ navigation }: TeacherClassScreenProps) {
  return (
    <Center>
      <View style={{ alignItems: 'center' }}>
        {/* <Center> <Text style = {{fontSize: 41, textAlign: 'center', fontWeight: 'bold'}}>My Classes</Text></Center> */}
        <Heading
          size="xl"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}
          fontWeight="semibold"
          paddingBottom="30"
          paddingTop="20%"
        >
          My Classes
        </Heading>
        <View>
          <Center>
            <View style={{ paddingBottom: 30 }}>
              <Checkbox style={{ height: 26, width: 26 }}>
                <Text style={{ fontSize: 24, paddingTop: '2%' }}>Period 1</Text>
              </Checkbox>
              <Checkbox style={{ height: 26, width: 26 }}>
                <Text style={{ fontSize: 24, paddingTop: '2%' }}>Period 2</Text>
              </Checkbox>
              <Checkbox style={{ height: 26, width: 26 }}>
                <Text style={{ fontSize: 24, paddingTop: '2%' }}>Period 3</Text>
              </Checkbox>
              <Checkbox style={{ height: 26, width: 26 }}>
                <Text style={{ fontSize: 24, paddingTop: '2%' }}>Period 4</Text>
              </Checkbox>
              <Checkbox style={{ height: 26, width: 26 }}>
                <Text style={{ fontSize: 24, paddingTop: '2%' }}>Period 5</Text>
              </Checkbox>
            </View>
          </Center>
        </View>
        <Center>
          <View style={{ alignSelf: 'stretch', flexDirection: 'row' }}>
            <View style={{ marginRight: 10 }}>
              <Button onPress={AddClass} style={{ width: 100 }}>
                Add
              </Button>
            </View>
            <View style={{ marginRight: 10 }}>
              <Button onPress={ModifyClass} style={{ width: 100 }}>
                Edit
              </Button>
            </View>
            <View>
              <Button onPress={DeleteClass} style={{ width: 100 }}>
                Delete
              </Button>
            </View>
          </View>
        </Center>
      </View>
    </Center>
  );
}

export default TeacherClassScreen;
