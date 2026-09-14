import { StyleSheet } from 'react-native';

export const appStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#F5F7FA',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },

  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: '#6B7280',
  },

  profileCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2563EB',
  },

  profileText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  balanceCard: {
    padding: 22,
    borderRadius: 18,
    backgroundColor: '#2563EB',
    marginBottom: 16,
  },

  balanceLabel: {
    fontSize: 14,
    color: '#DBEAFE',
  },

  balanceAmount: {
    marginTop: 8,
    fontSize: 30,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  balanceInfo: {
    marginTop: 8,
    fontSize: 12,
    color: '#DBEAFE',
  },

  summaryContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },

  summaryCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
  },

  summaryLabel: {
    fontSize: 13,
    color: '#6B7280',
  },

  summaryValue: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },

  section: {
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#111827',
  },

  sectionDescription: {
    marginTop: 6,
    lineHeight: 20,
    fontSize: 13,
    color: '#6B7280',
  },

  button: {
    marginTop: 16,
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    backgroundColor: '#111827',
  },

  buttonPressed: {
    opacity: 0.7,
  },

  buttonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  transactionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
  },

  transactionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },

  transactionDescription: {
    marginTop: 4,
    fontSize: 12,
    color: '#6B7280',
  },

  transactionAmount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#DC2626',
  },
    sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  linkText: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: '700',
    color: '#2563EB',
  },

  budgetSummaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  budgetSpent: {
    marginTop: 6,
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },

  budgetSummaryRight: {
    alignItems: 'flex-end',
  },

  budgetTotal: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },

  progressContainer: {
    marginTop: 16,
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

  progressPercentageWarning: {
    color: '#DC2626',
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

  progressBarWarning: {
    backgroundColor: '#DC2626',
  },

  budgetRemainingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
  },

  budgetRemaining: {
    fontSize: 14,
    fontWeight: '700',
    color: '#16A34A',
  },

  budgetRemainingWarning: {
    color: '#DC2626',
  },

  secondaryButton: {
    marginTop: 14,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#DBEAFE',
  },

  secondaryButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2563EB',
  },
  incomeValue: {
  color: '#16A34A',
},

expenseValue: {
  color: '#DC2626',
},

incomeAmount: {
  color: '#16A34A',
},

expenseAmount: {
  color: '#DC2626',
},

transactionInfo: {
  flex: 1,
  paddingRight: 12,
},
});