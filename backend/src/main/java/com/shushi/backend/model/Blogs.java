package com.shushi.backend.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Blogs implements Serializable {

    @Id
    private String id;
    private String title;

    @Lob
    private String content;

    @ManyToOne
    private Users author;

    private LocalDateTime date;

    private boolean approved;


    @PrePersist
    public void setDate() {
        this.date = LocalDateTime.now();
    }

    @PreUpdate
    public void setDateOnUpdate() {
        this.date = LocalDateTime.now();
    }

}
