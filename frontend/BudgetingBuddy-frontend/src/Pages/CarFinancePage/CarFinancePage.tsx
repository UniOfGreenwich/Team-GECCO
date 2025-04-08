import { useEffect, useState } from "react";
import Calculator from "../../Components/Calculator/calculator";
import UseGenericApiCall from "../../hooks/useGenericApiCall";
import { UseUserMoneyInfo } from "../../hooks/UseUserMoneyInfo";
import { useNavigate } from "react-router-dom";
import "./car.scss";

const URL = "http://localhost:8080/calculateCarFinancePayment";
const method = "POST";

const headers = {
  "Content-Type": "application/json",
};

interface data {
  monthlyCarFinancePayment: number;
  totalCarFinanceAmountPayable: number;
  totalCarInterestDue: number;
}

function CarFinancePage() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [carValues, setCarValues] = useState<Record<string, string>>({
    carSellingPrice: "",
    carDeposit: "",
    carApr: "",
    carTerm: "",
  });
  const setCarVals = (value: string, stateProperty: string) => {
    setCarValues((prev) => {
      return {
        ...prev,
        [stateProperty]: value,
      };
    });
  };
  const calcConfig = [
    {
      stepTitle: "Car Price",
      stepInfo: "Enter the selling price of the car you want to buy",
      inputFields: [
        {
          label: "Car Price (£)",
          placeholder: "Enter car selling price",
          value: carValues.carSellingPrice,
          onChange: (value: string) => setCarVals(value, "carSellingPrice"),
          type: "number",
          required: true,
        },
      ],
    },
    {
      stepTitle: "Car Deposit",
      stepInfo: "How much deposit can you put down?",
      inputFields: [
        {
          label: "Deposit Amount (£)",
          placeholder: "Enter deposit amount",
          value: carValues.carDeposit,
          onChange: (value: string) => setCarVals(value, "carDeposit"),
          type: "number",
          required: true,
        },
      ],
    },
    {
      stepTitle: "Interest Rate",
      stepInfo: "What is the Annual Percentage Rate (APR) for the loan?",
      inputFields: [
        {
          label: "APR (%)",
          placeholder: "Enter APR",
          value: carValues.carApr,
          onChange: (value: string) => setCarVals(value, "carApr"),
          type: "number",
          required: true,
        },
      ],
    },
    {
      stepTitle: "Loan Term",
      stepInfo: "Select the length of your car loan in months",
      inputFields: [
        {
          label: "Term (Months)",
          placeholder: "Enter loan term",
          value: carValues.carTerm,
          onChange: (value: string) => setCarVals(value, "carTerm"),
          type: "number",
          required: true,
        },
      ],
      onStepComplete: () => {
        fetchData();
      },
      buttonName: "Calculate",
    },
  ];

  const reqBody = {
    carSellingPrice: parseFloat(carValues.carSellingPrice) || 0,
    carDeposit: parseFloat(carValues.carDeposit) || 0,
    carApr: parseFloat(carValues.carApr) || 0,
    carTerm: parseInt(carValues.carTerm) || 0,
  };
  const moneyContext = UseUserMoneyInfo();
  const { setBudget, removeBudget, userMoneyInfo } = moneyContext;

  const { fetchData, data, loading, error } = UseGenericApiCall<data>(
    URL,
    method,
    headers,
    reqBody
  );

  useEffect(() => {
    if (data && typeof data.monthlyCarFinancePayment === "number") {
      const budgetData = {
        ...data,
        ...reqBody,
      };
      setBudget(
        data.monthlyCarFinancePayment,
        "carFinance",
        "monthly",
        budgetData
      );
    }
  }, [data]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleResetCalculator = () => {
    setCurrentIndex(0);
    setCarValues({
      carSellingPrice: "",
      carDeposit: "",
      carApr: "",
      carTerm: "",
    });
  };

  const carFinancePayments = userMoneyInfo.budgets.filter(
    (budget) => budget.name === "carFinance"
  );

  const steps = calcConfig.length;
  return (
    <div className="car-finance-page">
      {currentIndex !== steps && (
        <Calculator
          calcConfig={calcConfig}
          steps={steps}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      )}
      {currentIndex === steps && (
        <div className="car-finance-table-container">
          <button className="back-button" onClick={handleResetCalculator}>
            ← Back to Calculator
          </button>
          <h2>Your Car Finance Plan</h2>

          {carFinancePayments.length > 0 ? (
            <div className="table-wrapper">
              <table className="car-finance-table">
                <thead>
                  <tr>
                    <th>Monthly Payment</th>
                    <th>Total Payable</th>
                    <th>Total Interest</th>
                    <th>Car Price</th>
                    <th>Deposit</th>
                    <th>Loan length (months)</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {carFinancePayments.map((payment) => (
                    <tr key={payment.id}>
                      <td>£{payment.amount.toLocaleString()}</td>
                      <td>
                        {payment.totalCarFinanceAmountPayable
                          ? `£${payment.totalCarFinanceAmountPayable.toLocaleString()}`
                          : "N/A"}
                      </td>
                      <td>
                        {payment.totalCarInterestDue
                          ? `£${payment.totalCarInterestDue.toLocaleString()}`
                          : "N/A"}
                      </td>
                      <td>
                        {payment.carSellingPrice
                          ? `£${payment.carSellingPrice.toLocaleString()}`
                          : "N/A"}
                      </td>
                      <td>
                        {payment.carDeposit
                          ? `£${payment.carDeposit.toLocaleString()}`
                          : "N/A"}
                      </td>
                      <td>
                        {payment.carTerm
                          ? `${payment.carTerm.toLocaleString()} months`
                          : "N/A"}
                      </td>
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
              <button onClick={() => navigate("/dashboard")}>
                go to dashboard
              </button>
            </div>
          ) : (
            <div className="no-data-message">
              <p>
                No car finance payments found. Please submit your information
                using the calculator.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CarFinancePage;
