import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import DynamicForm from '../../Components/DynamicForm/dynamicForm';
import Stepper from '../../Components/Stepper/stepper';
import frequencyVal from '../../assets/frequencyArr';
import { UseUserMoneyInfo } from '../../hooks/UseUserMoneyInfo';
import { UseUserInfo } from '../../hooks/UseUserInfo';
import { Frequency } from '../../types/UserMoneyInfoContextTypes';

import './userinfo.scss';

const buttonNameInfo = {
  step1: 'Register Details',
  step2: 'Add Entry',
};

const steps = 3;
const stepTitles = ['User Details', 'Income Setup', 'Expense Setup'];

const UserInfo = () => {
  const moneyContext = UseUserMoneyInfo();
  const { setIncome, setExpenses, removeIncome, removeExpense, userMoneyInfo } =
    moneyContext;
  const userContext = UseUserInfo();
  const { setEmail, setName, userInfo, setPassword } = userContext;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const navigate = useNavigate();

  const handleProceedToCalculators = () => {
    navigate('/selection');
  };

  const handleBackToWelcome = () => {
    navigate('/');
  };

  const formFieldsMap: Record<
    number,
    Array<{ label: string; type: string; UniqueId: string; value?: string }>
  > = {
    0: [
      { label: 'Name', type: 'text', UniqueId: 'name', },
      {
        label: 'Email',
        type: 'email',
        UniqueId: 'email',
      },
      {
        label: 'Password',
        type: 'password',
        UniqueId: 'password',
      },
    ],
    1: [
      { label: 'Income Amount', type: 'number', UniqueId: 'incomeAmount' },
      {
        label: 'Income Description',
        type: 'text',
        UniqueId: 'incomeDescription',
      },
      { label: 'Frequency', type: 'select', UniqueId: 'incomePeriod' },
    ],
    2: [
      { label: 'Expense Amount', type: 'number', UniqueId: 'expenseAmount' },
      {
        label: 'Expense Description',
        type: 'text',
        UniqueId: 'expenseDescription',
      },
      { label: 'Category', type: 'text', UniqueId: 'expenseCategory' },
      { label: 'Frequency', type: 'select', UniqueId: 'expensePeriod' },
    ],
  };

  const canProceedToNextStep = (): boolean => {
    switch (currentIndex) {
      case 0:
        return !!userInfo.name && !!userInfo.email && !!userInfo.password;
      case 1:
        return userMoneyInfo.incomes.length > 0;
      case 2:
        return true;
      default:
        return false;
    }
  };

  const handleFormSubmit = (stepData: Record<string, string>) => {
    switch (currentIndex) {
      case 0:
        setEmail(stepData.email);
        setName(stepData.name);
        setPassword(stepData.password);
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
        console.error('Unknown step index:', currentIndex);
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
      alert('Please complete the current section before proceeding.');
    }
  };

  const isNextDisabled = !canProceedToNextStep() && currentIndex < steps - 1;
  const isProceedDisabled =
    !canProceedToNextStep() && currentIndex === steps - 1;

  const renderStepContent = () => {
    const currentFormFields = formFieldsMap[currentIndex];
    const currentButtonName =
      currentIndex === 0 ? buttonNameInfo.step1 : buttonNameInfo.step2;

    if (currentIndex === 0) {
      return (
        <DynamicForm
          formValues={currentFormFields}
          onFormSubmit={handleFormSubmit}
          options={frequencyVal}
          className='dynamic-form step-0-form'
          dontClearFields={currentIndex === 0}
          buttonName={currentButtonName}
        />
      );
    }

    if (currentIndex === 1 || currentIndex === 2) {
      const isIncomeStep = currentIndex === 1;
      const data = isIncomeStep
        ? userMoneyInfo.incomes
        : userMoneyInfo.expenses;
      const titleText = isIncomeStep
        ? 'Income Information'
        : 'Expenses Information';
      const emptyMessage = isIncomeStep
        ? 'No incomes added yet. Add an income using the form.'
        : 'No expenses added yet. Add an expense using the form.';

      return (
        <div className='step-content-wrapper'>
          <DynamicForm
            formValues={currentFormFields}
            onFormSubmit={handleFormSubmit}
            options={frequencyVal}
            className='dynamic-form'
            dontClearFields={false}
            buttonName={currentButtonName}
          />
          <div className='info-container'>
            <h3>{titleText}</h3>
            {data.length > 0 ? (
              <div className='table-scroll-wrapper'>
                <table className='info-table'>
                  <thead>
                    <tr>
                      <th>Amount</th>
                      <th>Description</th>
                      {!isIncomeStep && <th>Category</th>}
                      <th>Frequency</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isIncomeStep
                      ? userMoneyInfo.incomes.map((income) => (
                          <tr key={income.id}>
                            <td data-label='Amount'>
                              ${income.amount.toFixed(2)}
                            </td>
                            <td data-label='Description'>
                              {income.description}
                            </td>
                            <td data-label='Frequency'>{income.period}</td>
                            <td data-label='Action'>
                              <button
                                className='remove-btn'
                                onClick={() => removeIncome(income.id)}
                                aria-label={`Remove income: ${income.description}`}
                              >
                                ✕
                              </button>
                            </td>
                          </tr>
                        ))
                      : userMoneyInfo.expenses.map((expense) => (
                          <tr key={expense.id}>
                            <td data-label='Amount'>
                              ${expense.amount.toFixed(2)}
                            </td>
                            <td data-label='Description'>
                              {expense.description}
                            </td>
                            <td data-label='Category'>{expense.category}</td>
                            <td data-label='Frequency'>{expense.period}</td>
                            <td data-label='Action'>
                              <button
                                className='remove-btn'
                                onClick={() => removeExpense(expense.id)}
                                aria-label={`Remove expense: ${expense.description}`}
                              >
                                ✕
                              </button>
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className='empty-message'>{emptyMessage}</p>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className='user-info-page'>
      <h1>Setup Your Budget Profile</h1>
      <div className='stepper-container'>
        <Stepper
          steps={steps}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          stepTitles={stepTitles}
        />
      </div>
      {renderStepContent()}
      <div className='navigation-buttons'>
        <button className='back-button' onClick={handleBackToWelcome}>
          ← Back
        </button>
        {currentIndex < steps - 1 && (
          <button
            onClick={handleNextStep}
            disabled={isNextDisabled}
            className='next-button'
          >
            Next Step
          </button>
        )}
        {currentIndex === steps - 1 && (
          <button
            onClick={handleProceedToCalculators}
            disabled={isProceedDisabled}
            className='proceed-button'
          >
            Proceed
          </button>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
