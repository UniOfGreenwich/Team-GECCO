package com.uni.ial.budgeting.controller;

import com.uni.ial.budgeting.model.User;
import com.uni.ial.budgeting.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    private final UserRepository userRepository;

    @Autowired //Constructor Injection
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/addUser")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        // Logic to create a user
        User response = userRepository.save(user);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/removeUser/{id}")
    public void deleteUser(@PathVariable Long id) {
        // logic to delete a user
        userRepository.deleteById(id);
    }

    @GetMapping("/fetchUser/{id}")
    public User getUser(@PathVariable Long id) {
        // logic to fetch a user
        return userRepository.findById(id).orElse(null);
    }

    @GetMapping("/fetchUsers")
    public List<User> getAllUsers(){
        // logic to fetch all users
        return userRepository.findAll();
    }

    @PutMapping("/updateUser/{id}")
    public User updateUser(@PathVariable Long id,@RequestBody User updatedUser) {

        // logic to update a user
        User existingUser = userRepository.findById(id).orElse(null);

        if(existingUser!=null){
            existingUser.setName(updatedUser.getName());
            existingUser.setEmail(updatedUser.getEmail());
            return userRepository.save(existingUser);
        }else{
            return null;
        }
    }
}
