import React from 'react';
import { extendTheme, NativeBaseProvider, theme } from 'native-base';
import LoginStack from './src/components/login_stack';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export default function App() {
  const appTheme = extendTheme({
    colors: {
      primary: theme.colors.amber,
      secondary: theme.colors.lightBlue,
    }
  })

  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider theme={appTheme}> 
        <LoginStack />
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}
