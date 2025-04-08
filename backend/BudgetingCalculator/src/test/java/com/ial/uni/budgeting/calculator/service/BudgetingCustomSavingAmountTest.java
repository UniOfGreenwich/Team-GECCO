package com.ial.uni.budgeting.calculator.service;

import com.ial.uni.budgeting.calculator.exception.BudgetingException;
import com.ial.uni.budgeting.calculator.exception.ErrorCode;
import com.ial.uni.budgeting.calculator.model.BudgetingUserRequest;
import com.ial.uni.budgeting.calculator.model.response.BudgetingUserCustomSavingResponse;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class BudgetingCustomSavingAmountTest {

    BudgetingCustomSavingAmount service = new BudgetingCustomSavingAmount();

    @Test
    void testSuccessfulResponseWithValidInputs_CustomSaving(){
        BudgetingUserRequest request = new BudgetingUserRequest();
        request.setCustomSavingAmount(5000.0);
        request.setCustomSavingAmountDuration(12);

        BudgetingUserCustomSavingResponse response = service.calculateCustomSavingAmount(request);

        assertEquals(416.66, response.getCustomSavingMonthlyPayment());
    }

    @Test
    void testResponseWithInvalidCustomSavingAmount_CustomSaving(){
        BudgetingUserRequest request = new BudgetingUserRequest();
        request.setCustomSavingAmount(null);
        request.setCustomSavingAmountDuration(12);

        BudgetingException exception = assertThrows(BudgetingException.class, () -> FieldValidation.validateCustomSavingRequiredFields(request));

        assertEquals(ErrorCode.CS_001, exception.getErrorCode());
        assertEquals("Custom saving amount must be a valid positive number, and not empty.", exception.getMessage());
    }

    @Test
    void testResponseWithInvalidCustomSavingDuration_CustomSaving(){
        BudgetingUserRequest request = new BudgetingUserRequest();
        request.setCustomSavingAmount(5000.0);
        request.setCustomSavingAmountDuration(0);

        BudgetingException exception = assertThrows(BudgetingException.class, () -> FieldValidation.validateCustomSavingRequiredFields(request));

        assertEquals(ErrorCode.CS_002, exception.getErrorCode());
        assertEquals("Customer saving duration must be bigger than 0.", exception.getMessage());
    }
}
