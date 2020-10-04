package com.gln.payload;

import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

@NoArgsConstructor
public class SignUpRequest extends AuthRequest{

    public SignUpRequest(@Email @NotBlank(message = "Email may not blank") String email, @NotEmpty(message = "Password may not empty") String password) {
        super(email, password);
    }
}
