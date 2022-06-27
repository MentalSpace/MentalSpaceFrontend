import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, View } from "native-base";
import React from "react";
import { SideBarList } from "../components/main_stack";

type AddClassScreenProps = NativeStackScreenProps<SideBarList, 'AddClass'>

function AddClassScreen({ navigation }: AddClassScreenProps) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button onPress={() => navigation.navigate('Calendar')}>
            Go back to the calendar
          </Button>
        </View>
      );
}

export default AddClassScreen;