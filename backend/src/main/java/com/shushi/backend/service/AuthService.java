package com.shushi.backend.service;

import com.shushi.backend.dto.AuthResponse;
import com.shushi.backend.dto.LoginReq;
import com.shushi.backend.dto.USER_ROLE;
import com.shushi.backend.exception.ResourceNotFoundException;
import com.shushi.backend.model.Users;
import com.shushi.backend.repository.UserRepo;
import com.shushi.backend.utils.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collection;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AuthService {


    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserDetailServiceImpl userDetailService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    //Register User
    public AuthResponse registerUser(Users user) {
        Users isExist = userRepo.findByEmail(user.getEmail());
        if (isExist != null) {
            throw new ResourceNotFoundException("Email already exists!");
        }
        String randomId = UUID.randomUUID().toString();
        user.setId(randomId);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if (user.getRole() == null) {
            user.setRole(USER_ROLE.ROLE_USER);
        } else {
            user.setRole(USER_ROLE.ROLE_ADMIN);
        }
        Users savedUser = userRepo.save(user);
        Authentication auth = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());
        SecurityContextHolder.getContext().setAuthentication(auth);
        String token = jwtTokenProvider.generateToken(auth);
        return AuthResponse.builder().message("Register Success!").token(token).roles(savedUser.getRole()).build();
    }

    //Login User
    public AuthResponse login(LoginReq loginReq) {
       Authentication authentication = authenticate(loginReq.getEmail(),loginReq.getPassword());
       Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
       String role = authorities.isEmpty()?null:authorities.iterator().next().getAuthority();
        if (role != null && role.startsWith("ROLE_")) {
            role = role.substring(5); // Remove "ROLE_" prefix
        }
        String token = jwtTokenProvider.generateToken(authentication);
        return AuthResponse.builder().message("Login Success!").token(token).roles(USER_ROLE.valueOf(role)).build();
       

    }

    private Authentication authenticate(String email, String password) {
        UserDetails userDetails = userDetailService.loadUserByUsername(email);
        if(userDetails == null) {
            throw new BadCredentialsException("Invalid email!");
        }
        if(!passwordEncoder.matches(password,userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid password!");
        }
        return new UsernamePasswordAuthenticationToken(userDetails.getUsername(), null, userDetails.getAuthorities());
    }


}
