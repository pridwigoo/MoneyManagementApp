import { StyleSheet } from 'react-native';

export const budgetStyles = StyleSheet.create({
  container: {
    padding: 20,
  },

  monthContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },

  monthButton: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },

  monthButtonText: {
    textAlign: 'center',
    fontWeight: '700',
  },

  monthDisplay: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  monthText: {
    fontSize: 16,
    fontWeight: '700',
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

  amountInput: {
    marginTop: 10,
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    fontSize: 18,
  },

  budgetCard: {
    marginTop: 10,
  },
    progressContainer: {
    marginTop: 14,
  },

  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  progressLabel: {
    fontSize: 12,
    color: '#6B7280',
  },

  progressPercentage: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111827',
  },

  progressBackground: {
    height: 10,
    marginTop: 8,
    borderRadius: 5,
    backgroundColor: '#E5E7EB',
    overflow: 'hidden',
  },

  progressBar: {
    height: '100%',
    borderRadius: 5,
    backgroundColor: '#2563EB',
  },

  progressWarning: {
    backgroundColor: '#DC2626',
  },

  budgetDetailContainer: {
    marginTop: 12,
    gap: 4,
  },

  budgetDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  budgetDetailLabel: {
    fontSize: 12,
    color: '#6B7280',
  },

  budgetDetailValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111827',
  },

  budgetRemainingNegative: {
    color: '#DC2626',
  },
});