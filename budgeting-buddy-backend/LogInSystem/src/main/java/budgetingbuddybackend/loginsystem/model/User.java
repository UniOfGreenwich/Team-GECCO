package budgetingbuddybackend.loginsystem.model;

import jakarta.persistence.*;

import lombok.Data;

@Entity
@Data
@Table(name = "user_details")
public class User {

    @SequenceGenerator(
            name = "user_details_sequence",
            sequenceName = "user_details_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY,
            generator = "user_details_sequence"
    )
    private Long Id;

    private String name;

    private String email;
}
