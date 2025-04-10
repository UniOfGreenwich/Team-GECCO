package com.ial.uni.budgeting.calculator.service;

import com.ial.uni.budgeting.calculator.exception.BudgetingException;
import com.ial.uni.budgeting.calculator.exception.ErrorCode;
import com.ial.uni.budgeting.calculator.model.BudgetingUserRequest;
import com.ial.uni.budgeting.calculator.model.response.BudgetingUserHolidayResponse;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class BudgetingHolidayAmountTest {

    private final BudgetingHolidayAmount service = new BudgetingHolidayAmount();

    @Test
    void testSuccessfulResponseWithValidInputs_Holiday() {
        BudgetingUserRequest request = new BudgetingUserRequest();
        request.setHolidayPriceAmount(5000.0);
        request.setHolidayDepositAmount(1000.0);
        request.setHolidaySpendingMoney(2000.0);
        request.setHolidaySavingDuration(12);

        BudgetingUserHolidayResponse response = service.calculateHolidayBudget(request);

        assertEquals(12, response.getHolidaySavingDuration());
        assertEquals(6000.0, response.getTotalHolidayAmountSaved());
        assertEquals(500.0, response.getHolidayMonthlySaving());
    }

   @Test
    void testSuccessfulResponseWithInvalidDepositAmount_Holiday() {
        BudgetingUserRequest request = new BudgetingUserRequest();
        request.setHolidayPriceAmount(5000.0);
        request.setHolidayDepositAmount(-1000.0);
        request.setHolidaySpendingMoney(2000.0);
        request.setHolidaySavingDuration(12);

        BudgetingUserHolidayResponse response = service.calculateHolidayBudget(request);

        assertEquals(0.0, request.getHolidayDepositAmount());
        assertEquals(12, response.getHolidaySavingDuration());
        assertEquals(7000.0, response.getTotalHolidayAmountSaved());
        assertEquals(583.33, response.getHolidayMonthlySaving());
    }

    @Test
    void testSuccessfulResponseWithInvalidSpendingMoney_Holiday() {
        BudgetingUserRequest request = new BudgetingUserRequest();
        request.setHolidayPriceAmount(5000.0);
        request.setHolidayDepositAmount(2000.0);
        request.setHolidaySpendingMoney(-1000.0);
        request.setHolidaySavingDuration(12);

        BudgetingUserHolidayResponse response = service.calculateHolidayBudget(request);

        assertEquals(0.0, request.getHolidaySpendingMoney());
        assertEquals(12, response.getHolidaySavingDuration());
        assertEquals(3000.0, response.getTotalHolidayAmountSaved());
        assertEquals(250.0, response.getHolidayMonthlySaving());
    }

    @Test
    void testSuccessfulResponseWithNullDepositAmount_Holiday() {
        BudgetingUserRequest request = new BudgetingUserRequest();
        request.setHolidayPriceAmount(5000.0);
        request.setHolidayDepositAmount(null);
        request.setHolidaySpendingMoney(2000.0);
        request.setHolidaySavingDuration(12);

        BudgetingUserHolidayResponse response = service.calculateHolidayBudget(request);

        assertEquals(0.0, request.getHolidayDepositAmount());
        assertEquals(12, response.getHolidaySavingDuration());
        assertEquals(7000.0, response.getTotalHolidayAmountSaved());
        assertEquals(583.33, response.getHolidayMonthlySaving());
    }

    @Test
    void testSuccessfulResponseWithNullSpendingMoney_Holiday() {
        BudgetingUserRequest request = new BudgetingUserRequest();
        request.setHolidayPriceAmount(5000.0);
        request.setHolidayDepositAmount(2000.0);
        request.setHolidaySpendingMoney(null);
        request.setHolidaySavingDuration(12);

        BudgetingUserHolidayResponse response = service.calculateHolidayBudget(request);

        assertEquals(0.0, request.getHolidaySpendingMoney());
        assertEquals(12, response.getHolidaySavingDuration());
        assertEquals(3000.0, response.getTotalHolidayAmountSaved());
        assertEquals(250.0, response.getHolidayMonthlySaving());
    }

    @Test
    void testResponseWithInvalidHolidayPrice_Holiday() {
        BudgetingUserRequest request = new BudgetingUserRequest();
        request.setHolidayPriceAmount(null);
        request.setHolidayDepositAmount(2000.0);
        request.setHolidaySpendingMoney(2000.0);
        request.setHolidaySavingDuration(12);

        BudgetingException exception = assertThrows(BudgetingException.class, () -> FieldValidation.validateHolidayRequiredFields(request));

        assertEquals(ErrorCode.HOL_001, exception.getErrorCode());
        assertEquals("Holiday price amount must be a valid positive number, and not empty.", exception.getMessage());
    }

    @Test
    void testResponseWithInvalidHolidayDuration_Holiday() {
        BudgetingUserRequest request = new BudgetingUserRequest();
        request.setHolidayPriceAmount(5000.0);
        request.setHolidayDepositAmount(2000.0);
        request.setHolidaySpendingMoney(2000.0);
        request.setHolidaySavingDuration(0);

        BudgetingException exception = assertThrows(BudgetingException.class, () -> FieldValidation.validateHolidayRequiredFields(request));

        assertEquals(ErrorCode.HOL_002, exception.getErrorCode());
        assertEquals("Holiday saving duration must be a valid positive number.", exception.getMessage());
    }
}
