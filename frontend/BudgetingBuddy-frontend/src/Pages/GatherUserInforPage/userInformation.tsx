import { useState } from "react";
import DynamicForm from "../../Components/DynamicForm/dynamicForm";
import Stepper from "../../Components/Stepper/stepper";
import frequencyVal from "../../assets/frequencyArr";
import { UseUserMoneyInfo } from "../../hooks/UseUserMoneyInfo";
import { UseUserInfo } from "../../hooks/UseUserInfo";
import { Frequency } from "../../types/UserMoneyInfoContextTypes";
import "./userinfo.scss";

const formFieldsMap: Record<
  number,
  Array<{ label: string; type: string; UniqueId: string }>
> = {
  0: [
    { label: "Name", type: "text", UniqueId: "name" },
    { label: "Email", type: "email", UniqueId: "email" },
  ],
  1: [
    { label: "Income Amount", type: "number", UniqueId: "incomeAmount" },
    {
      label: "Income Description",
      type: "text",
      UniqueId: "incomeDescription",
    },
    { label: "Frequency", type: "select", UniqueId: "incomePeriod" },
  ],
  2: [
    { label: "Expense Amount", type: "number", UniqueId: "expenseAmount" },
    {
      label: "Expense Description",
      type: "text",
      UniqueId: "expenseDescription",
    },
    { label: "Category", type: "text", UniqueId: "expenseCategory" },
    { label: "Frequency", type: "select", UniqueId: "expensePeriod" },
  ],
};

const steps = 3;

const UserInfo = () => {
  const moneyContext = UseUserMoneyInfo();
  const { setIncome, setExpenses, removeIncome, removeExpense, userMoneyInfo } =
    moneyContext;

  const userContext = UseUserInfo();
  const { setEmail, setName, userInfo } = userContext;
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const canProceedToNextStep = (): boolean => {
    switch (currentIndex) {
      case 0:
        return userInfo.email !== undefined && userInfo.name !== undefined;
      case 1:
        return userMoneyInfo.incomes.length > 0;
      case 2:
        return userMoneyInfo.expenses.length > 0;
      default:
        return false;
    }
  };

  const handleFormSubmit = (stepData: Record<string, string>) => {
    switch (currentIndex) {
      case 0:
        setEmail(stepData.email);
        setName(stepData.name);
        break;
      case 1:
        setIncome(
          Number(stepData.incomeAmount),
          stepData.incomeDescription,
          stepData.incomePeriod as Frequency
        );
        break;
      case 2:
        setExpenses(
          Number(stepData.expenseAmount),
          stepData.expenseDescription,
          stepData.expenseCategory,
          stepData.expensePeriod as Frequency
        );
        break;
      default:
        console.error("Unknown step index:", currentIndex);
    }
  };

  const handleNextStep = () => {
    if (canProceedToNextStep()) {
      setCurrentIndex((prev: number) => {
        if (currentIndex < steps - 1) {
          return prev + 1;
        }
        return prev;
      });
    } else {
      alert("Please complete the current section before proceeding.");
    }
  };

  const isNextDisabled = !canProceedToNextStep() && currentIndex < steps - 1;

  return (
    <div className="user-info-page">
      <h1>User Information</h1>
      <Stepper
        steps={steps}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />

      <DynamicForm
        formValues={formFieldsMap[currentIndex]}
        onFormSubmit={handleFormSubmit}
        options={frequencyVal}
        className="dynamic-form"
        dontClearFields={currentIndex === 0}
      />
      {currentIndex < steps - 1 && (
        <button onClick={handleNextStep} disabled={isNextDisabled}>
          Next Step
        </button>
      )}
      {currentIndex === 1 ? (
        <div className="info-container">
          <h3>Income Information</h3>
          {userMoneyInfo.incomes.length > 0 ? (
            <table className="info-table">
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Description</th>
                  <th>Frequency</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userMoneyInfo.incomes.map((income) => (
                  <tr key={income.id}>
                    <td>${income.amount.toFixed(2)}</td>
                    <td>{income.description}</td>
                    <td>{income.period}</td>
                    <td>
                      <button
                        className="remove-btn"
                        onClick={() => removeIncome(income.id)}
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="empty-message">
              No incomes added yet. Add an income using the form above.
            </p>
          )}
        </div>
      ) : currentIndex === 2 ? (
        <div className="info-container">
          <h3>Expenses Information</h3>
          {userMoneyInfo.expenses.length > 0 ? (
            <table className="info-table">
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Frequency</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userMoneyInfo.expenses.map((expense) => (
                  <tr key={expense.id}>
                    <td>${expense.amount.toFixed(2)}</td>
                    <td>{expense.description}</td>
                    <td>{expense.category}</td>
                    <td>{expense.period}</td>
                    <td>
                      <button
                        className="remove-btn"
                        onClick={() => removeExpense(expense.id)}
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="empty-message">
              No expenses added yet. Add an expense using the form above.
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default UserInfo;
