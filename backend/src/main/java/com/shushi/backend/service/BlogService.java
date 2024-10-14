package com.shushi.backend.service;

import com.shushi.backend.exception.ResourceNotFoundException;
import com.shushi.backend.model.Blogs;
import com.shushi.backend.model.Users;
import com.shushi.backend.repository.BlogRepo;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import java.util.UUID;

@Service
public class BlogService {

    @Autowired
    private BlogRepo blogRepo;

    @Autowired
    private UserService userService;

    @Autowired
    private NotificationService notificationService;



    //Create blog
    @Transactional
    @CacheEvict(value = "blogFeed",allEntries = true)
    public Blogs createBlog(String userId,Blogs blog) {
        String randomID = UUID.randomUUID().toString();
        blog.setId(randomID);
        Users existingUser = userService.getUserById(userId);
        blog.setAuthor(existingUser);
        blog.setApproved(false);
        return blogRepo.save(blog);
    }

    //get all approved blogs
    @Cacheable(value = "blogFeed")
    public Page<Blogs> getApprovedBlogs(int page,int size){
        Pageable pageable = PageRequest.of(page,size);
        return  blogRepo.findAllByApprovedTrueOrderByDateDesc(pageable);
    }



    //get unapproved blogs for admin
    public List<Blogs> getPendingBlogs() {
        return  blogRepo.findAllByApprovedFalse();
    }

    //approve blogs method
    @Transactional
    @CachePut(value = "blogFeed",key = "#result.id")
    public Blogs approveBlogs(String blogId){
        Blogs blog = getBlogById(blogId);
        blog.setApproved(true);
        Blogs updatedBlog = blogRepo.save(blog);
        notificationService.sendPublicNotification("A new blog '" + blog.getTitle() + "' has been approved!");
        return updatedBlog;
    }

    //find by id
    public Blogs getBlogById(String blogId) {
        return blogRepo.findById(blogId).orElseThrow(()->new ResourceNotFoundException("Blog not found with id: "+blogId));
    }


    //delete blog
    @CacheEvict(value = "blogFeed", allEntries = true)
    public String deleteBlog(String blogId) {
        Blogs blog = getBlogById(blogId); // Fetch before deletion
        blogRepo.deleteById(blogId); // Delete once
        notificationService.sendPublicNotification("A new blog '" + blog.getTitle() + "' has been rejected!");
        return "Blog deleted with id: " + blogId;
    }


    //update blogs
    public Blogs updateBlog(String blogId,Blogs blog) {
        Blogs blogFromDB = getBlogById(blogId);
        if(blog.getId() !=null && !blog.getId().trim().isEmpty()){
            blogFromDB.setId(blog.getId());
        }
        if(blog.getTitle() != null && !blog.getTitle().trim().isEmpty()){
            blogFromDB.setTitle(blog.getTitle());
        }
        if(blog.getContent() != null && !blog.getContent().trim().isEmpty()){
            blogFromDB.setContent(blog.getContent());
        }
        if(blog.getAuthor() !=null){
            blogFromDB.setAuthor(blog.getAuthor());
        }
        return blogRepo.save(blogFromDB);

    }

}
