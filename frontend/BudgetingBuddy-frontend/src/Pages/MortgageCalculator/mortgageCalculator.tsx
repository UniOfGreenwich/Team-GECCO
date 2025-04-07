import { useEffect, useState } from "react";
import Calculator from "../../Components/Calculator/calculator";
import UseGenericApiCall from "../../hooks/useGenericApiCall";
import { UseUserMoneyInfo } from "../../hooks/UseUserMoneyInfo";
import "./mortgageCalculator.scss";

const URL = "http://localhost:8080/calculateMortgageBudget";
const method = "POST";

const headers = {
  "Content-Type": "application/json",
};

interface data {
  depositAmount: number;
  depositPercentage: number;
  savingDuration: number;
}

function MortgageCalculatorPage() {
  const moneyInfo = UseUserMoneyInfo();
  const { setBudget, removeBudget, userMoneyInfo } = moneyInfo;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [mortgageValues, setMortgageValues] = useState<Record<string, string>>({
    housePrice: "",
    savingMonthlyAmount: "",
  });

  const mortgagePayments = userMoneyInfo.budgets.filter(
    (budget) => budget.name === "mortgagePayment"
  );

  const reqBody = {
    housePrice: parseFloat(mortgageValues.housePrice) || 0,
    availableBudgetingAmount:
      parseFloat(mortgageValues.savingMonthlyAmount) || 0,
  };
  const { fetchData, data } = UseGenericApiCall<data>(
    URL,
    method,
    headers,
    reqBody
  );

  useEffect(() => {
    if (data) {
      setBudget(
        Number(mortgageValues.savingMonthlyAmount),
        "mortgagePayment",
        "monthly",
        data
      );
    }
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

  const handleResetCalculator = () => {
    setCurrentIndex(0);
    setMortgageValues({
      housePrice: "",
      savingMonthlyAmount: "",
    });
  };

  return (
    <div className="mortgage-calculator-page">
      {currentIndex !== steps - 1 && (
        <Calculator
          calcConfig={calcConfig}
          steps={steps}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      )}
      {currentIndex === steps - 1 && (
        <div className="mortgage-table-container">
          <button className="back-button" onClick={handleResetCalculator}>
            ← Back to Calculator
          </button>
          <h2>Your Mortgage Savings Plan</h2>

          {mortgagePayments.length > 0 ? (
            <div className="table-wrapper">
              <table className="mortgage-table">
                <thead>
                  <tr>
                    <th>Monthly Savings</th>
                    <th>Deposit Amount</th>
                    <th>Deposit Percentage</th>
                    <th>Saving Duration (Months)</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {mortgagePayments.map((payment) => (
                    <tr key={payment.id}>
                      <td>£{payment.amount.toLocaleString()}</td>
                      <td>
                        {payment.depositAmount
                          ? `£${payment.depositAmount.toLocaleString()}`
                          : "N/A"}
                      </td>
                      <td>
                        {payment.depositPercentage
                          ? `${payment.depositPercentage}%`
                          : "N/A"}
                      </td>
                      <td>{payment.savingDuration || "N/A"}</td>
                      <td>
                        <button
                          onClick={() => removeBudget(payment.id)}
                          className="remove-button"
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="no-data-message">
              <p>
                No mortgage payments found. Please submit your information using
                the calculator.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MortgageCalculatorPage;
