type PeriodType = "daily" | "weekly" | "monthly" | "biweekly";

interface Income {
    id: string;
    amount: number;
    description: string;
    period: PeriodType;
  }
  
  interface Expense {
    id: string;
    amount: number;
    description: string;
    category: string;
    period: PeriodType;
  }
  
  interface Budget {
    id: string;
    name: string;
    amount: number;
    period: PeriodType;
  }
  
  interface UserMoneyInfo {
    remainingBalance: number;
    totalExpenses: number;
    totalIncome: number;
    incomes: Income[];
    expenses: Expense[];
    budgets: Budget[];
  }
  
  interface UserMoneyInfoContextType {
    userMoneyInfo: UserMoneyInfo;
    setIncome: (amount: number, description: string, period: PeriodType) => void;
    setExpenses: (amount: number, description: string, category: string, period: PeriodType) => void;
    setBudget: (amount: number, name: string,period: PeriodType) => void;
    removeIncome: (id: string) => void;
    removeExpense: (id: string) => void;
    removeBudget: (id: string) => void;
    resetBudgetDashboard: () => void;
  }

export type {Income, Expense, Budget, UserMoneyInfo, UserMoneyInfoContextType, PeriodType};