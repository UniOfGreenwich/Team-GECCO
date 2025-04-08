package com.ial.uni.budgeting.calculator.service;

import com.ial.uni.budgeting.calculator.model.BudgetingUserRequest;
import com.ial.uni.budgeting.calculator.model.response.BudgetingUserPensionContributionResponse;
import org.springframework.stereotype.Service;

import static com.ial.uni.budgeting.calculator.util.FinanceUtil.truncateDownToTwoDecimals;

@Service
public class BudgetingPensionContribution {

    public BudgetingUserPensionContributionResponse calculatePensionContribution(BudgetingUserRequest request) {
        BudgetingUserPensionContributionResponse response = new BudgetingUserPensionContributionResponse();

        double employeeGrossSalary = request.getPensionGrossSalary();
        double yearsTilRetirement = request.getYearsTilRetirement();
        double exisitngRequirementFunds = request.getExistingRetirementFunds();
        double qualifiedEarnings = calculateQualifyingEarnings(response, employeeGrossSalary);

        double employeeContribution = truncateDownToTwoDecimals((request.getEmployeePensionContributionRate() / 100) * qualifiedEarnings);
        double employerContribution = truncateDownToTwoDecimals((request.getEmployerPensionContributionRate() / 100) * qualifiedEarnings);
        double totalAnnualContribution = employeeContribution + employerContribution;

        calculateTotalRetirementFunds(response, yearsTilRetirement, exisitngRequirementFunds, totalAnnualContribution);

        response.setEmployeeContributionAmount(employeeContribution);
        response.setEmployerContributionAmount(employerContribution);
        response.setTotalAnnualContributionAmount(truncateDownToTwoDecimals(totalAnnualContribution));
        response.setMonthlyContributionAmount(truncateDownToTwoDecimals(totalAnnualContribution / 12));

        return response;
    }

    private double calculateQualifyingEarnings(BudgetingUserPensionContributionResponse response, double employeeGrossSalary) {
        //numbers are received from the gov website - subject to change every tax year (these are for 2025/2026)
        double lowerEarningLimit = 6396.0;
        double upperEarningLimit = 50270.0;

        if(employeeGrossSalary > lowerEarningLimit && employeeGrossSalary <= upperEarningLimit) {
            response.setHighQualifyingEarnings(false);
            return employeeGrossSalary - lowerEarningLimit;
        } else {
            response.setHighQualifyingEarnings(true);
            return (upperEarningLimit - lowerEarningLimit);
        }
    }

    private void calculateTotalRetirementFunds(BudgetingUserPensionContributionResponse response, double yearsTilRetirement, double exisitngRequirementFunds, double totalAnnualContribution) {
        double futureRetirementFunds = totalAnnualContribution * yearsTilRetirement;
        double totalRetirementFunds = exisitngRequirementFunds + futureRetirementFunds;
        response.setTotalPensionForRetirement(truncateDownToTwoDecimals(totalRetirementFunds));

    }

}
