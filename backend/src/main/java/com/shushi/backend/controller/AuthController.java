package com.shushi.backend.controller;

import com.shushi.backend.dto.AuthResponse;
import com.shushi.backend.dto.LoginReq;
import com.shushi.backend.model.Users;
import com.shushi.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    //Register User
    @PostMapping("/register")
    public AuthResponse registerUser(@RequestBody Users user) {
        return authService.registerUser(user);
    }

    @PostMapping("/login")
    public AuthResponse loginUser(@RequestBody LoginReq loginReq) {
        return authService.login(loginReq);
    }


}
