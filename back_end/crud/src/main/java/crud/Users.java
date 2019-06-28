package crud;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
public class Users {

    @Id
    @GeneratedValue
    private Long id;

    @Column
    @CreationTimestamp
    public Date createdAt;

    @Column
    @UpdateTimestamp
    public Date updatedAt;

    private String job;
    private String password;
    private String first_name;
    private String last_name;
    private String email;
    private String avatar;
    private String token;

    Users() {}

    Users(String job, String password, String first_name,
          String last_name, String email, String avatar, String token) {
        this.job = job;
        this.password = password;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.avatar = avatar;
        this.token = token;
    }
}
