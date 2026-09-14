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
    useCategoryStore,
} from '../store/categoryStore';

import {
    useTransactionStore,
} from '../store/transactionStore';

import { appStyles } from '../styles/appStyles';

import {
    editTransactionStyles,
} from '../styles/editTransactionStyles';

type Props = NativeStackScreenProps<
    RootStackParamList,
    'EditTransaction'
>;

type TransactionFormType =
    | 'income'
    | 'expense';

export function EditTransactionScreen({
    route,
    navigation,
}: Props) {
    const transactionId =
        route.params.transactionId;

    const transactions =
        useTransactionStore(
            (state) =>
                state.transactions,
        );

    const updateTransaction =
        useTransactionStore(
            (state) =>
                state.updateTransaction,
        );

    const categories =
        useCategoryStore(
            (state) =>
                state.categories,
        );

    const loadCategories =
        useCategoryStore(
            (state) =>
                state.loadCategories,
        );

    const transaction =
        transactions.find(
            (item) =>
                item.id === transactionId,
        );

    const [type, setType] =
        useState<TransactionFormType>(
            transaction?.type ??
            'expense',
        );

    const [amount, setAmount] =
        useState(
            transaction
                ? String(transaction.amount)
                : '',
        );

    const [
        description,
        setDescription,
    ] = useState(
        transaction?.description ??
        '',
    );

    const [
        selectedCategoryId,
        setSelectedCategoryId,
    ] = useState<number | undefined>(
        transaction?.category_id,
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

    useEffect(() => {
        if (!transaction) {
            return;
        }

        setType(transaction.type);

        setAmount(
            String(transaction.amount),
        );

        setDescription(
            transaction.description ??
            '',
        );

        setSelectedCategoryId(
            transaction.category_id,
        );
    }, [transaction]);

    const filteredCategories =
        categories.filter(
            (category) =>
                category.type === type,
        );

    const handleTypeChange = (
        selectedType: TransactionFormType,
    ) => {
        setType(selectedType);
        setSelectedCategoryId(
            undefined,
        );
    };

    const handleSave = async () => {
        if (!transaction) {
            Alert.alert(
                'Error',
                'Transaksi tidak ditemukan.',
            );

            return;
        }

        const numericAmount =
            Number(
                amount.replace(/\D/g, ''),
            );

        if (
            !numericAmount ||
            numericAmount <= 0
        ) {
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
            await updateTransaction(
                transaction.id,
                {
                    type,
                    amount: numericAmount,
                    category_id:
                        selectedCategoryId,
                    description:
                        description.trim() ||
                        undefined,
                    date: transaction.date,
                },
            );

            Alert.alert(
                'Berhasil',
                'Transaksi berhasil diperbarui.',
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
                'Failed to update transaction:',
                error,
            );

            Alert.alert(
                'Error',
                'Transaksi gagal diperbarui.',
            );
        }
    };

    if (!transaction) {
        return (
            <View
                style={[
                    appStyles.container,
                    editTransactionStyles.notFoundContainer,
                ]}
            >
                <Text
                    style={appStyles.sectionTitle}
                >
                    Transaksi tidak ditemukan
                </Text>

                <Pressable
                    style={appStyles.button}
                    onPress={() =>
                        navigation.goBack()
                    }
                >
                    <Text
                        style={appStyles.buttonText}
                    >
                        Kembali
                    </Text>
                </Pressable>
            </View>
        );
    }

    return (
        <ScrollView
            contentContainerStyle={
                editTransactionStyles.container
            }
            keyboardShouldPersistTaps="handled"
        >
            <Text
                style={appStyles.sectionTitle}
            >
                Edit Transaksi
            </Text>

            {/* Transaction Type */}

            <View style={appStyles.section}>
                <Text
                    style={appStyles.summaryLabel}
                >
                    Jenis Transaksi
                </Text>

                <View
                    style={
                        editTransactionStyles.typeContainer
                    }
                >
                    <Pressable
                        style={[
                            editTransactionStyles.typeButton,
                            type === 'expense'
                                ? editTransactionStyles.typeButtonActive
                                : editTransactionStyles.typeButtonInactive,
                        ]}
                        onPress={() =>
                            handleTypeChange(
                                'expense',
                            )
                        }
                    >
                        <Text
                            style={[
                                editTransactionStyles.typeButtonText,
                                type === 'expense'
                                    ? editTransactionStyles.typeButtonTextActive
                                    : editTransactionStyles.typeButtonTextInactive,
                            ]}
                        >
                            Pengeluaran
                        </Text>
                    </Pressable>

                    <Pressable
                        style={[
                            editTransactionStyles.typeButton,
                            type === 'income'
                                ? editTransactionStyles.typeButtonActive
                                : editTransactionStyles.typeButtonInactive,
                        ]}
                        onPress={() =>
                            handleTypeChange(
                                'income',
                            )
                        }
                    >
                        <Text
                            style={[
                                editTransactionStyles.typeButtonText,
                                type === 'income'
                                    ? editTransactionStyles.typeButtonTextActive
                                    : editTransactionStyles.typeButtonTextInactive,
                            ]}
                        >
                            Pemasukan
                        </Text>
                    </Pressable>
                </View>
            </View>

            {/* Amount */}

            <View style={appStyles.section}>
                <Text
                    style={appStyles.summaryLabel}
                >
                    Nominal
                </Text>

                <TextInput
                    value={amount}
                    onChangeText={setAmount}
                    placeholder="Contoh: 25000"
                    keyboardType="numeric"
                    style={
                        editTransactionStyles.input
                    }
                />
            </View>

            {/* Category */}

            <View style={appStyles.section}>
                <Text
                    style={appStyles.summaryLabel}
                >
                    Kategori
                </Text>

                <View
                    style={
                        editTransactionStyles.categoryContainer
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
                                style={[
                                    editTransactionStyles.categoryButton,
                                    selectedCategoryId ===
                                        category.id
                                        ? editTransactionStyles.categoryButtonSelected
                                        : null,
                                ]}
                            >
                                <Text
                                    style={
                                        editTransactionStyles.categoryText
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

            {/* Description */}

            <View style={appStyles.section}>
                <Text
                    style={appStyles.summaryLabel}
                >
                    Catatan
                </Text>

                <TextInput
                    value={description}
                    onChangeText={
                        setDescription
                    }
                    placeholder="Contoh: Makan siang"
                    multiline
                    style={
                        editTransactionStyles.descriptionInput
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
                    style={appStyles.buttonText}
                >
                    Simpan Perubahan
                </Text>
            </Pressable>
        </ScrollView>
    );
}

export default EditTransactionScreen;
