package com.example.azwarakbar.models;

import io.ebean.annotation.NotNull;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;

@Entity
@Table(name="user_job")
public class UserJob extends BaseModel {

    @NotNull @NotEmpty(message = "Missing name")
    String name;

    @NotNull @NotEmpty(message = "Missing job")
    String job;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getJob() {
        return job;
    }

    public void setJob(String job) {
        this.job = job;
    }
}
