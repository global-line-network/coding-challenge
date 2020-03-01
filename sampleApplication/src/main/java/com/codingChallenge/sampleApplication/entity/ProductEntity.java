package com.codingChallenge.sampleApplication.entity;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ProductEntity {
    private Long id;
    private String name;
     private String color;
    private String pantone_value;
    private String code;
    private Integer year;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
  }
