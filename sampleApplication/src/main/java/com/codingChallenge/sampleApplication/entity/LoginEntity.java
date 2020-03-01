package com.codingChallenge.sampleApplication.entity;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class LoginEntity {
    private Long id;
    private String name;
    private String email;
    private String password;
    private Boolean active;
    private Integer previlige;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
}
