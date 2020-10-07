package id.globallinenetwork.api.company;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Company {
    private Integer id;
    private String companyName;
    private String url;
    private String text;
}
