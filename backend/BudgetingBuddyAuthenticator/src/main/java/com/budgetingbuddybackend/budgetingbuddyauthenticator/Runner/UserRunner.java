package com.budgetingbuddybackend.budgetingbuddyauthenticator.Runner;

import com.budgetingbuddybackend.budgetingbuddyauthenticator.Model.User;
import com.budgetingbuddybackend.budgetingbuddyauthenticator.Service.SavingUserData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;

public class UserRunner implements CommandLineRunner {

    @Autowired
    private SavingUserData service;

    @Override
    public void run(String... args) throws Exception{
        /*
        Integer Id = 2;
        String firstName = "Ethan";
        String lastName = "Fox";
        String email = "effyfox@bush.com";
        String password = "iloveemma";

         */

        User user;
        user = new User(3,"Grace", "Northwood", "graceNorthwood@eg.com","iloveshopping");

        System.out.println(service.saveUserDetails(user));
    }
}
