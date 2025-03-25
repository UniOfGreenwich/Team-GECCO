type Frequency = "daily" | "weekly" | "monthly" | "biweekly";

interface Income {
    id: string;
    amount: number;
    description: string;
    period: Frequency;
  }
  
  interface Expense {
    id: string;
    amount: number;
    description: string;
    category: string;
    period: Frequency;
  }
  
  interface Budget {
    id: string;
    name: string;
    amount: number;
    period: Frequency;
  }
  
  interface UserMoneyInfo {
    remainingBalance: number;
    totalExpenses: number;
    totalIncome: number;
    totalBudgets: number;
    incomes: Income[];
    expenses: Expense[];
    budgets: Budget[];
  }
  
  interface UserMoneyInfoContextType {
    userMoneyInfo: UserMoneyInfo;
    setIncome: (amount: number, description: string, period: Frequency) => void;
    setExpenses: (amount: number, description: string, category: string, period: Frequency) => void;
    setBudget: (amount: number, name: string,period: Frequency) => void;
    removeIncome: (id: string) => void;
    removeExpense: (id: string) => void;
    removeBudget: (id: string) => void;
    resetBudgetDashboard: () => void;
  }

export type {Income, Expense, Budget, UserMoneyInfo, UserMoneyInfoContextType, Frequency};