package com.codingChallenge.sampleApplication.dto;

import lombok.Data;

@Data
public class UserInfoDto {
    private Long id;
    private String email;
    private String first_name;
    private String last_name;
    private String avatar;
}
