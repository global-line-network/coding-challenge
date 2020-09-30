package com.gln.payload;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignUpResponse extends AuthResponse{

    Long id;
    public SignUpResponse(Long id, String token) {
        super(token);
        this.id = id;
    }

}
