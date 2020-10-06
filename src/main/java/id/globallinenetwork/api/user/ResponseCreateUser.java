package id.globallinenetwork.api.user;

import lombok.Data;

@Data
public class ResponseCreateUser {
    private String name;
    private String job;
    private String id;
    private String createdAt;
}
