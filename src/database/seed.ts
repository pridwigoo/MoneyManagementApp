import { db } from './database';

const defaultCategories = [
  {
    name: 'Makanan',
    type: 'expense',
    icon: '🍔',
  },
  {
    name: 'Transportasi',
    type: 'expense',
    icon: '🚗',
  },
  {
    name: 'Belanja',
    type: 'expense',
    icon: '🛒',
  },
  {
    name: 'Tagihan',
    type: 'expense',
    icon: '💡',
  },
  {
    name: 'Hiburan',
    type: 'expense',
    icon: '🎮',
  },
  {
    name: 'Kesehatan',
    type: 'expense',
    icon: '💊',
  },
  {
    name: 'Lainnya',
    type: 'expense',
    icon: '📦',
  },
  {
    name: 'Gaji',
    type: 'income',
    icon: '💰',
  },
  {
    name: 'Bonus',
    type: 'income',
    icon: '🎁',
  },
  {
    name: 'Freelance',
    type: 'income',
    icon: '💻',
  },
  {
    name: 'Investasi',
    type: 'income',
    icon: '📈',
  },
  {
    name: 'Lainnya',
    type: 'income',
    icon: '📦',
  },
];

export const seedDefaultCategories = async () => {
  try {
    const result = await db.execute(`
      SELECT COUNT(*) as count
      FROM categories;
    `);

    // result.rows langsung diakses sebagai array: result.rows?.[0]
    const row = result.rows?.[0] as { count?: number | string } | undefined;
    const count = Number(row?.count ?? 0);

    if (count > 0) {
      return;
    }

    for (const category of defaultCategories) {
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
          category.icon,
          new Date().toISOString(),
        ],
      );
    }

    console.log(
      'Default categories created',
    );
  } catch (error) {
    console.error(
      'Failed to seed default categories:',
      error,
    );

    throw error;
  }
};