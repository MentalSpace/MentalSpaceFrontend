import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DateTime, Interval } from 'luxon';
import {
  Box,
  HamburgerIcon,
  Menu,
  Pressable,
  ScrollView,
  useTheme,
  View,
  Text,
  Spinner,
} from 'native-base';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import { useQuery } from 'react-query';
import { RRule } from 'rrule';

import { SideBarList } from '../components/student_stack';
import { apiUrl } from '../constants';
import { useAccessToken } from '../hooks/useAccessToken';
import { useCSRFToken } from '../hooks/useCSRFToken';

type CalendarScreenProps = NativeStackScreenProps<SideBarList, 'Calendar'>;

type ScheduleRRuleType = {
  eventId: number;
  name: string;
  description: string;
  rruleString: string;
  duration: number;
};

type ScheduleEventType = {
  eventId: number;
  name: string;
  description: string;
  startTime: DateTime;
  duration: number;
};

type StudentEventsResponse = {
  status: string;
  events: ScheduleRRuleType[];
};

function CalendarScreen({ navigation }: CalendarScreenProps) {
  const csrfToken = useCSRFToken();
  const accessToken = useAccessToken();

  const requestOptions = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + accessToken.data!.accessToken,
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrfToken.data!.csrfToken,
    },
  };

  const studentEventsRequest = async (): Promise<StudentEventsResponse> =>
    await (await fetch(apiUrl + '/student/events', requestOptions)).json();
  const studentEvents = useQuery<StudentEventsResponse>(
    'studentEvents',
    studentEventsRequest
  );

  const [weekEvents, setWeekEvents] = useState([
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ] as ScheduleEventType[][]);
  const [currWeek, setCurrWeek] = useState([] as string[]);
  const [currDateIndex, setCurrDateIndex] = useState<number>();
  const theme = useTheme();

  if (studentEvents.status === 'loading') {
    return (
      <View alignItems="center" justifyContent="center" height="full">
        <Spinner accessibilityLabel="Loading calendar" />
      </View>
    );
  }

  if (
    studentEvents.status === 'error' ||
    studentEvents.data?.status !== 'success'
  ) {
    return (
      <View alignItems="center" justifyContent="center" height="full">
        <Text>An error has occured!</Text>
      </View>
    );
  }

  function* daysInInterval(interval: Interval) {
    let cursor = interval.start.startOf('day');

    while (cursor < interval.end) {
      yield cursor;
      cursor = cursor.plus({ days: 1 });
    }
  }

  return (
    <Box flex={1}>
      <CalendarStrip
        calendarHeaderStyle={{
          fontSize: theme.fontSizes['2xl'],
          color: theme.colors.darkBlue[700],
        }}
        dateNameStyle={{ color: theme.colors.darkBlue[800] }}
        dateNumberStyle={{
          fontSize: theme.fontSizes.xl,
          color: theme.colors.darkBlue[700],
        }}
        style={{
          height: 150,
          paddingTop: 20,
        }}
        highlightDateContainerStyle={{
          backgroundColor: theme.colors.primary[600],
          height: 55,
          width: 55,
          borderRadius: 27.5,
          // calendar shadow
          shadowOpacity: 0.5,
          shadowColor: '#154c79',
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 4,
          elevation: 12,
        }}
        highlightDateNumberStyle={{
          color: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: theme.fontSizes.xl,
        }}
        highlightDateNameStyle={{ color: '#fff' }}
        iconContainer={{ flex: 0.1 }}
        selectedDate={new Date()}
        onDateSelected={(date) => {
          setCurrDateIndex(
            currWeek.indexOf(DateTime.fromJSDate(date.toDate()).toISODate())
          );
        }}
        onWeekChanged={async (start, end) => {
          const startDateTime = DateTime.fromMillis(start.valueOf());

          if (currWeek[0] !== startDateTime.toISODate()) {
            setCurrDateIndex(undefined);

            const weekInterval = Interval.fromDateTimes(
              startDateTime,
              DateTime.fromMillis(end.valueOf())
            );
            const weekDays = Array.from(daysInInterval(weekInterval)).map(
              (weekDay) => weekDay.toISODate()
            );

            setCurrWeek(weekDays);
            const newWeekEvents = [
              [],
              [],
              [],
              [],
              [],
              [],
              [],
            ] as ScheduleEventType[][];

            for (const scheduleRRule of studentEvents.data!.events) {
              const eventRRule = RRule.fromString(scheduleRRule.rruleString);
              const events = eventRRule.between(
                start.startOf('day').toDate(),
                end.endOf('day').toDate()
              );

              for (const event of events) {
                newWeekEvents[
                  weekDays.indexOf(DateTime.fromJSDate(event).toISODate())
                ].push({
                  eventId: scheduleRRule.eventId,
                  name: scheduleRRule.name,
                  description: scheduleRRule.description,
                  startTime: DateTime.fromJSDate(event),
                  duration: scheduleRRule.duration,
                });
              }
            }

            newWeekEvents.map((weekEvent) =>
              weekEvent.sort(
                (a, b) => a.startTime.toMillis() - b.startTime.toMillis()
              )
            );
            setWeekEvents(newWeekEvents);
          }
        }}
      />
      <Menu
        trigger={(triggerProps) => {
          return (
            <Pressable
              position="absolute"
              zIndex="1"
              height="60"
              width="60"
              borderRadius="30"
              bottom="30"
              right="30"
              justifyContent="center"
              alignItems="center"
              backgroundColor={theme.colors.primary[600]}
              accessibilityLabel="More options menu"
              {...triggerProps}
            >
              <HamburgerIcon color="#fff" />
            </Pressable>
          );
        }}
      >
        <Menu.Item>Subscribe to Classes</Menu.Item>
        <Menu.Item>See Assignments</Menu.Item>
        <Menu.Item>See and Edit Schedule</Menu.Item>
        <Menu.Item>Edit Homework Priorities</Menu.Item>
        <Menu.Item>Edit non-homework activities</Menu.Item>
      </Menu>
      <View alignItems="center" style={{ flex: 1 }}>
        <ScrollView>
          {currDateIndex !== undefined
            ? weekEvents[currDateIndex].map((event) => (
                <TouchableOpacity
                  key={event.eventId}
                  style={{
                    backgroundColor: 'white',
                    margin: 10,
                    shadowOffset: { width: 0, height: 0 },
                    shadowColor: '#154c79',
                    shadowOpacity: 0.7,
                    shadowRadius: 4,
                    elevation: 7,
                    borderRadius: 10,
                    borderWidth: 0,
                    borderColor: '#154c79',
                    marginVertical: 10,
                    height: 100,
                    width: 325,
                  }}
                >
                  <View style={{ marginLeft: 12, marginVertical: 10 }}>
                    <Text
                      color={theme.colors.trueGray[600]}
                      style={{ marginLeft: 20 }}
                      fontSize={theme.fontSizes.xs}
                    >
                      {event.startTime.toLocaleString(DateTime.TIME_SIMPLE) +
                        ' - ' +
                        event.startTime
                          .plus(event.duration)
                          .toLocaleString(DateTime.TIME_SIMPLE)}
                    </Text>
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      <View
                        style={{
                          height: 12,
                          width: 12,
                          borderRadius: 6,
                          marginRight: 8,
                        }}
                        backgroundColor={theme.colors.primary[600]}
                      />
                      <Text
                        fontWeight={theme.fontWeights.bold}
                        fontSize={theme.fontSizes.lg}
                        color={theme.colors.secondary[600]}
                      >
                        {event.name}
                      </Text>
                    </View>
                    <Text
                      color={theme.colors.trueGray[500]}
                      style={{ marginLeft: 20 }}
                    >
                      {event.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            : undefined}
        </ScrollView>
      </View>
    </Box>
  );
}

export default CalendarScreen;
