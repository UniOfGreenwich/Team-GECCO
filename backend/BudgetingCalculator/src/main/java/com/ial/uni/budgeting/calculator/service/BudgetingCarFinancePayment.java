package com.ial.uni.budgeting.calculator.service;

import com.ial.uni.budgeting.calculator.model.BudgetingUserRequest;
import com.ial.uni.budgeting.calculator.model.response.BudgetingUserCarFinanceResponse;
import org.apache.poi.ss.formula.functions.FinanceLib;
import org.springframework.stereotype.Service;

import static com.ial.uni.budgeting.calculator.util.FinanceUtil.truncateDownToTwoDecimals;

@Service
public class BudgetingCarFinancePayment {

    public BudgetingUserCarFinanceResponse calculateCarFinancePayment(BudgetingUserRequest request){
        BudgetingUserCarFinanceResponse response = new BudgetingUserCarFinanceResponse();

        double loanAmount = request.getCarSellingPrice() - request.getCarDeposit();
        double monthlyInterestRate = request.getCarApr() / 100 / 12;
        double term = request.getCarTerm();

        double carMonthlyPayment = calculateMonthlyPayment(monthlyInterestRate, loanAmount, term);

        double totalAmountPayable = carMonthlyPayment * term + request.getCarDeposit();
        response.setTotalCarFinanceAmountPayable(truncateDownToTwoDecimals(totalAmountPayable));

        double totalInterestDue = carMonthlyPayment * term - loanAmount;
        response.setTotalCarInterestDue(truncateDownToTwoDecimals(totalInterestDue));

        response.setMonthlyCarFinancePayment(truncateDownToTwoDecimals(carMonthlyPayment));

        return response;
    }

    private double calculateMonthlyPayment(
            double monthlyApr, double loanAmount, double term) {
        return -FinanceLib.pmt(monthlyApr, term, loanAmount, -0.0, false);
    }

}
