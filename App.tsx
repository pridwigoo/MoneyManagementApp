import React from 'react';

import {
  NavigationContainer,
} from '@react-navigation/native';

import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';

import { initializeDatabase } from './src/database/migrations';

import { AppNavigator } from './src/navigation/AppNavigator';

function App() {
  React.useEffect(() => {
    const initializeApp = async () => {
      try {
        await initializeDatabase();

        console.log(
          'MoneyManagement database ready',
        );
      } catch (error) {
        console.error(
          'Application initialization failed:',
          error,
        );
      }
    };

    initializeApp();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;