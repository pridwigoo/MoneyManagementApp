import React, { useEffect, useState } from 'react';

import { addTransactionStyles } from '../styles/addTransactionStyles';

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

import { RootStackParamList } from '../navigation/AppNavigator';

import { useCategoryStore } from '../store/categoryStore';
import { useTransactionStore } from '../store/transactionStore';

import { appStyles } from '../styles/appStyles';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'AddTransaction'
>;

type TransactionFormType =
  | 'income'
  | 'expense';

export function AddTransactionScreen({
  navigation,
}: Props) {
  const [type, setType] =
    useState<TransactionFormType>('expense');

  const [amount, setAmount] = useState('');

  const [description, setDescription] =
    useState('');

  const [selectedCategoryId, setSelectedCategoryId] =
    useState<number | undefined>();

  const categories = useCategoryStore(
    (state) => state.categories,
  );

  const loadCategories = useCategoryStore(
    (state) => state.loadCategories,
  );

  const addTransaction = useTransactionStore(
    (state) => state.addTransaction,
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        await loadCategories();
      } catch (error) {
        console.error(
          'Failed to load categories:',
          error,
        );
      }
    };

    loadData();
  }, [loadCategories]);

  const filteredCategories =
    categories.filter(
      (category) => category.type === type,
    );

  const handleTypeChange = (
    selectedType: TransactionFormType,
  ) => {
    setType(selectedType);

    setSelectedCategoryId(undefined);
  };

  const handleSave = async () => {
    const numericAmount = Number(
      amount.replace(/\D/g, ''),
    );

    if (!numericAmount || numericAmount <= 0) {
      Alert.alert(
        'Validasi',
        'Nominal transaksi harus lebih dari 0.',
      );

      return;
    }

    if (!selectedCategoryId) {
      Alert.alert(
        'Validasi',
        'Silakan pilih kategori transaksi.',
      );

      return;
    }

    try {
      await addTransaction({
        type,
        amount: numericAmount,
        category_id: selectedCategoryId,
        description:
          description.trim() || undefined,
        date: new Date().toISOString(),
      });

      Alert.alert(
        'Berhasil',
        'Transaksi berhasil disimpan.',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.goBack();
            },
          },
        ],
      );
    } catch (error) {
      console.error(
        'Failed to save transaction:',
        error,
      );

      Alert.alert(
        'Error',
        'Transaksi gagal disimpan.',
      );
    }
  };

  return (
    <ScrollView
      contentContainerStyle={
        addTransactionStyles.container
      }
      keyboardShouldPersistTaps="handled"
    >
      <Text style={appStyles.sectionTitle}>
        Tambah Transaksi
      </Text>

      {/* Transaction Type */}
      <View style={appStyles.section}>
        <Text style={appStyles.summaryLabel}>
          Jenis Transaksi
        </Text>

        <View
          style={
            addTransactionStyles.typeContainer
          }
        >
          <Pressable
            style={
              addTransactionStyles.typeButton
            }
            onPress={() =>
              handleTypeChange('expense')
            }
          >
            <Text
              style={addTransactionStyles.typeButtonText}
            >
              Pengeluaran
            </Text>
          </Pressable>

          <Pressable
            style={addTransactionStyles.typeButton}
            onPress={() =>
              handleTypeChange('income')
            }
          >
            <Text
              style={addTransactionStyles.typeButtonText}
            >
              Pemasukan
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Amount */}
      <View style={appStyles.section}>
        <Text style={appStyles.summaryLabel}>
          Nominal
        </Text>

        <TextInput
          value={amount}
          onChangeText={setAmount}
          placeholder="Contoh: 25000"
          keyboardType="numeric"
          style={addTransactionStyles.input}
        />
      </View>

      {/* Category */}
      <View style={appStyles.section}>
        <Text style={appStyles.summaryLabel}>
          Kategori
        </Text>

        <View
          style={
            addTransactionStyles.categoryContainer
          }
        >
          {filteredCategories.map(
            (category) => (
              <Pressable
                key={category.id}
                onPress={() =>
                  setSelectedCategoryId(
                    category.id,
                  )
                }
                style={addTransactionStyles.categoryButton}
              >
                <Text
                  style={{
                    fontWeight: '600',
                  }}
                >
                  {category.icon}{' '}
                  {category.name}
                </Text>
              </Pressable>
            ),
          )}
        </View>
      </View>

      {/* Description */}
      <View style={appStyles.section}>
        <Text style={appStyles.summaryLabel}>
          Catatan
        </Text>

        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Contoh: Makan siang"
          multiline
          style={addTransactionStyles.descriptionInput}
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
        <Text style={appStyles.buttonText}>
          Simpan Transaksi
        </Text>
      </Pressable>
    </ScrollView>
  );
}

export default AddTransactionScreen;