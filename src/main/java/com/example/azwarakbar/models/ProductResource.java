package com.example.azwarakbar.models;

import io.ebean.annotation.NotNull;
import org.hibernate.validator.constraints.Length;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;

@Entity
@Table(name="resource")
public class ProductResource extends BaseModel {

    @NotNull @NotEmpty(message = "Missing name")
    String name;

    @NotNull @NotEmpty(message = "Missing year")
    @Length(min = 4, max = 4)
    Integer year;

    @NotNull @NotEmpty(message = "Missing color")
    @Length(min = 4, max = 7)
    String color;

    @NotNull @NotEmpty(message = "Missing pantone_value")
    @Length(min = 7, max = 7)
    String pantoneValue;

    public ProductResource(String name, int year, String color, String pantoneValue) {
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
}
