package com.ial.uni.budgeting.calculator.service;

import com.ial.uni.budgeting.calculator.exception.BudgetingException;
import com.ial.uni.budgeting.calculator.exception.ErrorCode;
import com.ial.uni.budgeting.calculator.model.BudgetingUserRequest;
import com.ial.uni.budgeting.calculator.model.response.BudgetingUserCarFinanceResponse;
import org.junit.jupiter.api.Test;

import javax.annotation.processing.ProcessingEnvironment;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class BudgetingCarFinancePaymentTest {

    BudgetingCarFinancePayment service = new BudgetingCarFinancePayment();

    @Test
    void testSuccessfulResponseWithValidInputs_CarFinance() {
        BudgetingUserRequest request = new BudgetingUserRequest();
        request.setCarSellingPrice(30000.0);
        request.setCarDeposit(5000.0);
        request.setCarApr(5.0);
        request.setCarTerm(60);

        BudgetingUserCarFinanceResponse response = service.calculateCarFinancePayment(request);

        assertEquals(471.78, response.getMonthlyCarFinancePayment());
        assertEquals(33306.85, response.getTotalCarFinanceAmountPayable());
        assertEquals(3306.85, response.getTotalCarInterestDue());
    }

    @Test
    void testExceptionForInvalidSellingPrice_CarFinance() {
        BudgetingUserRequest request = new BudgetingUserRequest();
        request.setCarSellingPrice(null);
        request.setCarDeposit(5000.0);
        request.setCarApr(5.0);
        request.setCarTerm(60);

        BudgetingException exception = assertThrows(BudgetingException.class, () -> FieldValidation.validateCarFinanceRequiredFields(request));

        assertEquals(ErrorCode.CF_001, exception.getErrorCode());
        assertEquals("Car selling price must be a valid positive number, and not empty.", exception.getMessage());
    }

    @Test
    void testExceptionForInvalidCarDeposit_CarFinance() {
        BudgetingUserRequest request = new BudgetingUserRequest();
        request.setCarSellingPrice(30000.0);
        request.setCarDeposit(null);
        request.setCarApr(5.0);
        request.setCarTerm(60);

        BudgetingException exception = assertThrows(BudgetingException.class, () -> FieldValidation.validateCarFinanceRequiredFields(request));

        assertEquals(ErrorCode.CF_002, exception.getErrorCode());
        assertEquals("Car deposit must be bigger than 0, and not empty.", exception.getMessage());
    }

    @Test
    void testExceptionForInvalidAPR_CarFinance() {
        BudgetingUserRequest request = new BudgetingUserRequest();
        request.setCarSellingPrice(30000.0);
        request.setCarDeposit(5000.0);
        request.setCarApr(null);
        request.setCarTerm(60);

        BudgetingException exception = assertThrows(BudgetingException.class, () -> FieldValidation.validateCarFinanceRequiredFields(request));

        assertEquals(ErrorCode.CF_003, exception.getErrorCode());
        assertEquals("APR must be between 0 and 100, and not empty.", exception.getMessage());
    }

    @Test
    void testExceptionForInvalidTerm_CarFinance() {
        BudgetingUserRequest request = new BudgetingUserRequest();
        request.setCarSellingPrice(30000.0);
        request.setCarDeposit(5000.0);
        request.setCarApr(5.0);
        request.setCarTerm(0);

        BudgetingException exception = assertThrows(BudgetingException.class, () -> FieldValidation.validateCarFinanceRequiredFields(request));

        assertEquals(ErrorCode.CF_004, exception.getErrorCode());
        assertEquals("Term must be a valid positive number.", exception.getMessage());
    }
}
