package com.ial.uni.budgeting.calculator.service;

import com.ial.uni.budgeting.calculator.model.BudgetingUserRequest;
import com.ial.uni.budgeting.calculator.model.response.BudgetingUserMortgageResponse;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
public class BudgetingMortgageDeposit {

    public BudgetingUserMortgageResponse calculateMortgageBudget(BudgetingUserRequest request) {
        BudgetingUserMortgageResponse response = new BudgetingUserMortgageResponse();

        double housePrice = request.getHousePrice();
        double depositPercentage = calculateDepositPercentage(housePrice, response);
        calculateDepositAmount(housePrice, depositPercentage, response);
        double depositAmount = calculateDepositAmount(housePrice, depositPercentage, response);
        double savingMonthlyAmount = request.getSavingAmountMonthly();
        savingDuration(depositAmount, savingMonthlyAmount, response);
        return response;
    }

    private double calculateDepositPercentage(double housePrice, BudgetingUserMortgageResponse response) {
        double depositPercentage;

        if (housePrice <= 400000) {
            depositPercentage = 12;
        } else if (housePrice <= 750000) {
            depositPercentage = 15;
        } else {
            depositPercentage = 20;
        }
        response.setDepositPercentage(depositPercentage);
        return depositPercentage;
    }

    private double calculateDepositAmount(double housePrice, double depositPercentage, BudgetingUserMortgageResponse response) {
        double depositAmount;

        depositAmount = (depositPercentage / 100) * housePrice;
        response.setDepositAmount(depositAmount);
        return depositAmount;
    }

    private double savingDuration(double depositAmount, double savingMonthlyAmount, BudgetingUserMortgageResponse response) {
        double savingDuration = truncateDownToTwoDecimals(depositAmount / savingMonthlyAmount);
        response.setSavingDuration(savingDuration);
        response.setMonthlyMortgageSaving(savingMonthlyAmount);
        return savingDuration;
    }

    private static double truncateDownToTwoDecimals(Double number) {
        BigDecimal bd = BigDecimal.valueOf(number);
        bd = bd.setScale(0, RoundingMode.UP);
        return bd.doubleValue();
    }

}
