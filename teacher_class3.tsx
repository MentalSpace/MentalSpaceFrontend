import { NativeStackScreenProps } from '@react-navigation/native-stack';
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
} from 'native-base';
import React, { ClassType, Component, useEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { apiUrl } from '../../constants';
import { AccessTokenResponse } from '../../hooks/useAccessToken';
import { useCSRFToken } from '../../hooks/useCSRFToken';
import { DataTable } from 'react-native-paper';
import { useQuery, useQueryClient } from 'react-query';
import { render } from 'react-dom';

//     const csrfToken = useCSRFToken();
//     const accessToken = useAccessToken();

// type CreateClass = {
//   status: string,
//   subjectId: number,
// }; 

// const postRequest = {
//         method: 'POST',
//         headers: { 
//           'Content-Type': 'application/json',
//           'Prefer': 'code=200',
//           'X-CSRF-TOKEN': csrfToken.data!.csrfToken, //'123'
//           Authorization: 'Bearer ' + accessToken.data!.accessToken,
//         },
//         body: JSON.stringify({
//           classId: 0,
//           studentId: checked
//        })
//       };
//   //kick variable with useQuery 
//       //After rendering, shows status message in console if successful, then re-navigates to original screen
//       const kick = useQuery<CreateClass>('registerUser', async () => await 
//       (await fetch(apiUrl + '/class/kick', postRequest)).json(), {enabled: false});
//       useEffect(() => {
//         if (kick.isSuccess) {
//           console.log(kick.data.status);
//         }
//       }, [kick.isSuccess]);
//   //Initialization of CSRF Token and Access Token for use in getRequest and postRequest


const styles = StyleSheet.create({
  text: { textAlign: 'center' },
  btnText: { textAlign: 'center' },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: 'gray.800',
  },
  head: { height: 40, backgroundColor: 'amber.200' },
  row: { flexDirection: 'row', backgroundColor: 'gray.800' },
  btn: { width: 28, height: 18, backgroundColor: 'gray.800', borderRadius: 2 },
});

const SubjectSelect = () => {
  let [service, setService] = React.useState('');
  return (
    <Box maxW="200">
      <Select
        selectedValue={service}
        minWidth="89"
        maxWidth="1000"
        accessibilityLabel="Select"
        placeholder="Select"
        _selectedItem={{
          bg: 'orange',
          paddingRight: '10',
          endIcon: <CheckIcon size="2" />,
        }}
        mt={1}
        onValueChange={(itemValue: any) => setService(itemValue)}
      >
        <Select.Item label="English 3" value="English2" />
        <Select.Item label="English 1" value="English1" />
        <Select.Item label="Math 1" value="Math1" />
        <Select.Item label="Art 1" value="Art1" />
      </Select>
    </Box>
  );
};

const PeriodSelect = () => {
  let [service, setService] = React.useState('');
  return (
    <Box maxW="200">
      <Select
        selectedValue={service}
        minWidth="10"
        maxWidth="100"
        accessibilityLabel="Select"
        placeholder="Select"
        _selectedItem={{
          bg: 'orange',
          endIcon: <CheckIcon size="7" />,
        }}
        mt={1}
        onValueChange={(itemValue: any) => setService(itemValue)}
      >
        <Select.Item label="1" value="1" />
        <Select.Item label="2" value="2" />
        <Select.Item label="3" value="3" />
        <Select.Item label="4" value="4" />
        <Select.Item label="5" value="5" />
        <Select.Item label="6" value="6" />
        <Select.Item label="7" value="7" />
      </Select>
    </Box>
  );
};

export default class ClassPeriods extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      // rows: ['', <PeriodSelect />, '', <SubjectSelect />, '', '4'] 
      tableHead: ['', 'Period', '', 'Subject', '', 'Class Code   '],
      tableData: [
        ['', <Select placeholder='1'/>, '', <Select placeholder='English 3'/>, '', 'WSXCVV'],
        ['', <Select placeholder='2'/>, '', <Select placeholder='English 1'/>, '', 'ERRSSS'],
        ['', <Select placeholder='4'/>, '', <Select placeholder='English 1'/>, '', 'SDFXCV'],

      ],
    };
  }

  // handleAddRow = () => {
  //   this.setState((prevState: any, props: any) => {
  //     const row = { content:  ['', <PeriodSelect />, '', <SubjectSelect />, '', '4'] };
  //     return { rows: [...prevState.rows, row] };
  //   });
  // };

  _alertIndex(index: any) {
    Alert.alert(`This is row ${index + 1}`);
    console.log(index)
  }
  render() {
    const state = this.state;
    const element = (data: any, index: any) => (
      <Checkbox
        value="true"
        onChange={() => this._alertIndex(index)}
      ></Checkbox>
    );
    return (
      <View style={styles.container}>
        <Center>
          <Heading
            size="xl"
            color="coolGray.800"
            _dark={{
              color: 'warmGray.50',
            }}
            fontWeight="semibold"
            paddingBottom="30"
            paddingTop="2%"
          >
            Classes
          </Heading>
        </Center>
        <Center>
          <Table borderStyle={{ borderColor: 'transparent' }}>
            <Row
              data={state.tableHead}
              style={styles.head}
              textStyle={styles.text}
            />
            {state.tableData.map((rowData: any, index: any) => (
              <TableWrapper key={index} style={styles.row}>
                {rowData.map((cellData: any, cellIndex: any) => (
                  <Cell
                    key={cellIndex}
                    data={cellIndex === 0 ? element(cellData, index) : cellData}
                    textStyle={styles.text}
                  />
                ))}
              </TableWrapper>
            ))}
          </Table>

          <Center>
            <View
              style={{
                alignSelf: 'stretch',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Button 
                style={{ marginTop: 30, marginRight: 21, borderRadius: 30 }}
              >
                <AddIcon size="5" mt="0.5" color="white" />
              </Button>
              <Button style={{ marginTop: 30, borderRadius: 30 }}>
                <DeleteIcon size="5" mt="0.5" color="white" />
              </Button>
            </View>
          </Center>
        </Center>
      </View>
    );
  }
}