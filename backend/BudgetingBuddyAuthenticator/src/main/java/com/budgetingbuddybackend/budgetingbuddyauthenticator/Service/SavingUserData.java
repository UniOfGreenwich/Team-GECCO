package com.budgetingbuddybackend.budgetingbuddyauthenticator.Service;

import com.budgetingbuddybackend.budgetingbuddyauthenticator.Model.User;
import com.budgetingbuddybackend.budgetingbuddyauthenticator.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SavingUserData {

    @Autowired
    private UserRepo userRepo;

    public String saveUserDetails(User user){
        return "User Data Saved"+userRepo.save(user);
    }
}
