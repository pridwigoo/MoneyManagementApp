import { StyleSheet } from 'react-native';

export const transactionHistoryStyles =
  StyleSheet.create({
    container: {
      padding: 20,
    },

    description: {
      marginBottom: 16,
    },

    filterContainer: {
      flexDirection: 'row',
      gap: 8,
      marginBottom: 20,
    },

    filterButton: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 10,
    },

    filterButtonActive: {
      backgroundColor: '#111827',
    },

    filterButtonInactive: {
      backgroundColor: '#FFFFFF',
    },

    filterButtonText: {
      textAlign: 'center',
      fontWeight: '700',
    },

    filterButtonTextActive: {
      color: '#FFFFFF',
    },

    filterButtonTextInactive: {
      color: '#111827',
    },

    transactionCard: {
      marginBottom: 10,
      padding: 16,
      borderRadius: 16,
      backgroundColor: '#FFFFFF',
    },

    transactionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },

    transactionInfo: {
      flex: 1,
      paddingRight: 12,
    },

    transactionDate: {
      marginTop: 6,
    },

    transactionAmount: {
      fontSize: 14,
      fontWeight: '700',
    },

    deleteContainer: {
      alignItems: 'flex-end',
      marginTop: 10,
    },

    deleteButton: {
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 8,
      backgroundColor: '#FEE2E2',
    },

    deleteText: {
      fontSize: 12,
      fontWeight: '700',
      color: '#DC2626',
    },
  });