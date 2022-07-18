import { NativeStackScreenProps } from '@react-navigation/native-stack';
import TimeInput from '@tighten/react-native-time-input';
import {
  Button,
  Checkbox,
  Radio,
  Divider,
  Input,
  Heading,
  View,
  Text,
  ScrollView,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { SideBarList } from '../../components/student_stack';
import { apiUrl } from '../../constants';
import { useAccessToken } from '../../hooks/useAccessToken';
import { useCSRFToken } from '../../hooks/useCSRFToken';

type ScheduleOptionsProps = NativeStackScreenProps<
  SideBarList,
  'ScheduleOptions'
>;

type ScheduleOptionsResponse = {
  status: string;
};

const ScheduleOptionsScreen = ({ navigation }: ScheduleOptionsProps) => {
  //updates and saves the value from the 2 different radio button groups
  const [value, setValue] = React.useState('WorkOrder');
  const [value2, setValue2] = React.useState('StartingTime');
  const [value3, setValue3] = React.useState('SplitAssignment');

  //updates and saves the values on each change of the text box for break and work
  const [breakTime, setBreakTime] = React.useState('');
  const [workTime, setWorkTime] = React.useState('');

  const [studentId, setStudentId] = useState(0);
  const [canonicalId, setCanonicalId] = useState(0);
  const [preferenceId, setPreferenceId] = useState(0);

  const csrfToken = useCSRFToken();
  const accessToken = useAccessToken();

  const requestOptions = {
    method: 'PATCH',
    headers: {
      Authorization: 'Bearer ' + accessToken.data!.accessToken,
      'Content-Type': 'application/json',
      Prefer: 'code=200',
      'X-CSRF-TOKEN': csrfToken.data!.csrfToken,
    },
    body: JSON.stringify({
      studentId,
      canonicalId,
      preferenceId,
    }),
  };

  //Fetch student preferences
  const request = useQuery<ScheduleOptionsResponse>(
    'updateScheduleOptions',
    async () =>
      await (
        await fetch(apiUrl + '/student/preference', requestOptions)
      ).json(),
    { enabled: false }
  );

  useEffect(() => {
    if (request.isSuccess) {
      console.log(request.data.status);
      if (request.data.status === 'success') navigation.navigate('Calendar');
    }
  }, [request.isSuccess]);

  //Updates 'time' when something is inputted into the time box
  const [time, setTime] = useState('');
  const handleTimeChange = (
    time: React.SetStateAction<string>,
    validTime: any
  ) => {
    if (!validTime) return;

    setTime(time);
  };

  //All of the choices for the radio buttons
  const choice1 = 'Short Job First';
  const choice2 = 'Long Job First';
  const choice3 = 'In Subjects Order';
  const choice4 = 'Start As Soon As Possible';
  const choice5 = 'Start As Late As Possible';
  const choice6 = 'Preferred Start Time';
  const choice7 = 'Keep Assignment Together';

  return (
    <ScrollView>
      <View alignItems="center">
        <Heading
          size="lg"
          color="coolGray.800"
          _dark={{ color: 'warmGray.50' }}
          fontWeight="semibold"
          paddingTop="5"
          paddingBottom="30"
        >
          Scheduling Options
        </Heading>

        <Heading
          size="md"
          mb="2"
          pt="5"
          color="coolGray.800"
          fontWeight="semibold"
        >
          {' '}
          Work Order:{' '}
        </Heading>

        <Divider mb="2" mt="-1.5" ml="-1" maxW="175px" bg="coolGray.800" />

        <Radio.Group
          name="WorkOrderGroup"
          accessibilityLabel="Work Order Selection"
          value={value}
          colorScheme="secondary"
          onChange={(nextValue) => {
            setValue(nextValue);
          }}
        >
          <Radio value={choice1} my={1}>
            {' '}
            {' ' + choice1}{' '}
          </Radio>
          <Radio value={choice2} my={1}>
            {' '}
            {' ' + choice2}{' '}
          </Radio>
          <Radio value={choice3} my={1}>
            {' '}
            {' ' + choice3}{' '}
          </Radio>
        </Radio.Group>

        <Heading
          size="md"
          mb="2"
          pt="10"
          color="coolGray.800"
          fontWeight="semibold"
        >
          {' '}
          Starting Time:{' '}
        </Heading>

        <Divider mb="2" mt="-1.5" ml="-1" maxW="225px" bg="coolGray.800" />

        <Radio.Group
          name="StartTimeGroup"
          accessibilityLabel="Start Time Selection"
          value={value2}
          colorScheme="secondary"
          onChange={(nextValue) => {
            setValue2(nextValue);
          }}
        >
          <Radio value={choice4} my={1}>
            {' '}
            {' ' + choice4}{' '}
          </Radio>
          <Radio value={choice5} my={1}>
            {' '}
            {' ' + choice5}{' '}
          </Radio>
          <Radio value={choice6} my={1}>
            {' '}
            {' ' + choice6}{' '}
          </Radio>
        </Radio.Group>

        <View my={1}>
          <TimeInput
            theme={{
              inputBackgroundColor: 'transparent',
              toggleButtonActiveBackgroundColor: '#154c79',
              toggleButtonTextColor: '#1697b7',
              toggleBackgroundColor: '#1697b7',
            }}
            onTimeChange={handleTimeChange}
          />
        </View>

        <Heading
          size="md"
          mb="2"
          pt="10"
          color="coolGray.800"
          fontWeight="semibold"
        >
          Assignment Split
        </Heading>

        <Divider mb="2" mt="-1.5" ml="0" maxW="225px" bg="coolGray.800" />

        <Checkbox
          value="KeepAssignmentTogether"
          accessibilityLabel="Keep Assignment Together Choice"
          colorScheme="secondary"
          my="2"
        >
          {choice7}
        </Checkbox>

        <Heading
          size="md"
          mb="2"
          pt="10"
          color="coolGray.800"
          fontWeight="semibold"
        >
          Break To Work Ratio:
        </Heading>

        <Divider mb="2" mt="-1.5" ml="-1" maxW="350px" bg="coolGray.800" />

        <Text fontSize="md" my="2">
          {' '}
          Preferred Break Time:
        </Text>
        <Input
          defaultValue="5"
          placeholder="Enter a Number"
          w="100%"
          maxWidth="350px"
          onChangeText={setBreakTime}
          bgColor="transparent"
        />

        <Text fontSize="md" my="2">
          {' '}
          Amount Of Work Time:{' '}
        </Text>
        <Input
          defaultValue="30"
          placeholder="Enter a Number"
          w="100%"
          maxWidth="350px"
          onChangeText={setWorkTime}
          bgColor="transparent"
        />

        <Text fontSize="sm" mt="2">
          *Default is 5 minutes of Break
        </Text>
        <Text fontSize="sm" mb="2">
          for every 30 minutes of Work
        </Text>

        <Button
          maxWidth="75px"
          mt="5"
          mb="10"
          onPress={() => request.refetch()}
          bg="#154c79"
          colorScheme="secondary"
        >
          <Text color="white">Submit</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

export default ScheduleOptionsScreen;
