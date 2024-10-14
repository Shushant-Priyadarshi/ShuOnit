package com.shushi.backend.controller;

import com.shushi.backend.model.Users;
import com.shushi.backend.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class HomeController {

    @Autowired
    private UserRepo userRepo;

    @GetMapping("/home")
    public List<Users> home() {
        return userRepo.findAll();
    }


}
