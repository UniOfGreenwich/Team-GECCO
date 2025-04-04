package com.ial.uni.budgeting.calculator.model.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BudgetingUserCarFinanceResponse {

    //car finance fields
    private double monthlyCarFinancePayment;
    private double totalCarFinanceAmountPayable;
    private double totalCarInterestDue;

}
