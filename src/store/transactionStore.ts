import { create } from 'zustand';

import {
  CreateTransaction,
  Transaction,
} from '../types/transaction';

import {
  TransactionSummary,
} from '../types/dashboard';

import {
  createTransaction,
  getTransactions,
  deleteTransaction,
  getTransactionSummary,
  updateTransaction,
} from '../database/transactionRepository';

interface TransactionStore {
  transactions: Transaction[];
  summary: TransactionSummary;
  isLoading: boolean;

  loadTransactions: () => Promise<void>;
  loadSummary: () => Promise<void>;

  addTransaction: (
    transaction: CreateTransaction,
  ) => Promise<void>;

  removeTransaction: (
    id: number,
  ) => Promise<void>;

  updateTransaction: (
    id: number,
    transaction: CreateTransaction,
  ) => Promise<void>;
}

const emptySummary: TransactionSummary = {
  totalIncome: 0,
  totalExpense: 0,
  balance: 0,
};

export const useTransactionStore =
  create<TransactionStore>((set) => ({
    transactions: [],
    summary: emptySummary,
    isLoading: false,

    loadTransactions: async () => {
      try {
        set({
          isLoading: true,
        });

        const transactions =
          await getTransactions();

        set({
          transactions,
        });
      } catch (error) {
        console.error(
          'Failed to load transactions:',
          error,
        );

        throw error;
      } finally {
        set({
          isLoading: false,
        });
      }
    },

    loadSummary: async () => {
      try {
        const summary =
          await getTransactionSummary();

        set({
          summary,
        });
      } catch (error) {
        console.error(
          'Failed to load transaction summary:',
          error,
        );

        throw error;
      }
    },

    addTransaction: async (
      transaction,
    ) => {
      try {
        set({
          isLoading: true,
        });

        await createTransaction(
          transaction,
        );

        const transactions =
          await getTransactions();

        const summary =
          await getTransactionSummary();

        set({
          transactions,
          summary,
        });
      } catch (error) {
        console.error(
          'Failed to add transaction:',
          error,
        );

        throw error;
      } finally {
        set({
          isLoading: false,
        });
      }
    },

    removeTransaction: async (id) => {
      try {
        set({
          isLoading: true,
        });

        await deleteTransaction(id);

        const transactions =
          await getTransactions();

        const summary =
          await getTransactionSummary();

        set({
          transactions,
          summary,
        });
      } catch (error) {
        console.error(
          'Failed to delete transaction:',
          error,
        );

        throw error;
      } finally {
        set({
          isLoading: false,
        });
      }
    },

    updateTransaction: async (
      id,
      transaction,
    ) => {
      try {
        set({
          isLoading: true,
        });

        await updateTransaction(
          id,
          transaction,
        );

        const transactions =
          await getTransactions();

        const summary =
          await getTransactionSummary();

        set({
          transactions,
          summary,
        });
      } catch (error) {
        console.error(
          'Failed to update transaction:',
          error,
        );

        throw error;
      } finally {
        set({
          isLoading: false,
        });
      }
    },
  }));