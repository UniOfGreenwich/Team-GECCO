package com.ial.uni.budgeting.calculator.service;

import com.ial.uni.budgeting.calculator.exception.BudgetingException;
import com.ial.uni.budgeting.calculator.exception.ErrorCode;
import com.ial.uni.budgeting.calculator.model.BudgetingUserRequest;
import com.ial.uni.budgeting.calculator.model.response.BudgetingUserMortgageResponse;

public class FieldValidation {

    private static void validateAlwaysRequiredFields(BudgetingUserRequest request) throws BudgetingException {
        if(request.getAvailableBudgetingAmount() == null || request.getAvailableBudgetingAmount() <= 0) {
            throw new BudgetingException("Available budgeting amount must be a valid positive number.", ErrorCode.BC_001);
        }
    }

    public static void validateMortgageRequiredFields(BudgetingUserRequest request) throws BudgetingException {
        validateAlwaysRequiredFields(request);
        if (request.getHousePrice() == null || request.getHousePrice() < 0){
            throw new BudgetingException ("House price must be a valid positive number.", ErrorCode.MD_001);
        }
    }

    public static void validateCarFinanceRequiredFields(BudgetingUserRequest request) throws BudgetingException {
        if(request.getCarSellingPrice() == null || request.getCarSellingPrice() <= 0) {
            throw new BudgetingException("Car selling price must be a valid positive number.", ErrorCode.CF_001);
        } else if (request.getCarDeposit() == null || request.getCarDeposit() < 0) {
            throw new BudgetingException("Car deposit must be bigger than 0.", ErrorCode.CF_002);
        } else if (request.getCarApr() == null || request.getCarTerm() < 0 || request.getCarApr() > 100) {
            throw new BudgetingException("APR must be between 0 and 100, and not empty.", ErrorCode.CF_003);
        } else if (request.getCarTerm() <= 0) {
            throw new BudgetingException("Term must be a valid positive number.", ErrorCode.CF_004);
        }
    }

    public static void validateHolidayRequiredFields(BudgetingUserRequest request) throws BudgetingException {
        if (request.getHolidayPriceAmount() == null || request.getHolidayPriceAmount() <= 0) {
            throw new BudgetingException("Holiday price amount must be a valid positive number.", ErrorCode.HOL_001);
        } else if (request.getHolidaySavingDuration() <= 0) {
            throw new BudgetingException("Holiday saving duration must be a valid positive number.", ErrorCode.HOL_002);
        }
    }

    public static void validateCustomSavingRequiredFields(BudgetingUserRequest request) throws BudgetingException {
        if (request.getCustomSavingAmount() == null || request.getCustomSavingAmount() <= 0) {
            throw new BudgetingException("Custom saving amount must be a valid positive number.", ErrorCode.CS_001);
        } else if (request.getCustomSavingAmountDuration() <= 0) {
            throw new BudgetingException("Customer saving duration must be bigger than 0.", ErrorCode.CS_002);
        }
    }

}
