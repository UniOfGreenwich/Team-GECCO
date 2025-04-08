package com.ial.uni.budgeting.calculator.exception;

import com.ial.uni.budgeting.calculator.model.response.BudgetingErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BudgetingException.class)
    public ResponseEntity<BudgetingErrorResponse> handleBudgetingException(BudgetingException ex) {
        BudgetingErrorResponse response = new BudgetingErrorResponse();
        response.setTimestamp(LocalDateTime.now());
        response.setErrorCode(ex.getErrorCode().toString());
        response.setErrorMessage(ex.getErrorCode().getMessage());

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

}

