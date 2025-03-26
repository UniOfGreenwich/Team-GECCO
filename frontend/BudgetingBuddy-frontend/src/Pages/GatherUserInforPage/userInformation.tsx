import { useState } from "react";
import DynamicForm from "../../Components/DynamicForm/dynamicForm";
import Stepper from "../../Components/Stepper/stepper";
import frequencyVal from "../../assets/frequencyArr";
// import { UseUserMoneyInfo } from "../../hooks/UseUserMoneyInfo";

const formFieldsMap: Record<number, Array<{label: string, type: string, UniqueId: string}>> = {
    0: [
      { label: "Name", type: "text", UniqueId: "name" },
      { label: "Email", type: "email", UniqueId: "email" },
    ],
    1: [
      { label: "Income Amount", type: "number", UniqueId: "incomeAmount" },
      { label: "Income Description", type: "text", UniqueId: "incomeDescription" },
      { label: "Frequency", type: "select", UniqueId: "incomePeriod" },
    ],
    2: [
      { label: "Expense Amount", type: "number", UniqueId: "expenseAmount" },
      { label: "Expense Description", type: "text", UniqueId: "expenseDescription" },
      { label: "Category", type: "text", UniqueId: "expenseCategory" },
      { label: "Frequency", type: "select", UniqueId: "expensePeriod" }, 
    ],
    3: [
      { label: "Budget Amount", type: "number", UniqueId: "budgetAmount" },
      { label: "Budget Name", type: "text", UniqueId: "budgetName" },
      { label: "Frequency", type: "select", UniqueId: "budgetPeriod" }, 
    ]
  };

const steps = 4;

const UserInfo = () => {
    // const moneyContext = UseUserMoneyInfo()
    // const {setIncome, setExpenses, removeBudget, removeExpense, userMoneyInfo} = moneyContext
    
  const [currentIndex, setCurrentIndex] = useState<number>(0);


  const handleFormSubmit = (formData: Record<string, string>) => {
    console.log("Form submitted with data:", formData);
  };

  const handleNextStep = () => {
    setCurrentIndex((prev: number) => {
        if(currentIndex < steps - 1) {
            return prev + 1;
        }
        return prev
    });
  };

  return (
    <div>
      <h1>User Information</h1>
      <Stepper
        steps={steps}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      ></Stepper>
      <DynamicForm formValues={formFieldsMap[currentIndex]} onFormSubmit={handleFormSubmit} options={frequencyVal}/>
      <button onClick={handleNextStep}></button>
    </div>
  );
};

export default UserInfo;
