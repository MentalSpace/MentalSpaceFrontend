import { extendTheme, NativeBaseProvider, theme } from 'native-base';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import LoginStack from './src/components/login_stack';

const queryClient = new QueryClient();

export default function App() {
  const appTheme = extendTheme({
    colors: {
      primary: theme.colors.amber,
      secondary: theme.colors.lightBlue,
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider theme={appTheme}>
        <LoginStack />
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}
