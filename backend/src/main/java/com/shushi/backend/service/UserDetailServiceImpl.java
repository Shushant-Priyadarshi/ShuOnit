package com.shushi.backend.service;

import com.shushi.backend.dto.USER_ROLE;
import com.shushi.backend.exception.ResourceNotFoundException;
import com.shushi.backend.model.Users;
import com.shushi.backend.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserDetailServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users user = userRepo.findByEmail(username);
       if(user!=null){
           return  buildUserDetails(user.getEmail(),user.getPassword(),user.getRole());
       }
        throw new ResourceNotFoundException("User not found with email: " + username);
    }

    private UserDetails buildUserDetails(String email, String password, USER_ROLE role) {
        if(role==null){
            role = USER_ROLE.ROLE_USER;
        }
        List<GrantedAuthority> authorityList = new ArrayList<>();
        authorityList.add(new SimpleGrantedAuthority("ROLE_"+role));
        return new User(email, password, authorityList);
    }

}
