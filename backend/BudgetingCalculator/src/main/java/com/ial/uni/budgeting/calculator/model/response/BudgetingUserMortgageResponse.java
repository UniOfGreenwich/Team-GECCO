package com.ial.uni.budgeting.calculator.model.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BudgetingUserMortgageResponse {

    //mortgage values
    private double depositAmount;
    private double depositPercentage;
    private double savingDuration;
    private double monthlyMortgageSaving;


}
