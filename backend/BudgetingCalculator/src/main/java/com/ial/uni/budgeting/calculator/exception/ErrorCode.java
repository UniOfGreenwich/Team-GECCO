package com.ial.uni.budgeting.calculator.exception;

import lombok.Getter;

@Getter
public enum ErrorCode {

    //MortgageRequiredField
    MD_001("Available budget must be a valid positive number."),
    MD_002("House price must be a valid positive number."),

    //CarFinanceRequiredField
    CF_001("Car Selling Price must be a valid positive number."),
    CF_002("Car Deposit must be bigger than 0."),
    CF_003("Car APR must be a valid positive number between 0 and 100."),
    CF_004("Car Term must be a valid positive number."),

    //HolidayRequiredField
    HOL_001("Holiday price amount must be a valid positive number."),
    HOL_002("Holiday saving duration must be a valid positive number."),

    //CustomSavingField
    CS_001("Custom saving amount must be a valid positive number."),
    CS_002("Custom saving duration must be bigger than 0."),

    //PensionContributionField
    PC_001("Employee salary must be a valid positive number."),
    PC_002("Employee contribution rate must be between 0 and 8, and not empty."),
    PC_003("Employer contribution rate must be between 0 and 8, and not empty."),
    PC_004("Existing retirement funds must be a valid positive number."),
    PC_005("Years til retirement must be between 0 and 68, and not empty."),
    PC_006("Employee earns less than £6396 annually and therefore does not met the threshold.");


    private final String message;

    ErrorCode(String message) {
        this.message = message;
    }

    public String format(Object... args) {
        return String.format(message, args);
    }
}
