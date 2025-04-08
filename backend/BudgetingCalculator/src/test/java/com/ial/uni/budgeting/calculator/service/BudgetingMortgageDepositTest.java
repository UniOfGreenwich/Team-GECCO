package com.ial.uni.budgeting.calculator.service;

import com.ial.uni.budgeting.calculator.exception.BudgetingException;
import com.ial.uni.budgeting.calculator.exception.ErrorCode;
import com.ial.uni.budgeting.calculator.model.BudgetingUserRequest;
import com.ial.uni.budgeting.calculator.model.response.BudgetingUserMortgageResponse;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;


class BudgetingMortgageDepositTest {

    private final BudgetingMortgageDeposit service = new BudgetingMortgageDeposit();


    @Test
    void testSuccessfulResponseLowestBand_Mortgage() {
        BudgetingUserRequest request = new BudgetingUserRequest();
        request.setHousePrice(500000.0);
        request.setAvailableBudgetingAmount(1750.0);

        BudgetingUserMortgageResponse response = service.calculateMortgageBudget(request);

        assertEquals(15.0, response.getDepositPercentage());
        assertEquals(75000, response.getDepositAmount());
        assertEquals(43.0, response.getSavingDuration());
    }

    @Test
    void testSuccessfulResponseMediumBand_Mortgage() {
        BudgetingUserRequest request = new BudgetingUserRequest();
        request.setHousePrice(679995.0);
        request.setAvailableBudgetingAmount(2350.0);

        BudgetingUserMortgageResponse response = service.calculateMortgageBudget(request);

        assertEquals(15.0, response.getDepositPercentage());
        assertEquals(101999.25, response.getDepositAmount());
        assertEquals(44.0, response.getSavingDuration());
    }

    @Test
    void testSuccessfulResponseHighestBand_Mortgage() {
        BudgetingUserRequest request = new BudgetingUserRequest();
        request.setHousePrice(1350000.0);
        request.setAvailableBudgetingAmount(3750.0);

        BudgetingUserMortgageResponse response = service.calculateMortgageBudget(request);

        assertEquals(20.0, response.getDepositPercentage());
        assertEquals(270000.0, response.getDepositAmount());
        assertEquals(72.0, response.getSavingDuration());
    }

    /*
    public static void validateMortgageRequiredFields(BudgetingUserRequest request) throws BudgetingException {
        if(request.getAvailableBudgetingAmount() == null || request.getAvailableBudgetingAmount() <= 0) {
            throw new BudgetingException("Available budgeting amount must be a valid positive number, and not empty.", ErrorCode.MD_001);
        } else if (request.getHousePrice() == null || request.getHousePrice() < 0){
            throw new BudgetingException ("House price must be a valid positive number, and not empty.", ErrorCode.MD_002);
        }
     */

    @Test
    void testResponseWhenHousePrice_Mortgage() {
        BudgetingUserRequest request = new BudgetingUserRequest();
        request.setHousePrice(null);
        request.setAvailableBudgetingAmount(3750.0);

        BudgetingException exception = assertThrows(BudgetingException.class, () -> FieldValidation.validateMortgageRequiredFields(request));

        assertEquals(ErrorCode.MD_002, exception.getErrorCode());
        assertEquals("House price must be a valid positive number, and not empty.", exception.getMessage());
    }

    @Test
    void testResponseWhenInvalidHousePrice_Mortgage() {
        BudgetingUserRequest request = new BudgetingUserRequest();
        request.setHousePrice(1350000.0);
        request.setAvailableBudgetingAmount(null);

        BudgetingException exception = assertThrows(BudgetingException.class, () -> FieldValidation.validateMortgageRequiredFields(request));

        assertEquals(ErrorCode.MD_001, exception.getErrorCode());
        assertEquals("Available budgeting amount must be a valid positive number, and not empty.", exception.getMessage());
    }

}
