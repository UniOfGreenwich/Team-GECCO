package com.budgetingbuddybackend.budgetingbuddyauthenticator.Repository;

import com.budgetingbuddybackend.budgetingbuddyauthenticator.Model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepo extends MongoRepository<User, Integer> {

}
