import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
    Button,
    Center,
    Checkbox,
    HStack,
    Text,
    View,
    Heading,
    AddIcon,
    DeleteIcon,
    TextArea,
    Select,
    CheckIcon,
    Box,
    VStack,
    Input,
  } from 'native-base';
  import { useQuery, useQueryClient } from 'react-query';
  import React, { ClassType, Component, useEffect, useState} from 'react';
  import { Alert, StyleSheet,  TextInput } from 'react-native';
 import { LoginStackList } from '../components/login_stack'
 import { SideBarList } from '../components/main_stack'
 import { Table, TableWrapper, Row, Rows, Col, Cell } from 'react-native-table-component'
 import { apiUrl } from '../constants';
 import { SelectBox } from 'react-native-multi-selectbox';
 

  const styles = StyleSheet.create({
    text: { textAlign: 'center' },
      btnText: { textAlign: 'center' },
      container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: 'gray.800' },
      head: { height: 40, backgroundColor: 'amber.200' },
      row: { flexDirection: 'row', backgroundColor: 'gray.800' },
      btn: { width: 28, height: 18, backgroundColor: 'gray.800',  borderRadius: 2 },

    
  });

  const stylesPT2 = StyleSheet.create({
    input:{
      height: 30,
      margin: 12, 
      borderWidth: 1,
      padding:10,
      width: 100,
      borderRadius: 4,
    }
  })

  const stylesPT3 = StyleSheet.create({
    input:{
      height: 30,
      margin: 12, 
      borderWidth: 1,
      padding:10,
      width: 200,
      borderRadius: 4,
    }
  })

  const SubjectSelect = () => {
    let [service, setService] = React.useState("");
    return (
        <Box maxW = "200">
          <Select 
          selectedValue={service} 
          minWidth="20"
          maxWidth = "10000000000000000000" 
          accessibilityLabel="Select" 
          placeholder="Select" 
          _selectedItem={{
          bg: "orange",
          paddingRight : "10",
          endIcon: <CheckIcon size="2" 
          />
        }} mt={1} onValueChange={itemValue => setService(itemValue)}>
            <Select.Item label="APCSA" value="APCSA" />
            <Select.Item label="Calc" value = "Calc" />
          </Select>
        </Box>
    )
  };

  
  export default class ClassPeriods extends React.Component<any,any> {

  
    constructor(props:any) {
      super(props);
      this.state = { 
        tableHead: ['', 'Subjects','', 'Description'],
        tableData: [
          ['', <SubjectSelect/>,'',<TextInput style = {stylesPT3.input}/>,],
          ['', <SubjectSelect/>,'',<TextInput style = {stylesPT3.input}  />,],
          ['', <SubjectSelect/>,'',<TextInput style = {stylesPT3.input} />, ],
          ['', <SubjectSelect/>,'',<TextInput style = {stylesPT3.input}  />,]
        ]
      }
    }
  
  
      
    _alertIndex(index:any) {
      Alert.alert(`This is row ${index + 1}`);
    }
  
    render() {
      const state = this.state;
      const element = (data:any, index:any) => (
        <Checkbox value = 'true' onChange = {() => this._alertIndex(index)}></Checkbox>
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
            Subjects
          </Heading>
          </Center>
          <Center>
          <Table borderStyle={{borderColor: 'transparent'}}>
            <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
            {
              state.tableData.map((rowData:any, index:any) => (
                <TableWrapper key={index} style={styles.row}>
                  {
                    rowData.map((cellData:any, cellIndex:any) => (
                      <Cell key={cellIndex} data={cellIndex === 0 ? element(cellData, index) : cellData} textStyle={styles.text}/>
                    ))
                  }
                </TableWrapper>
              ))
            }
          </Table>
          
          <Center>
          <View style={{ alignSelf: 'stretch', flexDirection: 'row', alignItems: 'center' }}>
         <Button style = {{ marginTop: 30, marginRight: 21, borderRadius: 30}}><AddIcon size="5" mt="0.5" color="white" /></Button>
          <Button style = {{ marginTop: 30, borderRadius: 30}}><DeleteIcon size="5" mt="0.5" color="white" /></Button>
          </View>
           </Center>
           </Center>
        </View>
      )
    }
  }