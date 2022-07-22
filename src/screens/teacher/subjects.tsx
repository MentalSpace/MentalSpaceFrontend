import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SideBarList } from '../../components/teacher_stack';
import {
  Button,
  Center,
  Checkbox,
  View,
  Heading,
  AddIcon,
  DeleteIcon,
  Select,
  CheckIcon,
  Box,
  VStack,
  Text,
} from 'native-base';
// import { useQuery, useQueryClient } from 'react-query';
import React, { ClassType, Component, useEffect, useState } from 'react';
import { Alert, StyleSheet, TextInput } from 'react-native';
// import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';

type ClassDisplayProps = NativeStackScreenProps<SideBarList, 'Subjects'>;

function SubjectsScreen({ navigation }: ClassDisplayProps) {
  return (
    <Center>
      <Box>
        <Heading
          size="lg"
          color="coolGray.800"
          _dark={{ color: 'warmGray.50' }}
          fontWeight="semibold"
          paddingTop="5"
          paddingBottom="30"
        >
          Subjects
        </Heading>
        <Text color="coolGray.800" fontWeight="semibold" fontSize={'18'}>
          Math 1
        </Text>
        <Text color="coolGray.800" fontWeight="semibold" fontSize={'18'}>
          Math 2
        </Text>
        <Text color="coolGray.800" fontWeight="semibold" fontSize={'18'}>
          Math 3
        </Text>
        <Text color="coolGray.800" fontWeight="semibold" fontSize={'18'}>
          Math Analysis
        </Text>
        <Text color="coolGray.800" fontWeight="semibold" fontSize={'18'}>
          MRWC
        </Text>
        <Text color="coolGray.800" fontWeight="semibold" fontSize={'18'}>
          AP Calc AB
        </Text>
        <Text color="coolGray.800" fontWeight="semibold" fontSize={'18'}>
          AP Calc BC
        </Text>
        <Text color="coolGray.800" fontWeight="semibold" mb="5" fontSize={'18'}>
          AP Statistics
        </Text>
        <Text color="coolGray.800" fontWeight="semibold" fontSize={'18'}>
          English 1
        </Text>
        <Text color="coolGray.800" fontWeight="semibold" fontSize={'18'}>
          English 1A
        </Text>
        <Text color="coolGray.800" fontWeight="semibold" fontSize={'18'}>
          English 2
        </Text>
        <Text color="coolGray.800" fontWeight="semibold" fontSize={'18'}>
          English 2A
        </Text>
        <Text color="coolGray.800" fontWeight="semibold" fontSize={'18'}>
          English 3
        </Text>
        <Text color="coolGray.800" fontWeight="semibold" fontSize={'18'}>
          AP Lang
        </Text>
        <Text color="coolGray.800" fontWeight="semibold" fontSize={'18'}>
          ERWC
        </Text>
        <Text color="coolGray.800" fontWeight="semibold" fontSize={'18'}>
          AP Lit
        </Text>
        <Text color="coolGray.800" fontWeight="semibold" fontSize={'18'}>
          Genres of Comp
        </Text>
        <Text color="coolGray.800" fontWeight="semibold" fontSize={'18'}>
          Journalism
        </Text>
        <Text color="coolGray.800" fontWeight="semibold" fontSize={'18'}>
          Gothic Lit
        </Text>
        <Button mt={7} size="xs" style={{ borderRadius: 30 }} maxWidth="39">
          <AddIcon size="5" mt="0.5" color="white" />
        </Button>
      </Box>
    </Center>
  );
}

export default SubjectsScreen;
