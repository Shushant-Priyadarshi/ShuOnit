package com.shushi.backend.controller;

import com.shushi.backend.dto.ApiResponse;
import com.shushi.backend.model.Blogs;
import com.shushi.backend.model.Users;
import com.shushi.backend.service.BlogService;
import com.shushi.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/blogs")
public class BlogController {

    @Autowired
    private BlogService blogService;

    @Autowired
    private UserService userService;

    //create blog
    @PostMapping()
    public ResponseEntity<ApiResponse> createBlog(@RequestHeader("Authorization") String jwtToken, @RequestBody Blogs blog) {
        Users userFromJwt = userService.getUserFromJwt(jwtToken);
         blogService.createBlog(userFromJwt.getId(), blog);
        ApiResponse response = ApiResponse.builder().message("Blog created and awaiting admin approval").status(HttpStatus.CREATED).success(true).build();
        return  new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    //get all blogs
    @GetMapping
    public Page<Blogs> getAllBlogs(@RequestParam(defaultValue = "0")int page, @RequestParam(defaultValue = "5")int size) {
        return blogService.getApprovedBlogs(page,size);
    }

    //get blog by id
    @GetMapping("/blog/{blogId}")
    public Blogs getBlogById(@PathVariable String blogId) {
        return blogService.getBlogById(blogId);
    }

    //delete blog
    @DeleteMapping("/{blogId}")
    public String deleteBlog(@PathVariable String blogId) {
        return blogService.deleteBlog(blogId);
    }

    //update blogs
    @PutMapping("/{blogId}")
    public Blogs updateBlog(@PathVariable String blogId,@RequestBody Blogs blog) {
        return blogService.updateBlog(blogId, blog);
    }

    //get all blogs of any user
    @GetMapping("/user/all-blogs")
    public List<Blogs> getAllUserBlogs(@RequestHeader("Authorization") String jwtToken) {
        return userService.getAllBlogsOfUserByJwt(jwtToken);
    }
}
