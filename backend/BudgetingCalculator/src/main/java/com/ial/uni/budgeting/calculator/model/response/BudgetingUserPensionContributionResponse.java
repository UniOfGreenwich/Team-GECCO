package com.ial.uni.budgeting.calculator.model.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BudgetingUserPensionContributionResponse {

    //pension contribution values
    private Double employeeContributionAmount;
    private Double employerContributionAmount;
    private Double totalAnnualContributionAmount;
    private Double monthlyContributionAmount;
    private Double totalPensionForRetirement;
    private boolean highQualifyingEarnings;

}
