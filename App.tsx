import React from 'react';
import { NativeBaseProvider } from 'native-base';
import LoginStack from './src/components/login_stack';

export default function App() {
  return (
    <NativeBaseProvider> 
      <LoginStack />
    </NativeBaseProvider>
  );
}
