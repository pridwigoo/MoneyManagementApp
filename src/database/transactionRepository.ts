import { db } from './database';
import {
  CreateTransaction,
  Transaction,
} from '../types/transaction';

import { TransactionSummary } from '../types/dashboard';

export const createTransaction = async (
  transaction: CreateTransaction,
): Promise<void> => {
  const now = new Date().toISOString();

  await db.execute(
    `
      INSERT INTO transactions (
        type,
        amount,
        category_id,
        description,
        date,
        created_at,
        updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?);
    `,
    [
      transaction.type,
      transaction.amount,
      transaction.category_id ?? null,
      transaction.description ?? null,
      transaction.date,
      now,
      now,
    ],
  );
};

export const getTransactions = async (): Promise<Transaction[]> => {
  const result = await db.execute(`
    SELECT
      id,
      type,
      amount,
      category_id,
      description,
      date,
      created_at,
      updated_at
    FROM transactions
    ORDER BY date DESC;
  `);

  // result.rows sudah langsung berbentuk array dari hasil query.
  // Gunakan type casting (as unknown as Transaction[]) jika tipe data kolomnya cocok.
  return (result.rows ?? []) as unknown as Transaction[];
};

export const deleteTransaction = async (
  id: number,
): Promise<void> => {
  await db.execute(
    `
      DELETE FROM transactions
      WHERE id = ?;
    `,
    [id],
  );
};

export const getTransactionSummary =
  async (): Promise<TransactionSummary> => {
    const result = await db.execute(`
      SELECT
        COALESCE(
          SUM(
            CASE
              WHEN type = 'income'
              THEN amount
              ELSE 0
            END
          ),
          0
        ) AS total_income,

        COALESCE(
          SUM(
            CASE
              WHEN type = 'expense'
              THEN amount
              ELSE 0
            END
          ),
          0
        ) AS total_expense

      FROM transactions;
    `);

    // result.rows langsung diakses sebagai array tanpa ._array
    const row = result.rows?.[0] as
      | { total_income?: number | string; total_expense?: number | string }
      | undefined;

    const totalIncome = Number(row?.total_income ?? 0);
    const totalExpense = Number(row?.total_expense ?? 0);

    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
    };
  };

  export const updateTransaction = async (
  id: number,
  transaction: CreateTransaction,
): Promise<void> => {
  const now = new Date().toISOString();

  await db.execute(
    `
      UPDATE transactions
      SET
        type = ?,
        amount = ?,
        category_id = ?,
        description = ?,
        date = ?,
        updated_at = ?
      WHERE id = ?;
    `,
    [
      transaction.type,
      transaction.amount,
      transaction.category_id ?? null,
      transaction.description ?? null,
      transaction.date,
      now,
      id,
    ],
  );
};