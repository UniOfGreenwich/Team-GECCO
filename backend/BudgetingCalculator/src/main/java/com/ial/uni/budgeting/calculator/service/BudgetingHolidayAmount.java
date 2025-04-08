package com.ial.uni.budgeting.calculator.service;

import com.ial.uni.budgeting.calculator.model.BudgetingUserRequest;
import com.ial.uni.budgeting.calculator.model.response.BudgetingUserHolidayResponse;
import org.springframework.stereotype.Service;

import static com.ial.uni.budgeting.calculator.util.FinanceUtil.*;

@Service
public class BudgetingHolidayAmount {

    public BudgetingUserHolidayResponse calculateHolidayBudget(BudgetingUserRequest request){
        BudgetingUserHolidayResponse response = new BudgetingUserHolidayResponse();

        if (request.getHolidaySpendingMoney() == null || request.getHolidaySpendingMoney() < 0) {
            request.setHolidaySpendingMoney(0.0);
        }
        if (request.getHolidayDepositAmount() == null || request.getHolidayDepositAmount() < 0) {
            request.setHolidayDepositAmount(0.0);
        }

        double holidayLoanAmount = request.getHolidayPriceAmount() + request.getHolidaySpendingMoney() - request.getHolidayDepositAmount();
        double holidayMonthlyPayment = holidayLoanAmount / request.getHolidaySavingDuration();

        response.setHolidaySavingDuration(request.getHolidaySavingDuration());

        double totalHolidayAmountSaved = truncateUpToZeroDecimals(holidayMonthlyPayment * request.getHolidaySavingDuration());
        response.setTotalHolidayAmountSaved(totalHolidayAmountSaved);
        response.setHolidayMonthlySaving(truncateDownToTwoDecimals(holidayMonthlyPayment));

        return response;
    }

}
