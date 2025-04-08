package com.ial.uni.budgeting.calculator.controller;

import com.ial.uni.budgeting.calculator.model.BudgetingUserRequest;
import com.ial.uni.budgeting.calculator.model.response.BudgetingCustomSavingResponse;
import com.ial.uni.budgeting.calculator.model.response.BudgetingUserCarFinanceResponse;
import com.ial.uni.budgeting.calculator.model.response.BudgetingUserHolidayResponse;
import com.ial.uni.budgeting.calculator.model.response.BudgetingUserMortgageResponse;
import com.ial.uni.budgeting.calculator.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BudgetingController {

    @Autowired BudgetingMortgageDeposit budgetingMortgageDeposit;

    @Autowired BudgetingCarFinancePayment budgetingCarFinancePayment;

    @Autowired BudgetingHolidayAmount budgetingHolidayAmount;

    @Autowired BudgetingCustomSavingAmount budgetingCustomSavingAmount;



    @PostMapping(value = "/calculateMortgageBudget")
    public ResponseEntity<BudgetingUserMortgageResponse> calculateMortgageBudget(@RequestBody BudgetingUserRequest budgetingUserRequest) {

        FieldValidation.validateMortgageRequiredFields(budgetingUserRequest);

        BudgetingUserMortgageResponse response = budgetingMortgageDeposit.calculateMortgageBudget(budgetingUserRequest);
        return ResponseEntity.status(HttpStatus.OK).body(response);

    }


    @PostMapping(value = "/calculateCarFinancePayment")
    public ResponseEntity<BudgetingUserCarFinanceResponse> calculateCarFinancePayment(@RequestBody BudgetingUserRequest budgetingUserRequest) {

        FieldValidation.validateCarFinanceRequiredFields(budgetingUserRequest);

        BudgetingUserCarFinanceResponse response = budgetingCarFinancePayment.calculateCarFinancePayment(budgetingUserRequest);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }


    @PostMapping(value = "/calculateHolidayBudget")
    public ResponseEntity<BudgetingUserHolidayResponse> calculateHolidayBudget(@RequestBody BudgetingUserRequest budgetingUserRequest) {

        FieldValidation.validateHolidayRequiredFields(budgetingUserRequest);

        BudgetingUserHolidayResponse response = budgetingHolidayAmount.calculateHolidayBudget(budgetingUserRequest);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping(value = "/calculateCustomSavingAmount")
    public ResponseEntity<BudgetingCustomSavingResponse> calculateCustomSaving(@RequestBody BudgetingUserRequest budgetingUserRequest) {

        FieldValidation.validateCustomSavingRequiredFields(budgetingUserRequest);

        BudgetingCustomSavingResponse response = budgetingCustomSavingAmount.calculateCustomSavingAmount(budgetingUserRequest);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}