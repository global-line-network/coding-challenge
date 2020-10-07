package id.globallinenetwork.api.user;

import lombok.Data;

@Data
public class ResponseSingleUser {
    private Integer id;
    private String email;
    private String firstName;
    private String lastName;
    private String avatar;
}
