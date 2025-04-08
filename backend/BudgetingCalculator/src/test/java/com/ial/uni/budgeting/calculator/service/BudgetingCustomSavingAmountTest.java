package com.ial.uni.budgeting.calculator.service;

import com.ial.uni.budgeting.calculator.model.BudgetingUserRequest;
import com.ial.uni.budgeting.calculator.model.response.BudgetingCustomSavingResponse;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class BudgetingCustomSavingAmountTest {

    BudgetingCustomSavingAmount service = new BudgetingCustomSavingAmount();

    @Test
    void testSuccessfulResponseWithValidInputs_CustomSaving(){
        BudgetingUserRequest request = new BudgetingUserRequest();
        request.setCustomSavingAmount(5000.0);
        request.setCustomSavingAmountDuration(12);

        BudgetingCustomSavingResponse response = service.calculateCustomSavingAmount(request);

        assertEquals(416.66, response.getCustomSavingMonthlyPayment());
    }
}
