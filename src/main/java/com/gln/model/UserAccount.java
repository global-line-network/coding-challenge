package com.gln.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_account")
@Data
public class UserAccount extends PanacheEntity {

    @Size(max = 100)
    @NotBlank
    public String name;
    @Size(max = 60)
    @NotBlank
    public String job;
    @Column(name = "created_at" , updatable = false)
    @CreationTimestamp
    private LocalDateTime createdDate;
    @UpdateTimestamp
    @Column(name = "modified_at")
    private LocalDateTime modifiedDate;

}
