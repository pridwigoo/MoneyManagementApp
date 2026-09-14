import React, {
  useEffect,
  useState,
} from 'react';

import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

import {
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import {
  RootStackParamList,
} from '../navigation/AppNavigator';

import {
  useBudgetStore,
} from '../store/budgetStore';

import {
  useCategoryStore,
} from '../store/categoryStore';

import { appStyles } from '../styles/appStyles';

import {
  budgetStyles,
} from '../styles/budgetStyles';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'Budget'
>;

const formatCurrency = (
  amount: number,
) => {
  return `Rp ${amount.toLocaleString(
    'id-ID',
  )}`;
};

export function BudgetScreen({
  navigation,
}: Props) {
  const budgets =
    useBudgetStore(
      (state) => state.budgets,
    );

  const budgetProgress =
    useBudgetStore(
      (state) => state.budgetProgress,
    );

  const loadBudgets =
    useBudgetStore(
      (state) =>
        state.loadBudgets,
    );

  const addBudget =
    useBudgetStore(
      (state) =>
        state.addBudget,
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

  const [amount, setAmount] =
    useState('');

  const [
    selectedCategoryId,
    setSelectedCategoryId,
  ] = useState<
    number | undefined
  >();

  const now = new Date();

  const [month, setMonth] =
    useState(
      now.getMonth() + 1,
    );

  const [year, setYear] =
    useState(
      now.getFullYear(),
    );

  useEffect(() => {
    const loadData =
      async () => {
        try {
          await Promise.all([
            loadBudgets(),
            loadCategories(),
          ]);
        } catch (error) {
          console.error(
            'Failed to load budget data:',
            error,
          );
        }
      };

    loadData();
  }, [
    loadBudgets,
    loadCategories,
  ]);

  const expenseCategories =
    categories.filter(
      (category) =>
        category.type === 'expense',
    );

  const handleSave =
    async () => {
      const numericAmount =
        Number(
          amount.replace(
            /\D/g,
            '',
          ),
        );

      if (
        !numericAmount ||
        numericAmount <= 0
      ) {
        Alert.alert(
          'Validasi',
          'Nominal budget harus lebih dari 0.',
        );

        return;
      }

      if (!selectedCategoryId) {
        Alert.alert(
          'Validasi',
          'Silakan pilih kategori.',
        );

        return;
      }

      try {
        await addBudget({
          category_id:
            selectedCategoryId,
          amount: numericAmount,
          month,
          year,
        });

        setAmount('');

        setSelectedCategoryId(
          undefined,
        );

        Alert.alert(
          'Berhasil',
          'Budget berhasil ditambahkan.',
        );
      } catch (error) {
        console.error(
          'Failed to add budget:',
          error,
        );

        Alert.alert(
          'Error',
          'Budget gagal ditambahkan.',
        );
      }
    };

  const getCategory = (
    categoryId: number,
  ) => {
    return categories.find(
      (category) =>
        category.id === categoryId,
    );
  };

  const getBudgetProgress = (
    budgetId: number,
  ) => {
    return budgetProgress.find(
      (item) =>
        item.budget.id ===
        budgetId,
    );
  };

  return (
    <ScrollView
      contentContainerStyle={
        budgetStyles.container
      }
      keyboardShouldPersistTaps="handled"
    >
      <Text
        style={
          appStyles.sectionTitle
        }
      >
        Budget
      </Text>

      <Text
        style={
          appStyles.sectionDescription
        }
      >
        Atur batas pengeluaran berdasarkan
        kategori.
      </Text>

      {/* Month */}

      <View
        style={appStyles.section}
      >
        <Text
          style={
            appStyles.summaryLabel
          }
        >
          Bulan
        </Text>

        <View
          style={
            budgetStyles.monthContainer
          }
        >
          <Pressable
            style={
              budgetStyles.monthButton
            }
            onPress={() => {
              if (month === 1) {
                setMonth(12);
                setYear(
                  year - 1,
                );
              } else {
                setMonth(
                  month - 1,
                );
              }
            }}
          >
            <Text
              style={
                budgetStyles.monthButtonText
              }
            >
              ←
            </Text>
          </Pressable>

          <View
            style={
              budgetStyles.monthDisplay
            }
          >
            <Text
              style={
                budgetStyles.monthText
              }
            >
              {String(month).padStart(
                2,
                '0',
              )}{' '}
              / {year}
            </Text>
          </View>

          <Pressable
            style={
              budgetStyles.monthButton
            }
            onPress={() => {
              if (month === 12) {
                setMonth(1);
                setYear(
                  year + 1,
                );
              } else {
                setMonth(
                  month + 1,
                );
              }
            }}
          >
            <Text
              style={
                budgetStyles.monthButtonText
              }
            >
              →
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Category */}

      <View
        style={appStyles.section}
      >
        <Text
          style={
            appStyles.summaryLabel
          }
        >
          Kategori
        </Text>

        <View
          style={
            budgetStyles.categoryContainer
          }
        >
          {expenseCategories.map(
            (category) => (
              <Pressable
                key={category.id}
                onPress={() =>
                  setSelectedCategoryId(
                    category.id,
                  )
                }
                style={[
                  budgetStyles.categoryButton,
                  selectedCategoryId ===
                  category.id
                    ? budgetStyles.categoryButtonSelected
                    : null,
                ]}
              >
                <Text
                  style={
                    budgetStyles.categoryText
                  }
                >
                  {category.icon}{' '}
                  {category.name}
                </Text>
              </Pressable>
            ),
          )}
        </View>
      </View>

      {/* Amount */}

      <View
        style={appStyles.section}
      >
        <Text
          style={
            appStyles.summaryLabel
          }
        >
          Nominal Budget
        </Text>

        <TextInput
          value={amount}
          onChangeText={setAmount}
          placeholder="Contoh: 1500000"
          keyboardType="numeric"
          style={
            budgetStyles.amountInput
          }
        />
      </View>

      {/* Save */}

      <Pressable
        style={({ pressed }) => [
          appStyles.button,
          pressed &&
            appStyles.buttonPressed,
        ]}
        onPress={handleSave}
      >
        <Text
          style={
            appStyles.buttonText
          }
        >
          + Tambah Budget
        </Text>
      </Pressable>

      {/* Budget List */}

      <View
        style={appStyles.section}
      >
        <Text
          style={
            appStyles.sectionTitle
          }
        >
          Budget Tersimpan
        </Text>

        {budgets.length === 0 ? (
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
              Belum ada budget.
            </Text>
          </View>
        ) : (
          budgets.map((budget) => {
            const category =
              getCategory(
                budget.category_id,
              );

            const progress =
              getBudgetProgress(
                budget.id,
              );

            const percentage =
              progress?.percentage ??
              0;

            const progressWidth =
              Math.min(
                Math.max(
                  percentage,
                  0,
                ),
                100,
              );

            const isOverBudget =
              percentage > 100;

            return (
              <View
                key={budget.id}
                style={[
                  appStyles.transactionCard,
                  budgetStyles.budgetCard,
                ]}
              >
                <View>
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

                  <Text
                    style={
                      appStyles.transactionDescription
                    }
                  >
                    {String(
                      budget.month,
                    ).padStart(
                      2,
                      '0',
                    )}{' '}
                    / {budget.year}
                  </Text>

                  <View
                    style={
                      budgetStyles.budgetDetailContainer
                    }
                  >
                    <View
                      style={
                        budgetStyles.budgetDetailRow
                      }
                    >
                      <Text
                        style={
                          budgetStyles.budgetDetailLabel
                        }
                      >
                        Budget
                      </Text>

                      <Text
                        style={
                          budgetStyles.budgetDetailValue
                        }
                      >
                        {formatCurrency(
                          budget.amount,
                        )}
                      </Text>
                    </View>

                    <View
                      style={
                        budgetStyles.budgetDetailRow
                      }
                    >
                      <Text
                        style={
                          budgetStyles.budgetDetailLabel
                        }
                      >
                        Terpakai
                      </Text>

                      <Text
                        style={
                          budgetStyles.budgetDetailValue
                        }
                      >
                        {formatCurrency(
                          progress?.spent ??
                            0,
                        )}
                      </Text>
                    </View>

                    <View
                      style={
                        budgetStyles.budgetDetailRow
                      }
                    >
                      <Text
                        style={
                          budgetStyles.budgetDetailLabel
                        }
                      >
                        Sisa
                      </Text>

                      <Text
                        style={[
                          budgetStyles.budgetDetailValue,
                          (progress?.remaining ??
                            0) < 0
                            ? budgetStyles.budgetRemainingNegative
                            : null,
                        ]}
                      >
                        {formatCurrency(
                          progress?.remaining ??
                            budget.amount,
                        )}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={
                      budgetStyles.progressContainer
                    }
                  >
                    <View
                      style={
                        budgetStyles.progressHeader
                      }
                    >
                      <Text
                        style={
                          budgetStyles.progressLabel
                        }
                      >
                        Penggunaan Budget
                      </Text>

                      <Text
                        style={
                          budgetStyles.progressPercentage
                        }
                      >
                        {percentage.toFixed(
                          0,
                        )}
                        %
                      </Text>
                    </View>

                    <View
                      style={
                        budgetStyles.progressBackground
                      }
                    >
                      <View
                        style={[
                          budgetStyles.progressBar,
                          isOverBudget &&
                            budgetStyles.progressWarning,
                          {
                            width: `${progressWidth}%`,
                          },
                        ]}
                      />
                    </View>
                  </View>
                </View>
              </View>
            );
          })
        )}
      </View>
    </ScrollView>
  );
}

export default BudgetScreen;