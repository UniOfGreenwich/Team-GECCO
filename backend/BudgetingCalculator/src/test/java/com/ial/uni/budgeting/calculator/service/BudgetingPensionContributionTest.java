package com.ial.uni.budgeting.calculator.service;

import com.ial.uni.budgeting.calculator.exception.BudgetingException;
import com.ial.uni.budgeting.calculator.exception.ErrorCode;
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
    /*
    public static void validatePensionContributionRequiredFields(BudgetingUserRequest request) throws BudgetingException {
        if (request.getPensionGrossSalary() == null || request.getPensionGrossSalary() <= 0) {
            throw new BudgetingException("Employee salary must be a valid positive number, and not empty.", ErrorCode.PC_001);
        } else if (request.getEmployeePensionContributionRate() == null || request.getEmployeePensionContributionRate() < 0 || request.getEmployeePensionContributionRate() > 8) {
            throw new BudgetingException("Employee contribution rate must be between 0 and 8, and not empty.", ErrorCode.PC_002);
        } else if (request.getEmployerPensionContributionRate() == null || request.getEmployerPensionContributionRate() < 0 || request.getEmployerPensionContributionRate() > 8) {
            throw new BudgetingException("Employer contribution rate must be between 0 and 8, and not empty.", ErrorCode.PC_003);
        } else if (request.getExistingRetirementFunds() == null || request.getExistingRetirementFunds() < 0) {
            throw new BudgetingException("Existing retirement funds must be a valid positive number, and not empty.", ErrorCode.PC_004);
        } else if (request.getYearsTilRetirement() <= 0 || request.getYearsTilRetirement() > 68) {
            throw new BudgetingException("Years til retirement must be between 0 and 68, and not empty.", ErrorCode.PC_005);
        } else if (request.getPensionGrossSalary() < 6396){
            throw new BudgetingException("Employee earns less than £6396 annually and therefore does not met the threshold.", ErrorCode.PC_006);
        }
     */

    @Test
    void testResponseWithInvalidSalary_PensionContribution() {
        BudgetingUserRequest request = new BudgetingUserRequest();
        request.setPensionGrossSalary(null);
        request.setEmployeePensionContributionRate(3.5);
        request.setEmployerPensionContributionRate(5.0);
        request.setExistingRetirementFunds(550000.0);
        request.setYearsTilRetirement(25);

        BudgetingException exception = assertThrows(BudgetingException.class, () -> FieldValidation.validatePensionContributionRequiredFields(request));

        assertEquals(ErrorCode.PC_001, exception.getErrorCode());
        assertEquals("Employee salary must be a valid positive number, and not empty.", exception.getMessage());

    }
    @Test
    void testResponseWithInvalidEmployeePensionContributionRate_PensionContribution() {
        BudgetingUserRequest request = new BudgetingUserRequest();
        request.setPensionGrossSalary(60000.0);
        request.setEmployeePensionContributionRate(null);
        request.setEmployerPensionContributionRate(5.0);
        request.setExistingRetirementFunds(550000.0);
        request.setYearsTilRetirement(25);

        BudgetingException exception = assertThrows(BudgetingException.class, () -> FieldValidation.validatePensionContributionRequiredFields(request));

        assertEquals(ErrorCode.PC_002, exception.getErrorCode());
        assertEquals("Employee contribution rate must be between 0 and 8, and not empty.", exception.getMessage());

    }

    @Test
    void testResponseWithInvalidEmployerPensionContributionRate_PensionContribution() {
        BudgetingUserRequest request = new BudgetingUserRequest();
        request.setPensionGrossSalary(60000.0);
        request.setEmployeePensionContributionRate(3.5);
        request.setEmployerPensionContributionRate(null);
        request.setExistingRetirementFunds(550000.0);
        request.setYearsTilRetirement(25);

        BudgetingException exception = assertThrows(BudgetingException.class, () -> FieldValidation.validatePensionContributionRequiredFields(request));

        assertEquals(ErrorCode.PC_003, exception.getErrorCode());
        assertEquals("Employer contribution rate must be between 0 and 8, and not empty.", exception.getMessage());

    }

    @Test
    void testResponseWithInvalidExistingRetirementFund_PensionContribution() {
        BudgetingUserRequest request = new BudgetingUserRequest();
        request.setPensionGrossSalary(60000.0);
        request.setEmployeePensionContributionRate(3.5);
        request.setEmployerPensionContributionRate(5.0);
        request.setExistingRetirementFunds(null);
        request.setYearsTilRetirement(25);

        BudgetingException exception = assertThrows(BudgetingException.class, () -> FieldValidation.validatePensionContributionRequiredFields(request));

        assertEquals(ErrorCode.PC_004, exception.getErrorCode());
        assertEquals("Existing retirement funds must be a valid positive number, and not empty.", exception.getMessage());

    }

    @Test
    void testResponseWithInvalidYearsTilRetirement_PensionContribution() {
        BudgetingUserRequest request = new BudgetingUserRequest();
        request.setPensionGrossSalary(60000.0);
        request.setEmployeePensionContributionRate(3.5);
        request.setEmployerPensionContributionRate(5.0);
        request.setExistingRetirementFunds(550000.0);
        request.setYearsTilRetirement(0);

        BudgetingException exception = assertThrows(BudgetingException.class, () -> FieldValidation.validatePensionContributionRequiredFields(request));

        assertEquals(ErrorCode.PC_005, exception.getErrorCode());
        assertEquals("Years til retirement must be between 0 and 68, and not empty.", exception.getMessage());

    }

}
