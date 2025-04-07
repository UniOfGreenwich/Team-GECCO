package com.ial.uni.budgeting.calculator.model.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BudgetingUserHolidayResponse {

    //holiday values
    private int holidaySavingDuration;
    private Double holidayMonthlySaving;
    private Double totalHolidayAmountSaved;
}
