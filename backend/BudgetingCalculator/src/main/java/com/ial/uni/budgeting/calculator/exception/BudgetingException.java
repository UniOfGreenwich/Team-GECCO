package com.ial.uni.budgeting.calculator.exception;

import lombok.Getter;

@Getter
public class BudgetingException extends RuntimeException {

  private final ErrorCode errorCode;

    public BudgetingException(String message, ErrorCode errorCode) {
        super(message);
        this.errorCode = errorCode;
    }
}
