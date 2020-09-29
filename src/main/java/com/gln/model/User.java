package com.gln.model;

import lombok.Data;
import org.hibernate.annotations.NaturalId;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name = "user")
@Data
public class User extends BaseEntity{

    @NaturalId
    @NotBlank
    @Size(max = 40)
    @Email
    private String email;

    @NotBlank
    @Size(max = 100)
    private String password;
    @Size(max = 100)
    private String name;
    @Size(max = 50)
    private String job;

    public User() {
    }

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }
}

