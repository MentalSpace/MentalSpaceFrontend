import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Box,
  Button,
  Center,
  Heading,
  Input,
  VStack,
  TextArea,
} from 'native-base';
import React, { useState } from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { SideBarList } from '../../components/student_stack';

type ExtracurricularScreenProps = NativeStackScreenProps<
  SideBarList,
  'Extracurricular'
>;

function AddExtracurricular({ navigation }: ExtracurricularScreenProps) {
  const [selectedStartDate, setSelectedStartDate] = useState(new Date(''));
  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const StartDate = new Date();

  const showStartDatePicker = () => {
    setStartDatePickerVisible(true);
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisible(false);
  };
  const handleConfirm = (date: Date) => {
    setSelectedStartDate(date);
    hideStartDatePicker();
  };

  const [selectedEndDate, setSelectedEndDate] = useState(new Date(''));
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);

  const showEndDatePicker = () => {
    setEndDatePickerVisible(true);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisible(false);
  };
  const handleEndDateConfirm = (date: Date) => {
    setSelectedEndDate(date);
    hideEndDatePicker();
  };

  const [textAreaValue, setTextAreaValue] = useState('');

  const demoValueControlledTextArea = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    setTextAreaValue(e.nativeEvent.text);
  };

  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <VStack space={3} mt="5">
          <Heading
            size="lg"
            color="coolGray.800"
            _dark={{
              color: 'warmGray.50',
            }}
            fontWeight="semibold"
            paddingTop="5"
            paddingBottom="30"
          >
            {' '}
            Add Extracurriculars
          </Heading>
          <Heading>Activity Name</Heading>
          <Input placeholder="Extracurricular Name" type="text" />
          <Heading>Description</Heading>
          <TextArea
            value={textAreaValue}
            onChange={demoValueControlledTextArea}
            w="100%"
            maxW="300"
            autoCompleteType={undefined}
          />
          <Heading>Date</Heading>
          <Button onPress={showStartDatePicker}>When does it start? </Button>
          <DateTimePickerModal
            themeVariant="dark"
            isVisible={isStartDatePickerVisible}
            mode="datetime"
            onConfirm={handleConfirm}
            onCancel={hideStartDatePicker}
          />
          <Button onPress={showEndDatePicker}>When does it end? </Button>
          <DateTimePickerModal
            themeVariant="dark"
            isVisible={isEndDatePickerVisible}
            mode="datetime"
            onConfirm={handleEndDateConfirm}
            onCancel={hideEndDatePicker}
          />
          <Button>Add to Calendar </Button>
          <Button onPress={() => navigation.navigate('Calendar')}>
            Back to the calendar{' '}
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}

export default AddExtracurricular;
