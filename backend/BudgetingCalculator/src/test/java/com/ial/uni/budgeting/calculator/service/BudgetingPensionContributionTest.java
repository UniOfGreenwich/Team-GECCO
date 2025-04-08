package com.ial.uni.budgeting.calculator.service;

import com.ial.uni.budgeting.calculator.model.BudgetingUserRequest;
import com.ial.uni.budgeting.calculator.model.response.BudgetingUserPensionContributionResponse;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class BudgetingPensionContributionTest {

    private final BudgetingPensionContribution service = new BudgetingPensionContribution();

    @Test
    void testSuccessfulResponseWithLowQualifyingEarning_PensionContribution() {
        BudgetingUserRequest request = new BudgetingUserRequest();
        request.setPensionGrossSalary(30000.0);
        request.setEmployeePensionContributionRate(3.5);
        request.setEmployerPensionContributionRate(5.0);
        request.setExistingRetirementFunds(250000.0);
        request.setYearsTilRetirement(25);

        BudgetingUserPensionContributionResponse response = service.calculatePensionContribution(request);

        assertFalse(response.isHighQualifyingEarnings());
        assertEquals(826.14, response.getEmployeeContributionAmount());
        assertEquals(1180.2, response.getEmployerContributionAmount());
        assertEquals(2006.34, response.getTotalAnnualContributionAmount());
        assertEquals(167.19, response.getMonthlyContributionAmount());
        assertEquals(300158.5, response.getTotalPensionForRetirement());

    }

    @Test
    void testSuccessfulResponseWithHighQualifyingEarning_PensionContribution() {
        BudgetingUserRequest request = new BudgetingUserRequest();
        request.setPensionGrossSalary(60000.0);
        request.setEmployeePensionContributionRate(3.5);
        request.setEmployerPensionContributionRate(5.0);
        request.setExistingRetirementFunds(550000.0);
        request.setYearsTilRetirement(25);

        BudgetingUserPensionContributionResponse response = service.calculatePensionContribution(request);

        assertTrue(response.isHighQualifyingEarnings());
        assertEquals(1535.59, response.getEmployeeContributionAmount());
        assertEquals(2193.7, response.getEmployerContributionAmount());
        assertEquals(3729.29, response.getTotalAnnualContributionAmount());
        assertEquals(310.77, response.getMonthlyContributionAmount());
        assertEquals(643232.25, response.getTotalPensionForRetirement());

    }

}
