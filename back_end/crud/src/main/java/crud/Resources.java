package crud;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
public class Resources {

    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private int year;
    private String color;
    private String pantone_value;

    Resources() {}

    Resources(String name, int year, String color, String pantone_value) {
        this.name = name;
        this.year = year;
        this.color = color;
        this.pantone_value = pantone_value;
    }
}
