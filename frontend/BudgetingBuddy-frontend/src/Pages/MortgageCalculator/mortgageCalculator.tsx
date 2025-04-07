import { useEffect, useState } from "react";
import Calculator from "../../Components/Calculator/calculator";
import UseGenericApiCall from "../../hooks/useGenericApiCall";
import { UseUserMoneyInfo } from "../../hooks/UseUserMoneyInfo";

const URL = "http://localhost:8080/calculateMortgageBudget";
const method = "POST";

const headers = {
  "Content-Type": "application/json",
};

function MortgageCalculatorPage() {
  const moneyInfo = UseUserMoneyInfo();
  const { setBudget, removeBudget, userMoneyInfo } = moneyInfo;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [mortgageValues, setMortgageValues] = useState<Record<string, string>>({
    housePrice: "",
    savingMonthlyAmount: "",
  });

//   const mortgageValArr = userMoneyInfo.budgets.filter(
//     (budget) => budget.name === "mortgagePayment"
//   );

  const reqBody = {
    housePrice: parseFloat(mortgageValues.housePrice) || 0,
    availableBudgetingAmount:
      parseFloat(mortgageValues.savingMonthlyAmount) || 0,
  };
  const { fetchData, data } = UseGenericApiCall(URL, method, headers, reqBody);

  useEffect(() => {
    setBudget(
      Number(mortgageValues.savingMonthlyAmount),
      "mortgagePayment",
      "monthly",
      data
    );
  }, [data]);

  const setMortgageVals = (value: string, stateProperty: string) => {
    setMortgageValues((prev) => {
      return {
        ...prev,
        [stateProperty]: value,
      };
    });
  };

  const calcConfig = [
    {
      stepTitle: "House Price",
      stepInfo: "Enter the price of the house you're looking to buy",
      inputFields: [
        {
          label: "House Price (£)",
          placeholder: "Enter house price",
          value: mortgageValues.housePrice,
          onChange: (value: string) => setMortgageVals(value, "housePrice"),
          type: "number",
          required: true,
        },
      ],
    },
    {
      stepTitle: "Monthly Budget",
      stepInfo: "How much can you save monthly towards your mortgage?",
      inputFields: [
        {
          label: "Monthly Savings (£)",
          placeholder: "Enter amount",
          value: mortgageValues.savingMonthlyAmount,
          onChange: (value: string) =>
            setMortgageVals(value, "savingMonthlyAmount"),
          type: "number",
          required: true,
        },
      ],
      onStepComplete: () => {
        fetchData();
      },
      buttonName: "Submit",
    },
  ];
  const steps = calcConfig.length + 1;

//   const handleRestart = () => {
//     setCurrentIndex(0);
//     setMortgageValues({
//       housePrice: "",
//       savingMonthlyAmount: "",
//     });
//   };

  return (
    <div>
      <Calculator
        calcConfig={calcConfig}
        steps={steps}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </div>
  );
}

export default MortgageCalculatorPage;