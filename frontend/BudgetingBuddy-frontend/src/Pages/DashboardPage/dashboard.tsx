import React, { useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { UserInformationContext } from "../../store/UserInformationStore";
import { UserMoneyInfoContext } from "../../store/UserMoneyInfoStore";
import "./dashboard.scss";

const financeTips = [
  "Track your spending for a month to see where your money really goes.",
  "Create a monthly budget and review it regularly.",
  "Build an emergency fund covering 3-6 months of essential expenses.",
  "Pay off high-interest debt like credit cards as quickly as possible.",
  "Automate your savings and investments each month.",
  "Review your subscriptions and cancel any you don't use.",
  "Set clear financial goals (e.g., saving for a down payment, retirement).",
  "Cook at home more often to save on dining out.",
  "Check your credit report at least once a year for errors.",
  "Consider using cashback or rewards credit cards responsibly.",
  "Increase your retirement contributions whenever you get a raise.",
  "Plan major purchases in advance to avoid impulse buys.",
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const userInfoContext = useContext(UserInformationContext);
  const moneyInfoContext = useContext(UserMoneyInfoContext);

  const [selectedTip, setSelectedTip] = useState<string | null>(null);

  const handleRefreshTip = useCallback(() => {
    if (financeTips.length <= 1) {
      setSelectedTip(financeTips.length === 1 ? financeTips[0] : null);
      return;
    }
    setSelectedTip((currentTip) => {
      let newTip = currentTip;
      while (newTip === currentTip) {
        const randomIndex = Math.floor(Math.random() * financeTips.length);
        newTip = financeTips[randomIndex];
      }
      return newTip;
    });
  }, []);

  useEffect(() => {
    if (financeTips.length > 0) {
      const randomIndex = Math.floor(Math.random() * financeTips.length);
      setSelectedTip(financeTips[randomIndex]);
    }
  }, []);

  if (!userInfoContext || !moneyInfoContext) {
    return <div>Loading context data...</div>;
  }

  const { userInfo } = userInfoContext;
  const { userMoneyInfo } = moneyInfoContext;

  const recentIncomes = [...userMoneyInfo.incomes].slice(-3).reverse();
  const recentExpenses = [...userMoneyInfo.expenses].slice(-3).reverse();

  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString("en-GB", {
      style: "currency",
      currency: "GBP",
    });
  };

  const displayValueOrNull = (
    value: number,
    sourceArray: unknown[]
  ): string => {
    return sourceArray.length > 0 ? formatCurrency(value) : "NULL";
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <button className="back-button" onClick={() => navigate("/signin")}>
          ← Back to Sign In
        </button>
        <h1>Dashboard</h1>
        <p>Welcome back, {userInfo.name || "NULL"}!</p>
      </header>

      <section className="dashboard-main">
        <div className="summary-section">
          <div className="title-button-container">
            <h2>Financial Snapshot (nomralised to Monthly)</h2>
            <button className="create-button" onClick={() => navigate("/selection")}>
              create a budget
            </button>
          </div>
          <div className="summary-cards">
            <div className="card income-card">
              <h3>Total Income</h3>
              <p>
                {displayValueOrNull(
                  userMoneyInfo.totalIncome,
                  userMoneyInfo.incomes
                )}
              </p>
            </div>
            <div className="card expense-card">
              <h3>Total Expenses</h3>
              <p>
                {displayValueOrNull(
                  userMoneyInfo.totalExpenses,
                  userMoneyInfo.expenses
                )}
              </p>
            </div>
            <div className="card budget-card">
              <h3>Total Budgets</h3>
              <p>
                {displayValueOrNull(
                  userMoneyInfo.totalBudgets,
                  userMoneyInfo.budgets
                )}
              </p>
            </div>
            <div
              className={`card balance-card ${
                userMoneyInfo.remainingBalance >= 0 ? "positive" : "negative"
              }`}
            >
              <h3>Remaining Balance</h3>
              <p>{formatCurrency(userMoneyInfo.remainingBalance)}</p>
            </div>
          </div>
        </div>

        <div className="details-section">
          <div className="recent-activity-section">
            <h2>Recent Activity</h2>
            <div className="activity-lists">
              <div className="income-list">
                <h3>Latest Income</h3>
                {recentIncomes.length > 0 ? (
                  <ul>
                    {recentIncomes.map((income) => (
                      <li key={income.id}>
                        {income.description || "Income"}: +
                        {formatCurrency(income.amount)} ({income.period})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No income recorded yet.</p>
                )}
              </div>
              <div className="expense-list">
                <h3>Latest Expenses</h3>
                {recentExpenses.length > 0 ? (
                  <ul>
                    {recentExpenses.map((expense) => (
                      <li key={expense.id}>
                        {expense.description || "Expense"} (
                        {expense.category || "N/A"}): -
                        {formatCurrency(expense.amount)} ({expense.period})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No expenses recorded yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {selectedTip && (
          <section className="finance-tip-section">
            <div className="tip-header">
              <h3>💡 Quick Tip</h3>
              <button
                className="refresh-tip-button"
                onClick={handleRefreshTip}
                aria-label="Get new tip"
              >
                🔄
              </button>
            </div>
            <p>{selectedTip}</p>
          </section>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
