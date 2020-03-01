package com.codingChallenge.sampleApplication.entity;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserEntity {
    private Long id;
    private String first_name;
    private String last_name;
    private String email;
    private Integer age;
    private String address;
    private String city;
    private String postCode;
    private LocalDateTime dob;
    private String avatar;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
}
