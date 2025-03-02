package budgetingbuddybackend.loginsystem.respository;

import budgetingbuddybackend.loginsystem.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
}