import { db } from './database';

import {
  Budget,
  CreateBudget,
  BudgetProgress,
} from '../types/budget';

export const createBudget = async (
  budget: CreateBudget,
): Promise<void> => {
  const now = new Date().toISOString();

  await db.execute(
    `
      INSERT INTO budgets (
        category_id,
        amount,
        month,
        year,
        created_at
      )
      VALUES (?, ?, ?, ?, ?);
    `,
    [
      budget.category_id,
      budget.amount,
      budget.month,
      budget.year,
      now,
    ],
  );
};

export const getBudgets = async (): Promise<Budget[]> => {
  const result = await db.execute(`
    SELECT
      id,
      category_id,
      amount,
      month,
      year,
      created_at
    FROM budgets
    ORDER BY year DESC, month DESC;
  `);

  // result.rows diakses sebagai array direct
  return (result.rows ?? []) as unknown as Budget[];
};

export const getBudgetByCategoryAndMonth = async (
  categoryId: number,
  month: number,
  year: number,
): Promise<Budget | undefined> => {
  const result = await db.execute(
    `
      SELECT
        id,
        category_id,
        amount,
        month,
        year,
        created_at
      FROM budgets
      WHERE category_id = ?
        AND month = ?
        AND year = ?
      LIMIT 1;
    `,
    [
      categoryId,
      month,
      year,
    ],
  );

  // Ambil elemen pertama dari result.rows lalu lakukan type casting
  const row = result.rows?.[0];
  return row ? (row as unknown as Budget) : undefined;
};

export const updateBudget = async (
  id: number,
  budget: CreateBudget,
): Promise<void> => {
  await db.execute(
    `
      UPDATE budgets
      SET
        category_id = ?,
        amount = ?,
        month = ?,
        year = ?
      WHERE id = ?;
    `,
    [
      budget.category_id,
      budget.amount,
      budget.month,
      budget.year,
      id,
    ],
  );
};

export const deleteBudget = async (
  id: number,
): Promise<void> => {
  await db.execute(
    `
      DELETE FROM budgets
      WHERE id = ?;
    `,
    [id],
  );
};

export const getBudgetProgress =
  async (
    budget: Budget,
  ): Promise<BudgetProgress> => {
    const result = await db.execute(
      `
        SELECT
          COALESCE(
            SUM(amount),
            0
          ) AS spent
        FROM transactions
        WHERE type = 'expense'
          AND category_id = ?
          AND strftime('%m', date) = ?
          AND strftime('%Y', date) = ?;
      `,
      [
        budget.category_id,
        String(budget.month).padStart(
          2,
          '0',
        ),
        String(budget.year),
      ],
    );

    // result.rows langsung diakses sebagai array tanpa ._array
    const row = result.rows?.[0] as { spent?: number | string } | undefined;

    const spent = Number(row?.spent ?? 0);
    const remaining = budget.amount - spent;
    const percentage =
      budget.amount > 0
        ? (spent / budget.amount) * 100
        : 0;

    return {
      budget,
      spent,
      remaining,
      percentage,
    };
  };