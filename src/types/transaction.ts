export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: number;
  type: TransactionType;
  amount: number;
  category_id?: number;
  description?: string;
  date: string;
  created_at: string;
  updated_at: string;
}

export interface CreateTransaction {
  type: TransactionType;
  amount: number;
  category_id?: number;
  description?: string;
  date: string;
}