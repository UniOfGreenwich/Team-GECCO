package com.ial.uni.budgeting.calculator.service;

import com.ial.uni.budgeting.calculator.model.BudgetingUserRequest;
import com.ial.uni.budgeting.calculator.model.response.BudgetingUserCarFinanceResponse;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class BudgetingCarFinancePaymentTest {
    // Test cases for the BudgetingCarFinancePayment class
    // This class will contain unit tests for the calculateCarFinancePayment method

    // Test case 1: Valid input values
    // Test case 2: Zero car selling price
    // Test case 3: Zero car deposit
    // Test case 4: Zero APR
    // Test case 5: Zero term
    // Test case 6: Negative values for car selling price, car deposit, APR, and term
    // Test case 7: Large values for car selling price, car deposit, APR, and term

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
}
