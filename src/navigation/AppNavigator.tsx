import React from 'react';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import { DashboardScreen } from '../screens/DashboardScreen';
import { AddTransactionScreen } from '../screens/AddTransactionScreen';
import { TransactionHistoryScreen } from '../screens/TransactionHistoryScreen';
import { EditTransactionScreen } from '../screens/EditTransactionScreen';

export type RootStackParamList = {
  Dashboard: undefined;
  AddTransaction: undefined;
  TransactionHistory: undefined;
  EditTransaction: {
    transactionId: number;
  };
};

const Stack =
  createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: 'Money Management',
        }}
      />

      <Stack.Screen
        name="AddTransaction"
        component={AddTransactionScreen}
        options={{
          title: 'Tambah Transaksi',
        }}
      />

      <Stack.Screen
        name="TransactionHistory"
        component={TransactionHistoryScreen}
        options={{
          title: 'Riwayat Transaksi',
        }}
      />

      <Stack.Screen
        name="EditTransaction"
        component={EditTransactionScreen}
        options={{
          title: 'Edit Transaksi',
        }}
      />
    </Stack.Navigator>
  );
}