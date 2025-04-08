package com.ial.uni.budgeting.calculator.exception;

import lombok.Getter;

@Getter
public enum ErrorCode {

    //AlwaysRequiredField
    BC_001("Available budget must be a valid positive number."),

    //MortgageRequiredField
    MD_001("House price must be a valid positive number."),

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
    CS_002("Custom saving duration must be bigger than 0.");


    private final String message;

    ErrorCode(String message) {
        this.message = message;
    }

    public String format(Object... args) {
        return String.format(message, args);
    }
}
