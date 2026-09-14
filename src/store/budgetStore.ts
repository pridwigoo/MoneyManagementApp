import { create } from 'zustand';

import {
  Budget,
  BudgetProgress,
  CreateBudget,
} from '../types/budget';

import {
  createBudget,
  getBudgets,
  getBudgetProgress,
  updateBudget,
  deleteBudget,
} from '../database/budgetRepository';

interface BudgetStore {
  budgets: Budget[];
  budgetProgress: BudgetProgress[];
  isLoading: boolean;

  loadBudgets: () => Promise<void>;
  loadBudgetProgress: () => Promise<void>;

  addBudget: (
    budget: CreateBudget,
  ) => Promise<void>;

  updateBudget: (
    id: number,
    budget: CreateBudget,
  ) => Promise<void>;

  removeBudget: (
    id: number,
  ) => Promise<void>;
}

const loadAllBudgetData = async (
  set: (
    state: Partial<BudgetStore>,
  ) => void,
) => {
  const budgets = await getBudgets();

  const budgetProgress =
    await Promise.all(
      budgets.map((budget) =>
        getBudgetProgress(budget),
      ),
    );

  set({
    budgets,
    budgetProgress,
  });
};

export const useBudgetStore =
  create<BudgetStore>((set) => ({
    budgets: [],
    budgetProgress: [],
    isLoading: false,

    loadBudgets: async () => {
      try {
        set({
          isLoading: true,
        });

        await loadAllBudgetData(set);
      } catch (error) {
        console.error(
          'Failed to load budgets:',
          error,
        );

        throw error;
      } finally {
        set({
          isLoading: false,
        });
      }
    },

    loadBudgetProgress: async () => {
      try {
        const budgets =
          await getBudgets();

        const budgetProgress =
          await Promise.all(
            budgets.map((budget) =>
              getBudgetProgress(budget),
            ),
          );

        set({
          budgetProgress,
        });
      } catch (error) {
        console.error(
          'Failed to load budget progress:',
          error,
        );

        throw error;
      }
    },

    addBudget: async (budget) => {
      try {
        set({
          isLoading: true,
        });

        await createBudget(budget);

        await loadAllBudgetData(set);
      } catch (error) {
        console.error(
          'Failed to add budget:',
          error,
        );

        throw error;
      } finally {
        set({
          isLoading: false,
        });
      }
    },

    updateBudget: async (
      id,
      budget,
    ) => {
      try {
        set({
          isLoading: true,
        });

        await updateBudget(
          id,
          budget,
        );

        await loadAllBudgetData(set);
      } catch (error) {
        console.error(
          'Failed to update budget:',
          error,
        );

        throw error;
      } finally {
        set({
          isLoading: false,
        });
      }
    },

    removeBudget: async (id) => {
      try {
        set({
          isLoading: true,
        });

        await deleteBudget(id);

        await loadAllBudgetData(set);
      } catch (error) {
        console.error(
          'Failed to delete budget:',
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