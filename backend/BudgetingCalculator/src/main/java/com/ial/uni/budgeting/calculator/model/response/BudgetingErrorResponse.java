package com.ial.uni.budgeting.calculator.model.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;


@Getter
@Setter
@NoArgsConstructor
public class BudgetingErrorResponse {

    private LocalDateTime timestamp;
    private String errorCode;
    private String errorMessage;

}

