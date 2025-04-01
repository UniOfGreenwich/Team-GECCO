package com.ial.uni.budgeting.calculator.controller;

import com.ial.uni.budgeting.calculator.model.BudgetingUserRequest;
import com.ial.uni.budgeting.calculator.model.response.BudgetingUserMortgageResponse;
import com.ial.uni.budgeting.calculator.service.BudgetingMortgageDeposit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BudgetingController {

    @Autowired BudgetingMortgageDeposit budgetingMortgageDeposit;

    @PostMapping(value = "/calculateMortgageBudget")
    public ResponseEntity<BudgetingUserMortgageResponse> calculateMortgageBudget(@RequestBody BudgetingUserRequest budgetingUserRequest) {

        BudgetingUserMortgageResponse response = budgetingMortgageDeposit.calculateMortgageBudget(budgetingUserRequest);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}