package com.example.azwarakbar.response;

import com.example.azwarakbar.models.BaseModel;
import io.ebean.annotation.NotNull;
import org.hibernate.validator.constraints.Length;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;

public class ProductResourceFormat {

    Long id;
    String name;
    Integer year;
    String color;
    String pantoneValue;

    public ProductResourceFormat(Long id, String name, int year, String color, String pantoneValue) {
        this.id = id;
        this.name = name;
        this.year = year;
        this.color = color;
        this.pantoneValue = pantoneValue;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getPantoneValue() {
        return pantoneValue;
    }

    public void setPantoneValue(String pantoneValue) {
        this.pantoneValue = pantoneValue;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
