package id.globallinenetwork.api.resource;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Resource {
    private Integer id;
    private String name;
    private Integer year;
    private String color;
    private String pantoneValue;
}
