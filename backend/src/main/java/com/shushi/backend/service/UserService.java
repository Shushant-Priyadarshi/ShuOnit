package com.shushi.backend.service;

import com.shushi.backend.exception.ResourceNotFoundException;
import com.shushi.backend.model.Blogs;
import com.shushi.backend.model.Users;
import com.shushi.backend.repository.UserRepo;
import com.shushi.backend.utils.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    //find user by id
    public Users getUserById(String userId){
        return userRepo.findById(userId).orElseThrow(()->
                new ResourceNotFoundException("User not found with this Id:"+userId));
    }

    //get all users
    public List<Users> getAllUsers(){
        return userRepo.findAll();
    }

    //update user
    public Users updateUser(String userId,Users user){
        Users userFromDB = getUserById(userId);
        if(user.getName()!=null && !user.getName().trim().isEmpty()){
            userFromDB.setName(user.getName());
        }
        if(user.getEmail()!=null && !user.getEmail().trim().isEmpty()){
            userFromDB.setEmail(user.getEmail());
        }
        if(user.getPassword()!=null && !user.getPassword().trim().isEmpty()){
            userFromDB.setPassword(user.getPassword());
        }
        if(user.getBio()!=null && !user.getBio().trim().isEmpty()){
            userFromDB.setBio(user.getBio());
        }
        return userRepo.save(userFromDB);
    }

    //delete user
    public void deleteUser(String userId){
        getUserById(userId);
        userRepo.deleteById(userId);
    }

    //get User from Jwt
    public Users getUserFromJwt(String token){
        String userEmail = JwtTokenProvider.getEmailFromToken(token);
        Users userFromDB = userRepo.findByEmail(userEmail);
        if(userFromDB==null){
            throw new ResourceNotFoundException("User not found with this Email:"+userEmail);
        }
        return userFromDB;
    }

    //get all blogs of user
    public List<Blogs> getAllBlogsOfUserByJwt(String jwtToken) {
        Users userFromDB = getUserFromJwt(jwtToken);
        return userFromDB.getBlogs();

    }
}
