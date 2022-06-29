import React from 'react';
import { extendTheme, NativeBaseProvider, theme } from 'native-base';
import LoginStack from './src/components/login_stack';

export default function App() {
  const appTheme = extendTheme({
    colors: {
      primary: theme.colors.amber,
      secondary: theme.colors.lightBlue,
    }
  })

  return (
    <NativeBaseProvider theme={appTheme}> 
      <LoginStack />
    </NativeBaseProvider>
  );
}
