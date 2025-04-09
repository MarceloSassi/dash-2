import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Transaction, TransactionType, BankStats } from '../types/bank';
import { useBetStore } from './useBetStore';

interface BankState {
  transactions: Transaction[];
  balance: number;
}

interface BankActions {
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  clearTransactions: () => void;
  registerBetPlaced: (amount: number) => void;
  registerBetWon: (returnedAmount: number) => void;
  registerBetDeletedOrLost: (stakedAmount: number, status: 'Pending' | 'Lost' | 'Won') => void;
  getStats: () => BankStats;
}

type BankStore = BankState & BankActions;

export const useBankStore = create<BankStore>()(
  persist(
    (set, get) => ({
      transactions: [],
      balance: 0,
      addTransaction: (transaction) => {
        const newTransaction = {
          ...transaction,
          id: crypto.randomUUID(),
        };
        set((state) => {
          const newBalance = transaction.type === 'Deposit'
            ? state.balance + transaction.amount
            : state.balance - transaction.amount;
          return {
            transactions: [...state.transactions, newTransaction],
            balance: newBalance,
          };
        });
      },
      deleteTransaction: (id) => {
        set((state) => {
          const transactionToDelete = state.transactions.find(t => t.id === id);
          if (!transactionToDelete) return {};

          const balanceAdjustment = transactionToDelete.type === 'Deposit'
            ? -transactionToDelete.amount
            : +transactionToDelete.amount;

          return {
            transactions: state.transactions.filter((t) => t.id !== id),
            balance: state.balance + balanceAdjustment,
          };
        });
      },
      clearTransactions: () => {
        set({ transactions: [], balance: 0 });
      },
      registerBetPlaced: (amount) => {
        set((state) => ({ balance: state.balance - amount }));
      },
      registerBetWon: (returnedAmount) => {
        set((state) => ({ balance: state.balance + returnedAmount }));
      },
      registerBetDeletedOrLost: (stakedAmount, status) => {
        if (status === 'Pending') {
          set((state) => ({ balance: state.balance + stakedAmount }));
        }
      },
      getStats: () => {
        const transactions = get().transactions;
        const currentBalance = get().balance;

        const totalDeposits = transactions
          .filter((t) => t.type === 'Deposit')
          .reduce((sum, t) => sum + t.amount, 0);

        const totalWithdrawals = transactions
          .filter((t) => t.type === 'Withdrawal')
          .reduce((sum, t) => sum + t.amount, 0);

        const betStoreState = useBetStore.getState();
        const betProfitStats = typeof betStoreState.getProfitStats === 'function' 
                                 ? betStoreState.getProfitStats() 
                                 : { totalBetProfit: 0 };

        return {
          totalDeposits,
          totalWithdrawals,
          totalBalance: currentBalance,
          totalProfit: betProfitStats.totalBetProfit,
        };
      },
    }),
    {
      name: 'bank-storage',
    }
  )
); 