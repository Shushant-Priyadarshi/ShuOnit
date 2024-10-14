    package com.shushi.backend.repository;

    import com.shushi.backend.model.Blogs;
    import com.shushi.backend.model.Users;
    import org.apache.catalina.User;
    import org.springframework.data.jpa.repository.JpaRepository;
    import org.springframework.stereotype.Repository;

    import java.util.List;

    @Repository
    public interface UserRepo extends JpaRepository<Users,String> {
        Users findByEmail(String email);
    }
