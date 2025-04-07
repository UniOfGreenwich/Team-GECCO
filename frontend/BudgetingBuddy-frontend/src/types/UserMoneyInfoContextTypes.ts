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

  // this is needed as since we dont know what reposne we will get from miss Mahers backend we need to be able to accept multiple addiotnal properties to be used in the dashbaprd
  [key: string]: any;
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
  setExpenses: (
    amount: number,
    description: string,
    category: string,
    period: Frequency
  ) => void;
  setBudget: (
    amount: number,
    name: string,
    period: Frequency,
    additionalProps?: any
  ) => void;
  removeIncome: (id: string) => void;
  removeExpense: (id: string) => void;
  removeBudget: (id: string) => void;
  resetBudgetDashboard: () => void;
}

export type {
  Income,
  Expense,
  Budget,
  UserMoneyInfo,
  UserMoneyInfoContextType,
  Frequency,
};
