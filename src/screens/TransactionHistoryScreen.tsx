import React, {
    useEffect,
    useMemo,
    useState,
} from 'react';

import {
    Alert,
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
    useCategoryStore,
} from '../store/categoryStore';

import {
    useTransactionStore,
} from '../store/transactionStore';

import { appStyles } from '../styles/appStyles';

import {
    transactionHistoryStyles,
} from '../styles/transactionHistoryStyles';

type Props = NativeStackScreenProps<
    RootStackParamList,
    'TransactionHistory'
>;

type FilterType =
    | 'all'
    | 'income'
    | 'expense';

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

export function TransactionHistoryScreen({
    navigation,
}: Props) {
    const [filter, setFilter] =
        useState<FilterType>('all');

    const transactions =
        useTransactionStore(
            (state) => state.transactions,
        );

    const loadTransactions =
        useTransactionStore(
            (state) =>
                state.loadTransactions,
        );

    const removeTransaction =
        useTransactionStore(
            (state) =>
                state.removeTransaction,
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
        const loadData = async () => {
            try {
                await Promise.all([
                    loadTransactions(),
                    loadCategories(),
                ]);
            } catch (error) {
                console.error(
                    'Failed to load transaction history:',
                    error,
                );
            }
        };

        loadData();
    }, [
        loadTransactions,
        loadCategories,
    ]);

    const filteredTransactions =
        useMemo(() => {
            if (filter === 'all') {
                return transactions;
            }

            return transactions.filter(
                (transaction) =>
                    transaction.type === filter,
            );
        }, [
            transactions,
            filter,
        ]);

    const getCategory = (
        categoryId?: number,
    ) => {
        return categories.find(
            (category) =>
                category.id === categoryId,
        );
    };

    const handleDelete = (
        id: number,
    ) => {
        Alert.alert(
            'Hapus Transaksi',
            'Apakah Anda yakin ingin menghapus transaksi ini?',
            [
                {
                    text: 'Batal',
                    style: 'cancel',
                },
                {
                    text: 'Hapus',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await removeTransaction(id);

                            Alert.alert(
                                'Berhasil',
                                'Transaksi berhasil dihapus.',
                            );
                        } catch (error) {
                            console.error(
                                'Failed to delete transaction:',
                                error,
                            );

                            Alert.alert(
                                'Error',
                                'Gagal menghapus transaksi.',
                            );
                        }
                    },
                },
            ],
        );
    };

    return (
        <ScrollView
            contentContainerStyle={
                transactionHistoryStyles.container
            }
        >
            {/* Header */}

            <Text
                style={appStyles.sectionTitle}
            >
                Riwayat Transaksi
            </Text>

            <Text
                style={[
                    appStyles.sectionDescription,
                    transactionHistoryStyles.description,
                ]}
            >
                Semua transaksi yang tersimpan
                di database.
            </Text>

            {/* Filter */}

            <View
                style={
                    transactionHistoryStyles.filterContainer
                }
            >
                {/* Semua */}

                <Pressable
                    onPress={() =>
                        setFilter('all')
                    }
                    style={[
                        transactionHistoryStyles.filterButton,
                        filter === 'all'
                            ? transactionHistoryStyles.filterButtonActive
                            : transactionHistoryStyles.filterButtonInactive,
                    ]}
                >
                    <Text
                        style={[
                            transactionHistoryStyles.filterButtonText,
                            filter === 'all'
                                ? transactionHistoryStyles.filterButtonTextActive
                                : transactionHistoryStyles.filterButtonTextInactive,
                        ]}
                    >
                        Semua
                    </Text>
                </Pressable>

                {/* Pemasukan */}

                <Pressable
                    onPress={() =>
                        setFilter('income')
                    }
                    style={[
                        transactionHistoryStyles.filterButton,
                        filter === 'income'
                            ? transactionHistoryStyles.filterButtonActive
                            : transactionHistoryStyles.filterButtonInactive,
                    ]}
                >
                    <Text
                        style={[
                            transactionHistoryStyles.filterButtonText,
                            filter === 'income'
                                ? transactionHistoryStyles.filterButtonTextActive
                                : transactionHistoryStyles.filterButtonTextInactive,
                        ]}
                    >
                        Masuk
                    </Text>
                </Pressable>

                {/* Pengeluaran */}

                <Pressable
                    onPress={() =>
                        setFilter('expense')
                    }
                    style={[
                        transactionHistoryStyles.filterButton,
                        filter === 'expense'
                            ? transactionHistoryStyles.filterButtonActive
                            : transactionHistoryStyles.filterButtonInactive,
                    ]}
                >
                    <Text
                        style={[
                            transactionHistoryStyles.filterButtonText,
                            filter === 'expense'
                                ? transactionHistoryStyles.filterButtonTextActive
                                : transactionHistoryStyles.filterButtonTextInactive,
                        ]}
                    >
                        Keluar
                    </Text>
                </Pressable>
            </View>

            {/* Transaction List */}

            {filteredTransactions.length ===
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
                filteredTransactions.map(
                    (transaction) => {
                        const category =
                            getCategory(
                                transaction.category_id,
                            );

                        return (
                            <Pressable
                                key={transaction.id}
                                onPress={() =>
                                    navigation.navigate(
                                        'EditTransaction',
                                        {
                                            transactionId:
                                                transaction.id,
                                        },
                                    )
                                }
                                style={
                                    transactionHistoryStyles.transactionCard
                                }
                            >
                                <View
                                    style={
                                        transactionHistoryStyles.transactionRow
                                    }
                                >
                                    {/* Transaction Information */}

                                    <View
                                        style={
                                            transactionHistoryStyles.transactionInfo
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

                                        <Text
                                            style={
                                                appStyles.transactionDescription
                                            }
                                        >
                                            {transaction.description ||
                                                'Tanpa catatan'}
                                        </Text>

                                        <Text
                                            style={[
                                                appStyles.transactionDescription,
                                                transactionHistoryStyles.transactionDate,
                                            ]}
                                        >
                                            {formatDate(
                                                transaction.date,
                                            )}
                                        </Text>
                                    </View>

                                    {/* Amount */}

                                    <Text
                                        style={[
                                            transactionHistoryStyles.transactionAmount,
                                            {
                                                color:
                                                    transaction.type ===
                                                        'income'
                                                        ? '#16A34A'
                                                        : '#DC2626',
                                            },
                                        ]}
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

                                {/* Delete Button */}

                                <View
                                    style={
                                        transactionHistoryStyles.deleteContainer
                                    }
                                >
                                    <Pressable
                                        onPress={() =>
                                            handleDelete(
                                                transaction.id,
                                            )
                                        }
                                        style={
                                            transactionHistoryStyles.deleteButton
                                        }
                                    >
                                        <Text
                                            style={
                                                transactionHistoryStyles.deleteText
                                            }
                                        >
                                            Hapus
                                        </Text>
                                    </Pressable>
                                </View>
                            </Pressable>
                        );
                    },
                )
            )}

            {/* Add Transaction */}

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
                    style={appStyles.buttonText}
                >
                    + Tambah Transaksi
                </Text>
            </Pressable>
        </ScrollView>
    );
}

export default TransactionHistoryScreen;
