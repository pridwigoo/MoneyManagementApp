import React, {
  useEffect,
} from 'react';

import {
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';

import {
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import {
  RootStackParamList,
} from '../navigation/AppNavigator';

import {
  useTransactionStore,
} from '../store/transactionStore';

import {
  useBudgetStore,
} from '../store/budgetStore';

import {
  useCategoryStore,
} from '../store/categoryStore';

import {
  appStyles,
} from '../styles/appStyles';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'Dashboard'
>;

const formatCurrency = (
  amount: number,
) => {
  return `Rp ${amount.toLocaleString(
    'id-ID',
  )}`;
};

const formatDate = (
  date: string,
) => {
  return new Date(
    date,
  ).toLocaleDateString(
    'id-ID',
    {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    },
  );
};

export function DashboardScreen({
  navigation,
}: Props) {
  const transactions =
    useTransactionStore(
      (state) => state.transactions,
    );

  const summary =
    useTransactionStore(
      (state) => state.summary,
    );

  const loadTransactions =
    useTransactionStore(
      (state) =>
        state.loadTransactions,
    );

  const loadSummary =
    useTransactionStore(
      (state) => state.loadSummary,
    );

  const budgets =
    useBudgetStore(
      (state) => state.budgets,
    );

  const budgetProgress =
    useBudgetStore(
      (state) =>
        state.budgetProgress,
    );

  const loadBudgets =
    useBudgetStore(
      (state) => state.loadBudgets,
    );

  const categories =
    useCategoryStore(
      (state) => state.categories,
    );

  const loadCategories =
    useCategoryStore(
      (state) =>
        state.loadCategories,
    );

  useEffect(() => {
    const loadData =
      async () => {
        try {
          await Promise.all([
            loadTransactions(),
            loadSummary(),
            loadBudgets(),
            loadCategories(),
          ]);
        } catch (error) {
          console.error(
            'Failed to load dashboard data:',
            error,
          );
        }
      };

    loadData();
  }, [
    loadTransactions,
    loadSummary,
    loadBudgets,
    loadCategories,
  ]);

  const now = new Date();

  const currentMonth =
    now.getMonth() + 1;

  const currentYear =
    now.getFullYear();

  const currentMonthBudgets =
    budgets.filter(
      (budget) =>
        budget.month ===
          currentMonth &&
        budget.year ===
          currentYear,
    );

  const currentBudgetProgress =
    budgetProgress.filter(
      (progress) =>
        progress.budget.month ===
          currentMonth &&
        progress.budget.year ===
          currentYear,
    );

  const totalBudget =
    currentMonthBudgets.reduce(
      (total, budget) =>
        total + budget.amount,
      0,
    );

  const totalSpent =
    currentBudgetProgress.reduce(
      (total, progress) =>
        total + progress.spent,
      0,
    );

  const totalRemaining =
    totalBudget - totalSpent;

  const budgetPercentage =
    totalBudget > 0
      ? (totalSpent /
          totalBudget) *
        100
      : 0;

  const budgetProgressWidth =
    Math.min(
      Math.max(
        budgetPercentage,
        0,
      ),
      100,
    );

  const isBudgetOver =
    budgetPercentage > 100;

  const latestTransactions =
    transactions.slice(0, 5);

  const getCategory = (
    categoryId?: number,
  ) => {
    return categories.find(
      (category) =>
        category.id ===
        categoryId,
    );
  };

  return (
    <ScrollView
      contentContainerStyle={
        appStyles.container
      }
    >
      {/* Header */}

      <View
        style={appStyles.header}
      >
        <View>
          <Text
            style={
              appStyles.greeting
            }
          >
            Money Management
          </Text>

          <Text
            style={
              appStyles.subtitle
            }
          >
            Kelola keuanganmu dengan lebih
            mudah.
          </Text>
        </View>

        <View
          style={
            appStyles.profileCircle
          }
        >
          <Text
            style={
              appStyles.profileText
            }
          >
            MM
          </Text>
        </View>
      </View>

      {/* Balance */}

      <View
        style={
          appStyles.balanceCard
        }
      >
        <Text
          style={
            appStyles.balanceLabel
          }
        >
          Saldo
        </Text>

        <Text
          style={
            appStyles.balanceAmount
          }
        >
          {formatCurrency(
            summary.balance,
          )}
        </Text>

        <Text
          style={
            appStyles.balanceInfo
          }
        >
          Pemasukan dikurangi pengeluaran
        </Text>
      </View>

      {/* Income & Expense */}

      <View
        style={
          appStyles.summaryContainer
        }
      >
        <View
          style={
            appStyles.summaryCard
          }
        >
          <Text
            style={
              appStyles.summaryLabel
            }
          >
            Pemasukan
          </Text>

          <Text
            style={[
              appStyles.summaryValue,
              appStyles.incomeValue,
            ]}
          >
            {formatCurrency(
              summary.totalIncome,
            )}
          </Text>
        </View>

        <View
          style={
            appStyles.summaryCard
          }
        >
          <Text
            style={
              appStyles.summaryLabel
            }
          >
            Pengeluaran
          </Text>

          <Text
            style={[
              appStyles.summaryValue,
              appStyles.expenseValue,
            ]}
          >
            {formatCurrency(
              summary.totalExpense,
            )}
          </Text>
        </View>
      </View>

      {/* Budget */}

      <View
        style={appStyles.section}
      >
        <View
          style={
            appStyles.sectionHeader
          }
        >
          <View>
            <Text
              style={
                appStyles.sectionTitle
              }
            >
              Budget Bulan Ini
            </Text>

            <Text
              style={
                appStyles.sectionDescription
              }
            >
              Ringkasan penggunaan budget
              bulan berjalan.
            </Text>
          </View>

          <Pressable
            onPress={() =>
              navigation.navigate(
                'Budget',
              )
            }
          >
            <Text
              style={
                appStyles.linkText
              }
            >
              Lihat
            </Text>
          </Pressable>
        </View>

        {currentMonthBudgets.length ===
        0 ? (
          <View
            style={
              appStyles.transactionCard
            }
          >
            <Text
              style={
                appStyles.transactionTitle
              }
            >
              Belum ada budget
            </Text>

            <Text
              style={
                appStyles.transactionDescription
              }
            >
              Buat budget untuk mengontrol
              pengeluaran bulan ini.
            </Text>

            <Pressable
              style={({ pressed }) => [
                appStyles.button,
                pressed &&
                  appStyles.buttonPressed,
              ]}
              onPress={() =>
                navigation.navigate(
                  'Budget',
                )
              }
            >
              <Text
                style={
                  appStyles.buttonText
                }
              >
                + Buat Budget
              </Text>
            </Pressable>
          </View>
        ) : (
          <View
            style={
              appStyles.transactionCard
            }
          >
            <View
              style={
                appStyles.budgetSummaryHeader
              }
            >
              <View>
                <Text
                  style={
                    appStyles.transactionTitle
                  }
                >
                  Terpakai
                </Text>

                <Text
                  style={
                    appStyles.budgetSpent
                  }
                >
                  {formatCurrency(
                    totalSpent,
                  )}
                </Text>
              </View>

              <View
                style={
                  appStyles.budgetSummaryRight
                }
              >
                <Text
                  style={
                    appStyles.transactionDescription
                  }
                >
                  Dari
                </Text>

                <Text
                  style={
                    appStyles.budgetTotal
                  }
                >
                  {formatCurrency(
                    totalBudget,
                  )}
                </Text>
              </View>
            </View>

            <View
              style={
                appStyles.progressContainer
              }
            >
              <View
                style={
                  appStyles.progressHeader
                }
              >
                <Text
                  style={
                    appStyles.progressLabel
                  }
                >
                  Penggunaan
                </Text>

                <Text
                  style={[
                    appStyles.progressPercentage,
                    isBudgetOver &&
                      appStyles.progressPercentageWarning,
                  ]}
                >
                  {budgetPercentage.toFixed(
                    0,
                  )}
                  %
                </Text>
              </View>

              <View
                style={
                  appStyles.progressBackground
                }
              >
                <View
                  style={[
                    appStyles.progressBar,
                    isBudgetOver &&
                      appStyles.progressBarWarning,
                    {
                      width: `${budgetProgressWidth}%`,
                    },
                  ]}
                />
              </View>
            </View>

            <View
              style={
                appStyles.budgetRemainingContainer
              }
            >
              <Text
                style={
                  appStyles.transactionDescription
                }
              >
                Sisa budget
              </Text>

              <Text
                style={[
                  appStyles.budgetRemaining,
                  totalRemaining < 0 &&
                    appStyles.budgetRemainingWarning,
                ]}
              >
                {formatCurrency(
                  totalRemaining,
                )}
              </Text>
            </View>

            <Pressable
              style={({ pressed }) => [
                appStyles.secondaryButton,
                pressed &&
                  appStyles.buttonPressed,
              ]}
              onPress={() =>
                navigation.navigate(
                  'Budget',
                )
              }
            >
              <Text
                style={
                  appStyles.secondaryButtonText
                }
              >
                Kelola Budget
              </Text>
            </Pressable>
          </View>
        )}
      </View>

      {/* Add Transaction */}

      <View
        style={appStyles.section}
      >
        <Text
          style={
            appStyles.sectionTitle
          }
        >
          Transaksi
        </Text>

        <Text
          style={
            appStyles.sectionDescription
          }
        >
          Catat pemasukan atau pengeluaran
          baru.
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
          <Text
            style={
              appStyles.buttonText
            }
          >
            + Tambah Transaksi
          </Text>
        </Pressable>
      </View>

      {/* Latest Transactions */}

      <View
        style={appStyles.section}
      >
        <View
          style={
            appStyles.sectionHeader
          }
        >
          <View>
            <Text
              style={
                appStyles.sectionTitle
              }
            >
              Transaksi Terbaru
            </Text>

            <Text
              style={
                appStyles.sectionDescription
              }
            >
              Lima transaksi terakhir.
            </Text>
          </View>

          <Pressable
            onPress={() =>
              navigation.navigate(
                'TransactionHistory',
              )
            }
          >
            <Text
              style={
                appStyles.linkText
              }
            >
              Lihat Semua
            </Text>
          </Pressable>
        </View>

        {latestTransactions.length ===
        0 ? (
          <View
            style={
              appStyles.transactionCard
            }
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
          latestTransactions.map(
            (transaction) => {
              const category =
                getCategory(
                  transaction.category_id,
                );

              const isIncome =
                transaction.type ===
                'income';

              return (
                <View
                  key={
                    transaction.id
                  }
                  style={
                    appStyles.transactionCard
                  }
                >
                  <View
                    style={
                      appStyles.transactionInfo
                    }
                  >
                    <Text
                      style={
                        appStyles.transactionTitle
                      }
                    >
                      {category?.icon ||
                        '📦'}{' '}
                      {category?.name ||
                        'Tanpa Kategori'}
                    </Text>

                    {transaction.description ? (
                      <Text
                        style={
                          appStyles.transactionDescription
                        }
                      >
                        {
                          transaction.description
                        }
                      </Text>
                    ) : null}

                    <Text
                      style={
                        appStyles.transactionDescription
                      }
                    >
                      {formatDate(
                        transaction.date,
                      )}
                    </Text>
                  </View>

                  <Text
                    style={[
                      appStyles.transactionAmount,
                      isIncome
                        ? appStyles.incomeAmount
                        : appStyles.expenseAmount,
                    ]}
                  >
                    {isIncome
                      ? '+'
                      : '-'}
                    {formatCurrency(
                      transaction.amount,
                    )}
                  </Text>
                </View>
              );
            },
          )
        )}
      </View>
    </ScrollView>
  );
}

export default DashboardScreen;