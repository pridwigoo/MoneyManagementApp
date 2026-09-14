import React, { useEffect } from 'react';

import {
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';

import {
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigation/AppNavigator';

import { useTransactionStore } from '../store/transactionStore';

import { appStyles } from '../styles/appStyles';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'Dashboard'
>;

const formatCurrency = (amount: number) => {
  return `Rp ${amount.toLocaleString('id-ID')}`;
};

export function DashboardScreen({
  navigation,
}: Props) {
  const transactions = useTransactionStore(
    (state) => state.transactions,
  );

  const summary = useTransactionStore(
    (state) => state.summary,
  );

  const addTransaction = useTransactionStore(
    (state) => state.addTransaction,
  );

  const loadTransactions = useTransactionStore(
    (state) => state.loadTransactions,
  );

  const loadSummary = useTransactionStore(
    (state) => state.loadSummary,
  );

  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        await Promise.all([
          loadTransactions(),
          loadSummary(),
        ]);
      } catch (error) {
        console.error(
          'Failed to initialize dashboard:',
          error,
        );
      }
    };

    initializeDashboard();
  }, [
    loadTransactions,
    loadSummary,
  ]);


  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <View style={appStyles.container}>

        {/* Header */}
        <View style={appStyles.header}>
          <View>
            <Text style={appStyles.greeting}>
              Money Management
            </Text>

            <Text style={appStyles.subtitle}>
              Keuangan pribadi Anda
            </Text>
          </View>

          <View style={appStyles.profileCircle}>
            <Text style={appStyles.profileText}>
              DM
            </Text>
          </View>
        </View>

        {/* Balance */}
        <View style={appStyles.balanceCard}>
          <Text style={appStyles.balanceLabel}>
            Saldo Saat Ini
          </Text>

          <Text style={appStyles.balanceAmount}>
            {formatCurrency(
              summary.balance,
            )}
          </Text>

          <Text style={appStyles.balanceInfo}>
            Pemasukan dikurangi pengeluaran
          </Text>
        </View>

        {/* Summary */}
        <View style={appStyles.summaryContainer}>

          <View style={appStyles.summaryCard}>
            <Text style={appStyles.summaryLabel}>
              Pemasukan
            </Text>

            <Text
              style={[
                appStyles.summaryValue,
                {
                  color: '#16A34A',
                },
              ]}
            >
              {formatCurrency(
                summary.totalIncome,
              )}
            </Text>
          </View>

          <View style={appStyles.summaryCard}>
            <Text style={appStyles.summaryLabel}>
              Pengeluaran
            </Text>

            <Text
              style={[
                appStyles.summaryValue,
                {
                  color: '#DC2626',
                },
              ]}
            >
              {formatCurrency(
                summary.totalExpense,
              )}
            </Text>
          </View>

        </View>

        {/* Add Transaction */}
        <View style={appStyles.section}>
          <Text style={appStyles.sectionTitle}>
            Transaksi
          </Text>

          <Text style={appStyles.sectionDescription}>
            Tambahkan pemasukan atau pengeluaran
            untuk mencatat keuangan Anda.
          </Text>

          <Pressable
            style={({ pressed }) => [
              appStyles.button,
              pressed &&
              appStyles.buttonPressed,
            ]}
            onPress={() =>
              navigation.navigate(
                'AddTransaction',
              )
            }
          >
            <Text style={appStyles.buttonText}>
              + Tambah Transaksi
            </Text>
          </Pressable>
        </View>

        

        {/* Latest Transactions */}
        <View style={appStyles.section}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text style={appStyles.sectionTitle}>
              Transaksi Terbaru
            </Text>

            <Pressable
              onPress={() =>
                navigation.navigate(
                  'TransactionHistory',
                )
              }
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '700',
                  color: '#2563EB',
                }}
              >
                Lihat Semua
              </Text>
            </Pressable>
          </View>

          {transactions.length === 0 ? (
            <View
              style={appStyles.transactionCard}
            >
              <Text
                style={
                  appStyles.transactionDescription
                }
              >
                Belum ada transaksi.
              </Text>
            </View>
          ) : (
            transactions
              .slice(0, 5)
              .map((transaction) => (
                <View
                  key={transaction.id}
                  style={[
                    appStyles.transactionCard,
                    {
                      marginTop: 10,
                    },
                  ]}
                >
                  <View>
                    <Text
                      style={
                        appStyles.transactionTitle
                      }
                    >
                      {transaction.type ===
                        'income'
                        ? 'Pemasukan'
                        : 'Pengeluaran'}
                    </Text>

                    <Text
                      style={
                        appStyles.transactionDescription
                      }
                    >
                      {transaction.description ||
                        'Tanpa catatan'}
                    </Text>
                  </View>

                  <Text
                    style={
                      transaction.type ===
                        'income'
                        ? [
                          appStyles.transactionAmount,
                          {
                            color:
                              '#16A34A',
                          },
                        ]
                        : appStyles.transactionAmount
                    }
                  >
                    {transaction.type ===
                      'income'
                      ? '+'
                      : '-'}{' '}
                    {formatCurrency(
                      transaction.amount,
                    )}
                  </Text>
                </View>
              ))
          )}
        </View>

      </View>
    </ScrollView>
  );
}

export default DashboardScreen;
