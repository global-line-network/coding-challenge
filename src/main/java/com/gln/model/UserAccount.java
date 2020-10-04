package com.gln.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name = "user_account")
@Data
public class UserAccount extends BaseEntity {

    @Size(max = 100)
    @NotBlank
    public String name;
    @Size(max = 60)
    @NotBlank
    public String job;

}
