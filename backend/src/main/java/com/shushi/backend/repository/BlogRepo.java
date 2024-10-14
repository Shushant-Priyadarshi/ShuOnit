    package com.shushi.backend.repository;

    import com.shushi.backend.model.Blogs;
    import org.springframework.data.domain.Page;
    import org.springframework.data.domain.Pageable;
    import org.springframework.data.jpa.repository.JpaRepository;
    import org.springframework.stereotype.Repository;

    import java.util.List;


    @Repository
    public interface BlogRepo extends JpaRepository<Blogs,String> {


        //Approved Blogs
        Page<Blogs> findAllByApprovedTrueOrderByDateDesc(Pageable pageable);

        //unapproved Blogs for admin
        List<Blogs> findAllByApprovedFalse();

    }
