package id.globallinenetwork.api.user;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class User {
    private Integer id;
    private String name;
    private String job;
    private String createdAt;
    private String updateAt;
}
