package com.ial.uni.budgeting.calculator.model.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BudgetingUserCarFinanceResponse {

    //car finance values
    private double monthlyCarFinancePayment;
    private double totalCarFinanceAmountPayable;
    private double totalCarInterestDue;

}
