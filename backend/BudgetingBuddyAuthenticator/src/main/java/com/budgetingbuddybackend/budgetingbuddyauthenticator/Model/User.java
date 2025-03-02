package com.budgetingbuddybackend.budgetingbuddyauthenticator.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collation = "user_account_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    private Integer userNumber;

    private String firstName;

    private String lastName;

    private String email;

    private String password;
}
