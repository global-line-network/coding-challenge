package com.codingChallenge.sampleApplication.dto;

import lombok.Data;

@Data
public class ProductDto {
    private Long id;
    private String name;
    private Integer year;
    private String color;
    private String pantone_value;
}

