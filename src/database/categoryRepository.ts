import { db } from './database';

import {
  Category,
  CreateCategory,
} from '../types/category';

export const createCategory = async (
  category: CreateCategory,
): Promise<void> => {
  const now = new Date().toISOString();

  await db.execute(
    `
      INSERT INTO categories (
        name,
        type,
        icon,
        created_at
      )
      VALUES (?, ?, ?, ?);
    `,
    [
      category.name,
      category.type,
      category.icon ?? null,
      now,
    ],
  );
};

export const getCategories = async (): Promise<Category[]> => {
  const result = await db.execute(`
    SELECT
      id,
      name,
      type,
      icon,
      created_at
    FROM categories
    ORDER BY name ASC;
  `);

  // result.rows sudah langsung berbentuk array
  return (result.rows ?? []) as unknown as Category[];
};

export const deleteCategory = async (
  id: number,
): Promise<void> => {
  await db.execute(
    `
      DELETE FROM categories
      WHERE id = ?;
    `,
    [id],
  );
};