export type CategoryType = 'income' | 'expense';

export interface Category {
  id: number;
  name: string;
  type: CategoryType;
  icon?: string;
  created_at: string;
}

export interface CreateCategory {
  name: string;
  type: CategoryType;
  icon?: string;
}