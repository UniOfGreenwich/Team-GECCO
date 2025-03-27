import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { v4 as uuidv4 } from 'uuid';
import {Frequency, UserMoneyInfoContextType, UserMoneyInfo} from '../types/UserMoneyInfoContextTypes'


const UserMoneyInfoContext = createContext<UserMoneyInfoContextType | undefined>(undefined);

interface UserMoneyInfoProviderProps {
  children: ReactNode;
}

export const UserMoneyInfoProvider: React.FC<UserMoneyInfoProviderProps> = ({
  children,
}) => {
  const [userMoneyInfo, setUserMoneyInfo] = useState<UserMoneyInfo>({
    remainingBalance: 0,
    totalExpenses: 0,
    totalIncome: 0,
    totalBudgets: 0,
    incomes: [],
    expenses: [],
    budgets: [],
  });

  useEffect(() => {
    console.log(`usermoney info:`);
    console.log(userMoneyInfo);
  }, [userMoneyInfo])
  // set income
  const setIncome = useCallback(
    (amount: number, description: string, period: Frequency) => {
      setUserMoneyInfo((prev) => {
        return {
          ...prev,
          incomes: [
            ...prev.incomes,
            {
              id: uuidv4(),
              amount: amount,
              description: description,
              period: period,
            },
          ],
        };
      });
    },
    [setUserMoneyInfo]
  );

  // set expenses
  const setExpenses = useCallback(
    (
      amount: number,
      description: string,
      category: string,
      period: Frequency
    ) => {
      setUserMoneyInfo((prev) => {
        return {
          ...prev,
          expenses: [
            ...prev.expenses,
            {
              id: uuidv4(),
              amount: amount,
              description: description,
              category: category,
              period: period,
            },
          ],
        };
      });
    },
    [setUserMoneyInfo]
  );

  const setBudget = useCallback(
      (
        amount: number,
        name: string,
        period: Frequency
      ) => {
          setUserMoneyInfo((prev) => {
              return {
                  ...prev,
                  budgets: [
                      ...prev.budgets,
                      {
                          id: uuidv4(),
                          amount: amount,
                          name: name,
                          period: period,
                      },
                  ],
              };
          });
      },
      [setUserMoneyInfo]
    );


  // Remove functions
  const removeIncome = useCallback((id: string) => {
    setUserMoneyInfo((prev) => ({
      ...prev,
      incomes: prev.incomes.filter(income => income.id !== id)
    }));
  }, [setUserMoneyInfo]);

  const removeExpense = useCallback((id: string) => {
    setUserMoneyInfo((prev) => ({
      ...prev,
      expenses: prev.expenses.filter(expense => expense.id !== id)
    }));
  }, [setUserMoneyInfo]);

  const removeBudget = useCallback((id: string) => {
    setUserMoneyInfo((prev) => ({
      ...prev,
      budgets: prev.budgets.filter(budget => budget.id !== id)
    }));
  }, [setUserMoneyInfo]);



  // helfer function that will noramilise anything to be a monthly charge instead of daily weekly or bi weekly
  const normalizeToMonthly = useCallback(
    (item: { amount: number; period: Frequency }) => {
      let amount = item.amount;

      if (item.period === "weekly") {
        amount = item.amount * 4;
      } else if (item.period === "daily") {
        amount = item.amount * 30;
      } else if (item.period === "biweekly") {
        amount = item.amount * 2;
      }

      return amount;
    },
    []
  );

  // calculate remaning balance, total income, and total expenses, and total budgets

  const calculatedTotalIncome = useMemo(() => {
    return userMoneyInfo.incomes.reduce((total, income) => {
      return total + normalizeToMonthly(income);
    }, 0);
  }, [userMoneyInfo.incomes, normalizeToMonthly]);

  const calculatedTotalExpenses = useMemo(() => {
    return userMoneyInfo.expenses.reduce((total, expense) => {
      return total + normalizeToMonthly(expense);
    }, 0);
  }, [userMoneyInfo.expenses, normalizeToMonthly]);

  const calculatedTotalBudgets = useMemo(() => {
    return userMoneyInfo.budgets.reduce((total, budget) => {
      return total + normalizeToMonthly(budget);
    }, 0);
  }, [userMoneyInfo.budgets, normalizeToMonthly]);


  useEffect(() => {
    setUserMoneyInfo((prev) => ({
      ...prev,
      totalIncome: calculatedTotalIncome,
      totalExpenses: calculatedTotalExpenses,
      totalBudgets: calculatedTotalBudgets,
      remainingBalance: calculatedTotalIncome - calculatedTotalExpenses - calculatedTotalBudgets,
    }));
  }, [calculatedTotalIncome, calculatedTotalExpenses, calculatedTotalBudgets]);

  // Clear all information , this will be used when creating a diferent dashboard. // need to think about changing it to first send the data to the DB then clear so can be retrived
  const resetBudgetDashboard = useCallback(() => {
    setUserMoneyInfo({
      remainingBalance: 0,
      totalExpenses: 0,
      totalIncome: 0,
      totalBudgets: 0,
      incomes: [],
      expenses: [],
      budgets: [],
    });
  }, []);

  const value = useMemo(
    () => ({
      userMoneyInfo,
      setIncome,
      setExpenses,
      resetBudgetDashboard,
      setBudget,
      removeIncome,
      removeExpense,
      removeBudget,
    }),
    [userMoneyInfo, setIncome, setExpenses, resetBudgetDashboard, setBudget, 
     removeIncome, removeExpense, removeBudget]
  );

  return (
    <UserMoneyInfoContext.Provider value={value}>
      {children}
    </UserMoneyInfoContext.Provider>
  );
};

export {UserMoneyInfoContext}