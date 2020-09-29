package com.gln.payload;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignUpResponse extends AuthResponse{

    int id;
    public SignUpResponse(int id, String token) {
        super(token);
        this.id = id;
    }

}
