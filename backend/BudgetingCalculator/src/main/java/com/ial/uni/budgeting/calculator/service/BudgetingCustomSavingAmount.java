package com.ial.uni.budgeting.calculator.service;

import com.ial.uni.budgeting.calculator.model.BudgetingUserRequest;
import com.ial.uni.budgeting.calculator.model.response.BudgetingCustomSavingResponse;
import org.springframework.stereotype.Service;

import static com.ial.uni.budgeting.calculator.util.FinanceUtil.truncateDownToTwoDecimals;

@Service
public class BudgetingCustomSavingAmount {

    public BudgetingCustomSavingResponse calculateCustomSavingAmount(BudgetingUserRequest request) {
        BudgetingCustomSavingResponse response = new BudgetingCustomSavingResponse();

        double savingAmount = request.getCustomSavingAmount();
        double savingDuration = request.getCustomSavingAmountDuration();

        double customSavingMonthlyAmount = truncateDownToTwoDecimals(savingAmount / savingDuration);
        response.setCustomSavingMonthlyPayment(customSavingMonthlyAmount);

        return response;
    }
}
