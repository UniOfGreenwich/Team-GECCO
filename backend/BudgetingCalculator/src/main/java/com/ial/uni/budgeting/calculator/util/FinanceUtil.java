package com.ial.uni.budgeting.calculator.util;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class FinanceUtil {

    public static double truncateDownToZeroDecimals(Double number) {
        BigDecimal bd = BigDecimal.valueOf(number);
        bd = bd.setScale(0, RoundingMode.UP);
        return bd.doubleValue();
    }

    public static double truncateDownToTwoDecimals(Double number) {
        BigDecimal bd = BigDecimal.valueOf(number);
        bd = bd.setScale(2, RoundingMode.DOWN);
        return bd.doubleValue();
    }

}
