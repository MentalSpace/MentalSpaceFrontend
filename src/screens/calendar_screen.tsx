import { DateTime } from 'luxon';
import { Button, HStack, View } from 'native-base';
import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { Calendar } from 'react-native-big-calendar';

const today = new Date();

function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState(today);
  const { height } = useWindowDimensions();

  return (
    <View>
      <HStack space={3} marginTop="2" marginLeft="2">
        <Button variant="outline" onPress={() => setSelectedDate(today)}>
          Today
        </Button>
        <Button
          variant="outline"
          onPress={() =>
            setSelectedDate(
              DateTime.fromJSDate(selectedDate).minus({ days: 1 }).toJSDate()
            )
          }
        >
          {'<'}
        </Button>
        <Button
          variant="outline"
          onPress={() =>
            setSelectedDate(
              DateTime.fromJSDate(selectedDate).plus({ days: 1 }).toJSDate()
            )
          }
        >
          {'>'}
        </Button>
      </HStack>
      <Calendar
        height={height - 80}
        events={[]}
        date={selectedDate}
        mode="day"
        headerContainerStyle={{ marginTop: 8 }}
      />
    </View>
  );
}

export default CalendarScreen;
