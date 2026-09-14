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
  useTransactionStore,
} from '../store/transactionStore';

import {
  useCategoryStore,
} from '../store/categoryStore';

import {
  appStyles,
} from '../styles/appStyles';

import {
  addTransactionStyles,
} from '../styles/addTransactionStyles';

export function AddTransactionScreen() {
  const addTransaction =
    useTransactionStore(
      (state) =>
        state.addTransaction,
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

  const [type, setType] =
    useState<
      'income' | 'expense'
    >('expense');

  const [amount, setAmount] =
    useState('');

  const [
    selectedCategoryId,
    setSelectedCategoryId,
  ] = useState<
    number | undefined
  >();

  const [description, setDescription] =
    useState('');

  useEffect(() => {
    const loadData =
      async () => {
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
  }, [
    loadCategories,
  ]);

  const filteredCategories =
    categories.filter(
      (category) =>
        category.type === type,
    );

  const handleTypeChange = (
    newType:
      | 'income'
      | 'expense',
  ) => {
    setType(newType);

    setSelectedCategoryId(
      undefined,
    );
  };

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
          'Nominal harus lebih dari 0.',
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
        await addTransaction({
          type,
          amount: numericAmount,
          category_id:
            selectedCategoryId,
          description:
            description.trim() ||
            undefined,
          date:
            new Date().toISOString(),
        });

        setAmount('');

        setSelectedCategoryId(
          undefined,
        );

        setDescription('');

        Alert.alert(
          'Berhasil',
          'Transaksi berhasil disimpan.',
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
      {/* Transaction Type */}

      <View
        style={appStyles.section}
      >
        <Text
          style={
            appStyles.summaryLabel
          }
        >
          Jenis Transaksi
        </Text>

        <View
          style={
            addTransactionStyles.typeContainer
          }
        >
          <Pressable
            style={[
              addTransactionStyles.typeButton,
              type === 'expense'
                ? addTransactionStyles.typeButtonActive
                : addTransactionStyles.typeButtonInactive,
            ]}
            onPress={() =>
              handleTypeChange(
                'expense',
              )
            }
          >
            <Text
              style={[
                addTransactionStyles.typeButtonText,
                type === 'expense'
                  ? addTransactionStyles.typeButtonTextActive
                  : addTransactionStyles.typeButtonTextInactive,
              ]}
            >
              Pengeluaran
            </Text>
          </Pressable>

          <Pressable
            style={[
              addTransactionStyles.typeButton,
              type === 'income'
                ? addTransactionStyles.typeButtonActive
                : addTransactionStyles.typeButtonInactive,
            ]}
            onPress={() =>
              handleTypeChange(
                'income',
              )
            }
          >
            <Text
              style={[
                addTransactionStyles.typeButtonText,
                type === 'income'
                  ? addTransactionStyles.typeButtonTextActive
                  : addTransactionStyles.typeButtonTextInactive,
              ]}
            >
              Pemasukan
            </Text>
          </Pressable>
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
          Nominal
        </Text>

        <TextInput
          value={amount}
          onChangeText={setAmount}
          placeholder="Contoh: 50000"
          keyboardType="numeric"
          style={
            addTransactionStyles.input
          }
        />
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
            addTransactionStyles.categoryContainer
          }
        >
          {filteredCategories.length ===
          0 ? (
            <Text
              style={
                appStyles.sectionDescription
              }
            >
              Belum ada kategori untuk
              jenis transaksi ini.
            </Text>
          ) : (
            filteredCategories.map(
              (category) => (
                <Pressable
                  key={category.id}
                  onPress={() =>
                    setSelectedCategoryId(
                      category.id,
                    )
                  }
                  style={[
                    addTransactionStyles.categoryButton,
                    selectedCategoryId ===
                    category.id
                      ? addTransactionStyles.categoryButtonSelected
                      : null,
                  ]}
                >
                  <Text
                    style={
                      addTransactionStyles.categoryText
                    }
                  >
                    {category.icon}{' '}
                    {category.name}
                  </Text>
                </Pressable>
              ),
            )
          )}
        </View>
      </View>

      {/* Description */}

      <View
        style={appStyles.section}
      >
        <Text
          style={
            appStyles.summaryLabel
          }
        >
          Keterangan
        </Text>

        <TextInput
          value={description}
          onChangeText={
            setDescription
          }
          placeholder="Contoh: Makan siang"
          multiline
          style={
            addTransactionStyles.descriptionInput
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
          Simpan Transaksi
        </Text>
      </Pressable>
    </ScrollView>
  );
}

export default AddTransactionScreen;