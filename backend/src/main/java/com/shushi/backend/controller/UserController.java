package com.shushi.backend.controller;

import com.shushi.backend.model.Users;
import com.shushi.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;


    //find user by id
    @GetMapping("/{userId}")
    public Users getUserById(@PathVariable String userId) {
        return userService.getUserById(userId);
    }

    //get all users
    @GetMapping
    public List<Users> getAllUsers() {
        return userService.getAllUsers();
    }

    //update user

    @CacheEvict(value = "userProfiles", key = "#jwtToken")
    @PutMapping()
    public Users updateUser(@RequestHeader("Authorization") String jwtToken,@RequestBody Users user) {
        Users userFromJwt = userService.getUserFromJwt(jwtToken);
        return userService.updateUser(userFromJwt.getId(), user);
    }

    //delete user
    @DeleteMapping()
    public String deleteUser(@RequestHeader("Authorization") String jwtToken) {
        Users userFromJwt = userService.getUserFromJwt(jwtToken);
        userService.deleteUser(userFromJwt.getId());
        return "User deleted with id: " + userFromJwt.getId();
    }

    //user's profile
    @Cacheable(value = "userProfiles", key = "#jwtToken")
    @GetMapping("/profile")
    public Users getUserProfile(@RequestHeader("Authorization") String jwtToken){
        return userService.getUserFromJwt(jwtToken);
    }






}
