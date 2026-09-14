import { StyleSheet } from 'react-native';

export const editTransactionStyles =
  StyleSheet.create({
    container: {
      padding: 20,
    },

    typeContainer: {
      flexDirection: 'row',
      gap: 10,
      marginTop: 10,
    },

    typeButton: {
      flex: 1,
      padding: 14,
      borderRadius: 12,
    },

    typeButtonActive: {
      backgroundColor: '#111827',
    },

    typeButtonInactive: {
      backgroundColor: '#FFFFFF',
    },

    typeButtonText: {
      textAlign: 'center',
      fontWeight: '700',
    },

    typeButtonTextActive: {
      color: '#FFFFFF',
    },

    typeButtonTextInactive: {
      color: '#111827',
    },

    input: {
      marginTop: 10,
      padding: 14,
      borderRadius: 12,
      backgroundColor: '#FFFFFF',
      fontSize: 18,
    },

    categoryContainer: {
      marginTop: 10,
      gap: 8,
    },

    categoryButton: {
      padding: 14,
      borderRadius: 12,
      backgroundColor: '#FFFFFF',
    },

    categoryButtonSelected: {
      backgroundColor: '#DBEAFE',
    },

    categoryText: {
      fontWeight: '600',
    },

    descriptionInput: {
      marginTop: 10,
      padding: 14,
      borderRadius: 12,
      backgroundColor: '#FFFFFF',
      minHeight: 80,
      textAlignVertical: 'top',
    },

    notFoundContainer: {
      justifyContent: 'center',
    },
  });