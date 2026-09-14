export interface Budget {
  id: number;
  category_id: number;
  amount: number;
  month: number;
  year: number;
  created_at: string;
}

export interface CreateBudget {
  category_id: number;
  amount: number;
  month: number;
  year: number;
}

export interface BudgetProgress {
  budget: Budget;
  spent: number;
  remaining: number;
  percentage: number;
}