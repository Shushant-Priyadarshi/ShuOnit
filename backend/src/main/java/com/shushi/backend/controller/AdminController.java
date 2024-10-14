package com.shushi.backend.controller;

import com.shushi.backend.exception.ResourceNotFoundException;
import com.shushi.backend.model.Blogs;
import com.shushi.backend.model.Users;
import com.shushi.backend.service.BlogService;
import com.shushi.backend.service.UserService;
import com.shushi.backend.utils.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {



    @Autowired
    private BlogService blogService;

    @Autowired
    private UserService userService;

    //Approve Blog
    @PostMapping("/blogs/{blogId}/approve")
    public Blogs  approveBlog(@PathVariable String blogId,@RequestHeader("Authorization") String jwtToken) {
        if(isAdmin(jwtToken)){
        return  blogService.approveBlogs(blogId);
        }
        throw new ResourceNotFoundException("NOT ADMIN!");

    }

    //pending Blogs
    @GetMapping("/blogs/pending")
    public List<Blogs> getPendingBlogs(@RequestHeader("Authorization") String jwtToken) {
        if(isAdmin(jwtToken)){
        return blogService.getPendingBlogs();
        }
        throw new ResourceNotFoundException("NOT ADMIN!");
    }

    //reject the blog

    @DeleteMapping("/blog/{blogId}/reject")
    public String rejectBlog(@PathVariable String blogId,@RequestHeader("Authorization") String jwtToken) {
        if(isAdmin(jwtToken)){
            return blogService.deleteBlog(blogId);
        }
        throw new ResourceNotFoundException("NOT ADMIN!");
    }

    @GetMapping("/users")
    public List<Users> getAllUsers(@RequestHeader("Authorization") String jwtToken) {
        if(isAdmin(jwtToken)){
        return userService.getAllUsers();

        }
        throw new ResourceNotFoundException("NOT ADMIN!");
    }

    @DeleteMapping("/users/{userId}")
    public String deleteUser(@PathVariable String userId,@RequestHeader("Authorization") String jwtToken) {
        if(isAdmin(jwtToken)){
            userService.deleteUser(userId);
            return  "User deleted with id: " + userId;
        }
        throw new ResourceNotFoundException("NOT ADMIN!");

    }


    private boolean isAdmin(String jwtToken){
        Users user = userService.getUserFromJwt(jwtToken);
        return user.getRole() != null && user.getRole().toString().equals("ROLE_ADMIN");
    }
}
