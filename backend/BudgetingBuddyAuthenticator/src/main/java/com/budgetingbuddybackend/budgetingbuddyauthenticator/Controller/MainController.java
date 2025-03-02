package com.budgetingbuddybackend.budgetingbuddyauthenticator.Controller;

import com.budgetingbuddybackend.budgetingbuddyauthenticator.Model.User;
import com.budgetingbuddybackend.budgetingbuddyauthenticator.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

    @Autowired
    UserRepo userRepo;

    @PostMapping("/addUser")
    public void addUser(@RequestBody User user) {
        /*
            method to encrypt password (hash)
            then userRepo.save(user.password)
         */
        userRepo.save(user);

    }
}
