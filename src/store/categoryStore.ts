import { create } from 'zustand';

import {
  Category,
  CreateCategory,
} from '../types/category';

import {
  createCategory,
  getCategories,
  deleteCategory,
} from '../database/categoryRepository';

interface CategoryStore {
  categories: Category[];
  isLoading: boolean;

  loadCategories: () => Promise<void>;

  addCategory: (
    category: CreateCategory,
  ) => Promise<void>;

  removeCategory: (
    id: number,
  ) => Promise<void>;
}

export const useCategoryStore =
  create<CategoryStore>((set) => ({
    categories: [],
    isLoading: false,

    loadCategories: async () => {
      try {
        set({
          isLoading: true,
        });

        const categories =
          await getCategories();

        set({
          categories,
        });
      } catch (error) {
        console.error(
          'Failed to load categories:',
          error,
        );

        throw error;
      } finally {
        set({
          isLoading: false,
        });
      }
    },

    addCategory: async (category) => {
      try {
        set({
          isLoading: true,
        });

        await createCategory(category);

        const categories =
          await getCategories();

        set({
          categories,
        });
      } catch (error) {
        console.error(
          'Failed to add category:',
          error,
        );

        throw error;
      } finally {
        set({
          isLoading: false,
        });
      }
    },

    removeCategory: async (id) => {
      try {
        set({
          isLoading: true,
        });

        await deleteCategory(id);

        const categories =
          await getCategories();

        set({
          categories,
        });
      } catch (error) {
        console.error(
          'Failed to delete category:',
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