package com.gln.payload;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

public class SignUpRequest extends AuthRequest{

    public SignUpRequest() {
        super();
    }

    public SignUpRequest(@Email @NotBlank(message = "Email may not blank") String email, @NotEmpty(message = "Password may not empty") String password) {
        super(email, password);
    }
}
