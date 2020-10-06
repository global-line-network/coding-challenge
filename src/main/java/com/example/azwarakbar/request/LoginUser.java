package com.example.azwarakbar.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

public class LoginUser {

    @NotEmpty(message = "Missing email")
    @Email(message = "Email should be valid")
    String email;

    @NotEmpty(message = "Missing password")
    String password;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
