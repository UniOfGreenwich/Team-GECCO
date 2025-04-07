package com.ial.uni.budgeting.calculator.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class BudgetingUserRequest {

    //saving amounts
    private Double availableBudgetingAmount;

    //mortgage deposit fields
    private Double housePrice;

    //hire-purchase car finance fields
    private Double carSellingPrice;
    private Double carDeposit;
    private Double carApr;
    private int carTerm;

    //holiday amount fields
    private Double holidayPriceAmount;
    private Double holidayDepositAmount;
    private int holidaySavingDuration;
    private Double holidaySpendingMoney;

}

